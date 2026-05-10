import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, ImageIcon, MapPin, Calendar, Users, DollarSign, Plane, Car, Hotel, Home, Sparkles, Clock, Shield, Camera, Flag } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useTrips from "../hooks/useTrips";
import PageTransition from "../components/ui/PageTransition";

const TRAVEL_INTERESTS = [
  "Adventure", "Food", "Nature", "Luxury", "Culture", "Nightlife", 
  "Shopping", "Photography", "Spiritual", "Wildlife"
];

const TRAVEL_MOODS = [
  "Relaxed", "Fast-paced", "Romantic", "Explorer", "Luxury Retreat", 
  "Backpacking", "Workation"
];

const TRANSPORT_OPTIONS = [
  { value: "flight", label: "Flight", icon: Plane },
  { value: "train", label: "Train", icon: Car },
  { value: "road", label: "Road Trip", icon: Car },
  { value: "mixed", label: "Mixed", icon: MapPin }
];

const ACCOMMODATION_OPTIONS = [
  { value: "hotels", label: "Hotels" },
  { value: "resorts", label: "Resorts" },
  { value: "hostels", label: "Hostels" },
  { value: "airbnb", label: "Airbnb" },
  { value: "budget", label: "Budget Stay" },
  { value: "luxury", label: "Luxury Stay" }
];

const BUDGET_RANGES = [
  { value: "budget", label: "Budget", min: 10000, max: 25000, color: "green" },
  { value: "moderate", label: "Moderate", min: 25000, max: 50000, color: "blue" },
  { value: "luxury", label: "Luxury", min: 50000, max: 100000, color: "purple" }
];

const COUNTRIES = [
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "AU", name: "Australia", flag: "🇦🇺" }
];

const TABS = [
  { id: 1, name: "Basic Info", icon: "📝" },
  { id: 2, name: "Personalize", icon: "🎨" },
  { id: 3, name: "Preferences", icon: "⚙️" },
  { id: 4, name: "AI Assistant", icon: "🤖" }
];

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();
  const fileRef = useRef(null);

  const [activeTab, setActiveTab] = useState(1);
  const [form, setForm] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 2,
    budget: "moderate",
    budgetAmount: 35000,
    interests: [],
    mood: "Relaxed",
    transport: "flight",
    accommodation: "hotels",
    aiPrompt: "",
    coverImage: null,
    notes: "",
    specialRequirements: [],
    currency: "INR"
  });

  const [coverPreview, setCoverPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAIPreview, setShowAIPreview] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tripDuration, setTripDuration] = useState(0);

  // Calculate trip duration
  useEffect(() => {
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTripDuration(diffDays);
    } else {
      setTripDuration(0);
    }
  }, [form.startDate, form.endDate]);

  const set = (key) => (value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverPreview(URL.createObjectURL(file));
    setForm(prev => ({ ...prev, coverImage: file }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Trip name is required";
    if (!form.destination.trim()) errs.destination = "Destination is required";
    if (!form.startDate) errs.startDate = "Start date is required";
    if (!form.endDate) errs.endDate = "End date is required";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      errs.endDate = "End date must be after start date";
    return errs;
  };

  const generateAITrip = async () => {
    if (!form.aiPrompt.trim()) return;
    
    setShowAIPreview(true);
    // Simulate AI generation
    setTimeout(() => {
      setForm(prev => ({
        ...prev,
        name: "AI Generated " + prev.mood + " Adventure",
        destination: prev.destination || "Tokyo, Japan",
        description: "AI-powered " + prev.mood.toLowerCase() + " journey with focus on " + prev.interests.slice(0, 2).join(", ")
      }));
      setShowAIPreview(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const newTrip = addTrip({ 
      ...form, 
      coverPhoto: coverPreview,
      status: "Planning",
      duration: tripDuration
    });
    setLoading(false);
    navigate(`/trips/${newTrip.id}/builder`);
  };

  const getBudgetDisplay = () => {
    const range = BUDGET_RANGES.find(r => r.value === form.budget);
    if (!range) return "₹0";
    return range.min <= form.budgetAmount && form.budgetAmount <= range.max 
      ? `${range.label}: ₹${form.budgetAmount.toLocaleString('en-IN')}`
      : `₹${form.budgetAmount.toLocaleString('en-IN')}+`;
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 hover:text-gray-900 hover:bg-white/90 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Create Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dream Trip</span>
            </h1>
            <p className="text-gray-600 text-lg">AI-powered travel planning at your fingertips</p>
          </div>
        </div>

        {/* Live Trip Preview Card */}
        {(form.name || form.destination) && (
          <div className="mb-8 bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{form.name || "Untitled Trip"}</h3>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-lg">{form.destination || "Select Destination"}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="font-medium">{tripDuration} Days</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium">{form.interests.slice(0, 2).join(" + ") || "Adventure"}</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium">{getBudgetDisplay()}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Best Season</div>
                <div className="text-lg font-semibold text-green-600">Spring</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
            
            {/* Next Button */}
            {activeTab < 4 && (
              <button
                onClick={() => setActiveTab(activeTab + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg"
              >
                <span>Next</span>
                <ArrowLeft size={16} className="rotate-180" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Tab 1: Basic Info */}
          {activeTab === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">1</span>
                Core Trip Details
              </h2>

              {/* Trip Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Trip Name</label>
                <input
                  type="text"
                  placeholder="Japan Spring Adventure"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>

              {/* Destination with Country Flag */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Destination / Primary Location</label>
                <div className="relative">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Japan"
                      value={form.destination}
                      onChange={(e) => set("destination", e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                    />
                    {selectedCountry && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                        <span className="text-2xl">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium">{selectedCountry.name}</span>
                      </div>
                    )}
                  </div>
                  {/* Country Dropdown */}
                  <select
                    value={selectedCountry?.code || ""}
                    onChange={(e) => {
                      const country = COUNTRIES.find(c => c.code === e.target.value);
                      setSelectedCountry(country);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => set("endDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              {tripDuration > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-center">
                  <span className="text-blue-700 font-medium">{tripDuration} Days Journey</span>
                </div>
              )}

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTab(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
                >
                  Next
                  <ArrowLeft size={16} className="rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Personalization */}
          {activeTab === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">2</span>
                Smart Personalization
              </h2>

              {/* Number of Travelers */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Travelers</label>
                <div className="grid grid-cols-4 gap-2">
                  {["Solo", "Couple", "Family", "Business Team"].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => set("travelers", option === "Solo" ? 1 : option === "Couple" ? 2 : option === "Family" ? 4 : 6)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                        form.travelers === (option === "Solo" ? 1 : option === "Couple" ? 2 : option === "Family" ? 4 : 6)
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Budget */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Budget</label>
                <div className="space-y-3">
                  {/* Budget Range Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {BUDGET_RANGES.map(range => (
                      <button
                        key={range.value}
                        type="button"
                        onClick={() => set("budget", range.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                          form.budget === range.value
                            ? `bg-${range.color}-600 text-white border-${range.color}-600 shadow-lg`
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Budget Amount Slider */}
                  <div className="px-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">₹{form.budgetAmount.toLocaleString('en-IN')}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        form.budget === "budget" ? "bg-green-100 text-green-700" :
                        form.budget === "moderate" ? "bg-blue-100 text-blue-700" :
                        "bg-purple-100 text-purple-700"
                      }`}>
                        {form.budget.charAt(0).toUpperCase() + form.budget.slice(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="5000"
                      value={form.budgetAmount}
                      onChange={(e) => set("budgetAmount", parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${
                          form.budget === "budget" ? "#10b981" :
                          form.budget === "moderate" ? "#3b82f6" :
                          "#9333ea"
                        } 0%, ${
                          form.budget === "budget" ? "#10b981" :
                          form.budget === "moderate" ? "#3b82f6" :
                          "#9333ea"
                        } 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Interests */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Interests</label>
                <div className="grid grid-cols-3 gap-2">
                  {TRAVEL_INTERESTS.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => {
                        set("interests", 
                          form.interests.includes(interest) 
                            ? form.interests.filter(i => i !== interest)
                            : [...form.interests, interest]
                        );
                      }}
                      className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                        form.interests.includes(interest)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Mood */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Mood / Style</label>
                <div className="grid grid-cols-4 gap-2">
                  {TRAVEL_MOODS.map(mood => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => set("mood", mood)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                        form.mood === mood
                          ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveTab(1)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setActiveTab(3)}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg"
                >
                  Next
                  <ArrowLeft size={16} className="rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Preferences */}
          {activeTab === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">3</span>
                Preferences
              </h2>

              {/* Transportation Preference */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Transportation Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  {TRANSPORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => set("transport", option.value)}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                        form.transport === option.value
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <option.icon size={20} />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accommodation Preference */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Accommodation Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {ACCOMMODATION_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => set("accommodation", option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                        form.accommodation === option.value
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveTab(2)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setActiveTab(4)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg"
                >
                  Next
                  <ArrowLeft size={16} className="rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: AI Assistant */}
          {activeTab === 4 && (
            <div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg border-0 p-6 text-white mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  AI Travel Assistant
                </h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">AI Travel Assistant Prompt</label>
                  <textarea
                    placeholder="Plan a relaxing 5-day trip in Japan focused on food and culture under ₹80,000."
                    value={form.aiPrompt}
                    onChange={(e) => set("aiPrompt", e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 resize-none"
                    rows={3}
                  />
                </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={generateAITrip}
                  disabled={!form.aiPrompt.trim() || loading}
                  className="flex-1 bg-white text-purple-600 px-4 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Smart Trip
                </button>
                
                {showAIPreview && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/30 rounded-lg">
                    <div className="w-4 h-4 border-2 border-white/50 border-t-white/70 animate-spin rounded-full"></div>
                    <span className="text-white text-sm">AI is thinking...</span>
                  </div>
                )}
              </div>
            </div>

              {/* Cover Image Upload */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-gray-600" />
                  Cover Image
                </h2>
              
              <div
                onClick={() => fileRef.current?.click()}
                className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 overflow-hidden"
                style={coverPreview ? { backgroundImage: `url(${coverPreview})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
              >
                {coverPreview && <div className="absolute inset-0 bg-black/40" />}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  {coverPreview ? <ImageIcon size={32} className="text-white" /> : <Upload size={32} className="text-gray-400" />}
                  <p className={`text-sm font-medium ${coverPreview ? "text-white" : "text-gray-600"}`}>
                    {coverPreview ? "Click to change" : "Upload or AI-generate travel banner"}
                  </p>
                  <p className={`text-xs ${coverPreview ? "text-white/70" : "text-gray-500"}`}>
                    PNG, JPG up to 10MB
                  </p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>
            </div>

              {/* Notes & Requirements */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  Notes & Special Requirements
                </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea
                    placeholder="Add any special notes for your trip..."
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requirements</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Vegetarian food only", "Wheelchair accessible", "Pet friendly", "Honeymoon trip"].map(requirement => (
                      <button
                        key={requirement}
                        type="button"
                        onClick={() => {
                          set("specialRequirements", 
                            form.specialRequirements.includes(requirement) 
                              ? form.specialRequirements.filter(r => r !== requirement)
                              : [...form.specialRequirements, requirement]
                          );
                        }}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                          form.specialRequirements.includes(requirement)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {requirement}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              size="lg"
              className="px-12 py-4 text-lg btn-animate"
            >
              {loading ? "Creating Trip..." : "Create Trip →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
