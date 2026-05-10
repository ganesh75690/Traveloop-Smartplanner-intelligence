const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const {
  updateProfileValidation,
  changePasswordValidation
} = require('../validators/authValidator');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', userController.getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', updateProfileValidation, userController.updateProfile);

/**
 * @route   PUT /api/users/preferences
 * @desc    Update user preferences
 * @access  Private
 */
router.put('/preferences', userController.updatePreferences);

/**
 * @route   PUT /api/users/change-password
 * @desc    Change password
 * @access  Private
 */
router.put('/change-password', changePasswordValidation, userController.changePassword);

/**
 * @route   DELETE /api/users/account
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/account', userController.deleteAccount);

module.exports = router;
