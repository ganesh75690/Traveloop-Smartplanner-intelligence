import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, DollarSign } from "lucide-react";
import Badge from "../ui/Badge";

const typeVariant = {
  sightseeing: "info",
  food:        "warning",
  adventure:   "accent",
  culture:     "success",
  shopping:    "default",
};

export default function StopCard({ stop }) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFF] transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{stop.flag}</span>
          <div>
            <p className="text-[#1A1A2E] font-bold text-sm">{stop.cityName}</p>
            <p className="text-xs text-[#6B7280] font-medium">
              {formatDate(stop.startDate)} – {formatDate(stop.endDate)} · {stop.activities?.length || 0} activities
            </p>
          </div>
        </div>
        {expanded
          ? <ChevronUp size={16} className="text-[#9CA3AF]" />
          : <ChevronDown size={16} className="text-[#9CA3AF]" />
        }
      </button>

      {expanded && stop.activities?.length > 0 && (
        <div className="border-t border-[#E5E9F2] divide-y divide-[#F3F4F6]">
          {stop.activities.map((act) => (
            <div key={act.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#6B7280] w-14 flex items-center gap-1 font-medium">
                  <Clock size={11} className="text-[#006CE4]" /> {act.scheduledTime}
                </span>
                <span className="text-sm text-[#1A1A2E] font-medium">{act.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={act.type} variant={typeVariant[act.type] || "default"} />
                <span className="text-xs text-[#6B7280] flex items-center gap-0.5 font-medium">
                  <DollarSign size={11} className="text-[#00A651]" />
                  {act.cost === 0 ? "Free" : act.cost}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
