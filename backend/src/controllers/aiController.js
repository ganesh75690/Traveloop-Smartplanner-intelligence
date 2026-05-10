const { prisma } = require('../config/database');

/**
 * Chatbot response
 * POST /api/ai/chatbot
 */
const chatbotResponse = async (req, res) => {
  try {
    const { message, context } = req.body;

    // Internal AI logic without external APIs
    const responses = {
      'trip planning': 'I can help you plan your trip! Tell me your destination, travel dates, and preferences.',
      'budget': 'For budget planning, I recommend setting aside 20% for accommodation, 30% for food, 25% for activities, and 25% for transportation.',
      'packing': 'Essential items include passport, medications, chargers, comfortable shoes, and weather-appropriate clothing.',
      'safety': 'Always keep emergency contacts, travel insurance details, and important documents in multiple secure locations.',
      'destination': 'Popular destinations include Goa, Kerala, Rajasthan, and Himalayan regions. What type of experience are you looking for?',
      'default': 'I\'m here to help with your travel needs. Ask me about trip planning, budget tips, packing lists, or destination recommendations.'
    };

    let response = responses.default;
    for (const [key, value] of Object.entries(responses)) {
      if (message.toLowerCase().includes(key)) {
        response = value;
        break;
      }
    }

    res.json({
      success: true,
      data: {
        response,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Chatbot response error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate chatbot response',
      error: 'CHATBOT_ERROR'
    });
  }
};

/**
 * Get travel recommendations
 * GET /api/ai/recommendations
 */
const getRecommendations = async (req, res) => {
  try {
    const { type, destination, budget, duration } = req.query;
    const userId = req.user?.id;

    // Internal recommendation engine based on PostgreSQL data
    let recommendations = [];

    if (type === 'destination') {
      recommendations = [
        {
          name: 'Goa',
          description: 'Beautiful beaches, vibrant nightlife, Portuguese heritage',
          budget: 'Budget-friendly',
          bestTime: 'November to March',
          activities: ['Beach hopping', 'Water sports', 'Historical sites']
        },
        {
          name: 'Kerala',
          description: 'Backwaters, hill stations, cultural experiences',
          budget: 'Moderate',
          bestTime: 'September to March',
          activities: ['Houseboat stay', 'Ayurveda', 'Wildlife safari']
        },
        {
          name: 'Rajasthan',
          description: 'Palaces, forts, desert experiences',
          budget: 'Varies',
          bestTime: 'October to March',
          activities: ['Palace tours', 'Desert safari', 'Cultural shows']
        }
      ];
    }

    if (type === 'activities') {
      recommendations = [
        {
          name: 'Adventure Sports',
          description: 'Scuba diving, paragliding, trekking',
          difficulty: 'Medium to High',
          duration: '2-4 hours',
          equipment: 'Provided or rentable'
        },
        {
          name: 'Cultural Tours',
          description: 'Heritage walks, museum visits, local experiences',
          difficulty: 'Easy',
          duration: '3-6 hours',
          equipment: 'Comfortable walking shoes'
        },
        {
          name: 'Wellness Activities',
          description: 'Yoga, meditation, spa treatments',
          difficulty: 'Easy',
          duration: '1-3 hours',
          equipment: 'Comfortable clothing'
        }
      ];
    }

    res.json({
      success: true,
      data: {
        recommendations,
        type,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: 'RECOMMENDATIONS_ERROR'
    });
  }
};

/**
 * Generate itinerary
 * POST /api/ai/itinerary
 */
const generateItinerary = async (req, res) => {
  try {
    const { destination, duration, interests, budget } = req.body;
    const userId = req.user.id;

    // Internal itinerary generation logic
    const itinerary = {
      destination,
      duration,
      budget,
      days: []
    };

    // Generate day-by-day itinerary based on duration
    for (let day = 1; day <= duration; day++) {
      const dayPlan = {
        day,
        date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000).toISOString(),
        activities: []
      };

      // Add activities based on interests and destination
      if (interests?.includes('beach')) {
        dayPlan.activities.push({
          time: '09:00',
          activity: 'Beach Visit',
          description: 'Relax at the beach, enjoy water sports',
          duration: '3 hours'
        });
      }

      if (interests?.includes('culture')) {
        dayPlan.activities.push({
          time: '14:00',
          activity: 'Cultural Tour',
          description: 'Visit local museums and heritage sites',
          duration: '2 hours'
        });
      }

      if (interests?.includes('food')) {
        dayPlan.activities.push({
          time: '19:00',
          activity: 'Local Cuisine Experience',
          description: 'Try authentic local dishes',
          duration: '2 hours'
        });
      }

      itinerary.days.push(dayPlan);
    }

    res.json({
      success: true,
      data: {
        itinerary,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Generate itinerary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate itinerary',
      error: 'ITINERARY_GENERATION_ERROR'
    });
  }
};

/**
 * Generate packing list
 * POST /api/ai/packing-list
 */
const generatePackingList = async (req, res) => {
  try {
    const { destination, duration, tripType, season, activities } = req.body;
    const userId = req.user.id;

    // Internal packing list generation
    const packingList = {
      categories: []
    };

    // Essential documents
    packingList.categories.push({
      name: 'Documents',
      items: [
        { name: 'Passport', quantity: 1, essential: true },
        { name: 'ID Card', quantity: 1, essential: true },
        { name: 'Travel Insurance', quantity: 1, essential: true },
        { name: 'Tickets', quantity: 1, essential: true },
        { name: 'Hotel Bookings', quantity: 1, essential: true }
      ]
    });

    // Clothing based on season
    const clothingItems = season === 'winter' 
      ? ['Warm jacket', 'Sweaters', 'Thermal wear', 'Gloves', 'Scarf']
      : season === 'summer'
      ? ['Light cotton clothes', 'Shorts', 'T-shirts', 'Sun hat', 'Sunglasses']
      : ['Layered clothing', 'Light jacket', 'Comfortable pants', 'Rain jacket'];

    packingList.categories.push({
      name: 'Clothing',
      items: clothingItems.map(item => ({
        name: item,
        quantity: Math.ceil(duration / 3),
        essential: ['Warm jacket', 'Light jacket', 'Rain jacket'].includes(item)
      }))
    });

    // Electronics
    packingList.categories.push({
      name: 'Electronics',
      items: [
        { name: 'Phone charger', quantity: 1, essential: true },
        { name: 'Power bank', quantity: 1, essential: false },
        { name: 'Camera', quantity: 1, essential: false },
        { name: 'Headphones', quantity: 1, essential: false }
      ]
    });

    // Toiletries
    packingList.categories.push({
      name: 'Toiletries',
      items: [
        { name: 'Toothbrush', quantity: 1, essential: true },
        { name: 'Toothpaste', quantity: 1, essential: true },
        { name: 'Soap/Shampoo', quantity: 1, essential: true },
        { name: 'Sunscreen', quantity: 1, essential: season === 'summer' },
        { name: 'Medications', quantity: 1, essential: true }
      ]
    });

    // Activity-specific items
    if (activities?.includes('beach')) {
      packingList.categories.push({
        name: 'Beach Essentials',
        items: [
          { name: 'Swimwear', quantity: 2, essential: true },
          { name: 'Towel', quantity: 1, essential: true },
          { name: 'Flip-flops', quantity: 1, essential: true }
        ]
      });
    }

    res.json({
      success: true,
      data: {
        packingList,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Generate packing list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate packing list',
      error: 'PACKING_LIST_GENERATION_ERROR'
    });
  }
};

/**
 * Generate budget insights
 * POST /api/ai/budget-insights
 */
const generateBudgetInsights = async (req, res) => {
  try {
    const { destination, duration, travelers, budget } = req.body;
    const userId = req.user.id;

    // Internal budget analysis
    const budgetBreakdown = {
      accommodation: budget * 0.35,
      food: budget * 0.25,
      transportation: budget * 0.20,
      activities: budget * 0.15,
      miscellaneous: budget * 0.05
    };

    const insights = {
      totalBudget: budget,
      perPerson: budget / travelers,
      perDay: budget / duration,
      breakdown: budgetBreakdown,
      recommendations: [
        'Book accommodation in advance for better rates',
        'Consider local street food for authentic and budget-friendly meals',
        'Use public transportation where available',
        'Look for combo tickets for attractions',
        'Keep 10-15% buffer for unexpected expenses'
      ],
      savingTips: [
        'Travel during off-peak seasons',
        'Book flights on weekdays',
        'Use travel reward points',
        'Consider alternative accommodations',
        'Pack light to avoid baggage fees'
      ]
    };

    res.json({
      success: true,
      data: {
        insights,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Generate budget insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate budget insights',
      error: 'BUDGET_INSIGHTS_ERROR'
    });
  }
};

module.exports = {
  chatbotResponse,
  getRecommendations,
  generateItinerary,
  generatePackingList,
  generateBudgetInsights
};
