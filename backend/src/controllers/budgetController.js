const { prisma } = require('../config/database');

/**
 * Create budget plan
 * POST /api/budget/plan
 */
const createBudgetPlan = async (req, res) => {
  try {
    const { tripId, totalBudget, categories, currency = 'INR' } = req.body;
    const userId = req.user.id;

    // Verify trip belongs to user
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
        error: 'TRIP_NOT_FOUND'
      });
    }

    // Create budget plan
    const budgetPlan = await prisma.budgetPlan.create({
      data: {
        userId,
        tripId,
        totalBudget,
        currency,
        categories: categories || {
          accommodation: 0.35,
          food: 0.25,
          transportation: 0.20,
          activities: 0.15,
          miscellaneous: 0.05
        }
      }
    });

    // Update trip budget
    await prisma.trip.update({
      where: { id: tripId },
      data: { budget: totalBudget, currency }
    });

    res.status(201).json({
      success: true,
      message: 'Budget plan created successfully',
      data: budgetPlan
    });
  } catch (error) {
    console.error('Create budget plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create budget plan',
      error: 'BUDGET_PLAN_CREATE_ERROR'
    });
  }
};

/**
 * Get budget analytics
 * GET /api/budget/analytics
 */
const getBudgetAnalytics = async (req, res) => {
  try {
    const { tripId, period = 'all' } = req.query;
    const userId = req.user.id;

    let whereClause = { userId };
    if (tripId) {
      whereClause.tripId = tripId;
    }

    // Get expense data
    const expenses = await prisma.expense.findMany({
      where: whereClause,
      include: {
        trip: {
          select: { id: true, title: true, budget: true, currency: true }
        }
      }
    });

    // Group expenses by category
    const expenseByCategory = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = { total: 0, count: 0, expenses: [] };
      }
      acc[category].total += expense.amount;
      acc[category].count += 1;
      acc[category].expenses.push(expense);
      return acc;
    }, {});

    // Calculate budget vs actual
    const budgetComparison = expenses.reduce((acc, expense) => {
      const tripId = expense.tripId;
      if (!acc[tripId]) {
        acc[tripId] = {
          tripId,
          title: expense.trip.title,
          budget: expense.trip.budget,
          actual: 0,
          currency: expense.trip.currency
        };
      }
      acc[tripId].actual += expense.amount;
      return acc;
    }, {});

    // Calculate spending trends
    const spendingTrends = expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).getMonth();
      const year = new Date(expense.date).getFullYear();
      const key = `${year}-${month}`;
      
      if (!acc[key]) {
        acc[key] = { month, year, total: 0, count: 0 };
      }
      acc[key].total += expense.amount;
      acc[key].count += 1;
      return acc;
    }, {});

    // Generate insights
    const insights = [];
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgExpense = expenses.length > 0 ? totalSpent / expenses.length : 0;

    if (totalSpent > 0) {
      const topCategory = Object.entries(expenseByCategory)
        .sort(([,a], [,b]) => b.total - a.total)[0];
      
      insights.push({
        type: 'top_category',
        message: `Your highest spending category is ${topCategory[0]} with ${topCategory[1].total}`,
        value: topCategory[1].total
      });

      insights.push({
        type: 'average_expense',
        message: `Your average expense per transaction is ${avgExpense.toFixed(2)}`,
        value: avgExpense
      });
    }

    res.json({
      success: true,
      data: {
        expenseByCategory: Object.entries(expenseByCategory).map(([category, data]) => ({
          category,
          total: data.total,
          count: data.count,
          average: data.total / data.count
        })),
        budgetComparison: Object.values(budgetComparison).map(comp => ({
          ...comp,
          variance: comp.budget - comp.actual,
          variancePercentage: comp.budget > 0 ? ((comp.actual - comp.budget) / comp.budget) * 100 : 0
        })),
        spendingTrends: Object.values(spendingTrends).sort((a, b) => b.year - a.year || b.month - a.month),
        insights,
        summary: {
          totalExpenses: totalSpent,
          totalTransactions: expenses.length,
          averageExpense: avgExpense,
          categoryCount: Object.keys(expenseByCategory).length
        }
      }
    });
  } catch (error) {
    console.error('Get budget analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get budget analytics',
      error: 'BUDGET_ANALYTICS_ERROR'
    });
  }
};

/**
 * Get savings recommendations
 * GET /api/budget/savings-recommendations
 */
const getSavingsRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's spending patterns
    const expenses = await prisma.expense.findMany({
      where: { userId },
      include: {
        trip: {
          select: { id: true, title: true, budget: true, currency: true }
        }
      }
    });

    // Analyze spending patterns
    const spendingPatterns = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = { total: 0, count: 0, trips: new Set() };
      }
      acc[category].total += expense.amount;
      acc[category].count += 1;
      acc[category].trips.add(expense.tripId);
      return acc;
    }, {});

    // Generate recommendations
    const recommendations = [];

    // Accommodation recommendations
    const accommodationSpending = spendingPatterns['HOTELS'] || spendingPatterns['ACCOMMODATION'];
    if (accommodationSpending && accommodationSpending.total > 10000) {
      recommendations.push({
        category: 'Accommodation',
        priority: 'high',
        potentialSavings: accommodationSpending.total * 0.2,
        tips: [
          'Consider booking in advance for better rates',
          'Look for alternative accommodations like guesthouses',
          'Travel during off-peak seasons for lower prices',
          'Use loyalty programs for discounts'
        ]
      });
    }

    // Food recommendations
    const foodSpending = spendingPatterns['FOOD'] || spendingPatterns['RESTAURANTS'];
    if (foodSpending && foodSpending.total > 5000) {
      recommendations.push({
        category: 'Food',
        priority: 'medium',
        potentialSavings: foodSpending.total * 0.15,
        tips: [
          'Try local street food for authentic and budget-friendly meals',
          'Pack snacks for day trips',
          'Look for lunch specials and happy hours',
          'Shop at local markets for fresh ingredients'
        ]
      });
    }

    // Transportation recommendations
    const transportSpending = spendingPatterns['TRANSPORTATION'] || spendingPatterns['FLIGHTS'];
    if (transportSpending && transportSpending.total > 8000) {
      recommendations.push({
        category: 'Transportation',
        priority: 'high',
        potentialSavings: transportSpending.total * 0.25,
        tips: [
          'Book flights on weekdays for better prices',
          'Use public transportation where available',
          'Consider train travel for scenic routes',
          'Walk or rent bikes for short distances'
        ]
      });
    }

    // Activities recommendations
    const activitiesSpending = spendingPatterns['ACTIVITIES'] || spendingPatterns['ENTERTAINMENT'];
    if (activitiesSpending && activitiesSpending.total > 3000) {
      recommendations.push({
        category: 'Activities',
        priority: 'medium',
        potentialSavings: activitiesSpending.total * 0.1,
        tips: [
          'Look for free walking tours and attractions',
          'Check for combo tickets and city passes',
          'Visit during free admission days',
          'Consider self-guided tours instead of guided ones'
        ]
      });
    }

    // General recommendations
    recommendations.push({
      category: 'General',
      priority: 'low',
      potentialSavings: 2000,
      tips: [
        'Set a daily budget and track expenses',
        'Use travel reward credit cards for points',
        'Pack light to avoid baggage fees',
        'Keep 10-15% buffer for unexpected expenses'
      ]
    });

    // Calculate total potential savings
    const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + rec.potentialSavings, 0);

    res.json({
      success: true,
      data: {
        recommendations,
        totalPotentialSavings,
        currentSpending: expenses.reduce((sum, expense) => sum + expense.amount, 0),
        savingsPercentage: totalPotentialSavings > 0 ? (totalPotentialSavings / expenses.reduce((sum, expense) => sum + expense.amount, 0)) * 100 : 0
      }
    });
  } catch (error) {
    console.error('Get savings recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get savings recommendations',
      error: 'SAVINGS_RECOMMENDATIONS_ERROR'
    });
  }
};

/**
 * Generate budget insights
 * POST /api/budget/insights
 */
const generateBudgetInsights = async (req, res) => {
  try {
    const { destination, duration, travelers, budget, tripType } = req.body;
    const userId = req.user.id;

    // Internal budget analysis engine
    const insights = {
      destination,
      duration,
      travelers,
      budget,
      tripType,
      breakdown: {
        accommodation: budget * 0.35,
        food: budget * 0.25,
        transportation: budget * 0.20,
        activities: budget * 0.15,
        miscellaneous: budget * 0.05
      },
      recommendations: [],
      alerts: [],
      optimizations: []
    };

    // Generate destination-specific insights
    const destinationInsights = {
      'Goa': {
        accommodation: 'Budget-friendly guesthouses available',
        food: 'Local seafood is affordable and delicious',
        transportation: 'Renting scooters is cost-effective',
        activities: 'Beaches are free, water sports cost extra'
      },
      'Kerala': {
        accommodation: 'Houseboats are premium but unique',
        food: 'Local cuisine is reasonably priced',
        transportation: 'Public transport is efficient',
        activities: 'Ayurveda treatments can be expensive'
      },
      'Rajasthan': {
        accommodation: 'Heritage hotels offer value',
        food: 'Street food is very affordable',
        transportation: 'Hiring drivers can be cost-effective for groups',
        activities: 'Many forts and palaces have entry fees'
      }
    };

    const destInsights = destinationInsights[destination];
    if (destInsights) {
      insights.recommendations.push({
        category: 'Destination-specific',
        tips: Object.entries(destInsights).map(([key, value]) => `${key}: ${value}`)
      });
    }

    // Generate alerts based on budget
    if (budget < 10000) {
      insights.alerts.push({
        type: 'budget_warning',
        message: 'Budget seems low for the destination and duration',
        severity: 'high'
      });
    } else if (budget < 20000) {
      insights.alerts.push({
        type: 'budget_caution',
        message: 'Budget is tight, consider cost-saving measures',
        severity: 'medium'
      });
    }

    // Generate optimizations
    insights.optimizations = [
      {
        category: 'Timing',
        savings: '15-20%',
        description: 'Travel during off-peak seasons for better rates'
      },
      {
        category: 'Accommodation',
        savings: '20-30%',
        description: 'Consider alternative accommodations like guesthouses or hostels'
      },
      {
        category: 'Food',
        savings: '25-35%',
        description: 'Mix of restaurants and local street food'
      },
      {
        category: 'Activities',
        savings: '10-15%',
        description: 'Look for free attractions and combo tickets'
      }
    ];

    // Calculate per-person, per-day breakdown
    const perPersonPerDay = budget / (travelers * duration);
    insights.perPersonPerDay = perPersonPerDay;

    res.json({
      success: true,
      data: {
        insights,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Generate budget insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate budget insights',
      error: 'BUDGET_INSIGHTS_ERROR'
    });
  }
};

module.exports = {
  createBudgetPlan,
  getBudgetAnalytics,
  getSavingsRecommendations,
  generateBudgetInsights
};
