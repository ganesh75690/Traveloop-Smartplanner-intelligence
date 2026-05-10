import { useState, useRef } from "react";
import { 
  BookOpen, Plus, Camera, Heart, MapPin, Calendar, Star, 
  Smile, TrendingUp, Share2, Lock, Globe, Plane, Mountain,
  Sun, Coffee, Utensils, Music, Camera as CameraIcon, Edit2, Trash2, X
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Mock data for demonstration
const MOODS = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "🌴", label: "Relaxed", value: "relaxed" },
  { emoji: "🎉", label: "Excited", value: "excited" },
  { emoji: "😌", label: "Peaceful", value: "peaceful" },
  { emoji: "🤩", label: "Amazed", value: "amazed" },
  { emoji: "😢", label: "Nostalgic", value: "nostalgic" },
];

const TRIP_TYPES = [
  { label: "Adventure", icon: Mountain },
  { label: "Beach", icon: Sun },
  { label: "City", icon: Globe },
  { label: "Food", icon: Utensils },
  { label: "Cultural", icon: Music },
  { label: "Relaxation", icon: Coffee },
];

const MOCK_JOURNAL_ENTRIES = [
  {
    id: 1,
    title: "Beautiful Goa Vacation",
    destination: "Goa, India",
    date: "2024-03-15",
    mood: "relaxed",
    tripType: "beach",
    rating: 5,
    content: "Amazing beaches, nightlife, and local food experience. The sunset at Palolem Beach was absolutely breathtaking. We spent hours just watching the waves and enjoying the peaceful atmosphere.",
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400"],
    favoriteMoments: ["Sunset at Palolem", "Water sports at Baga", "Local seafood dinner"],
    isPublic: true,
    timeline: [
      { day: 1, activity: "Arrival and beach walk", place: "Palolem Beach" },
      { day: 2, activity: "Water sports and spa", place: "Baga Beach" },
      { day: 3, activity: "Old Goa exploration", place: "Basilica of Bom Jesus" },
    ]
  },
  {
    id: 2,
    title: "Paris Getaway",
    destination: "Paris, France",
    date: "2024-02-10",
    mood: "amazed",
    tripType: "cultural",
    rating: 5,
    content: "The Eiffel Tower at night was magical. We visited the Louvre and saw the Mona Lisa. The croissants and coffee at local cafes were divine.",
    images: ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400"],
    favoriteMoments: ["Eiffel Tower at night", "Louvre Museum", "Seine River cruise"],
    isPublic: false,
    timeline: [
      { day: 1, activity: "Eiffel Tower visit", place: "Champ de Mars" },
      { day: 2, activity: "Louvre Museum", place: "Louvre" },
      { day: 3, activity: "Seine River cruise", place: "Seine River" },
    ]
  }
];

const FAVORITE_PLACES = [
  { id: 1, name: "Cafe de Flore", location: "Paris, France", rating: 5, note: "Best coffee and ambiance", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300" },
  { id: 2, name: "Palolem Beach", location: "Goa, India", rating: 5, note: "Most peaceful beach", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300" },
];

const FUTURE_PLANS = [
  { id: 1, destination: "Switzerland", type: "Snow Trip", targetDate: "2024-12", description: "Skiing in the Alps, Christmas markets", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300" },
  { id: 2, destination: "Japan", type: "Cherry Blossom", targetDate: "2025-04", description: "Tokyo, Kyoto cherry blossom season", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300" },
];

export default function TravelJournalPage() {
  const { darkMode } = useTheme();
  const [entries, setEntries] = useState(MOCK_JOURNAL_ENTRIES);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [activeTab, setActiveTab] = useState("journal");
  const imageInputRef = useRef(null);

  const [newEntry, setNewEntry] = useState({
    title: "",
    destination: "",
    date: "",
    mood: "",
    tripType: "",
    rating: 5,
    content: "",
    images: [],
    favoriteMoments: [],
    isPublic: false,
  });

  const bgClass = darkMode ? "bg-[#1E293B]" : "bg-white";
  const textClass = darkMode ? "text-[#F1F5F9]" : "text-[#1A1A2E]";
  const mutedClass = darkMode ? "text-[#94A3B8]" : "text-[#6B7280]";
  const borderClass = darkMode ? "border-[#334155]" : "border-[#E5E9F2]";
  const inputBg = darkMode ? "bg-[#0F172A]" : "bg-[#F8FAFF]";

  const handleSaveEntry = () => {
    if (!newEntry.title || !newEntry.content) return;
    
    const entry = {
      id: Date.now(),
      ...newEntry,
      timeline: [
        { day: 1, activity: "Trip start", place: newEntry.destination }
      ]
    };
    
    setEntries([entry, ...entries]);
    setShowNewEntry(false);
    setNewEntry({
      title: "",
      destination: "",
      date: "",
      mood: "",
      tripType: "",
      rating: 5,
      content: "",
      images: [],
      favoriteMoments: [],
      isPublic: false,
    });
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2 flex items-center gap-3">
              <BookOpen className="text-[#006CE4]" />
              Travel Journal
            </h1>
            <p className="text-sm text-(--text-muted)">Your personal travel diary and memories</p>
          </div>
          <button
            onClick={() => setShowNewEntry(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <Plus size={18} />
            New Journal Entry
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: "journal", label: "Journal", icon: BookOpen },
            { id: "gallery", label: "Gallery", icon: Camera },
            { id: "timeline", label: "Timeline", icon: Calendar },
            { id: "favorites", label: "Favorites", icon: Heart },
            { id: "plans", label: "Future Plans", icon: Plane },
            { id: "insights", label: "AI Insights", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#006CE4] text-white shadow-sm"
                  : `${bgClass} ${borderClass} ${mutedClass} hover:text-[#006CE4]`
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Journal Entries Tab */}
        {activeTab === "journal" && (
          <div className="space-y-6">
            {showNewEntry && (
              <div className={`${bgClass} ${borderClass} rounded-2xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-(--text-primary)">Create New Journal Entry</h2>
                  <button onClick={() => setShowNewEntry(false)} className={`p-2 rounded-lg ${mutedClass} hover:text-[#EF4444]`}>
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold text-(--text-secondary) mb-1.5 block">Trip Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Beautiful Goa Vacation"
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder-(--text-light) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-(--text-secondary) mb-1.5 block">Destination</label>
                    <input
                      type="text"
                      placeholder="e.g., Goa, India"
                      value={newEntry.destination}
                      onChange={(e) => setNewEntry({ ...newEntry, destination: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder-(--text-light) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold text-(--text-secondary) mb-1.5 block">Date</label>
                    <input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-(--text-secondary) mb-1.5 block">Mood</label>
                    <select
                      value={newEntry.mood}
                      onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all cursor-pointer font-medium`}
                    >
                      <option value="">Select mood</option>
                      {MOODS.map(m => (
                        <option key={m.value} value={m.value}>{m.emoji} {m.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-(--text-secondary) mb-1.5 block">Trip Type</label>
                    <select
                      value={newEntry.tripType}
                      onChange={(e) => setNewEntry({ ...newEntry, tripType: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all cursor-pointer font-medium`}
                    >
                      <option value="">Select type</option>
                      {TRIP_TYPES.map(t => (
                        <option key={t.label} value={t.label.toLowerCase()}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-semibold text-(--text-secondary) mb-1.5 block">Your Experience</label>
                  <textarea
                    rows={6}
                    placeholder="Share your travel experience, memories, and special moments..."
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder-(--text-light) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all resize-none font-medium`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEntry.isPublic}
                      onChange={(e) => setNewEntry({ ...newEntry, isPublic: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#006CE4] focus:ring-[#006CE4]"
                    />
                    <span className={`text-sm ${mutedClass} font-medium`}>Share to Community</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowNewEntry(false)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold ${bgClass} ${borderClass} ${mutedClass} hover:text-[#374151] transition-colors`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEntry}
                      className="px-6 py-2 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Journal Entries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entries.map((entry) => (
                <div key={entry.id} className={`${bgClass} ${borderClass} rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group`}>
                  {/* Image Banner */}
                  {entry.images?.[0] && (
                    <div className="h-48 relative overflow-hidden">
                      <img src={entry.images[0]} alt={entry.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{MOODS.find(m => m.value === entry.mood)?.emoji || "✨"}</span>
                          <span className="text-xs text-white/90 font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg">{entry.title}</h3>
                        <p className="text-white/80 text-sm flex items-center gap-1">
                          <MapPin size={12} /> {entry.destination}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < entry.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        entry.isPublic ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {entry.isPublic ? <><Globe size={10} className="inline mr-1" /> Public</> : <><Lock size={10} className="inline mr-1" /> Private</>}
                      </span>
                    </div>

                    <p className={`text-sm ${mutedClass} line-clamp-3 mb-4 font-medium`}>
                      {entry.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className={`text-sm text-[#006CE4] font-semibold hover:underline`}
                      >
                        Read More
                      </button>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg text-(--text-muted) hover:text-[#006CE4] hover:bg-[#E8F1FD] transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-1.5 rounded-lg text-(--text-muted) hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {entries.length === 0 && (
              <div className={`${bgClass} ${borderClass} rounded-2xl p-12 text-center`}>
                <BookOpen size={48} className={`mx-auto mb-4 ${mutedClass}`} />
                <h3 className={`text-lg font-bold text-(--text-primary) mb-2`}>No journal entries yet</h3>
                <p className={`text-sm ${mutedClass} mb-4`}>Start documenting your travel memories</p>
                <button
                  onClick={() => setShowNewEntry(true)}
                  className="px-6 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
                >
                  Create Your First Entry
                </button>
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className={`${bgClass} ${borderClass} rounded-2xl p-6`}>
            <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
              <CameraIcon size={20} className="text-[#006CE4]" />
              Travel Memories Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {entries.flatMap(e => e.images || []).map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-xl aspect-square">
                  <img src={img} alt="Memory" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className={`${bgClass} ${borderClass} rounded-2xl p-6`}>
            <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-[#006CE4]" />
              Trip Timeline
            </h2>
            <div className="space-y-6">
              {entries.map(entry => (
                <div key={entry.id} className="relative pl-8 border-l-2 border-[#006CE4]/20">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-[#006CE4] rounded-full -translate-x-1/2" />
                  <div className="mb-2">
                    <h3 className="font-bold text-(--text-primary)">{entry.title}</h3>
                    <p className={`text-sm ${mutedClass}`}>{entry.destination}</p>
                  </div>
                  <div className="space-y-3 ml-4">
                    {entry.timeline?.map((day, idx) => (
                      <div key={idx} className={`${inputBg} ${borderClass} rounded-xl p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-1 bg-[#006CE4]/10 text-[#006CE4] rounded-lg`}>
                            Day {day.day}
                          </span>
                          <span className={`text-xs ${mutedClass}`}>{day.place}</span>
                        </div>
                        <p className={`text-sm text-(--text-primary)`}>{day.activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div className={`${bgClass} ${borderClass} rounded-2xl p-6`}>
            <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
              <Heart size={20} className="text-red-500" />
              Favorite Places
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FAVORITE_PLACES.map(place => (
                <div key={place.id} className={`${inputBg} ${borderClass} rounded-xl overflow-hidden group`}>
                  <div className="h-32 relative">
                    <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold">{place.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-(--text-primary)">{place.name}</h3>
                    <p className={`text-xs ${mutedClass} mb-2 flex items-center gap-1`}>
                      <MapPin size={10} /> {place.location}
                    </p>
                    <p className={`text-sm ${mutedClass}`}>{place.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Future Plans Tab */}
        {activeTab === "plans" && (
          <div className={`${bgClass} ${borderClass} rounded-2xl p-6`}>
            <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
              <Plane size={20} className="text-[#006CE4]" />
              Future Travel Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FUTURE_PLANS.map(plan => (
                <div key={plan.id} className={`${inputBg} ${borderClass} rounded-xl overflow-hidden`}>
                  <div className="h-40 relative">
                    <img src={plan.image} alt={plan.destination} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold text-lg">{plan.destination}</h3>
                      <p className="text-white/80 text-sm">{plan.type}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-[#006CE4]" />
                      <span className={`text-sm ${mutedClass}`}>{plan.targetDate}</span>
                    </div>
                    <p className={`text-sm text-(--text-primary)`}>{plan.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === "insights" && (
          <div className={`${bgClass} ${borderClass} rounded-2xl p-6`}>
            <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#006CE4]" />
              AI Travel Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Most Visited", value: "India", icon: Globe },
                { label: "Favorite Style", value: "Beach Trips", icon: Sun },
                { label: "Active Month", value: "March", icon: Calendar },
                { label: "Top Memory", value: "Goa Sunset", icon: Heart },
                { label: "Budget Trend", value: "Moderate", icon: TrendingUp },
                { label: "Total Trips", value: "12", icon: Plane },
              ].map((insight, idx) => (
                <div key={idx} className={`${inputBg} ${borderClass} rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <insight.icon size={16} className="text-[#006CE4]" />
                    <span className={`text-xs font-semibold ${mutedClass}`}>{insight.label}</span>
                  </div>
                  <p className="text-lg font-bold text-(--text-primary)">{insight.value}</p>
                </div>
              ))}
            </div>
            <div className={`mt-6 ${inputBg} ${borderClass} rounded-xl p-4`}>
              <p className={`text-sm text-(--text-primary) font-medium mb-2`}>
                <Smile className="inline mr-2 text-[#006CE4]" />
                Your Bali trip looks like an unforgettable tropical adventure. Consider exploring more Southeast Asian destinations for similar experiences.
              </p>
            </div>
          </div>
        )}

        {/* Entry Detail Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`${bgClass} ${borderClass} rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl`}>
              <div className="relative h-64">
                {selectedEntry.images?.[0] && (
                  <img src={selectedEntry.images[0]} alt={selectedEntry.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{MOODS.find(m => m.value === selectedEntry.mood)?.emoji || "✨"}</span>
                    <span className="text-white/90 font-medium">{new Date(selectedEntry.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-white font-bold text-2xl">{selectedEntry.title}</h2>
                  <p className="text-white/80 flex items-center gap-1">
                    <MapPin size={16} /> {selectedEntry.destination}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < selectedEntry.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    selectedEntry.isPublic ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {selectedEntry.isPublic ? "Public" : "Private"}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-(--text-primary) mb-3">Experience</h3>
                  <p className={`text-sm ${mutedClass} leading-relaxed`}>{selectedEntry.content}</p>
                </div>

                {selectedEntry.favoriteMoments?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-(--text-primary) mb-3">Favorite Moments</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.favoriteMoments.map((moment, idx) => (
                        <span key={idx} className={`text-xs px-3 py-1.5 bg-[#006CE4]/10 text-[#006CE4] rounded-lg font-medium`}>
                          {moment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEntry.timeline?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-(--text-primary) mb-3">Trip Timeline</h3>
                    <div className="space-y-3">
                      {selectedEntry.timeline.map((day, idx) => (
                        <div key={idx} className={`${inputBg} ${borderClass} rounded-xl p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-bold px-2 py-1 bg-[#006CE4]/10 text-[#006CE4] rounded-lg`}>
                              Day {day.day}
                            </span>
                            <span className={`text-xs ${mutedClass}`}>{day.place}</span>
                          </div>
                          <p className={`text-sm text-(--text-primary)`}>{day.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
