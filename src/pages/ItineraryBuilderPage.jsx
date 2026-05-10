import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Share2, Eye, GripVertical, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useTrips from "../hooks/useTrips";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import { mockCities, mockActivities } from "../data/mockData";

// TODO: replace with API calls

const typeVariant = {
  sightseeing: "info", food: "warning", adventure: "accent",
  culture: "success", shopping: "default",
};

function SortableStop({ stop, onAddActivity }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: stop.id });
  const [expanded, setExpanded] = useState(false);
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const totalCost = stop.activities?.reduce((a, act) => a + (act.cost || 0), 0) || 0;

  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-[#E5E9F2] rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 p-3">
        <button
          {...attributes} {...listeners}
          className="p-1 text-[#D1D9F0] hover:text-[#9CA3AF] cursor-grab active:cursor-grabbing touch-none shrink-0"
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>
        <span className="text-xl shrink-0">{stop.flag}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#1A1A2E] font-bold truncate">{stop.cityName}</p>
          <p className="text-xs text-[#6B7280] font-medium">
            {stop.activities?.length || 0} activities &middot; ${totalCost}
          </p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] transition-colors shrink-0"
        >
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-[#F3F4F6] p-3 space-y-2 bg-[#F8FAFF]">
          {(!stop.activities || stop.activities.length === 0) && (
            <p className="text-xs text-[#9CA3AF] text-center py-2 font-medium">No activities yet</p>
          )}
          {stop.activities?.map((act) => (
            <div key={act.id} className="flex items-center justify-between bg-white border border-[#E5E9F2] rounded-lg px-3 py-2 gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#374151] truncate font-semibold">{act.name}</p>
                <p className="text-xs text-[#9CA3AF] font-medium">{act.scheduledTime}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge label={act.type} variant={typeVariant[act.type] || "default"} />
                <span className="text-xs text-[#6B7280] font-semibold">${act.cost}</span>
              </div>
            </div>
          ))}
          <button
            onClick={() => onAddActivity(stop.id)}
            className="flex items-center gap-1.5 text-xs text-[#006CE4] hover:underline mt-1 font-bold"
          >
            <Plus size={12} /> Add Activity
          </button>
        </div>
      )}
    </div>
  );
}

export default function ItineraryBuilderPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById } = useTrips();
  const trip = getTripById(tripId);

  const [stops, setStops]                 = useState(trip?.stops || []);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [actModalOpen, setActModalOpen]   = useState(false);
  const [activeStopId, setActiveStopId]   = useState(null);
  const [citySearch, setCitySearch]       = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIdx = stops.findIndex((s) => s.id === active.id);
    const newIdx = stops.findIndex((s) => s.id === over.id);
    setStops(arrayMove(stops, oldIdx, newIdx));
  };

  const addStop = (city) => {
    setStops((prev) => [...prev, {
      id: "s" + Date.now(), cityId: city.id, cityName: city.name,
      country: city.country, flag: city.flag, stopOrder: prev.length + 1,
      startDate: trip?.startDate || "", endDate: trip?.endDate || "", activities: [],
    }]);
    setCityModalOpen(false); setCitySearch("");
  };

  const addActivity = (activity) => {
    setStops((prev) => prev.map((s) =>
      s.id === activeStopId
        ? { ...s, activities: [...s.activities, { id: "sa" + Date.now(), activityId: activity.id, name: activity.name, type: activity.type, scheduledTime: "09:00", cost: activity.cost }] }
        : s
    ));
    setActModalOpen(false);
  };

  const filteredCities = mockCities.filter(
    (c) => c.name.toLowerCase().includes(citySearch.toLowerCase()) || c.country.toLowerCase().includes(citySearch.toLowerCase())
  );

  if (!trip) return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center">
      <p className="text-[#6B7280] font-medium">Trip not found</p>
    </div>
  );

  return (
    <div className="h-screen bg-[#EEF2FF] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-[#E5E9F2] shrink-0 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate("/trips")}
            className="p-2 rounded-xl text-[#6B7280] hover:text-[#006CE4] hover:bg-[#E8F1FD] transition-colors shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0">
            <h1 className="text-base md:text-lg font-bold text-[#1A1A2E] truncate">{trip.name}</h1>
            <p className="text-xs text-[#6B7280] font-medium">{stops.length} {stops.length === 1 ? "stop" : "stops"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate("/trips/" + tripId + "/view")}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#F3F4F6] text-[#374151] text-xs md:text-sm font-semibold rounded-xl hover:bg-[#E5E9F2] transition-colors"
          >
            <Eye size={14} /><span className="hidden sm:inline">View</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#E8F1FD] text-[#006CE4] text-xs md:text-sm font-semibold rounded-xl hover:bg-[#D1E4FB] transition-colors">
            <Share2 size={14} /><span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-full md:w-[340px] flex flex-col border-r border-[#E5E9F2] bg-[#F8FAFF] overflow-y-auto shrink-0">
          <div className="p-4 space-y-3">
            {stops.length === 0 && (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-12 h-12 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-3">
                  <MapPin size={22} className="text-[#006CE4]" />
                </div>
                <p className="text-sm text-[#374151] font-semibold mb-1">No stops yet</p>
                <p className="text-xs text-[#9CA3AF] font-medium">Add your first city below</p>
              </div>
            )}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                {stops.map((stop) => (
                  <SortableStop
                    key={stop.id}
                    stop={stop}
                    onAddActivity={(stopId) => { setActiveStopId(stopId); setActModalOpen(true); }}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <button
              onClick={() => setCityModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#C7D4F0] rounded-xl text-sm text-[#6B7280] hover:border-[#006CE4] hover:text-[#006CE4] hover:bg-[#E8F1FD] transition-all duration-200 font-semibold"
            >
              <Plus size={16} /> Add Stop
            </button>
          </div>
        </div>

        {/* Right panel — map placeholder */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#EEF2FF] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "linear-gradient(#C7D4F0 1px, transparent 1px), linear-gradient(90deg, #C7D4F0 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 text-center px-8">
            <div className="w-16 h-16 bg-white border border-[#E5E9F2] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <MapPin size={28} className="text-[#006CE4]" />
            </div>
            <p className="text-[#1A1A2E] font-bold text-lg mb-1">Interactive map coming soon</p>
            <p className="text-sm text-[#6B7280] font-medium">Your stops will appear here on the map</p>
          </div>
        </div>
      </div>

      {/* City Search Modal */}
      <Modal isOpen={cityModalOpen} onClose={() => { setCityModalOpen(false); setCitySearch(""); }} title="Add a Stop">
        <input
          type="text"
          placeholder="Search cities..."
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          className="w-full bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all mb-3 font-medium"
          autoFocus
        />
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredCities.length === 0 ? (
            <p className="text-sm text-[#6B7280] text-center py-4 font-medium">No cities found</p>
          ) : filteredCities.map((city) => (
            <button
              key={city.id}
              onClick={() => addStop(city)}
              className="flex items-center gap-3 w-full px-4 py-3 bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl hover:border-[#006CE4]/30 hover:bg-[#E8F1FD] transition-all text-left"
            >
              <span className="text-xl">{city.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1A1A2E] font-bold">{city.name}</p>
                <p className="text-xs text-[#6B7280] font-medium">{city.country}</p>
              </div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Activity Modal */}
      <Modal isOpen={actModalOpen} onClose={() => setActModalOpen(false)} title="Add Activity">
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {mockActivities.map((act) => (
            <button
              key={act.id}
              onClick={() => addActivity(act)}
              className="flex items-center justify-between w-full px-4 py-3 bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl hover:border-[#006CE4]/30 hover:bg-[#E8F1FD] transition-all text-left"
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm text-[#1A1A2E] font-bold truncate">{act.name}</p>
                <p className="text-xs text-[#6B7280] font-medium">
                  {act.durationHours}hr &middot; {act.cost === 0 ? "Free" : "$" + act.cost}
                </p>
              </div>
              <Badge label={act.type} variant={typeVariant[act.type] || "default"} />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
