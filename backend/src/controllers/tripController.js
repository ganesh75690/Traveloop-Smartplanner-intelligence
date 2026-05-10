const { prisma } = require('../config/database');

/**
 * Get all trips for current user
 * GET /api/trips
 */
const getAllTrips = async (req, res) => {
  try {
    const { status, type, sortBy = 'createdAt', order = 'desc' } = req.query;

    const where = {
      userId: req.user.userId
    };

    if (status) {
      where.status = status;
    }

    if (type) {
      where.tripType = type;
    }

    const trips = await prisma.trip.findMany({
      where,
      include: {
        stops: {
          orderBy: { order: 'asc' }
        },
        activities: true,
        _count: {
          select: {
            expenses: true,
            packingItems: true,
            journalEntries: true
          }
        }
      },
      orderBy: {
        [sortBy]: order
      }
    });

    res.json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trips',
      error: 'GET_TRIPS_ERROR'
    });
  }
};

/**
 * Get single trip by ID
 * GET /api/trips/:id
 */
const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await prisma.trip.findFirst({
      where: {
        id,
        userId: req.user.userId
      },
      include: {
        stops: {
          orderBy: { order: 'asc' }
        },
        activities: {
          orderBy: { startTime: 'asc' }
        },
        expenses: true,
        packingItems: true,
        journalEntries: true
      }
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
        error: 'TRIP_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trip',
      error: 'GET_TRIP_ERROR'
    });
  }
};

/**
 * Create new trip
 * POST /api/trips
 */
const createTrip = async (req, res) => {
  try {
    const {
      title,
      description,
      destination,
      country,
      tripType,
      category,
      startDate,
      endDate,
      duration,
      budget,
      currency,
      travelers,
      coverImage,
      images,
      isPublic
    } = req.body;

    const trip = await prisma.trip.create({
      data: {
        userId: req.user.userId,
        title,
        description,
        destination,
        country,
        tripType: tripType || 'DOMESTIC',
        category: category || 'LEISURE',
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        duration: duration || 0,
        budget: budget || 0,
        currency: currency || 'INR',
        travelers: travelers || 1,
        coverImage,
        images: images || [],
        isPublic: isPublic || false,
        status: 'PLANNING'
      },
      include: {
        stops: true,
        activities: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create trip',
      error: 'CREATE_TRIP_ERROR'
    });
  }
};

/**
 * Update trip
 * PUT /api/trips/:id
 */
const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if trip exists and belongs to user
    const existingTrip = await prisma.trip.findFirst({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!existingTrip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
        error: 'TRIP_NOT_FOUND'
      });
    }

    // Format date fields
    const formattedData = {};
    
    if (updateData.startDate) {
      formattedData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      formattedData.endDate = new Date(updateData.endDate);
    }

    const trip = await prisma.trip.update({
      where: { id },
      data: {
        ...updateData,
        ...formattedData
      },
      include: {
        stops: true,
        activities: true
      }
    });

    res.json({
      success: true,
      message: 'Trip updated successfully',
      data: trip
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: 'UPDATE_TRIP_ERROR'
    });
  }
};

/**
 * Delete trip
 * DELETE /api/trips/:id
 */
const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if trip exists and belongs to user
    const existingTrip = await prisma.trip.findFirst({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!existingTrip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
        error: 'TRIP_NOT_FOUND'
      });
    }

    await prisma.trip.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip',
      error: 'DELETE_TRIP_ERROR'
    });
  }
};

/**
 * Add stop to trip
 * POST /api/trips/:id/stops
 */
const addStop = async (req, res) => {
  try {
    const { id } = req.params;
    const { city, country, arrivalDate } = req.body;

    // Get current max order
    const maxOrder = await prisma.tripStop.findFirst({
      where: { tripId: id },
      orderBy: { order: 'desc' }
    });

    const stop = await prisma.tripStop.create({
      data: {
        tripId: id,
        city,
        country,
        order: maxOrder ? maxOrder.order + 1 : 0,
        arrivalDate: new Date(arrivalDate)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Stop added successfully',
      data: stop
    });
  } catch (error) {
    console.error('Add stop error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add stop',
      error: 'ADD_STOP_ERROR'
    });
  }
};

/**
 * Add activity to trip
 * POST /api/trips/:id/activities
 */
const addActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activityData = req.body;

    const activity = await prisma.activity.create({
      data: {
        tripId: id,
        title: activityData.title,
        description: activityData.description,
        category: activityData.category,
        startTime: new Date(activityData.startTime),
        endTime: activityData.endTime ? new Date(activityData.endTime) : null,
        cost: activityData.cost || 0,
        currency: activityData.currency || 'INR',
        location: activityData.location,
        bookingRef: activityData.bookingRef
      }
    });

    res.status(201).json({
      success: true,
      message: 'Activity added successfully',
      data: activity
    });
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add activity',
      error: 'ADD_ACTIVITY_ERROR'
    });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  addStop,
  addActivity
};
