const express = require('express');
const uploadController = require('../controllers/uploadController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/upload/profile
 * @desc    Upload profile image
 * @access  Private
 */
router.post('/profile', authenticate, uploadController.uploadProfileImage);

/**
 * @route   POST /api/upload/trip
 * @desc    Upload trip images (multiple)
 * @access  Private
 */
router.post('/trip', authenticate, uploadController.uploadTripImages);

/**
 * @route   POST /api/upload/community
 * @desc    Upload community post image
 * @access  Private
 */
router.post('/community', authenticate, uploadController.uploadCommunityImage);

/**
 * @route   POST /api/upload/journal
 * @desc    Upload journal images (multiple)
 * @access  Private
 */
router.post('/journal', authenticate, uploadController.uploadJournalImages);

/**
 * @route   DELETE /api/upload/:filename
 * @desc    Delete uploaded file
 * @access  Private
 */
router.delete('/:filename', authenticate, uploadController.deleteUploadedFile);

/**
 * @route   GET /api/upload/:filename/info
 * @desc    Get uploaded file info
 * @access  Private
 */
router.get('/:filename/info', authenticate, uploadController.getFileInfo);

module.exports = router;
