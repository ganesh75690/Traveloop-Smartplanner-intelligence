const express = require('express');
const supportController = require('../controllers/supportController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/support/tickets
 * @desc    Create support ticket
 * @access  Private
 */
router.post('/tickets', authenticate, supportController.createTicket);

/**
 * @route   GET /api/support/tickets
 * @desc    Get user support tickets
 * @access  Private
 */
router.get('/tickets', authenticate, supportController.getTickets);

/**
 * @route   PATCH /api/support/tickets/:id/status
 * @desc    Update ticket status
 * @access  Private
 */
router.patch('/tickets/:id/status', authenticate, supportController.updateTicketStatus);

/**
 * @route   POST /api/support/feedback
 * @desc    Submit feedback
 * @access  Private
 */
router.post('/feedback', authenticate, supportController.submitFeedback);

/**
 * @route   GET /api/support/faq
 * @desc    Get FAQs
 * @access  Public
 */
router.get('/faq', supportController.getFAQs);

/**
 * @route   GET /api/support/emergency
 * @desc    Get emergency support contacts
 * @access  Public
 */
router.get('/emergency', supportController.getEmergencySupport);

module.exports = router;
