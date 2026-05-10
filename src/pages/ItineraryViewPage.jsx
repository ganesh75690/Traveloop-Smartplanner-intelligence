import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, DollarSign, Clock } from "lucide-react";
import useTrips from "../hooks/useTrips";
import Badge from "../components/ui/Badge";

// TODO: replace with API call

const typeVariant = { sightseeing: "info", food: "warning", adventure: "accent", culture: "success", shopping: "default" };

function CalendarView({ trip }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const start = new Date(trip.startDate);
  const end   = new Date(trip.endDate);
  const days  = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const activitiesForDay = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    const results = [];
    trip.stops?.forEach((stop) => {
      if (dateStr >= stop.startDate && dateStr <= stop.endDate) {
        stop.activities?.forEach((act) => results.push({ ...act, cityName: stop.cityName }));
      }
    });
    return results;
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="flex-1 bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-center text-xs text-[#9CA3AF] py-1 font-semibold">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(start.getDay())].map((_, i) => <div key={"e"+i} />)}
          {days.map((day) => {
            const acts = activitiesForDay(day);
            const isSel = selectedDay?.toDateString() === day.toDateString();
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs transition-all duration-200 font-semibold
                  ${isSel ? "bg-[#006CE4] text-white shadow-sm" : acts.length > 0 ? "bg-[#E8F1FD] text-[#006CE4] hover:bg-[#D1E4FB]" : "text-[#374151] hover:bg-[#F3F4F6]"}`}
              >
                <span>{day.getDate()}</span>
                {acts.length > 0 && <span className="text-[8px] mt-0.5 font-bold">{acts.length}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="md:w-64 bg-white border border-[#E5E9F2] rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-bold text-[#1A1A2E] mb-3">
            {selectedDay.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
          {activitiesForDay(selectedDay).length === 0 ? (
            <p className="text-xs text-[#6B7280] font-medium">No activities this day</p>
          ) : (
            <div className="space-y-2">
              {activitiesForDay(selectedDay).map((act) => (
                <div key={act.id} className="bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl p-3">
                  <p className="text-xs text-[#374151] font-semibold">{act.name}</p>
                  <p className="text-xs text-[#6B7280] font-medium">{act.cityName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ItineraryViewPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById } = useTrips();
  const trip = getTripById(tripId);
  const [view, setView] = useState("list");

  if (!trip) return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center">
      <p className="text-[#6B7280] font-medium">Trip not found</p>
    </div>
  );

  const totalCost = trip.stops?.reduce((acc, stop) =>
    acc + (stop.activities?.reduce((a, act) => a + (act.cost || 0), 0) || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#006CE4] hover:border-[#006CE4]/30 transition-all shadow-sm">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">{trip.name}</h1>
            <p className="text-xs text-[#6B7280] font-medium">{trip.stops?.length || 0} cities</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-[#E5E9F2] rounded-xl p-1 shadow-sm">
            {["list", "calendar"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 capitalize
                  ${view === v ? "bg-[#006CE4] text-white shadow-sm" : "text-[#6B7280] hover:text-[#374151]"}`}
              >
                {v === "list" ? "List" : "Calendar"}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E5E9F2] text-[#6B7280] text-sm rounded-xl hover:text-[#006CE4] hover:border-[#006CE4]/30 transition-all shadow-sm">
            <Share2 size={15} />
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <CalendarView trip={trip} />
      ) : (
        <div className="space-y-6">
          {trip.stops?.map((stop) => {
            const stopCost = stop.activities?.reduce((a, act) => a + (act.cost || 0), 0) || 0;
            return (
              <div key={stop.id}>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 mb-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{stop.flag}</span>
                      <div>
                        <h2 className="text-lg font-bold text-[#1A1A2E]">{stop.cityName}</h2>
                        <p className="text-xs text-[#6B7280] font-medium">
                          {new Date(stop.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} –{" "}
                          {new Date(stop.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-[#006CE4]">
                      <DollarSign size={14} /> {stopCost}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pl-4">
                  {stop.activities?.map((act) => (
                    <div key={act.id} className="flex items-center gap-4 bg-white border border-[#E5E9F2] rounded-xl px-4 py-3 shadow-sm hover:border-[#006CE4]/20 transition-colors">
                      <span className="text-xs text-[#6B7280] w-16 flex items-center gap-1 shrink-0 font-semibold">
                        <Clock size={11} className="text-[#006CE4]" /> {act.scheduledTime}
                      </span>
                      <span className="flex-1 text-sm text-[#374151] font-medium">{act.name}</span>
                      <Badge label={act.type} variant={typeVariant[act.type] || "default"} />
                      <span className="text-xs text-[#6B7280] flex items-center gap-0.5 shrink-0 font-semibold">
                        <DollarSign size={11} className="text-[#00A651]" />{act.cost === 0 ? "Free" : act.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="bg-[#E8F1FD] border border-[#006CE4]/20 rounded-2xl p-5 flex items-center justify-between">
            <span className="text-[#374151] font-bold">Total Trip Cost</span>
            <span className="text-xl text-[#006CE4] font-bold">${totalCost}</span>
          </div>
        </div>
      )}
    </div>
  );
}
