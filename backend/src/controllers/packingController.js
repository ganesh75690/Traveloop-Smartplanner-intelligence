const { prisma } = require('../config/database');

/**
 * Get packing items
 * GET /api/packing
 */
const getPackingItems = async (req, res) => {
  try {
    const { tripId } = req.query;

    const where = {
      userId: req.user.userId
    };

    if (tripId) where.tripId = tripId;

    const items = await prisma.packingItem.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    // Group by category
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    // Calculate progress
    const totalItems = items.length;
    const packedItems = items.filter(i => i.isPacked).length;
    const progress = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

    res.json({
      success: true,
      data: {
        items,
        grouped,
        progress: {
          total: totalItems,
          packed: packedItems,
          percentage: progress
        }
      }
    });
  } catch (error) {
    console.error('Get packing items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get packing items',
      error: 'GET_PACKING_ERROR'
    });
  }
};

/**
 * Create packing item
 * POST /api/packing
 */
const createPackingItem = async (req, res) => {
  try {
    const { tripId, name, category, quantity, notes } = req.body;

    const item = await prisma.packingItem.create({
      data: {
        userId: req.user.userId,
        tripId,
        name,
        category,
        quantity: quantity || 1,
        notes
      }
    });

    res.status(201).json({
      success: true,
      message: 'Item added successfully',
      data: item
    });
  } catch (error) {
    console.error('Create packing item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item',
      error: 'CREATE_PACKING_ERROR'
    });
  }
};

/**
 * Toggle packed status
 * PATCH /api/packing/:id/toggle
 */
const togglePacked = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.packingItem.findFirst({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
        error: 'ITEM_NOT_FOUND'
      });
    }

    const updated = await prisma.packingItem.update({
      where: { id },
      data: { isPacked: !item.isPacked }
    });

    res.json({
      success: true,
      message: 'Item updated',
      data: updated
    });
  } catch (error) {
    console.error('Toggle packed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update item',
      error: 'TOGGLE_ERROR'
    });
  }
};

/**
 * Get AI packing suggestions
 * GET /api/packing/suggestions
 */
const getAISuggestions = async (req, res) => {
  try {
    const { destination, tripType, duration } = req.query;

    // Destination-based suggestions
    const destinationSuggestions = {
      'goa': ['Sunscreen', 'Beachwear', 'Flip-flops', 'Sunglasses', 'Swimwear'],
      'manali': ['Winter jacket', 'Gloves', 'Wool socks', 'Thermal wear', 'Boots'],
      'ladakh': ['Oxygen canister', 'High SPF sunscreen', 'Warm clothes', 'Power bank', 'Medicines'],
      'kerala': ['Mosquito repellent', 'Light cotton clothes', 'Umbrella', 'Sun hat'],
      'dubai': ['Light clothing', 'Sunscreen', 'Modest wear', 'Sunglasses']
    };

    // Trip type suggestions
    const typeSuggestions = {
      'adventure': ['Hiking shoes', 'First-aid kit', 'Water bottle', 'Backpack', 'Power bank'],
      'beach': ['Swimwear', 'Beach towel', 'Sunscreen', 'Hat', 'Flip-flops'],
      'luxury': ['Formal wear', 'Accessories', 'Camera', 'Cosmetics'],
      'family': ['Baby supplies', 'Snacks', 'Games', 'Medicines'],
      'solo': ['Journal', 'Books', 'Portable charger', 'Safety whistle']
    };

    const suggestions = [
      ...(destinationSuggestions[destination?.toLowerCase()] || []),
      ...(typeSuggestions[tripType?.toLowerCase()] || []),
      'Travel documents',
      'Wallet & cards',
      'Phone charger',
      'Toiletries',
      'Medicines'
    ];

    // Remove duplicates
    const unique = [...new Set(suggestions)];

    res.json({
      success: true,
      data: {
        suggestions: unique.map(name => ({
          name,
          category: 'suggested',
          isAISuggested: true
        }))
      }
    });
  } catch (error) {
    console.error('AI suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get suggestions',
      error: 'SUGGESTIONS_ERROR'
    });
  }
};

module.exports = {
  getPackingItems,
  createPackingItem,
  togglePacked,
  getAISuggestions
};
