const express = require('express');
const tripController = require('../controllers/tripController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(authenticate);

/**
 * @route   GET /api/trips
 * @desc    Get all trips for current user
 * @access  Private
 */
router.get('/', tripController.getAllTrips);

/**
 * @route   POST /api/trips
 * @desc    Create new trip
 * @access  Private
 */
router.post('/', tripController.createTrip);

/**
 * @route   GET /api/trips/:id
 * @desc    Get trip by ID
 * @access  Private
 */
router.get('/:id', tripController.getTripById);

/**
 * @route   PUT /api/trips/:id
 * @desc    Update trip
 * @access  Private
 */
router.put('/:id', tripController.updateTrip);

/**
 * @route   DELETE /api/trips/:id
 * @desc    Delete trip
 * @access  Private
 */
router.delete('/:id', tripController.deleteTrip);

/**
 * @route   POST /api/trips/:id/stops
 * @desc    Add stop to trip
 * @access  Private
 */
router.post('/:id/stops', tripController.addStop);

/**
 * @route   POST /api/trips/:id/activities
 * @desc    Add activity to trip
 * @access  Private
 */
router.post('/:id/activities', tripController.addActivity);

module.exports = router;
