import { useState } from "react";
import { 
  Sparkles, CloudSun, Thermometer, Droplets, AlertTriangle,
  ChevronDown, ChevronUp, Weight, Clock, Mic,
  Lightbulb, Shield, Plus, Trash2, RotateCcw, Package,
  Sun, Mountain, Users, User, CheckCircle, AlertCircle, X
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = [
  { id: "all", label: "All", icon: Package },
  { id: "clothing", label: "Clothing", icon: Sun },
  { id: "documents", label: "Documents", icon: Package },
  { id: "electronics", label: "Electronics", icon: Sparkles },
  { id: "toiletries", label: "Toiletries", icon: Droplets },
  { id: "medicines", label: "Medicines", icon: Shield },
  { id: "accessories", label: "Accessories", icon: Package },
  { id: "emergency", label: "Emergency", icon: AlertTriangle },
];

const catStyle = {
  clothing:    "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  documents:   "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  electronics: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  toiletries:  "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  medicines:   "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  accessories: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  emergency:   "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

const TRIP_TYPES = [
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "beach", label: "Beach", icon: Sun },
  { id: "luxury", label: "Luxury", icon: Sparkles },
  { id: "family", label: "Family", icon: Users },
  { id: "solo", label: "Solo", icon: User },
  { id: "trekking", label: "Trekking", icon: Mountain },
  { id: "winter", label: "Winter Travel", icon: Thermometer },
];

const DESTINATION_SUGGESTIONS = {
  goa: ["sunscreen", "beachwear", "slippers", "sunglasses", "swimwear", "hat", "flip-flops"],
  switzerland: ["winter jacket", "gloves", "boots", "thermal wear", "scarf", "wool socks"],
  dubai: ["sunglasses", "light clothing", "travel adapter", "modest wear", "comfortable shoes"],
  paris: ["comfortable walking shoes", "umbrella", "layered clothing", "travel adapter", "euro converter"],
  ladakh: ["thermal wear", "gloves", "hiking shoes", "sunscreen", "power bank", "medicines"],
  bali: ["sunscreen", "insect repellent", "light clothing", "beachwear", "power adapter"],
};

const ESSENTIAL_ITEMS = ["passport", "visa", "tickets", "wallet", "charger", "travel insurance", "id"];

const AI_TIPS = [
  "Keep passport in cabin luggage for easy access",
  "Carry a universal power adapter for international travel",
  "Pack a change of clothes in carry-on luggage",
  "Keep medications in original containers with prescriptions",
  "Pack a small first-aid kit for emergencies",
  "Keep digital copies of important documents",
  "Pack a portable charger for your devices",
  "Bring a reusable water bottle",
];

export default function SmartPackingAssistantPage() {
  console.log("SmartPackingAssistantPage rendering");
  const { darkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [newItem, setNewItem] = useState("");
  const [newCat, setNewCat] = useState("clothing");
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [collapsedCats, setCollapsedCats] = useState({});
  const [selectedAssignee, setSelectedAssignee] = useState("");
  
  const [aiDestination, setAiDestination] = useState("");
  const [aiWeather, setAiWeather] = useState("moderate");
  const [aiDuration, setAiDuration] = useState(7);
  const [aiTripType, setAiTripType] = useState("adventure");
  const [aiTravelType, setAiTravelType] = useState("international");

  const bgClass = darkMode ? "bg-[#1E293B]" : "bg-white";
  const textClass = darkMode ? "text-[#F1F5F9]" : "text-[#1A1A2E]";
  const mutedClass = darkMode ? "text-[#94A3B8]" : "text-[#6B7280]";
  const borderClass = darkMode ? "border-[#334155]" : "border-[#E5E9F2]";
  const inputBg = darkMode ? "bg-[#0F172A]" : "bg-[#F8FAFF]";

  const toggle = (id) => {
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, isPacked: !p.isPacked } : p));
  };

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, { 
      id: "p" + Date.now(), 
      name: newItem.trim(), 
      category: newCat, 
      isPacked: false,
      assignee: selectedAssignee || null
    }]);
    setNewItem("");
    setSelectedAssignee("");
  };

  const resetAll = () => setItems((prev) => prev.map((p) => ({ ...p, isPacked: false })));

  const generateAIPacking = () => {
    const suggestions = DESTINATION_SUGGESTIONS[aiDestination.toLowerCase()] || 
      DESTINATION_SUGGESTIONS.goa;
    
    const weatherItems = aiWeather === "cold" 
      ? ["thermal wear", "winter jacket", "gloves", "warm socks"]
      : aiWeather === "hot"
      ? ["light clothing", "sunscreen", "hat", "sunglasses"]
      : ["layered clothing", "light jacket", "comfortable shoes"];

    const tripTypeItems = aiTripType === "adventure"
      ? ["hiking shoes", "backpack", "water bottle", "first-aid kit"]
      : aiTripType === "beach"
      ? ["swimwear", "sunscreen", "beach towel", "flip-flops"]
      : aiTripType === "luxury"
      ? ["formal wear", "accessories", "cosmetics"]
      : ["comfortable clothing", "entertainment", "snacks"];

    const allSuggestions = [...suggestions, ...weatherItems, ...tripTypeItems];
    
    setItems((prev) => [
      ...allSuggestions.map((name, idx) => ({
        id: "ai" + Date.now() + idx,
        name,
        category: idx % 2 === 0 ? "clothing" : "accessories",
        isPacked: false,
        isAISuggested: true,
      })),
      ...prev,
    ]);
    setShowAIGenerator(false);
  };

  const filtered = items.filter((p) => activeTab === "all" || p.category === activeTab);
  const packed = items.filter((p) => p.isPacked).length;
  const pct = items.length > 0 ? Math.round((packed / items.length) * 100) : 0;
  
  const estimatedWeight = items.reduce((acc, item) => {
    const weightMap = { clothing: 0.5, electronics: 1.5, toiletries: 0.3, documents: 0.1, medicines: 0.2, accessories: 0.4, emergency: 0.5 };
    return acc + (weightMap[item.category] || 0.3);
  }, 0);

  const missingEssentials = ESSENTIAL_ITEMS.filter(essential => 
    !items.some(item => item.name.toLowerCase().includes(essential.toLowerCase()) && item.isPacked)
  );

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewItem(transcript.replace(/add|item|pack/gi, '').trim());
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const toggleCategory = (catId) => {
    setCollapsedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary) flex items-center gap-2">
            <Sparkles className="text-[#006CE4]" />
            AI Smart Packing Assistant
          </h1>
          <p className="text-sm text-(--text-muted)">Intelligent travel preparation system</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAIGenerator(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <Sparkles size={16} />
            AI Generate
          </button>
          <button onClick={resetAll} className={`flex items-center gap-1.5 px-3 py-2.5 ${bgClass} ${borderClass} ${mutedClass} rounded-xl hover:text-[#374151] transition-colors font-semibold text-sm`}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${bgClass} ${borderClass} rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-semibold ${mutedClass}`}>Packing Progress</span>
            {pct === 100 ? <CheckCircle size={18} className="text-green-500" /> : <AlertCircle size={18} className="text-amber-500" />}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="35" stroke={darkMode ? "#334155" : "#E5E9F2"} strokeWidth="6" fill="none" />
                <circle
                  cx="40" cy="40" r="35"
                  stroke={pct === 100 ? "#22C55E" : pct >= 70 ? "#006CE4" : "#F59E0B"}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - pct / 100)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${textClass}`}>{pct}%</span>
              </div>
            </div>
            <div>
              <p className={`text-2xl font-bold ${textClass}`}>{packed}/{items.length}</p>
              <p className={`text-xs ${mutedClass}`}>items packed</p>
              <p className={`text-sm font-semibold mt-1 ${pct === 100 ? "text-green-500" : pct >= 70 ? "text-[#006CE4]" : "text-amber-500"}`}>
                {pct === 100 ? "🎉 Trip Ready!" : pct >= 70 ? "Almost Ready" : "Keep Packing"}
              </p>
            </div>
          </div>
        </div>

        <div className={`${bgClass} ${borderClass} rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center gap-2 mb-3">
            <CloudSun size={18} className="text-[#006CE4]" />
            <span className={`text-sm font-semibold ${mutedClass}`}>Weather Intelligence</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <Thermometer size={20} className={`mx-auto mb-1 ${textClass}`} />
              <p className={`text-lg font-bold ${textClass}`}>24°C</p>
              <p className={`text-xs ${mutedClass}`}>Temp</p>
            </div>
            <div className="text-center">
              <Droplets size={20} className="mx-auto mb-1 text-blue-500" />
              <p className={`text-lg font-bold ${textClass}`}>30%</p>
              <p className={`text-xs ${mutedClass}`}>Rain</p>
            </div>
            <div className="text-center">
              <Sun size={20} className="mx-auto mb-1 text-amber-500" />
              <p className={`text-lg font-bold ${textClass}`}>Clear</p>
              <p className={`text-xs ${mutedClass}`}>Sky</p>
            </div>
          </div>
          <p className={`text-xs ${mutedClass} mt-3`}>☀️ Pack light clothing and sunscreen</p>
        </div>

        <div className={`${bgClass} ${borderClass} rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center gap-2 mb-3">
            <Weight size={18} className="text-[#006CE4]" />
            <span className={`text-sm font-semibold ${mutedClass}`}>Weight Estimate</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${mutedClass}`}>Cabin Bag</span>
              <span className={`text-sm font-bold ${textClass}`}>{(estimatedWeight * 0.3).toFixed(1)} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${mutedClass}`}>Check-in</span>
              <span className={`text-sm font-bold ${textClass}`}>{estimatedWeight.toFixed(1)} kg</span>
            </div>
            <div className={`h-2 ${inputBg} rounded-full overflow-hidden`}>
              <div
                className="h-full bg-[#006CE4] rounded-full transition-all"
                style={{ width: `${Math.min((estimatedWeight / 23) * 100, 100)}%` }}
              />
            </div>
            <p className={`text-xs ${mutedClass}`}>Airline limit: 23kg</p>
          </div>
        </div>
      </div>

      {missingEssentials.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2">Critical Items Missing</p>
              <div className="flex flex-wrap gap-2">
                {missingEssentials.slice(0, 5).map((item, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-white dark:bg-amber-800/50 text-amber-700 dark:text-amber-200 rounded-lg font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAIGenerator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgClass} ${borderClass} rounded-2xl w-full max-w-lg shadow-2xl`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-bold ${textClass} flex items-center gap-2`}>
                  <Sparkles className="text-[#006CE4]" />
                  AI Packing Generator
                </h2>
                <button onClick={() => setShowAIGenerator(false)} className={`p-2 rounded-lg ${mutedClass} hover:text-[#EF4444]`}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Destination</label>
                  <input
                    type="text"
                    placeholder="e.g., Goa, Switzerland, Dubai"
                    value={aiDestination}
                    onChange={(e) => setAiDestination(e.target.value)}
                    className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder-(--text-light) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Weather</label>
                    <select
                      value={aiWeather}
                      onChange={(e) => setAiWeather(e.target.value)}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] transition-all cursor-pointer font-medium`}
                    >
                      <option value="hot">Hot</option>
                      <option value="moderate">Moderate</option>
                      <option value="cold">Cold</option>
                      <option value="rainy">Rainy</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Duration (Days)</label>
                    <input
                      type="number"
                      value={aiDuration}
                      onChange={(e) => setAiDuration(parseInt(e.target.value) || 7)}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Trip Type</label>
                    <select
                      value={aiTripType}
                      onChange={(e) => setAiTripType(e.target.value)}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] transition-all cursor-pointer font-medium`}
                    >
                      {TRIP_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Travel Type</label>
                    <select
                      value={aiTravelType}
                      onChange={(e) => setAiTravelType(e.target.value)}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] transition-all cursor-pointer font-medium`}
                    >
                      <option value="domestic">Domestic</option>
                      <option value="international">International</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAIGenerator(false)}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold ${bgClass} ${borderClass} ${mutedClass} hover:text-[#374151] transition-colors`}
                >
                  Cancel
                </button>
                <button
                  onClick={generateAIPacking}
                  className="flex-1 px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
                >
                  Generate List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${activeTab === cat.id
                  ? "bg-[#006CE4] text-white shadow-sm"
                  : `${bgClass} ${borderClass} ${mutedClass} hover:text-[#006CE4] hover:border-[#006CE4]/30 shadow-sm`
                }`}
            >
              <Icon size={16} />
              {cat.label}
              {cat.id !== "all" && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === cat.id ? "bg-white/20" : "bg-[#006CE4]/10 text-[#006CE4]"
                }`}>
                  {items.filter(i => i.category === cat.id).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "all" ? (
        <div className="space-y-4">
          {CATEGORIES.slice(1).map((cat) => {
            const Icon = cat.icon;
            const catItems = items.filter(i => i.category === cat.id);
            const isCollapsed = collapsedCats[cat.id];
            const catPacked = catItems.filter(i => i.isPacked).length;
            const catPct = catItems.length > 0 ? Math.round((catPacked / catItems.length) * 100) : 0;

            return (
              <div key={cat.id} className={`${bgClass} ${borderClass} rounded-2xl overflow-hidden shadow-sm`}>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-(--bg-input) transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${catStyle[cat.id]?.split(' ')[0]} flex items-center justify-center`}>
                      <Icon size={18} className={catStyle[cat.id]?.split(' ')[1]} />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-semibold ${textClass}`}>{cat.label}</h3>
                      <p className={`text-xs ${mutedClass}`}>{catPacked}/{catItems.length} items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${catPct === 100 ? 'bg-green-500' : 'bg-[#006CE4]'} rounded-full transition-all`}
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                    {isCollapsed ? <ChevronDown size={18} className={mutedClass} /> : <ChevronUp size={18} className={mutedClass} />}
                  </div>
                </button>
                {!isCollapsed && (
                  <div className="divide-y divide-(--border)">
                    {catItems.length === 0 ? (
                      <div className="p-8 text-center">
                        <Package size={32} className={`mx-auto mb-2 ${mutedClass}`} />
                        <p className={`text-sm ${mutedClass}`}>No items in this category</p>
                      </div>
                    ) : (
                      catItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 px-4 py-3.5 group hover:bg-(--bg-input) transition-colors">
                          <button
                            onClick={() => toggle(item.id)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200
                              ${item.isPacked ? "bg-[#006CE4] border-[#006CE4]" : "border-[#D1D9F0] hover:border-[#006CE4]"}`}
                          >
                            {item.isPacked && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                          <span className={`flex-1 text-sm font-medium transition-all duration-200 ${item.isPacked ? "line-through text-[#9CA3AF]" : textClass}`}>
                            {item.name}
                          </span>
                          {item.isAISuggested && (
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                              AI
                            </span>
                          )}
                          {item.assignee && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                              {item.assignee}
                            </span>
                          )}
                          <button
                            onClick={() => remove(item.id)}
                            className="opacity-0 group-hover:opacity-100 text-[#9CA3AF] hover:text-[#EF4444] transition-all duration-200"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`${bgClass} ${borderClass} rounded-2xl overflow-hidden shadow-sm`}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-4">
                <Package size={28} className="text-[#006CE4]" />
              </div>
              <p className={`text-sm ${mutedClass} font-medium`}>No items in this category</p>
            </div>
          ) : (
            <div className="divide-y divide-(--border)">
              {filtered.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3.5 group hover:bg-(--bg-input) transition-colors">
                  <button
                    onClick={() => toggle(item.id)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200
                      ${item.isPacked ? "bg-[#006CE4] border-[#006CE4]" : "border-[#D1D9F0] hover:border-[#006CE4]"}`}
                  >
                    {item.isPacked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span className={`flex-1 text-sm font-medium transition-all duration-200 ${item.isPacked ? "line-through text-[#9CA3AF]" : textClass}`}>
                    {item.name}
                  </span>
                  {item.isAISuggested && (
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                      AI
                    </span>
                  )}
                  <button
                    onClick={() => remove(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-[#9CA3AF] hover:text-[#EF4444] transition-all duration-200"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <form onSubmit={addItem} className="mt-6">
        <div className={`${bgClass} ${borderClass} rounded-2xl p-4 shadow-sm`}>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add new item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className={`flex-1 ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder-(--text-light) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
            />
            <button
              type="button"
              onClick={startVoiceInput}
              className={`p-3 rounded-xl ${isListening ? "bg-red-500 text-white" : `${bgClass} ${borderClass} ${mutedClass} hover:text-[#006CE4]`} transition-colors`}
            >
              <Mic size={18} />
            </button>
          </div>
          <div className="flex gap-2">
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className={`flex-1 ${inputBg} ${borderClass} rounded-xl px-4 py-2.5 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] transition-colors cursor-pointer font-medium`}
            >
              {CATEGORIES.slice(1).map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className={`${inputBg} ${borderClass} rounded-xl px-4 py-2.5 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] transition-colors cursor-pointer font-medium`}
            >
              <option value="">Assign to...</option>
              <option value="Dad">Dad</option>
              <option value="Mom">Mom</option>
              <option value="Me">Me</option>
              <option value="Kids">Kids</option>
            </select>
            <button type="submit" className="p-3 bg-[#006CE4] text-white rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6">
        <button
          onClick={() => setShowTips(!showTips)}
          className={`w-full flex items-center justify-between p-4 ${bgClass} ${borderClass} rounded-2xl shadow-sm hover:border-[#006CE4]/30 transition-colors`}
        >
          <div className="flex items-center gap-3">
            <Lightbulb size={18} className="text-amber-500" />
            <span className={`text-sm font-semibold ${textClass}`}>AI Smart Travel Tips</span>
          </div>
          {showTips ? <ChevronUp size={18} className={mutedClass} /> : <ChevronDown size={18} className={mutedClass} />}
        </button>
        {showTips && (
          <div className={`mt-2 ${bgClass} ${borderClass} rounded-2xl p-4 shadow-sm`}>
            <div className="space-y-2">
              {AI_TIPS.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#006CE4] mt-0.5">💡</span>
                  <p className={`text-sm ${mutedClass}`}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className={`w-full flex items-center justify-between p-4 ${bgClass} ${borderClass} rounded-2xl shadow-sm hover:border-[#006CE4]/30 transition-colors`}
        >
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-[#006CE4]" />
            <span className={`text-sm font-semibold ${textClass}`}>Travel Timeline</span>
          </div>
          {showTimeline ? <ChevronUp size={18} className={mutedClass} /> : <ChevronDown size={18} className={mutedClass} />}
        </button>
        {showTimeline && (
          <div className={`mt-2 ${bgClass} ${borderClass} rounded-2xl p-4 shadow-sm`}>
            <div className="space-y-4">
              <div>
                <p className={`text-xs font-semibold ${mutedClass} mb-2`}>7 Days Before Trip</p>
                <div className="flex flex-wrap gap-2">
                  {["Book accommodations", "Check passport expiry", "Apply for visa", "Book flights"].map((item, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 ${inputBg} ${borderClass} rounded-lg ${mutedClass}`}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-xs font-semibold ${mutedClass} mb-2`}>3 Days Before Trip</p>
                <div className="flex flex-wrap gap-2">
                  {["Pack clothes", "Organize documents", "Check weather", "Prepare medications"].map((item, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 ${inputBg} ${borderClass} rounded-lg ${mutedClass}`}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-xs font-semibold ${mutedClass} mb-2`}>Travel Day Essentials</p>
                <div className="flex flex-wrap gap-2">
                  {["Passport", "Wallet", "Tickets", "Charger", "Boarding pass", "ID"].map((item, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 ${inputBg} ${borderClass} rounded-lg ${mutedClass}`}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
