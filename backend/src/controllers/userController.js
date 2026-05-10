const bcrypt = require('bcryptjs');
const { prisma } = require('../config/database');

/**
 * Get user profile
 * GET /api/users/profile
 */
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        profile: true,
        preferences: true
      }
    });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profile: user.profile,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: 'GET_PROFILE_ERROR'
    });
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { name, avatar, bio, phone, address, city, country, dateOfBirth } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        name: name || undefined,
        profile: {
          upsert: {
            create: {
              avatar,
              bio,
              phone,
              address,
              city,
              country,
              dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
            },
            update: {
              avatar: avatar || undefined,
              bio: bio || undefined,
              phone: phone || undefined,
              address: address || undefined,
              city: city || undefined,
              country: country || undefined,
              dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined
            }
          }
        }
      },
      include: {
        profile: true,
        preferences: true
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile: user.profile,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: 'UPDATE_PROFILE_ERROR'
    });
  }
};

/**
 * Update user preferences
 * PUT /api/users/preferences
 */
const updatePreferences = async (req, res) => {
  try {
    const { language, currency, darkMode, notifications, emailAlerts } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        preferences: {
          upsert: {
            create: {
              language,
              currency,
              darkMode,
              notifications,
              emailAlerts
            },
            update: {
              language: language || undefined,
              currency: currency || undefined,
              darkMode: darkMode !== undefined ? darkMode : undefined,
              notifications: notifications !== undefined ? notifications : undefined,
              emailAlerts: emailAlerts !== undefined ? emailAlerts : undefined
            }
          }
        }
      },
      include: {
        preferences: true
      }
    });

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: {
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: 'UPDATE_PREFERENCES_ERROR'
    });
  }
};

/**
 * Change password
 * PUT /api/users/change-password
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    // Verify current password
    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
        error: 'INVALID_CURRENT_PASSWORD'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedPassword }
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: 'CHANGE_PASSWORD_ERROR'
    });
  }
};

/**
 * Delete account
 * DELETE /api/users/account
 */
const deleteAccount = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.userId }
    });

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account',
      error: 'DELETE_ACCOUNT_ERROR'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePreferences,
  changePassword,
  deleteAccount
};
