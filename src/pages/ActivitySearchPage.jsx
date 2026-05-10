import { useState } from "react";
import { Search, X, Compass, Clock, DollarSign, Star, MapPin, Sun, Users, AlertCircle, Info, Calendar, ExternalLink } from "lucide-react";
import { mockActivities, mockCities, mockIndianCities } from "../data/mockData";
import ActivityCard from "../components/trips/ActivityCard";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";

// TODO: replace with activitiesAPI.getAll({ type, costRange, duration })

const TYPES     = ["All", "Sightseeing", "Food", "Adventure", "Culture", "Shopping"];
const COSTS     = ["All", "Free", "Budget", "Mid", "Luxury"];
const DURATIONS = ["All", "< 1hr", "1–3hr", "Half day", "Full day"];

const costRange = { Free: [0, 0], Budget: [1, 30], Mid: [31, 80], Luxury: [81, Infinity] };
const durRange  = { "< 1hr": [0, 1], "1–3hr": [1, 3], "Half day": [3, 6], "Full day": [6, Infinity] };

const typeVariant = {
  sightseeing: "info",
  food:        "warning",
  adventure:   "accent",
  culture:     "success",
  shopping:    "default",
};

const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200
      ${active
        ? "bg-[#006CE4] text-white shadow-sm"
        : "bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#374151] hover:border-[#006CE4]/30 shadow-sm"
      }`}
  >
    {label}
  </button>
);

export default function ActivitySearchPage() {
  const [search, setSearch]     = useState("");
  const [type, setType]         = useState("All");
  const [cost, setCost]         = useState("All");
  const [duration, setDuration] = useState("All");
  const [selected, setSelected] = useState([]);
  const [showTray, setShowTray] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const allCities = [...mockIndianCities, ...mockCities];
  const cityMap = Object.fromEntries(allCities.map((c) => [c.id, c.name]));
  const locationMap = Object.fromEntries(allCities.map((c) => [c.id, c.country || c.state || ""]));

  const filtered = mockActivities
    .filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchType   = type === "All" || a.type === type.toLowerCase();
      const matchCost   = cost === "All" || (() => {
        const [min, max] = costRange[cost];
        return a.cost >= min && a.cost <= max;
      })();
      const matchDur    = duration === "All" || (() => {
        const [min, max] = durRange[duration];
        return a.durationHours >= min && a.durationHours <= max;
      })();
      return matchSearch && matchType && matchCost && matchDur;
    })
    .map((a) => ({ ...a, city: cityMap[a.cityId] || "", country: locationMap[a.cityId] || "" }));

  const toggleSelect = (act) => {
    setSelected((prev) =>
      prev.find((a) => a.id === act.id)
        ? prev.filter((a) => a.id !== act.id)
        : [...prev, act]
    );
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6">Discover Activities</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#E5E9F2] rounded-xl pl-11 pr-4 py-3 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all duration-200 shadow-sm font-medium"
        />
      </div>

      {/* Filters */}
      <div className="space-y-2 mb-6">
        {[
          { label: "Type", items: TYPES, active: type, set: setType },
          { label: "Cost", items: COSTS, active: cost, set: setCost },
          { label: "Duration", items: DURATIONS, active: duration, set: setDuration },
        ].map(({ label, items, active, set }) => (
          <div key={label} className="flex gap-2 overflow-x-auto pb-1 items-center">
            <span className="text-xs text-[#6B7280] shrink-0 w-16 font-semibold">{label}</span>
            {items.map((item) => (
              <FilterPill key={item} label={item} active={active === item} onClick={() => set(item)} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Results */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-4">
                <Compass size={26} className="text-[#006CE4]" />
              </div>
              <p className="text-[#1A1A2E] font-bold mb-1">No activities found</p>
              <p className="text-sm text-[#6B7280] font-medium">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-[#6B7280] font-semibold mb-4">{filtered.length} activities found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((act) => (
                  <ActivityCard key={act.id} activity={act} onAdd={toggleSelect} onClick={setSelectedActivity} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Desktop selected tray */}
        {selected.length > 0 && (
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-6 bg-white border border-[#E5E9F2] rounded-2xl p-4 shadow-md">
              <p className="text-sm font-bold text-[#1A1A2E] mb-3">
                Selected ({selected.length})
              </p>
              <div className="space-y-2 max-h-80 overflow-y-auto mb-4">
                {selected.map((act) => (
                  <div key={act.id} className="flex items-center justify-between bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl px-3 py-2">
                    <span className="text-xs text-[#374151] truncate flex-1 font-medium">{act.name}</span>
                    <button onClick={() => toggleSelect(act)} className="text-[#9CA3AF] hover:text-[#EF4444] ml-2 transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm">
                Add to Trip
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile floating button */}
      {selected.length > 0 && (
        <div className="lg:hidden fixed bottom-20 left-0 right-0 px-4 z-20">
          <button
            onClick={() => setShowTray(true)}
            className="w-full py-3.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl shadow-xl flex items-center justify-center gap-2"
          >
            {selected.length} {selected.length === 1 ? "activity" : "activities"} selected — Add to Trip
          </button>
        </div>
      )}

      {/* Mobile tray */}
      {showTray && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowTray(false)} />
          <div className="relative w-full bg-white border-t border-[#E5E9F2] rounded-t-2xl p-5 max-h-[60vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-base font-bold text-[#1A1A2E]">Selected ({selected.length})</p>
              <button onClick={() => setShowTray(false)} className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto flex-1 mb-4">
              {selected.map((act) => (
                <div key={act.id} className="flex items-center justify-between bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl px-3 py-2.5">
                  <span className="text-sm text-[#374151] truncate flex-1 font-medium">{act.name}</span>
                  <button onClick={() => toggleSelect(act)} className="text-[#9CA3AF] hover:text-[#EF4444] ml-2 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowTray(false)}
              className="w-full py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
            >
              Add to Trip
            </button>
          </div>
        </div>
      )}

      {/* Activity Detail Modal */}
      <Modal
        isOpen={selectedActivity !== null}
        onClose={() => setSelectedActivity(null)}
        title={selectedActivity?.name || "Activity Details"}
      >
        {selectedActivity && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image */}
            {selectedActivity.image && (
              <div className="relative h-64 lg:h-auto rounded-xl overflow-hidden">
                <img
                  src={selectedActivity.image}
                  alt={selectedActivity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge label={selectedActivity.type} variant={typeVariant[selectedActivity.type] || "default"} />
                </div>
              </div>
            )}

            {/* Right Column - Details */}
            <div className="space-y-4">
              <div className="bg-[#F8FAFF] rounded-lg p-4 border border-[#E5E9F2]">
                <p className="text-sm text-[#374151] leading-relaxed">
                  {selectedActivity.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-[#F0F9FF] rounded-lg p-3">
                  <Clock size={16} className="text-[#006CE4]" />
                  <div>
                    <p className="text-[10px] text-[#6B7280]">Duration</p>
                    <p className="text-sm font-semibold text-[#1A1A2E]">
                      {selectedActivity.durationHours < 1
                        ? `${selectedActivity.durationHours * 60}min`
                        : `${selectedActivity.durationHours}hr`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#F0FDF4] rounded-lg p-3">
                  <DollarSign size={16} className="text-[#00A651]" />
                  <div>
                    <p className="text-[10px] text-[#6B7280]">Cost</p>
                    <p className="text-sm font-semibold text-[#1A1A2E]">
                      {selectedActivity.cost === 0 ? "Free" : `$${selectedActivity.cost}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-[#1A1A2E]">4.5</span>
                <span className="text-sm text-[#6B7280]">(128 reviews)</span>
              </div>

              <div className="flex items-start gap-2 bg-[#F3E8FF] rounded-lg p-3">
                <MapPin size={14} className="text-purple-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#6B21A8]">Location</p>
                  <p className="text-sm text-[#581C87]">
                    {selectedActivity.city}{selectedActivity.country ? `, ${selectedActivity.country}` : ''}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 bg-[#FEF3C7] rounded-lg p-3">
                  <Sun size={14} className="text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#92400E]">Best Time to Visit</p>
                    <p className="text-xs text-[#78350F]">Early morning or sunset for best lighting and fewer crowds</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#DBEAFE] rounded-lg p-3">
                  <Users size={14} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#1E40AF]">Group Size</p>
                    <p className="text-xs text-[#1E3A8A]">Ideal for 2-6 people. Private tours available for larger groups</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#FEE2E2] rounded-lg p-3">
                  <AlertCircle size={14} className="text-red-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#991B1B]">Requirements</p>
                    <p className="text-xs text-[#7F1D1D]">
                      {selectedActivity.type === 'adventure'
                        ? 'Moderate fitness level required. Comfortable shoes recommended'
                        : selectedActivity.type === 'food'
                        ? 'Inform about dietary restrictions when booking'
                        : 'Comfortable walking shoes recommended'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#D1FAE5] rounded-lg p-3">
                  <Info size={14} className="text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#065F46]">Pro Tips</p>
                    <p className="text-xs text-[#064E3B]">Book in advance during peak season. Carry water and sunscreen</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#E0E7FF] rounded-lg p-3">
                  <Calendar size={14} className="text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#3730A3]">Booking</p>
                    <p className="text-xs text-[#312E81]">Free cancellation up to 24 hours before. Instant confirmation</p>
                  </div>
                </div>
              </div>

              {selectedActivity.url && (
                <a
                  href={selectedActivity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#F3F4F6] text-[#374151] text-sm font-semibold rounded-xl hover:bg-[#E5E7EB] transition-colors shadow-sm"
                >
                  <ExternalLink size={16} />
                  Visit Official Website
                </a>
              )}

              <button
                onClick={() => {
                  toggleSelect(selectedActivity);
                  setSelectedActivity(null);
                }}
                className="w-full py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
              >
                Add to Trip
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
