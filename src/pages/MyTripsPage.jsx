import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Plane, MapPin, Calendar, DollarSign, Users, Clock, Star } from "lucide-react";
import useTrips from "../hooks/useTrips";
import TripCard from "../components/trips/TripCard";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import PageTransition from "../components/ui/PageTransition";

// TODO: replace with API call

const TABS = ["All", "Upcoming", "Ongoing", "Past"];

export default function MyTripsPage() {
  const { trips, loading, removeTrip } = useTrips();
  const [activeTab, setActiveTab]      = useState("All");
  const [search, setSearch]            = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const navigate = useNavigate();

  const filtered = trips.filter((t) => {
    const matchTab    = activeTab === "All" || t.status === activeTab;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const countFor = (tab) =>
    tab === "All" ? trips.length : trips.filter((t) => t.status === tab).length;

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E]">My Trips</h1>
        <button
          onClick={() => navigate("/trips/new")}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
        >
          <Plus size={16} /> New Trip
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
        <input
          type="text"
          placeholder="Search trips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#E5E9F2] rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all duration-200 shadow-sm font-medium"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const count = countFor(tab);
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${activeTab === tab
                  ? "bg-[#006CE4] text-white shadow-sm"
                  : "bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#374151] hover:border-[#006CE4]/30 shadow-sm"
                }`}
            >
              {tab}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                ${activeTab === tab ? "bg-white/20 text-white" : "bg-[#F3F4F6] text-[#6B7280]"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-56 bg-white animate-pulse rounded-2xl border border-[#E5E9F2]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
          <div className="w-14 h-14 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-4">
            <Plane size={26} className="text-[#006CE4]" />
          </div>
          <p className="text-[#1A1A2E] font-bold mb-1">
            {search ? "No trips match your search" : "No trips yet"}
          </p>
          <p className="text-sm text-[#6B7280] mb-5 font-medium">
            {search ? "Try a different search term" : "Plan your first adventure"}
          </p>
          {!search && (
            <button
              onClick={() => navigate("/trips/new")}
              className="px-5 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
            >
              Plan your first one!
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} onDelete={removeTrip} onClick={() => setSelectedTrip(trip)} />
          ))}
        </div>
      )}

      {/* Trip Detail Modal */}
      {selectedTrip && (
        <Modal 
          isOpen={selectedTrip !== null} 
          onClose={() => setSelectedTrip(null)} 
          title={selectedTrip.title || selectedTrip.name}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-4">
              {selectedTrip.coverPhoto && (
                <img 
                  src={selectedTrip.coverPhoto} 
                  alt={selectedTrip.title || selectedTrip.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              )}
              
              <div className="flex items-center gap-3">
                <Badge label={selectedTrip.status} variant={
                  selectedTrip.status === "Upcoming" ? "primary" : 
                  selectedTrip.status === "Ongoing" ? "success" : "default"
                } />
                <span className="text-sm text-[#6B7280] font-medium">
                  {selectedTrip.isPublic ? "Public Trip" : "Private Trip"}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#006CE4]" />
                  <span className="text-sm text-[#374151]">
                    {new Date(selectedTrip.startDate).toLocaleDateString()} – {new Date(selectedTrip.endDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#006CE4]" />
                  <span className="text-sm text-[#374151]">
                    {selectedTrip.destination || `${selectedTrip.stops?.length || 0} cities`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-[#00A651]" />
                  <span className="text-sm text-[#374151] font-semibold">
                    Budget: ${selectedTrip.totalBudget || selectedTrip.budget?.total || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Description and Activities */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A2E] mb-2">About this trip</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {selectedTrip.description || "An amazing journey awaits!"}
                </p>
              </div>

              {selectedTrip.stops && selectedTrip.stops.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A2E] mb-2">Destinations</h3>
                  <div className="space-y-2">
                    {selectedTrip.stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <span className="w-6 h-6 bg-[#E8F1FD] text-[#006CE4] rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span>{stop.cityName}, {stop.country}</span>
                        <span className="text-xs text-[#9CA3AF]">
                          ({new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTrip.budget?.breakdown && (
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A2E] mb-2">Budget Breakdown</h3>
                  <div className="space-y-1">
                    {selectedTrip.budget.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-[#6B7280]">{item.category}</span>
                        <span className="text-[#374151] font-medium">
                          ${item.estimated} (spent: ${item.actual || 0})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-[#E5E9F2]">
            <button
              onClick={() => {
                navigate(`/trips/${selectedTrip.id}/view`);
                setSelectedTrip(null);
              }}
              className="flex-1 py-2.5 bg-[#E8F1FD] text-[#006CE4] text-sm font-bold rounded-xl hover:bg-[#006CE4] hover:text-white transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => {
                navigate(`/trips/${selectedTrip.id}/builder`);
                setSelectedTrip(null);
              }}
              className="flex-1 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors"
            >
              Edit Trip
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
