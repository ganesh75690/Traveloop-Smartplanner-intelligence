const { prisma } = require('../config/database');

/**
 * Get journal entries
 * GET /api/journal
 */
const getEntries = async (req, res) => {
  try {
    const { tripId, limit = 10, page = 1 } = req.query;

    const where = {
      userId: req.user.userId
    };

    if (tripId) where.tripId = tripId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const entries = await prisma.journalEntry.findMany({
      where,
      include: {
        trip: {
          select: {
            title: true,
            destination: true,
            coverImage: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit)
    });

    const total = await prisma.journalEntry.count({ where });

    res.json({
      success: true,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: entries
    });
  } catch (error) {
    console.error('Get journal entries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get journal entries',
      error: 'GET_JOURNAL_ERROR'
    });
  }
};

/**
 * Create journal entry
 * POST /api/journal
 */
const createEntry = async (req, res) => {
  try {
    const {
      tripId,
      title,
      content,
      destination,
      date,
      mood,
      tripType,
      images,
      rating,
      location,
      activity,
      isPublic
    } = req.body;

    const entry = await prisma.journalEntry.create({
      data: {
        userId: req.user.userId,
        tripId,
        title,
        content,
        destination,
        date: date ? new Date(date) : null,
        mood,
        tripType,
        images: images || [],
        rating: rating || 5,
        location,
        activity,
        isPublic: isPublic || false
      },
      include: {
        trip: {
          select: {
            title: true,
            destination: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Journal entry created',
      data: entry
    });
  } catch (error) {
    console.error('Create journal entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create entry',
      error: 'CREATE_JOURNAL_ERROR'
    });
  }
};

/**
 * Get journal entry by ID
 * GET /api/journal/:id
 */
const getEntryById = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId: req.user.userId
      },
      include: {
        trip: true
      }
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found',
        error: 'ENTRY_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: entry
    });
  } catch (error) {
    console.error('Get entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get entry',
      error: 'GET_ENTRY_ERROR'
    });
  }
};

/**
 * Update journal entry
 * PUT /api/journal/:id
 */
const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const entry = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found',
        error: 'ENTRY_NOT_FOUND'
      });
    }

    // Format date
    const formattedData = { ...updateData };
    if (updateData.date) {
      formattedData.date = new Date(updateData.date);
    }

    const updated = await prisma.journalEntry.update({
      where: { id },
      data: formattedData,
      include: {
        trip: {
          select: {
            title: true,
            destination: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Journal entry updated',
      data: updated
    });
  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update entry',
      error: 'UPDATE_JOURNAL_ERROR'
    });
  }
};

/**
 * Delete journal entry
 * DELETE /api/journal/:id
 */
const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found',
        error: 'ENTRY_NOT_FOUND'
      });
    }

    await prisma.journalEntry.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Journal entry deleted'
    });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete entry',
      error: 'DELETE_JOURNAL_ERROR'
    });
  }
};

module.exports = {
  getEntries,
  createEntry,
  getEntryById,
  updateEntry,
  deleteEntry
};
