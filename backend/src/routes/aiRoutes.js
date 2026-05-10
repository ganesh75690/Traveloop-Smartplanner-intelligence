const express = require('express');
const aiController = require('../controllers/aiController');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/ai/chatbot
 * @desc    Get chatbot response
 * @access  Private
 */
router.post('/chatbot', authenticate, aiController.chatbotResponse);

/**
 * @route   GET /api/ai/recommendations
 * @desc    Get travel recommendations
 * @access  Private
 */
router.get('/recommendations', authenticate, aiController.getRecommendations);

/**
 * @route   POST /api/ai/itinerary
 * @desc    Generate travel itinerary
 * @access  Private
 */
router.post('/itinerary', authenticate, aiController.generateItinerary);

/**
 * @route   POST /api/ai/packing-list
 * @desc    Generate AI-powered packing list
 * @access  Private
 */
router.post('/packing-list', authenticate, aiController.generatePackingList);

/**
 * @route   POST /api/ai/budget-insights
 * @desc    Generate budget insights and recommendations
 * @access  Private
 */
router.post('/budget-insights', authenticate, aiController.generateBudgetInsights);

module.exports = router;
