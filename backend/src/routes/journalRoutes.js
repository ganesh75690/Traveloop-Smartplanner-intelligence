const express = require('express');
const journalController = require('../controllers/journalController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

/**
 * @route   GET /api/journal
 * @desc    Get all journal entries
 * @access  Private
 */
router.get('/', journalController.getEntries);

/**
 * @route   POST /api/journal
 * @desc    Create journal entry
 * @access  Private
 */
router.post('/', journalController.createEntry);

/**
 * @route   GET /api/journal/:id
 * @desc    Get journal entry by ID
 * @access  Private
 */
router.get('/:id', journalController.getEntryById);

/**
 * @route   PUT /api/journal/:id
 * @desc    Update journal entry
 * @access  Private
 */
router.put('/:id', journalController.updateEntry);

/**
 * @route   DELETE /api/journal/:id
 * @desc    Delete journal entry
 * @access  Private
 */
router.delete('/:id', journalController.deleteEntry);

module.exports = router;
