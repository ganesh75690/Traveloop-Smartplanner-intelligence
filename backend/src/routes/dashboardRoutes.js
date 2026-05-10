const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/dashboard/summary
 * @desc    Get dashboard summary with trip, expense, and activity stats
 * @access  Private
 */
router.get('/summary', authenticate, dashboardController.getDashboardSummary);

/**
 * @route   GET /api/dashboard/travel-stats
 * @desc    Get detailed travel statistics and trends
 * @access  Private
 */
router.get('/travel-stats', authenticate, dashboardController.getTravelStats);

/**
 * @route   GET /api/dashboard/budget-overview
 * @desc    Get budget overview and spending analysis
 * @access  Private
 */
router.get('/budget-overview', authenticate, dashboardController.getBudgetOverview);

/**
 * @route   GET /api/dashboard/community-stats
 * @desc    Get community engagement statistics
 * @access  Private
 */
router.get('/community-stats', authenticate, dashboardController.getCommunityStats);

module.exports = router;
