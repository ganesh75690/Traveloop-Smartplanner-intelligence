const express = require('express');
const budgetController = require('../controllers/budgetController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/budget/plan
 * @desc    Create budget plan for trip
 * @access  Private
 */
router.post('/plan', authenticate, budgetController.createBudgetPlan);

/**
 * @route   GET /api/budget/analytics
 * @desc    Get budget analytics and spending analysis
 * @access  Private
 */
router.get('/analytics', authenticate, budgetController.getBudgetAnalytics);

/**
 * @route   GET /api/budget/savings-recommendations
 * @desc    Get savings recommendations based on spending patterns
 * @access  Private
 */
router.get('/savings-recommendations', authenticate, budgetController.getSavingsRecommendations);

/**
 * @route   POST /api/budget/insights
 * @desc    Generate AI-powered budget insights
 * @access  Private
 */
router.post('/insights', authenticate, budgetController.generateBudgetInsights);

module.exports = router;
