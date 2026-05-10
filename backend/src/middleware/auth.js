const { verifyAccessToken } = require('../utils/jwt');
const { prisma } = require('../config/database');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
        error: 'NO_TOKEN'
      });
    }

    const token = authHeader.substring(7);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
        error: 'NO_TOKEN'
      });
    }

    // Verify token
    const decoded = verifyAccessToken(token);
    
    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: true,
        preferences: true
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated',
        error: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Attach user to request
    req.user = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profile: user.profile,
      preferences: user.preferences
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
        error: 'TOKEN_EXPIRED'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        error: 'INVALID_TOKEN'
      });
    }

    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: 'AUTH_ERROR'
    });
  }
};

/**
 * Optional authentication middleware
 * Attaches user if token exists, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    
    if (!token) {
      return next();
    }

    const decoded = verifyAccessToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (user && user.isActive) {
      req.user = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };
    }

    next();
  } catch (error) {
    // Silent fail for optional auth
    next();
  }
};

/**
 * Admin role middleware
 * Requires user to have admin role
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
      error: 'FORBIDDEN'
    });
  }
  next();
};

/**
 * Premium role middleware
 * Requires user to have premium or admin role
 */
const requirePremium = (req, res, next) => {
  if (!req.user || (req.user.role !== 'PREMIUM' && req.user.role !== 'ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Premium access required',
      error: 'PREMIUM_REQUIRED'
    });
  }
  next();
};

module.exports = {
  authenticate,
  optionalAuth,
  requireAdmin,
  requirePremium
};
