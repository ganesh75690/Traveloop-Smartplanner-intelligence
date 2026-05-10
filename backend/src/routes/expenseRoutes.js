const express = require('express');
const expenseController = require('../controllers/expenseController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

/**
 * @route   GET /api/expenses
 * @desc    Get all expenses
 * @access  Private
 */
router.get('/', expenseController.getAllExpenses);

/**
 * @route   POST /api/expenses
 * @desc    Create new expense
 * @access  Private
 */
router.post('/', expenseController.createExpense);

/**
 * @route   GET /api/expenses/insights
 * @desc    Get AI budget insights
 * @access  Private
 */
router.get('/insights', expenseController.getBudgetInsights);

module.exports = router;
