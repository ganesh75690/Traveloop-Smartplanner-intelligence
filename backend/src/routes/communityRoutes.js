const express = require('express');
const communityController = require('../controllers/communityController');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, communityController.getPosts);

// Protected routes
router.use(authenticate);

/**
 * @route   POST /api/community
 * @desc    Create new post
 * @access  Private
 */
router.post('/', communityController.createPost);

/**
 * @route   POST /api/community/:id/like
 * @desc    Like/unlike post
 * @access  Private
 */
router.post('/:id/like', communityController.toggleLike);

/**
 * @route   POST /api/community/:id/comments
 * @desc    Add comment
 * @access  Private
 */
router.post('/:id/comments', communityController.addComment);

module.exports = router;
