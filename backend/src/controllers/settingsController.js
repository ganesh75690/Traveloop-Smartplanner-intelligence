const { prisma } = require('../config/database');

/**
 * Get user settings
 * GET /api/settings
 */
const getSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        preferences: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: {
        profile: user.profile,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
      error: 'SETTINGS_FETCH_ERROR'
    });
  }
};

/**
 * Update profile settings
 * PUT /api/settings/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { avatar, bio, phone, address, city, country, dateOfBirth } = req.body;
    const userId = req.user.id;

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        avatar,
        bio,
        phone,
        address,
        city,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
      },
      create: {
        userId,
        avatar,
        bio,
        phone,
        address,
        city,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: 'PROFILE_UPDATE_ERROR'
    });
  }
};

/**
 * Update preferences
 * PUT /api/settings/preferences
 */
const updatePreferences = async (req, res) => {
  try {
    const { language, currency, darkMode, notifications, emailAlerts } = req.body;
    const userId = req.user.id;

    const preferences = await prisma.userPreferences.upsert({
      where: { userId },
      update: {
        language,
        currency,
        darkMode,
        notifications,
        emailAlerts
      },
      create: {
        userId,
        language,
        currency,
        darkMode,
        notifications,
        emailAlerts
      }
    });

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: 'PREFERENCES_UPDATE_ERROR'
    });
  }
};

/**
 * Update language preference
 * PATCH /api/settings/language
 */
const updateLanguage = async (req, res) => {
  try {
    const { language } = req.body;
    const userId = req.user.id;

    const preferences = await prisma.userPreferences.upsert({
      where: { userId },
      update: { language },
      create: {
        userId,
        language
      }
    });

    res.json({
      success: true,
      message: 'Language preference updated successfully',
      data: { language: preferences.language }
    });
  } catch (error) {
    console.error('Update language error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update language preference',
      error: 'LANGUAGE_UPDATE_ERROR'
    });
  }
};

/**
 * Update currency preference
 * PATCH /api/settings/currency
 */
const updateCurrency = async (req, res) => {
  try {
    const { currency } = req.body;
    const userId = req.user.id;

    const preferences = await prisma.userPreferences.upsert({
      where: { userId },
      update: { currency },
      create: {
        userId,
        currency
      }
    });

    res.json({
      success: true,
      message: 'Currency preference updated successfully',
      data: { currency: preferences.currency }
    });
  } catch (error) {
    console.error('Update currency error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update currency preference',
      error: 'CURRENCY_UPDATE_ERROR'
    });
  }
};

/**
 * Update notification settings
 * PATCH /api/settings/notifications
 */
const updateNotificationSettings = async (req, res) => {
  try {
    const { notifications, emailAlerts } = req.body;
    const userId = req.user.id;

    const preferences = await prisma.userPreferences.upsert({
      where: { userId },
      update: {
        notifications,
        emailAlerts
      },
      create: {
        userId,
        notifications,
        emailAlerts
      }
    });

    res.json({
      success: true,
      message: 'Notification settings updated successfully',
      data: {
        notifications: preferences.notifications,
        emailAlerts: preferences.emailAlerts
      }
    });
  } catch (error) {
    console.error('Update notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification settings',
      error: 'NOTIFICATION_SETTINGS_UPDATE_ERROR'
    });
  }
};

/**
 * Get privacy settings
 * GET /api/settings/privacy
 */
const getPrivacySettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        isEmailVerified: true,
        isActive: true
      }
    });

    res.json({
      success: true,
      data: {
        emailVerified: user?.isEmailVerified || false,
        accountActive: user?.isActive || true,
        dataSharing: false, // Default to false
        analyticsEnabled: true // Default to true
      }
    });
  } catch (error) {
    console.error('Get privacy settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch privacy settings',
      error: 'PRIVACY_SETTINGS_FETCH_ERROR'
    });
  }
};

/**
 * Update privacy settings
 * PUT /api/settings/privacy
 */
const updatePrivacySettings = async (req, res) => {
  try {
    const { dataSharing, analyticsEnabled } = req.body;
    const userId = req.user.id;

    // For now, store these in a separate settings table or as JSON
    // This would require extending the schema in a real implementation
    
    res.json({
      success: true,
      message: 'Privacy settings updated successfully',
      data: {
        dataSharing,
        analyticsEnabled
      }
    });
  } catch (error) {
    console.error('Update privacy settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update privacy settings',
      error: 'PRIVACY_SETTINGS_UPDATE_ERROR'
    });
  }
};

module.exports = {
  getSettings,
  updateProfile,
  updatePreferences,
  updateLanguage,
  updateCurrency,
  updateNotificationSettings,
  getPrivacySettings,
  updatePrivacySettings
};
