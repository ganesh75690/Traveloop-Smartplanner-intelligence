import React, { useState, useRef, useEffect } from "react";
import { X, MapPin, Calendar, Users, DollarSign, Plane, Sparkles, Clock, Utensils, Hotel, Car, Shield, Sun, Cloud, Wind, ChevronRight, Star, Heart, Camera, Mountain, Waves, Building, Globe, Wifi, CreditCard, Battery, ShoppingBag, Music, Coffee, Thermometer, Navigation, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// Travel destinations data
const destinations = {
  domestic: [
    { 
      id: "goa", 
      name: "Goa", 
      type: "beach", 
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80", 
      bestSeason: "Nov - Mar", 
      avgCost: 25000,
      weather: { temp: "28-32°C", humidity: "70%", conditions: "Tropical, sunny" },
      packing: ["Beachwear", "Sunscreen", "Sunglasses", "Flip flops", "Light cotton clothes", "Hat"],
      cuisine: ["Goan fish curry", "Pork vindaloo", "Bebinca", "Feni", "Seafood platters"],
      emergency: { police: "100", ambulance: "108", tourist: "+91-832-2422122" },
      attractions: ["Baga Beach", "Anjuna Beach", "Dudhsagar Falls", "Basilica of Bom Jesus", "Fort Aguada"],
      activities: ["Water sports", "Beach parties", "Casino gaming", "Spice plantation tours", "Dolphin watching"],
      transport: ["Motorbike rental", "Taxi services", "Local buses", "Auto-rickshaws"],
      accommodation: ["Beach resorts", "Budget guesthouses", "Luxury hotels", "Backpacker hostels"],
      shopping: ["Anjuna flea market", "Saturday night market", "Local handicrafts", "Spices"],
      nightlife: ["Beach shacks", "Clubs in Candolim", "Casinos", "Live music venues"],
      connectivity: { wifi: "Good", mobile: "4G/5G", international: "Available" },
      currency: { code: "INR", symbol: "₹", exchange: "1 USD = 83 INR" },
      visas: { required: false, type: "Not required for Indians", processing: "N/A" },
      timezone: "IST (UTC+5:30)",
      language: ["Konkani", "English", "Hindi", "Marathi"],
      religion: ["Hinduism", "Christianity", "Islam"],
      safety: { rating: 4.2, tips: "Safe for tourists, avoid isolated areas at night" }
    },
    { 
      id: "kerala", 
      name: "Kerala", 
      type: "nature", 
      image: "https://images.unsplash.com/photo-1602216056056-7084e525845c?w=600&q=80", 
      bestSeason: "Sep - Mar", 
      avgCost: 30000,
      weather: { temp: "24-30°C", humidity: "80%", conditions: "Humid, monsoon climate" },
      packing: ["Rain jacket", "Comfortable walking shoes", "Light clothes", "Mosquito repellent", "Umbrella"],
      cuisine: ["Appam with stew", "Malabar biryani", "Karimeen fry", "Payasam", "Coconut dishes"],
      emergency: { police: "100", ambulance: "108", tourist: "+91-471-2321138" }
    },
    { 
      id: "rajasthan", 
      name: "Rajasthan", 
      type: "heritage", 
      image: "https://images.unsplash.com/photo-1524492412937-b784a5ba9a2c?w=600&q=80", 
      bestSeason: "Oct - Mar", 
      avgCost: 35000,
      weather: { temp: "15-30°C", humidity: "30%", conditions: "Dry, desert climate" },
      packing: ["Comfortable shoes", "Light scarves", "Sun hat", "Cotton clothes", "Sunglasses"],
      cuisine: ["Dal baati churma", "Laal maas", "Gatte ki sabzi", "Mohan maas", "Kachoris"],
      emergency: { police: "100", ambulance: "108", tourist: "+91-141-2225678" }
    },
    { 
      id: "himachal", 
      name: "Himachal Pradesh", 
      type: "mountain", 
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80", 
      bestSeason: "Apr - Jun, Sep - Nov", 
      avgCost: 40000,
      weather: { temp: "10-25°C", humidity: "60%", conditions: "Mountain climate, cool" },
      packing: ["Warm layers", "Jacket", "Trekking shoes", "Woolen clothes", "Backpack"],
      cuisine: ["Dham", "Madra", "Chha gosht", "Siddu", "Tibetan momos"],
      emergency: { police: "100", ambulance: "108", tourist: "+91-177-2813125" }
    },
    { 
      id: "andaman", 
      name: "Andaman Islands", 
      type: "beach", 
      image: "https://images.unsplash.com/photo-1540202404-1b927e27f4de?w=600&q=80", 
      bestSeason: "Oct - May", 
      avgCost: 45000,
      weather: { temp: "25-30°C", humidity: "75%", conditions: "Tropical, maritime" },
      packing: ["Swimwear", "Snorkeling gear", "Light clothes", "Waterproof bag", "Sun protection"],
      cuisine: ["Seafood curry", "Coconut prawn", "Fish fry", "Tropical fruits", "Rice dishes"],
      emergency: { police: "100", ambulance: "102", tourist: "+91-3192-232111" }
    },
    { 
      id: "kashmir", 
      name: "Kashmir", 
      type: "mountain", 
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&q=80", 
      bestSeason: "Apr - Oct", 
      avgCost: 50000,
      weather: { temp: "15-25°C", humidity: "50%", conditions: "Temperate, pleasant" },
      packing: ["Warm clothes", "Jacket", "Comfortable shoes", "Scarf", "Sunglasses"],
      cuisine: ["Wazwan", "Rogan josh", "Gushtaba", "Kahwa", "Bakarkhani"],
      emergency: { police: "100", ambulance: "108", tourist: "+91-194-2452297" }
    },
    { 
      id: "varanasi", 
      name: "Varanasi", 
      type: "spiritual", 
      image: "https://images.unsplash.com/photo-1524492412937-b784a5ba9a2c?w=600&q=80", 
      bestSeason: "Oct - Mar", 
      avgCost: 20000,
      weather: { temp: "15-30°C", humidity: "65%", conditions: "Continental, variable" },
      packing: ["Modest clothes", "Comfortable shoes", "Scarf", "Light jacket", "Hand sanitizer"],
      cuisine: ["Kachori sabzi", "Banarasi paan", "Thandai", "Malaiyo", "Chaats"],
      emergency: { police: "100", ambulance: "108", tourist: "+91-542-2506256" }
    },
    { 
      id: "coorg", 
      name: "Coorg", 
      type: "nature", 
      image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=600&q=80", 
      bestSeason: "Sep - May", 
      avgCost: 28000,
      weather: { temp: "18-28°C", humidity: "70%", conditions: "Hill station, pleasant" },
      packing: ["Light jacket", "Walking shoes", "Cotton clothes", "Camera", "Insect repellent"],
      cuisine: ["Coorgi pandi curry", "Bamboo shoot curry", "Akki roti", "Coffee", "Honey"],
      emergency: { police: "100", ambulance: "108", tourist: "+91-8272-228565" }
    }
  ],
  international: [
    { 
      id: "dubai", 
      name: "Dubai", 
      type: "luxury", 
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80", 
      bestSeason: "Nov - Mar", 
      avgCost: 120000,
      weather: { temp: "20-35°C", humidity: "60%", conditions: "Desert, hot summers" },
      packing: ["Light clothes", "Sunscreen", "Sunglasses", "Formal wear", "Scarf"],
      cuisine: ["Shawarma", "Al machboos", "Luqaimat", "Camel meat", "Arabic coffee"],
      emergency: { police: "999", ambulance: "998", tourist: "+971-4-2232222" }
    },
    { 
      id: "bali", 
      name: "Bali", 
      type: "beach", 
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&q=80", 
      bestSeason: "Apr - Oct", 
      avgCost: 80000,
      weather: { temp: "26-30°C", humidity: "80%", conditions: "Tropical, humid" },
      packing: ["Beachwear", "Light clothes", "Mosquito repellent", "Sunscreen", "Flip flops"],
      cuisine: ["Nasi goreng", "Satay", "Babi guling", "Gado gado", "Bintang beer"],
      emergency: { police: "110", ambulance: "118", tourist: "+62-361-224763" }
    },
    { 
      id: "singapore", 
      name: "Singapore", 
      type: "city", 
      image: "https://images.unsplash.com/photo-1514242406983-b16bfcda9c83?w=600&q=80", 
      bestSeason: "Feb - Apr", 
      avgCost: 100000,
      weather: { temp: "25-32°C", humidity: "85%", conditions: "Tropical, year-round rain" },
      packing: ["Light clothes", "Umbrella", "Comfortable shoes", "Formal wear", "Rain jacket"],
      cuisine: ["Hainanese chicken rice", "Chilli crab", "Laksa", "Satay", "Kaya toast"],
      emergency: { police: "999", ambulance: "995", tourist: "+65-67362000" }
    },
    { 
      id: "thailand", 
      name: "Thailand", 
      type: "beach", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", 
      bestSeason: "Nov - Feb", 
      avgCost: 70000,
      weather: { temp: "25-35°C", humidity: "75%", conditions: "Tropical, monsoon" },
      packing: ["Light clothes", "Swimwear", "Sunscreen", "Comfortable shoes", "Hat"],
      cuisine: ["Pad thai", "Tom yum", "Green curry", "Mango sticky rice", "Som tam"],
      emergency: { police: "191", ambulance: "1669", tourist: "+66-2-2341381" }
    },
    { 
      id: "malaysia", 
      name: "Malaysia", 
      type: "mixed", 
      image: "https://images.unsplash.com/photo-1555400030-607b5cda2dac?w=600&q=80", 
      bestSeason: "Dec - Feb", 
      avgCost: 90000,
      weather: { temp: "22-32°C", humidity: "80%", conditions: "Tropical, equatorial" },
      packing: ["Light clothes", "Umbrella", "Comfortable shoes", "Sunscreen", "Modest wear"],
      cuisine: ["Nasi lemak", "Char kway teow", "Satay", "Roti canai", "Teh tarik"],
      emergency: { police: "999", ambulance: "999", tourist: "+60-3-88915000" }
    },
    { 
      id: "europe", 
      name: "Europe", 
      type: "heritage", 
      image: "https://images.unsplash.com/photo-1552832230-c019a0424358?w=600&q=80", 
      bestSeason: "May - Sep", 
      avgCost: 200000,
      weather: { temp: "15-25°C", humidity: "60%", conditions: "Temperate, seasonal" },
      packing: ["Layers", "Comfortable shoes", "Light jacket", "Umbrella", "Formal wear"],
      cuisine: ["Pizza", "Croissant", "Schnitzel", "Paella", "Fish and chips"],
      emergency: { police: "112", ambulance: "112", tourist: "+33-1-42961500" }
    },
    { 
      id: "japan", 
      name: "Japan", 
      type: "culture", 
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", 
      bestSeason: "Mar - May, Sep - Nov", 
      avgCost: 180000,
      weather: { temp: "10-25°C", humidity: "65%", conditions: "Temperate, four seasons" },
      packing: ["Layers", "Comfortable walking shoes", "Rain gear", "Formal wear", "Power adapter"],
      cuisine: ["Sushi", "Ramen", "Tempura", "Yakitori", "Matcha desserts"],
      emergency: { police: "110", ambulance: "119", tourist: "+81-3-3201-3331" }
    },
    { 
      id: "usa", 
      name: "USA", 
      type: "adventure", 
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80", 
      bestSeason: "May - Sep", 
      avgCost: 250000,
      weather: { temp: "15-30°C", humidity: "50%", conditions: "Varied by region" },
      packing: ["Layers", "Comfortable shoes", "Sunscreen", "Jacket", "Casual wear"],
      cuisine: ["Burger", "BBQ", "Pizza", "Tacos", "Apple pie"],
      emergency: { police: "911", ambulance: "911", tourist: "+1-202-289-6500" }
    }
  ]
};

// Travel styles
const travelStyles = [
  { id: "adventure", name: "Adventure", icon: Mountain, color: "from-green-500 to-emerald-600" },
  { id: "luxury", name: "Luxury", icon: Star, color: "from-yellow-500 to-amber-600" },
  { id: "family", name: "Family", icon: Users, color: "from-blue-500 to-indigo-600" },
  { id: "budget", name: "Budget", icon: DollarSign, color: "from-purple-500 to-pink-600" },
  { id: "romantic", name: "Romantic", icon: Heart, color: "from-pink-500 to-rose-600" },
  { id: "solo", name: "Solo", icon: Plane, color: "from-gray-500 to-slate-600" },
  { id: "beach", name: "Beach", icon: Waves, color: "from-cyan-500 to-blue-600" },
  { id: "nature", name: "Nature", icon: Building, color: "from-emerald-500 to-green-600" },
  { id: "wellness", name: "Wellness", icon: Sparkles, color: "from-teal-500 to-cyan-600" },
  { id: "cultural", name: "Cultural", icon: Camera, color: "from-orange-500 to-red-600" },
  { id: "business", name: "Business", icon: Building, color: "from-slate-500 to-gray-600" },
  { id: "backpacking", name: "Backpacking", icon: Mountain, color: "from-lime-500 to-green-600" },
  { id: "foodie", name: "Foodie", icon: Utensils, color: "from-red-500 to-orange-600" },
  { id: "photography", name: "Photography", icon: Camera, color: "from-indigo-500 to-purple-600" },
  { id: "spiritual", name: "Spiritual", icon: Sparkles, color: "from-violet-500 to-purple-600" },
  { id: "eco", name: "Eco-Tourism", icon: Mountain, color: "from-green-600 to-emerald-700" },
  { id: "party", name: "Party", icon: Music, color: "from-pink-600 to-purple-600" },
  { id: "educational", name: "Educational", icon: Building, color: "from-blue-600 to-indigo-700" },
  { id: "sports", name: "Sports", icon: Mountain, color: "from-orange-600 to-red-700" },
  { id: "wildlife", name: "Wildlife", icon: Mountain, color: "from-green-700 to-emerald-800" },
  { id: "historical", name: "Historical", icon: Building, color: "from-amber-600 to-yellow-700" }
];

// Activities database
const activities = {
  beach: ["Beach volleyball", "Sunset cruise", "Water sports", "Scuba diving", "Beach yoga", "Fishing"],
  mountain: ["Trekking", "Mountain biking", "Camping", "Rock climbing", "Photography", "Wildlife safari"],
  heritage: ["Palace tours", "Museum visits", "Cultural shows", "Heritage walks", "Art galleries", "Local markets"],
  luxury: ["Spa treatments", "Fine dining", "Yacht tours", "Shopping", "Golf", "Wine tasting"],
  adventure: ["Paragliding", "Rafting", "Bungee jumping", "Zip lining", "Hot air balloon", "Scuba diving"],
  nature: ["Wildlife safari", "Bird watching", "Nature walks", "Photography", "Camping", "Boating"],
  city: ["City tours", "Shopping", "Nightlife", "Museums", "Restaurants", "Shows"],
  spiritual: ["Temple visits", "Meditation", "Yoga", "Spiritual ceremonies", "Ashram visits", "Ganga Aarti"],
  wellness: ["Spa treatments", "Yoga retreats", "Meditation", "Ayurveda", "Hot springs", "Detox programs"],
  cultural: ["Local festivals", "Traditional dance shows", "Cooking classes", "Art workshops", "Language lessons", "Homestays"],
  business: ["Conference attendance", "Networking events", "Business meetings", "Trade shows", "Corporate dinners", "Golf meetings"],
  backpacking: ["Hostel hopping", "Street food tours", "Budget activities", "Local transport", "Meeting other travelers", "Free walking tours"],
  foodie: ["Food tours", "Cooking classes", "Wine tasting", "Local markets", "Street food exploration", "Michelin restaurants"],
  photography: ["Sunset shoots", "Architecture photography", "Wildlife photography", "Street photography", "Portrait sessions", "Drone photography"],
  eco: ["Wildlife conservation", "Sustainable tours", "Organic farm visits", "Reef diving", "Forest conservation", "Eco-lodges"],
  party: ["Nightclubs", "Beach parties", "Music festivals", "Pool parties", "Bar hopping", "Live concerts"],
  educational: ["Museum tours", "Historical sites", "University visits", "Workshops", "Library tours", "Academic exchanges"],
  sports: ["Surfing", "Skiing", "Hiking", "Cycling", "Rock climbing", "Water sports"],
  wildlife: ["Safari tours", "Bird watching", "Marine life encounters", "National parks", "Wildlife photography", "Conservation centers"],
  historical: ["Ancient ruins", "Historical museums", "Heritage sites", "Monument tours", "Archaeological sites", "Historical reenactments"]
};

export default function TravelSimulationModal({ isOpen, onClose }) {
  const { darkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState('input');
  const [simulationData, setSimulationData] = useState({
    destination: '',
    tripType: 'domestic',
    budget: 50000,
    days: 4,
    travelers: 2,
    travelStyle: 'adventure'
  });
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const bgClass = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const cardBg = darkMode ? "bg-[#0F172A]" : "bg-gray-50";
  const inputBg = darkMode ? "bg-[#0F172A] border-[#334155]" : "bg-white border-gray-200";

  // Format currency to INR
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Generate AI simulation
  const generateSimulation = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedDestination = destinations[simulationData.tripType].find(d => d.id === simulationData.destination);
    const selectedStyle = travelStyles.find(s => s.id === simulationData.travelStyle);
    
    if (!selectedDestination) {
      setIsGenerating(false);
      return;
    }

    // Generate enhanced day-by-day itinerary
    const days = [];
    const destinationActivities = activities[selectedDestination.type] || activities.adventure;
    const allActivities = selectedDestination.activities || destinationActivities;
    
    for (let i = 1; i <= simulationData.days; i++) {
      const dayActivities = [];
      const numActivities = Math.floor(Math.random() * 3) + 2;
      
      // Mix destination-specific activities with general activities
      const availableActivities = [...allActivities, ...destinationActivities];
      for (let j = 0; j < numActivities; j++) {
        const activity = availableActivities[Math.floor(Math.random() * availableActivities.length)];
        if (!dayActivities.includes(activity)) {
          dayActivities.push(activity);
        }
      }
      
      // Generate day-specific titles based on destination and day number
      let dayTitle;
      if (i === 1) {
        dayTitle = `Day ${i}: Arrival & ${selectedDestination.name} Welcome`;
      } else if (i === simulationData.days) {
        dayTitle = `Day ${i}: Farewell & Departure`;
      } else if (i === Math.floor(simulationData.days / 2)) {
        dayTitle = `Day ${i}: Peak Adventure Day`;
      } else {
        dayTitle = `Day ${i}: Exploration & Discovery`;
      }
      
      days.push({
        day: i,
        title: dayTitle,
        activities: dayActivities,
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: selectedDestination.name,
        highlights: selectedDestination.attractions ? 
          selectedDestination.attractions.slice(0, 2) : 
          ['Local sightseeing', 'Cultural experiences']
      });
    }

    // Calculate budget breakdown
    const baseCost = simulationData.budget;
    const budgetBreakdown = {
      accommodation: Math.round(baseCost * 0.35),
      food: Math.round(baseCost * 0.25),
      transportation: Math.round(baseCost * 0.20),
      activities: Math.round(baseCost * 0.15),
      miscellaneous: Math.round(baseCost * 0.05)
    };

    // Generate recommendations
    const recommendations = [
      `Best time to visit: ${selectedDestination.bestSeason}`,
      `Average daily budget: ${formatINR(Math.round(baseCost / simulationData.days))}`,
      `Must-try local dishes: ${selectedDestination.cuisine?.slice(0, 3).join(', ') || 'Local cuisine'}`,
      `Transportation: ${simulationData.tripType === 'domestic' ? 'Train/Flight' : 'International flights + local transport'}`,
      `Weather conditions: ${selectedDestination.weather?.conditions || 'Pleasant weather expected'}`
    ];

    setGeneratedItinerary({
      destination: selectedDestination,
      travelStyle: selectedStyle,
      days,
      budgetBreakdown,
      recommendations,
      totalCost: baseCost,
      costPerPerson: Math.round(baseCost / simulationData.travelers)
    });
    
    setCurrentStep('results');
    setIsGenerating(false);
  };

  // Reset simulation
  const resetSimulation = () => {
    setCurrentStep('input');
    setGeneratedItinerary(null);
    setSimulationData({
      destination: '',
      tripType: 'domestic',
      budget: 50000,
      days: 4,
      travelers: 2,
      travelStyle: 'adventure'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`${bgClass} rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-[#334155]' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-(--text-primary)">Travel Simulation</h2>
              <p className="text-sm text-(--text-muted)">Plan your perfect trip with AI assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-(--text-muted) hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {currentStep === 'input' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Inputs */}
                <div className="space-y-6">
                  {/* Trip Type */}
                  <div>
                    <label className="block text-sm font-medium text-(--text-primary) mb-3">Trip Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['domestic', 'international'].map(type => (
                        <button
                          key={type}
                          onClick={() => setSimulationData(prev => ({ ...prev, tripType: type, destination: '' }))}
                          className={`p-4 rounded-xl border-2 transition-all capitalize ${
                            simulationData.tripType === type
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : darkMode 
                                ? 'border-[#334155] text-[#CBD5E1] hover:border-[#475569]'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <Plane size={20} className="mx-auto mb-2" />
                          <div className="font-medium">{type}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination Selection */}
                  <div>
                    <label className="block text-sm font-medium text-(--text-primary) mb-3">Destination</label>
                    <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                      {destinations[simulationData.tripType].map(dest => (
                        <button
                          key={dest.id}
                          onClick={() => setSimulationData(prev => ({ ...prev, destination: dest.id }))}
                          className={`p-3 rounded-lg border transition-all ${
                            simulationData.destination === dest.id
                              ? 'border-blue-500 bg-blue-50'
                              : darkMode
                                ? 'border-[#334155] hover:border-[#475569]'
                                : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-sm font-medium text-left">{dest.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget and Days */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-(--text-primary) mb-2">Budget (INR)</label>
                      <div className="relative">
                        <DollarSign size={16} className="absolute left-3 top-3 text-(--text-muted)" />
                        <input
                          type="number"
                          value={simulationData.budget}
                          onChange={(e) => setSimulationData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${inputBg} text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          min="10000"
                          max="500000"
                          step="5000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--text-primary) mb-2">Number of Days</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-3 text-(--text-muted)" />
                        <input
                          type="number"
                          value={simulationData.days}
                          onChange={(e) => setSimulationData(prev => ({ ...prev, days: parseInt(e.target.value) || 1 }))}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${inputBg} text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          min="1"
                          max="15"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travelers and Style */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-(--text-primary) mb-2">Travelers</label>
                      <div className="relative">
                        <Users size={16} className="absolute left-3 top-3 text-(--text-muted)" />
                        <input
                          type="number"
                          value={simulationData.travelers}
                          onChange={(e) => setSimulationData(prev => ({ ...prev, travelers: parseInt(e.target.value) || 1 }))}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${inputBg} text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          min="1"
                          max="10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--text-primary) mb-3">Travel Style</label>
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {travelStyles.map(style => (
                          <button
                            key={style.id}
                            onClick={() => setSimulationData(prev => ({ ...prev, travelStyle: style.id }))}
                            className={`p-2 rounded-lg border transition-all text-xs ${
                              simulationData.travelStyle === style.id
                                ? 'border-blue-500 bg-blue-50'
                                : darkMode
                                  ? 'border-[#334155] hover:border-[#475569]'
                                  : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-6 h-6 bg-linear-to-r ${style.color} rounded-md flex items-center justify-center mx-auto mb-1`}>
                              {React.createElement(style.icon, { size: 12, className: "text-white" })}
                            </div>
                            <div className="text-xs font-medium text-center">{style.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-6">
                  {simulationData.destination && (
                    <div className={`${cardBg} rounded-xl p-6`}>
                      <h3 className="text-lg font-bold text-(--text-primary) mb-4">Destination Preview</h3>
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={destinations[simulationData.tripType].find(d => d.id === simulationData.destination)?.image} 
                          alt="Destination"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <div className="text-xl font-bold">
                            {destinations[simulationData.tripType].find(d => d.id === simulationData.destination)?.name}
                          </div>
                          <div className="text-sm opacity-90">
                            Best season: {destinations[simulationData.tripType].find(d => d.id === simulationData.destination)?.bestSeason}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Average Cost</span>
                          <span className="text-sm font-bold text-(--text-primary)">
                            {formatINR(destinations[simulationData.tripType].find(d => d.id === simulationData.destination)?.avgCost || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Your Budget</span>
                          <span className="text-sm font-bold text-green-600">
                            {formatINR(simulationData.budget)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Per Person</span>
                          <span className="text-sm font-bold text-(--text-primary)">
                            {formatINR(Math.round(simulationData.budget / simulationData.travelers))}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Travel Style Preview */}
                  <div className={`${cardBg} rounded-xl p-6`}>
                    <h3 className="text-lg font-bold text-(--text-primary) mb-4">Travel Style</h3>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-linear-to-r ${travelStyles.find(s => s.id === simulationData.travelStyle)?.color} rounded-xl flex items-center justify-center`}>
                        {React.createElement(travelStyles.find(s => s.id === simulationData.travelStyle)?.icon || Sparkles, { size: 20, className: "text-white" })}
                      </div>
                      <div>
                        <div className="font-medium text-(--text-primary)">
                          {travelStyles.find(s => s.id === simulationData.travelStyle)?.name}
                        </div>
                        <div className="text-sm text-(--text-muted)">
                          Personalized experience for your preferences
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={generateSimulation}
                  disabled={!simulationData.destination || isGenerating}
                  className={`px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    !simulationData.destination || isGenerating
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Simulation...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Travel Simulation
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {currentStep === 'results' && generatedItinerary && (
            <div className="p-6">
              {/* Results Header */}
              <div className={`${cardBg} rounded-xl p-6 mb-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-(--text-primary)">
                      {generatedItinerary.destination.name} Adventure
                    </h3>
                    <p className="text-(--text-muted)">
                      {generatedItinerary.days.length} days • {generatedItinerary.travelers} travelers • {generatedItinerary.travelStyle.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatINR(generatedItinerary.totalCost)}
                    </div>
                    <div className="text-sm text-(--text-muted)">
                      {formatINR(generatedItinerary.costPerPerson)} per person
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Itinerary Timeline */}
                <div className="xl:col-span-2">
                  <h4 className="text-lg font-bold text-(--text-primary) mb-4">Day-by-Day Itinerary</h4>
                  <div className="space-y-4">
                    {generatedItinerary.days.map((day, index) => (
                      <div key={day.day} className={`${cardBg} rounded-xl p-4 border-l-4 border-blue-500`}>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-(--text-primary)">{day.title}</h5>
                          <span className="text-sm text-(--text-muted)">Day {day.day}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-blue-500" />
                            <span className="text-sm text-(--text-primary)">Activities:</span>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-6">
                            {day.activities.map((activity, i) => (
                              <span key={i} className={`px-2 py-1 rounded-lg text-xs ${
                                darkMode ? 'bg-[#1E3A5F] text-[#CBD5E1]' : 'bg-blue-50 text-blue-700'
                              }`}>
                                {activity}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Utensils size={14} className="text-green-500" />
                            <span className="text-sm text-(--text-primary)">
                              {day.meals.join(' • ')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Hotel size={14} className="text-purple-500" />
                            <span className="text-sm text-(--text-primary)">
                              Stay: {day.accommodation}
                            </span>
                          </div>
                          {day.highlights && (
                            <div className="flex items-center gap-2 mt-2">
                              <Star size={14} className="text-yellow-500" />
                              <span className="text-sm text-(--text-primary)">
                                Highlights: {day.highlights.join(' • ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Breakdown */}
                <div>
                  <h4 className="text-lg font-bold text-(--text-primary) mb-4">Budget Breakdown</h4>
                  <div className={`${cardBg} rounded-xl p-4 space-y-3`}>
                    {Object.entries(generatedItinerary.budgetBreakdown).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-(--text-muted) capitalize">
                          {key === 'accommodation' && <Hotel size={14} className="inline mr-2" />}
                          {key === 'food' && <Utensils size={14} className="inline mr-2" />}
                          {key === 'transportation' && <Car size={14} className="inline mr-2" />}
                          {key === 'activities' && <Camera size={14} className="inline mr-2" />}
                          {key === 'miscellaneous' && <Shield size={14} className="inline mr-2" />}
                          {key}
                        </span>
                        <span className="text-sm font-bold text-(--text-primary)">
                          {formatINR(value)}
                        </span>
                      </div>
                    ))}
                    <div className={`pt-3 mt-3 border-t ${darkMode ? 'border-[#334155]' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-(--text-primary)">Total</span>
                        <span className="font-bold text-green-600 text-lg">
                          {formatINR(generatedItinerary.totalCost)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Weather Information */}
                  {generatedItinerary.destination.weather && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Sun size={16} className="text-yellow-500" />
                        Weather Conditions
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Temperature</span>
                          <span className="text-sm font-medium text-(--text-primary)">
                            {generatedItinerary.destination.weather.temp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Humidity</span>
                          <span className="text-sm font-medium text-(--text-primary)">
                            {generatedItinerary.destination.weather.humidity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Conditions</span>
                          <span className="text-sm font-medium text-(--text-primary)">
                            {generatedItinerary.destination.weather.conditions}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Packing List */}
                  {generatedItinerary.destination.packing && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Shield size={16} className="text-green-500" />
                        Packing Essentials
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedItinerary.destination.packing.map((item, index) => (
                          <span key={index} className={`px-2 py-1 rounded-lg text-xs ${
                            darkMode ? 'bg-[#1E3A5F] text-[#CBD5E1]' : 'bg-green-50 text-green-700'
                          }`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Local Cuisine */}
                  {generatedItinerary.destination.cuisine && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Utensils size={16} className="text-orange-500" />
                        Must-Try Local Cuisine
                      </h5>
                      <div className="space-y-1">
                        {generatedItinerary.destination.cuisine.map((dish, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                            <span className="text-sm text-(--text-secondary)">{dish}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Emergency Contacts */}
                  {generatedItinerary.destination.emergency && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Shield size={16} className="text-red-500" />
                        Emergency Contacts
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Police</span>
                          <span className="text-sm font-medium text-(--text-primary)">
                            {generatedItinerary.destination.emergency.police}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Ambulance</span>
                          <span className="text-sm font-medium text-(--text-primary)">
                            {generatedItinerary.destination.emergency.ambulance}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Tourist Helpline</span>
                          <span className="text-sm font-medium text-(--text-primary)">
                            {generatedItinerary.destination.emergency.tourist}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top Attractions */}
                  {generatedItinerary.destination.attractions && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Camera size={16} className="text-blue-500" />
                        Top Attractions
                      </h5>
                      <div className="space-y-1">
                        {generatedItinerary.destination.attractions.map((attraction, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span className="text-sm text-(--text-secondary)">{attraction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Activities */}
                  {generatedItinerary.destination.activities && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Mountain size={16} className="text-green-500" />
                        Popular Activities
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedItinerary.destination.activities.map((activity, index) => (
                          <span key={index} className={`px-2 py-1 rounded-lg text-xs ${
                            darkMode ? 'bg-[#1E3A5F] text-[#CBD5E1]' : 'bg-green-50 text-green-700'
                          }`}>
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transportation Options */}
                  {generatedItinerary.destination.transport && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Car size={16} className="text-purple-500" />
                        Transportation Options
                      </h5>
                      <div className="space-y-1">
                        {generatedItinerary.destination.transport.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-green-400" />
                            <span className="text-sm text-(--text-secondary)">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Shopping & Nightlife */}
                  {(generatedItinerary.destination.shopping || generatedItinerary.destination.nightlife) && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <ShoppingBag size={16} className="text-orange-500" />
                        Shopping & Nightlife
                      </h5>
                      {generatedItinerary.destination.shopping && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-(--text-muted) mb-1">Shopping</p>
                          <div className="flex flex-wrap gap-1">
                            {generatedItinerary.destination.shopping.map((item, index) => (
                              <span key={index} className="text-xs text-(--text-secondary) bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {generatedItinerary.destination.nightlife && (
                        <div>
                          <p className="text-xs font-medium text-(--text-muted) mb-1">Nightlife</p>
                          <div className="flex flex-wrap gap-1">
                            {generatedItinerary.destination.nightlife.map((venue, index) => (
                              <span key={index} className="text-xs text-(--text-secondary) bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                                {venue}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Practical Information */}
                  {generatedItinerary.destination.connectivity && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Info size={16} className="text-indigo-500" />
                        Practical Information
                      </h5>
                      <div className="space-y-2">
                        {generatedItinerary.destination.connectivity && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-(--text-muted)">Connectivity</span>
                            <div className="flex items-center gap-1">
                              <Wifi size={12} className="text-green-400" />
                              <span className="text-xs text-(--text-secondary)">
                                {generatedItinerary.destination.connectivity.wifi} WiFi
                              </span>
                            </div>
                          </div>
                        )}
                        {generatedItinerary.destination.currency && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-(--text-muted)">Currency</span>
                            <span className="text-sm text-(--text-secondary)">
                              {generatedItinerary.destination.currency.code} ({generatedItinerary.destination.currency.exchange})
                            </span>
                          </div>
                        )}
                        {generatedItinerary.destination.timezone && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-(--text-muted)">Timezone</span>
                            <span className="text-sm text-(--text-secondary)">
                              {generatedItinerary.destination.timezone}
                            </span>
                          </div>
                        )}
                        {generatedItinerary.destination.language && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-(--text-muted)">Languages</span>
                            <span className="text-sm text-(--text-secondary)">
                              {generatedItinerary.destination.language.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Safety Information */}
                  {generatedItinerary.destination.safety && (
                    <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                      <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                        <Shield size={16} className="text-red-500" />
                        Safety Information
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-(--text-muted)">Safety Rating</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className={i < Math.floor(generatedItinerary.destination.safety.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                            ))}
                            <span className="text-xs text-(--text-secondary) ml-1">
                              {generatedItinerary.destination.safety.rating}/5
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertCircle size={12} className="text-blue-400 mt-0.5 shrink-0" />
                          <span className="text-xs text-(--text-secondary)">
                            {generatedItinerary.destination.safety.tips}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className={`${cardBg} rounded-xl p-4 mt-4`}>
                    <h5 className="font-bold text-(--text-primary) mb-3 flex items-center gap-2">
                      <Sparkles size={16} className="text-purple-500" />
                      AI Recommendations
                    </h5>
                    <div className="space-y-2">
                      {generatedItinerary.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-(--text-secondary)">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={resetSimulation}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    darkMode 
                      ? 'bg-[#334155] text-[#CBD5E1] hover:bg-[#475569]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  New Simulation
                </button>
                <button
                  className="px-6 py-2.5 rounded-lg font-medium bg-linear-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Book This Trip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
