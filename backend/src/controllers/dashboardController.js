const { prisma } = require('../config/database');

/**
 * Get dashboard summary
 * GET /api/dashboard/summary
 */
const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's trip statistics
    const [totalTrips, upcomingTrips, completedTrips, currentTrips] = await Promise.all([
      prisma.trip.count({ where: { userId } }),
      prisma.trip.count({ 
        where: { 
          userId, 
          status: 'UPCOMING',
          startDate: { gt: new Date() }
        } 
      }),
      prisma.trip.count({ 
        where: { 
          userId, 
          status: 'COMPLETED',
          endDate: { lt: new Date() }
        } 
      }),
      prisma.trip.count({ 
        where: { 
          userId, 
          status: 'IN_PROGRESS',
          startDate: { lte: new Date() },
          endDate: { gte: new Date() }
        } 
      })
    ]);

    // Get expense statistics
    const [totalExpenses, thisMonthExpenses] = await Promise.all([
      prisma.expense.aggregate({
        where: { userId },
        _sum: { amount: true },
        _count: { id: true }
      }),
      prisma.expense.aggregate({
        where: {
          userId,
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { amount: true },
        _count: { id: true }
      })
    ]);

    // Get recent activities
    const recentActivities = await prisma.$queryRaw`
      SELECT 
        'trip' as type,
        title as content,
        created_at as timestamp,
        destination as metadata
      FROM trips 
      WHERE user_id = ${userId}
      UNION ALL
      SELECT 
        'expense' as type,
        description as content,
        date as timestamp,
        category as metadata
      FROM expenses 
      WHERE user_id = ${userId}
      UNION ALL
      SELECT 
        'journal' as type,
        title as content,
        date as timestamp,
        destination as metadata
      FROM journal_entries 
      WHERE user_id = ${userId}
      ORDER BY timestamp DESC
      LIMIT 5
    `;

    // Get budget insights
    const budgetInsights = await prisma.expense.groupBy({
      by: ['category'],
      where: { userId },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: 'desc' } }
    });

    res.json({
      success: true,
      data: {
        trips: {
          total: totalTrips,
          upcoming: upcomingTrips,
          completed: completedTrips,
          current: currentTrips
        },
        expenses: {
          total: totalExpenses._sum.amount || 0,
          count: totalExpenses._count.id,
          thisMonth: thisMonthExpenses._sum.amount || 0,
          thisMonthCount: thisMonthExpenses._count.id
        },
        recentActivities: recentActivities.map(activity => ({
          type: activity.type,
          content: activity.content,
          timestamp: activity.timestamp,
          metadata: activity.metadata
        })),
        budgetInsights: budgetInsights.map(insight => ({
          category: insight.category,
          total: insight._sum.amount || 0,
          count: insight._count.id
        }))
      }
    });
  } catch (error) {
    console.error('Get dashboard summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard summary',
      error: 'DASHBOARD_SUMMARY_ERROR'
    });
  }
};

/**
 * Get travel statistics
 * GET /api/dashboard/travel-stats
 */
const getTravelStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = 'year' } = req.query;

    let startDate;
    if (period === 'month') {
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    } else if (period === 'quarter') {
      const quarter = Math.floor(new Date().getMonth() / 3);
      startDate = new Date(new Date().getFullYear(), quarter * 3, 1);
    } else {
      startDate = new Date(new Date().getFullYear(), 0, 1);
    }

    // Trip statistics by period
    const tripsByPeriod = await prisma.trip.groupBy({
      by: ['status'],
      where: {
        userId,
        createdAt: { gte: startDate }
      },
      _count: { id: true }
    });

    // Destinations visited
    const destinations = await prisma.trip.findMany({
      where: { userId, status: 'COMPLETED' },
      select: { destination: true, country: true },
      distinct: ['destination']
    });

    // Trip types distribution
    const tripTypes = await prisma.trip.groupBy({
      by: ['tripType'],
      where: { userId },
      _count: { id: true }
    });

    // Monthly trip trends
    const monthlyTrends = await prisma.$queryRaw`
      SELECT 
        EXTRACT(MONTH FROM start_date) as month,
        EXTRACT(YEAR FROM start_date) as year,
        COUNT(*) as count
      FROM trips 
      WHERE user_id = ${userId}
        AND created_at >= ${startDate}
      GROUP BY EXTRACT(MONTH FROM start_date), EXTRACT(YEAR FROM start_date)
      ORDER BY year, month
    `;

    res.json({
      success: true,
      data: {
        tripsByPeriod: tripsByPeriod.map(stat => ({
          status: stat.status,
          count: stat._count.id
        })),
        destinations: destinations.map(trip => ({
          destination: trip.destination,
          country: trip.country
        })),
        tripTypes: tripTypes.map(type => ({
          type: type.tripType,
          count: type._count.id
        })),
        monthlyTrends: monthlyTrends.map(trend => ({
          month: parseInt(trend.month),
          year: parseInt(trend.year),
          count: parseInt(trend.count)
        }))
      }
    });
  } catch (error) {
    console.error('Get travel stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch travel statistics',
      error: 'TRAVEL_STATS_ERROR'
    });
  }
};

/**
 * Get budget overview
 * GET /api/dashboard/budget-overview
 */
const getBudgetOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = 'month' } = req.query;

    let startDate;
    if (period === 'week') {
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'month') {
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    } else {
      startDate = new Date(new Date().getFullYear(), 0, 1);
    }

    // Expense breakdown by category
    const expenseBreakdown = await prisma.expense.groupBy({
      by: ['category'],
      where: {
        userId,
        date: { gte: startDate }
      },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: 'desc' } }
    });

    // Budget vs actual for trips
    const tripBudgets = await prisma.trip.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        budget: true,
        currency: true,
        expenses: {
          select: { amount: true }
        }
      }
    });

    const budgetComparison = tripBudgets.map(trip => {
      const actualSpent = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
      return {
        tripId: trip.id,
        title: trip.title,
        budget: trip.budget,
        actual: actualSpent,
        currency: trip.currency,
        variance: trip.budget - actualSpent,
        variancePercentage: trip.budget > 0 ? ((actualSpent - trip.budget) / trip.budget) * 100 : 0
      };
    });

    // Spending trends
    const spendingTrends = await prisma.$queryRaw`
      SELECT 
        EXTRACT(MONTH FROM date) as month,
        EXTRACT(YEAR FROM date) as year,
        SUM(amount) as total,
        COUNT(*) as count
      FROM expenses 
      WHERE user_id = ${userId}
        AND date >= ${startDate}
      GROUP BY EXTRACT(MONTH FROM date), EXTRACT(YEAR FROM date)
      ORDER BY year, month
    `;

    res.json({
      success: true,
      data: {
        expenseBreakdown: expenseBreakdown.map(breakdown => ({
          category: breakdown.category,
          total: breakdown._sum.amount || 0,
          count: breakdown._count.id
        })),
        budgetComparison,
        spendingTrends: spendingTrends.map(trend => ({
          month: parseInt(trend.month),
          year: parseInt(trend.year),
          total: parseFloat(trend.total),
          count: parseInt(trend.count)
        }))
      }
    });
  } catch (error) {
    console.error('Get budget overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch budget overview',
      error: 'BUDGET_OVERVIEW_ERROR'
    });
  }
};

/**
 * Get community engagement stats
 * GET /api/dashboard/community-stats
 */
const getCommunityStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // User's community posts
    const [userPosts, userLikes, userComments] = await Promise.all([
      prisma.communityPost.count({ where: { userId } }),
      prisma.like.count({ where: { userId } }),
      prisma.comment.count({ where: { userId } })
    ]);

    // Recent community activity
    const recentPosts = await prisma.communityPost.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        _count: {
          select: { likes: true, comments: true }
        }
      }
    });

    // Popular destinations from community
    const popularDestinations = await prisma.communityPost.groupBy({
      by: ['destination'],
      where: {
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    });

    res.json({
      success: true,
      data: {
        userActivity: {
          posts: userPosts,
          likes: userLikes,
          comments: userComments
        },
        recentPosts: recentPosts.map(post => ({
          id: post.id,
          title: post.title,
          destination: post.destination,
          likes: post._count.likes,
          comments: post._count.comments,
          createdAt: post.createdAt
        })),
        popularDestinations: popularDestinations.map(dest => ({
          destination: dest.destination,
          posts: dest._count.id
        }))
      }
    });
  } catch (error) {
    console.error('Get community stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch community statistics',
      error: 'COMMUNITY_STATS_ERROR'
    });
  }
};

module.exports = {
  getDashboardSummary,
  getTravelStats,
  getBudgetOverview,
  getCommunityStats
};
