import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Users, Calendar, MapPin, Hotel, Utensils, Car, Camera, Shield, Sparkles, Target, Award, Lightbulb, ChevronRight, ChevronLeft, Info, AlertTriangle, CheckCircle, Heart, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

// Budget destinations data
const budgetDestinations = {
  domestic: [
    { id: "goa", name: "Goa", type: "beach", image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80", avgBudget: 25000, season: "Nov-Mar" },
    { id: "kerala", name: "Kerala", type: "nature", image: "https://images.unsplash.com/photo-1602216056056-7084e525845c?w=600&q=80", avgBudget: 30000, season: "Sep-Mar" },
    { id: "rajasthan", name: "Rajasthan", type: "heritage", image: "https://images.unsplash.com/photo-1524492412937-b784a5ba9a2c?w=600&q=80", avgBudget: 35000, season: "Oct-Mar" },
    { id: "himachal", name: "Himachal", type: "mountain", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80", avgBudget: 40000, season: "Apr-Jun, Sep-Nov" },
    { id: "varanasi", name: "Varanasi", type: "spiritual", image: "https://images.unsplash.com/photo-1524492412937-b784a5ba9A2c?w=600&q=80", avgBudget: 20000, season: "Oct-Mar" },
    { id: "coorg", name: "Coorg", type: "nature", image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=600&q=80", avgBudget: 28000, season: "Sep-May" }
  ],
  international: [
    { id: "thailand", name: "Thailand", type: "beach", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", avgBudget: 70000, season: "Nov-Feb" },
    { id: "dubai", name: "Dubai", type: "luxury", image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80", avgBudget: 120000, season: "Nov-Mar" },
    { id: "bali", name: "Bali", type: "beach", image: "https://images.unsplash.com/photo-1537953773345-b784a5ba9a2c?w=600&q=80", avgBudget: 80000, season: "Apr-Oct" },
    { id: "singapore", name: "Singapore", type: "city", image: "https://images.unsplash.com/photo-1514242406983-b16bfcda9c83?w=600&q=80", avgBudget: 100000, season: "Feb-Apr" },
    { id: "malaysia", name: "Malaysia", type: "mixed", image: "https://images.unsplash.com/photo-1555400030-607b5cda2dac?w=600&q=80", avgBudget: 90000, season: "Dec-Feb" }
  ]
};

const travelStyles = [
  { id: "budget", name: "Budget", icon: "₹", color: "from-green-500 to-emerald-600" },
  { id: "luxury", name: "Luxury", icon: Award, color: "from-yellow-500 to-amber-600" },
  { id: "adventure", name: "Adventure", icon: Camera, color: "from-red-500 to-orange-600" },
  { id: "family", name: "Family", icon: Users, color: "from-blue-500 to-indigo-600" },
  { id: "romantic", name: "Romantic", icon: Heart, color: "from-pink-500 to-rose-600" },
  { id: "solo", name: "Solo", icon: MapPin, color: "from-purple-500 to-pink-600" },
  { id: "nature", name: "Nature", icon: Sparkles, color: "from-emerald-500 to-green-600" },
  { id: "beach", name: "Beach", icon: Target, color: "from-cyan-500 to-blue-600" }
];

export default function AIBudgetIntelligencePage() {
  const { darkMode, formatCurrency } = useTheme();
  const { t } = useLanguage();
  const [budgetData, setBudgetData] = useState({
    totalBudget: 50000,
    travelers: 2,
    duration: 4,
    tripType: 'domestic',
    travelStyle: 'budget',
    hotelPreference: 'mid-range',
    foodPreference: 'local',
    destinationType: 'beach'
  });
  const [recommendations, setRecommendations] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState({});
  const [budgetHealth, setBudgetHealth] = useState('moderate');
  const [savings, setSavings] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const bgClass = darkMode ? "bg-[#1E293B]" : "bg-[#EEF2FF]";
  const cardBg = darkMode ? "bg-[#0F172A]" : "bg-gray-50";
  const textClass = darkMode ? "text-[#F1F5F9]" : "text-gray-900";
  const inputBg = darkMode ? "bg-[#0F172A] border-[#334155]" : "bg-white border-gray-200";
  const inputText = darkMode ? "text-[#F1F5F9]" : "text-gray-900";

  // Add sidebar layout structure similar to DashboardPage
  const sidebarBg = darkMode ? "bg-[#1E293B]" : "bg-white";
  const sidebarText = darkMode ? "text-[#F1F5F9]" : "text-gray-900";

  // Add main content area with proper spacing
  const mainContentClass = darkMode ? "lg:ml-64" : "lg:ml-64 md:ml-0 md:mt-0 mt-8";

  // Format currency to INR (using new utility)
  const formatINR = (amount) => {
    return formatCurrency(amount, 'INR');
  };

  // Generate AI recommendations based on budget
  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const destinations = budgetDestinations[budgetData.tripType];
    const suitableDestinations = destinations.filter(dest => 
      dest.avgBudget <= budgetData.totalBudget * 1.2 // Allow 20% flexibility
    );

    const newRecommendations = suitableDestinations.slice(0, 4).map(dest => ({
      ...dest,
      estimatedCost: Math.round(dest.avgBudget * budgetData.travelers),
      savings: Math.round((budgetData.totalBudget - dest.avgBudget * budgetData.travelers) / budgetData.travelers),
      matchScore: Math.round((1 - Math.abs(dest.avgBudget - budgetData.totalBudget) / budgetData.totalBudget) * 100)
    }));

    setRecommendations(newRecommendations);

    // Generate expense breakdown
    const breakdown = {
      accommodation: Math.round(budgetData.totalBudget * 0.35),
      food: Math.round(budgetData.totalBudget * 0.25),
      transportation: Math.round(budgetData.totalBudget * 0.20),
      activities: Math.round(budgetData.totalBudget * 0.15),
      shopping: Math.round(budgetData.totalBudget * 0.05)
    };
    setExpenseBreakdown(breakdown);

    // Calculate budget health
    const perPersonBudget = budgetData.totalBudget / budgetData.travelers;
    if (perPersonBudget < 25000) {
      setBudgetHealth('budget-friendly');
    } else if (perPersonBudget < 50000) {
      setBudgetHealth('moderate');
    } else if (perPersonBudget < 100000) {
      setBudgetHealth('comfortable');
    } else {
      setBudgetHealth('luxury');
    }

    // Generate savings tips
    const savingsTips = [
      `Traveling in ${destinations[0]?.season || 'optimal months'} can save up to 20% on accommodation`,
      `Booking flights 6 weeks in advance saves approximately ${formatINR(5000)}`,
      `Choosing ${budgetData.hotelPreference} hotels instead of luxury can save ${formatINR(budgetData.totalBudget * 0.2)}`,
      `Local ${budgetData.foodPreference} cuisine is 30% cheaper than tourist restaurants`,
      `Group travel for ${budgetData.travelers} people saves ${formatINR(budgetData.totalBudget * 0.1)} per person`
    ];
    setSavings(savingsTips);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateRecommendations();
  }, [budgetData]);

  const getBudgetHealthColor = () => {
    switch (budgetHealth) {
      case 'budget-friendly': return 'text-green-500';
      case 'moderate': return 'text-yellow-500';
      case 'comfortable': return 'text-blue-500';
      case 'luxury': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getBudgetHealthIcon = () => {
    switch (budgetHealth) {
      case 'budget-friendly': return CheckCircle;
      case 'moderate': return AlertTriangle;
      case 'comfortable': return TrendingUp;
      case 'luxury': return Award;
      default: return Info;
    }
  };

  // Export budget data as JSON file
  const exportBudgetData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      budget: {
        totalBudget: budgetData.totalBudget,
        travelers: budgetData.travelers,
        duration: budgetData.duration,
        tripType: budgetData.tripType,
        travelStyle: budgetData.travelStyle,
        hotelPreference: budgetData.hotelPreference,
        foodPreference: budgetData.foodPreference,
        perPersonBudget: Math.round(budgetData.totalBudget / budgetData.travelers),
        budgetHealth: budgetHealth
      },
      expenseBreakdown: expenseBreakdown,
      recommendations: recommendations,
      savingsTips: savings,
      summary: {
        totalDestinations: recommendations.length,
        averageMatchScore: recommendations.length > 0 
          ? Math.round(recommendations.reduce((acc, trip) => acc + trip.matchScore, 0) / recommendations.length)
          : 0,
        potentialSavings: recommendations.length > 0
          ? Math.round(recommendations.reduce((acc, trip) => acc + trip.savings, 0))
          : 0
      }
    };

    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `budget-plan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${bgClass} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className={`p-2 rounded-lg ${darkMode ? 'bg-[#1E3A4B] hover:bg-[#334155]' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200`}
                title={t('action.back')}
              >
                <ChevronLeft className={textClass} size={20} />
              </button>
              <h1 className={`text-3xl font-bold ${textClass}`}>AI Budget Planner</h1>
            </div>
            <button
              onClick={exportBudgetData}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200`}
              title="Export budget data"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
          <p className="text-lg text-(--text-muted)">
            Plan your perfect trip with AI-powered budget recommendations and smart savings tips
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Planner Form */}
          <div className="lg:col-span-1">
            <div className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
              <h2 className={`text-xl font-bold ${textClass} mb-6 flex items-center gap-2`}>
                <span className="text-blue-500 text-xl font-bold">₹</span>
                Budget Planner
              </h2>
              
              <div className="space-y-4">
                {/* Total Budget */}
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-2`}>Total Budget</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-(--text-muted) font-semibold">₹</span>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="5000"
                      value={budgetData.totalBudget}
                      onChange={(e) => setBudgetData(prev => ({ ...prev, totalBudget: parseInt(e.target.value) }))}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg ${inputBg} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <div className={`text-center font-bold ${textClass} mt-2`}>
                      {formatINR(budgetData.totalBudget)}
                    </div>
                  </div>
                </div>

                {/* Travelers and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Travelers</label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-3 text-(--text-muted)" />
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={budgetData.travelers}
                        onChange={(e) => setBudgetData(prev => ({ ...prev, travelers: parseInt(e.target.value) || 1 }))}
                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg ${inputBg} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Duration (Days)</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-3 text-(--text-muted)" />
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={budgetData.duration}
                        onChange={(e) => setBudgetData(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg ${inputBg} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                </div>

                {/* Trip Type and Style */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Trip Type</label>
                    <select
                      value={budgetData.tripType}
                      onChange={(e) => setBudgetData(prev => ({ ...prev, tripType: e.target.value }))}
                      className={`w-full px-3 py-2.5 rounded-lg ${inputBg} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="domestic">Domestic</option>
                      <option value="international">International</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Travel Style</label>
                    <select
                      value={budgetData.travelStyle}
                      onChange={(e) => setBudgetData(prev => ({ ...prev, travelStyle: e.target.value }))}
                      className={`w-full px-3 py-2.5 rounded-lg ${inputBg} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      {travelStyles.map(style => (
                        <option key={style.id} value={style.id}>{style.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferences */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Hotel Preference</label>
                    <select
                      value={budgetData.hotelPreference}
                      onChange={(e) => setBudgetData(prev => ({ ...prev, hotelPreference: e.target.value }))}
                      className={`w-full px-3 py-2.5 rounded-lg ${inputBg} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="budget">Budget</option>
                      <option value="mid-range">Mid-Range</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Food Preference</label>
                    <select
                      value={budgetData.foodPreference}
                      onChange={(e) => setBudgetData(prev => ({ ...prev, foodPreference: e.target.value }))}
                      className={`w-full px-3 py-2.5 rounded-lg ${inputBg} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="local">Local</option>
                      <option value="mixed">Mixed</option>
                      <option value="international">International</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Health Meter */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
              <h2 className={`text-xl font-bold ${textClass} mb-4 flex items-center gap-2`}>
                <Shield className="text-green-500" />
                Budget Health Meter
              </h2>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {typeof getBudgetHealthIcon() === 'string' ? (
                    <span className={`${getBudgetHealthIcon().includes('₹') ? 'text-green-500' : ''} text-lg font-bold`}>{getBudgetHealthIcon()}</span>
                  ) : (
                    React.createElement(getBudgetHealthIcon(), { 
                      size: 24, 
                      className: getBudgetHealthColor() 
                    })
                  )}
                  <div>
                    <div className={`text-lg font-bold capitalize ${getBudgetHealthColor()}`}>
                      {budgetHealth.replace('-', ' ')}
                    </div>
                    <div className={`text-sm ${textClass}`}>
                      Per person: {formatINR(Math.round(budgetData.totalBudget / budgetData.travelers))}
                    </div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${getBudgetHealthColor()}`}>
                  {formatINR(budgetData.totalBudget)}
                </div>
              </div>
              
              {/* Health Indicators */}
              <div className="grid grid-cols-4 gap-2">
                <div className={`text-center p-3 rounded-lg ${
                  budgetHealth === 'budget-friendly' ? 'bg-green-100 text-green-700' : 
                  budgetHealth === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  budgetHealth === 'comfortable' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  <div className="text-2xl mb-1">🟢</div>
                  <div className="text-xs font-medium">Budget Friendly</div>
                </div>
                <div className={`text-center p-3 rounded-lg ${
                  budgetHealth === 'moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  <div className="text-2xl mb-1">🟡</div>
                  <div className="text-xs font-medium">Moderate</div>
                </div>
                <div className={`text-center p-3 rounded-lg ${
                  budgetHealth === 'comfortable' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  <div className="text-2xl mb-1">🔵</div>
                  <div className="text-xs font-medium">Comfortable</div>
                </div>
                <div className={`text-center p-3 rounded-lg ${
                  budgetHealth === 'luxury' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  <div className="text-2xl mb-1">🔴</div>
                  <div className="text-xs font-medium">High Spending</div>
                </div>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
              <h2 className={`text-xl font-bold ${textClass} mb-4 flex items-center gap-2`}>
                <TrendingUp className="text-blue-500" />
                Expense Breakdown
              </h2>
              <div className="space-y-3">
                {Object.entries(expenseBreakdown).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className={`flex items-center gap-2 text-sm ${textClass}`}>
                      {key === 'accommodation' && <Hotel size={16} className="text-purple-500" />}
                      {key === 'food' && <Utensils size={16} className="text-green-500" />}
                      {key === 'transportation' && <Car size={16} className="text-blue-500" />}
                      {key === 'activities' && <Camera size={16} className="text-orange-500" />}
                      {key === 'shopping' && <span className="text-pink-500 font-bold text-base">₹</span>}
                      <span className="capitalize">{key}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-bold ${textClass}`}>
                        {formatINR(value)}
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(value / budgetData.totalBudget) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={generateRecommendations}
                  disabled={isGenerating}
                  className={`px-8 py-3 bg-linear-to-r ${isGenerating ? 'from-gray-400 to-gray-500' : 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb size={20} />
                      Generate Recommendations
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Savings Intelligence */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
              <h2 className={`text-xl font-bold ${textClass} mb-4 flex items-center gap-2`}>
                <Lightbulb className="text-yellow-500" />
                AI Savings Tips
              </h2>
              <div className="space-y-3">
                {savings.map((tip, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-[#1E3A5F]' : 'bg-blue-50'
                  }`}>
                    <ChevronRight size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <span className={`text-sm ${textClass}`}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Trips */}
          <div className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
            <h2 className={`text-xl font-bold ${textClass} mb-6 flex items-center gap-2`}>
              <Target className="text-purple-500" />
              Recommended Trips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((trip, index) => (
                <div key={trip.id} className={`border rounded-xl overflow-hidden hover:shadow-lg transition-all ${
                  darkMode ? 'border-[#334155] hover:border-[#475569]' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="relative h-32">
                    <img 
                      src={trip.image} 
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="text-sm font-bold">{trip.name}</div>
                      <div className="text-xs opacity-90">{trip.season}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${textClass}`}>
                        {trip.matchScore}% Match
                      </span>
                      <span className={`text-lg font-bold ${textClass}`}>
                        {formatINR(trip.estimatedCost)}
                      </span>
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      Save {formatINR(trip.savings)} per person
                    </div>
                    <div className={`text-xs ${textClass} mt-2`}>
                      {trip.type} • {budgetData.tripType}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
