const express = require('express');
const simulationController = require('../controllers/simulationController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/simulation/generate
 * @desc    Generate travel simulation
 * @access  Private
 */
router.post('/generate', authenticate, simulationController.generateSimulation);

/**
 * @route   GET /api/simulation/itinerary/:id
 * @desc    Get itinerary timeline
 * @access  Private
 */
router.get('/itinerary/:id', authenticate, simulationController.getItineraryTimeline);

/**
 * @route   GET /api/simulation/data/:id
 * @desc    Get simulation data
 * @access  Private
 */
router.get('/data/:id', authenticate, simulationController.getSimulationData);

/**
 * @route   PUT /api/simulation/preferences
 * @desc    Update simulation preferences
 * @access  Private
 */
router.put('/preferences', authenticate, simulationController.updateSimulationPreferences);

module.exports = router;
