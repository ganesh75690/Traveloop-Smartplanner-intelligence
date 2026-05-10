const { prisma } = require('../config/database');

/**
 * Create support ticket
 * POST /api/support/tickets
 */
const createTicket = async (req, res) => {
  try {
    const { subject, description, category, priority = 'MEDIUM' } = req.body;
    const userId = req.user.id;

    const ticket = await prisma.supportTicket.create({
      data: {
        userId,
        subject,
        description,
        category,
        priority,
        status: 'OPEN'
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Create support ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create support ticket',
      error: 'TICKET_CREATE_ERROR'
    });
  }
};

/**
 * Get user support tickets
 * GET /api/support/tickets
 */
const getTickets = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category } = req.query;
    const userId = req.user.id;

    const where = {
      userId,
      ...(status && { status }),
      ...(category && { category })
    };

    const [tickets, total] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: parseInt(limit),
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.supportTicket.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        tickets,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get support tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch support tickets',
      error: 'TICKETS_FETCH_ERROR'
    });
  }
};

/**
 * Update ticket status
 * PATCH /api/support/tickets/:id/status
 */
const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;
    const userId = req.user.id;

    const ticket = await prisma.supportTicket.findFirst({
      where: { id, userId }
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found',
        error: 'TICKET_NOT_FOUND'
      });
    }

    const updatedTicket = await prisma.supportTicket.update({
      where: { id },
      data: {
        status,
        ...(adminResponse && { adminResponse }),
        ...(status === 'RESOLVED' && { resolvedAt: new Date() })
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Ticket status updated successfully',
      data: updatedTicket
    });
  } catch (error) {
    console.error('Update ticket status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update ticket status',
      error: 'TICKET_UPDATE_ERROR'
    });
  }
};

/**
 * Submit feedback
 * POST /api/support/feedback
 */
const submitFeedback = async (req, res) => {
  try {
    const { type, rating, message, feature } = req.body;
    const userId = req.user.id;

    const feedback = await prisma.feedback.create({
      data: {
        userId,
        type,
        rating,
        message,
        feature
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: 'FEEDBACK_SUBMIT_ERROR'
    });
  }
};

/**
 * Get FAQs
 * GET /api/support/faq
 */
const getFAQs = async (req, res) => {
  try {
    const { category, search } = req.query;

    const where = {
      ...(category && { category }),
      ...(search && {
        OR: [
          { question: { contains: search, mode: 'insensitive' } },
          { answer: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: { faqs }
    });
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQs',
      error: 'FAQ_FETCH_ERROR'
    });
  }
};

/**
 * Get emergency support
 * GET /api/support/emergency
 */
const getEmergencySupport = async (req, res) => {
  try {
    const emergencyContacts = [
      {
        type: 'Medical Emergency',
        number: '108',
        description: 'For immediate medical assistance'
      },
      {
        type: 'Police',
        number: '100',
        description: 'For police assistance'
      },
      {
        type: 'Travel Insurance',
        number: '+91-1800-123-4567',
        description: '24/7 travel insurance support'
      },
      {
        type: 'Traveloop Support',
        number: '+91-1800-TRAVEL',
        description: '24/7 customer support'
      }
    ];

    res.json({
      success: true,
      data: { emergencyContacts }
    });
  } catch (error) {
    console.error('Get emergency support error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emergency support',
      error: 'EMERGENCY_SUPPORT_ERROR'
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
  updateTicketStatus,
  submitFeedback,
  getFAQs,
  getEmergencySupport
};
