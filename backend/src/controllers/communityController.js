const { prisma } = require('../config/database');

/**
 * Get community posts
 * GET /api/community
 */
const getPosts = async (req, res) => {
  try {
    const { type, destination, limit = 10, page = 1 } = req.query;

    const where = {
      isPublic: true
    };

    if (type) where.type = type;
    if (destination) where.destination = destination;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const posts = await prisma.communityPost.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            profile: {
              select: { avatar: true }
            }
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit)
    });

    const total = await prisma.communityPost.count({ where });

    res.json({
      success: true,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: posts
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get posts',
      error: 'GET_POSTS_ERROR'
    });
  }
};

/**
 * Create post
 * POST /api/community
 */
const createPost = async (req, res) => {
  try {
    const { type, title, content, destination, hashtags, images } = req.body;

    const post = await prisma.communityPost.create({
      data: {
        userId: req.user.userId,
        type: type || 'STORY',
        title,
        content,
        destination,
        hashtags: hashtags || [],
        images: images || [],
        isPublic: true
      },
      include: {
        user: {
          select: {
            name: true,
            profile: {
              select: { avatar: true }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create post',
      error: 'CREATE_POST_ERROR'
    });
  }
};

/**
 * Like/unlike post
 * POST /api/community/:id/like
 */
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: req.user.userId
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });

      await prisma.communityPost.update({
        where: { id },
        data: { likesCount: { decrement: 1 } }
      });

      return res.json({
        success: true,
        message: 'Post unliked',
        liked: false
      });
    }

    // Like
    await prisma.like.create({
      data: {
        postId: id,
        userId: req.user.userId
      }
    });

    await prisma.communityPost.update({
      where: { id },
      data: { likesCount: { increment: 1 } }
    });

    res.json({
      success: true,
      message: 'Post liked',
      liked: true
    });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle like',
      error: 'LIKE_ERROR'
    });
  }
};

/**
 * Add comment
 * POST /api/community/:id/comments
 */
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        postId: id,
        userId: req.user.userId,
        content
      },
      include: {
        user: {
          select: {
            name: true,
            profile: {
              select: { avatar: true }
            }
          }
        }
      }
    });

    // Update comment count
    await prisma.communityPost.update({
      where: { id },
      data: { commentsCount: { increment: 1 } }
    });

    res.status(201).json({
      success: true,
      message: 'Comment added',
      data: comment
    });
  } catch (error) {
    console.error('Comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add comment',
      error: 'COMMENT_ERROR'
    });
  }
};

module.exports = {
  getPosts,
  createPost,
  toggleLike,
  addComment
};
