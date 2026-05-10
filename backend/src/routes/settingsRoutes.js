const express = require('express');
const settingsController = require('../controllers/settingsController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/settings
 * @desc    Get user settings (profile and preferences)
 * @access  Private
 */
router.get('/', authenticate, settingsController.getSettings);

/**
 * @route   PUT /api/settings/profile
 * @desc    Update profile settings
 * @access  Private
 */
router.put('/profile', authenticate, settingsController.updateProfile);

/**
 * @route   PUT /api/settings/preferences
 * @desc    Update user preferences
 * @access  Private
 */
router.put('/preferences', authenticate, settingsController.updatePreferences);

/**
 * @route   PATCH /api/settings/language
 * @desc    Update language preference
 * @access  Private
 */
router.patch('/language', authenticate, settingsController.updateLanguage);

/**
 * @route   PATCH /api/settings/currency
 * @desc    Update currency preference
 * @access  Private
 */
router.patch('/currency', authenticate, settingsController.updateCurrency);

/**
 * @route   PATCH /api/settings/notifications
 * @desc    Update notification settings
 * @access  Private
 */
router.patch('/notifications', authenticate, settingsController.updateNotificationSettings);

/**
 * @route   GET /api/settings/privacy
 * @desc    Get privacy settings
 * @access  Private
 */
router.get('/privacy', authenticate, settingsController.getPrivacySettings);

/**
 * @route   PUT /api/settings/privacy
 * @desc    Update privacy settings
 * @access  Private
 */
router.put('/privacy', authenticate, settingsController.updatePrivacySettings);

module.exports = router;
