const express = require('express');
const packingController = require('../controllers/packingController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

/**
 * @route   GET /api/packing
 * @desc    Get packing items
 * @access  Private
 */
router.get('/', packingController.getPackingItems);

/**
 * @route   POST /api/packing
 * @desc    Create packing item
 * @access  Private
 */
router.post('/', packingController.createPackingItem);

/**
 * @route   PATCH /api/packing/:id/toggle
 * @desc    Toggle packed status
 * @access  Private
 */
router.patch('/:id/toggle', packingController.togglePacked);

/**
 * @route   GET /api/packing/suggestions
 * @desc    Get AI packing suggestions
 * @access  Private
 */
router.get('/suggestions', packingController.getAISuggestions);

module.exports = router;
