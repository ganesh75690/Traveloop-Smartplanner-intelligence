const { prisma } = require('../config/database');

/**
 * Get all expenses
 * GET /api/expenses
 */
const getAllExpenses = async (req, res) => {
  try {
    const { tripId, category, startDate, endDate } = req.query;

    const where = {
      userId: req.user.userId
    };

    if (tripId) where.tripId = tripId;
    if (category) where.category = category;
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const expenses = await prisma.expense.findMany({
      where,
      include: {
        splits: true,
        trip: {
          select: {
            title: true,
            destination: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    // Calculate totals
    const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
    const categoryTotals = {};
    
    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    res.json({
      success: true,
      count: expenses.length,
      data: {
        expenses,
        summary: {
          totalSpent,
          categoryTotals,
          currency: req.user.preferences?.currency || 'INR'
        }
      }
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get expenses',
      error: 'GET_EXPENSES_ERROR'
    });
  }
};

/**
 * Create expense
 * POST /api/expenses
 */
const createExpense = async (req, res) => {
  try {
    const {
      tripId,
      category,
      description,
      amount,
      currency,
      date,
      paidBy,
      isSplit,
      splits,
      notes
    } = req.body;

    const expense = await prisma.expense.create({
      data: {
        userId: req.user.userId,
        tripId,
        category,
        description,
        amount: parseFloat(amount),
        currency: currency || 'INR',
        date: new Date(date),
        paidBy,
        isSplit: isSplit || false,
        notes,
        splits: isSplit && splits ? {
          create: splits.map(split => ({
            userName: split.userName,
            amount: split.amount,
            share: split.share,
            isPaid: split.isPaid || false
          }))
        } : undefined
      },
      include: {
        splits: true,
        trip: {
          select: {
            title: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create expense',
      error: 'CREATE_EXPENSE_ERROR'
    });
  }
};

/**
 * Get AI budget insights
 * GET /api/expenses/insights
 */
const getBudgetInsights = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user.userId }
    });

    const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
    
    // Calculate category breakdown
    const categoryBreakdown = {};
    expenses.forEach(e => {
      if (!categoryBreakdown[e.category]) {
        categoryBreakdown[e.category] = { total: 0, count: 0 };
      }
      categoryBreakdown[e.category].total += e.amount;
      categoryBreakdown[e.category].count += 1;
    });

    // Generate AI insights
    const insights = [];
    
    // Check for high spending categories
    Object.entries(categoryBreakdown).forEach(([category, data]) => {
      const avgSpend = data.total / data.count;
      if (data.total > 10000) {
        insights.push({
          type: 'warning',
          category,
          message: `You've spent ${data.total.toLocaleString()} on ${category}. Consider setting a budget limit.`
        });
      }
    });

    // Spending trend analysis
    insights.push({
      type: 'info',
      message: 'Your average daily spending is ' + Math.round(totalSpent / 30).toLocaleString()
    });

    res.json({
      success: true,
      data: {
        totalSpent,
        categoryBreakdown,
        insights,
        currency: req.user.preferences?.currency || 'INR'
      }
    });
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get insights',
      error: 'GET_INSIGHTS_ERROR'
    });
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  getBudgetInsights
};
