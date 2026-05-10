import { Clock, DollarSign, Plus, MapPin, Star, ExternalLink } from "lucide-react";
import Badge from "../ui/Badge";

const typeVariant = {
  sightseeing: "info",
  food:        "warning",
  adventure:   "accent",
  culture:     "success",
  shopping:    "default",
};

export default function ActivityCard({ activity, onAdd, onClick }) {
  return (
    <div 
      className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden hover:border-[#006CE4]/30 hover:shadow-md transition-all duration-200 group cursor-pointer"
      onClick={() => onClick && onClick(activity)}
    >
      {activity.image && (
        <div className="relative h-32 w-full">
          <img
            src={activity.image}
            alt={activity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge label={activity.type} variant={typeVariant[activity.type] || "default"} />
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
              <p className="text-white text-xs font-medium">Click for details</p>
            </div>
          </div>
        </div>
      )}
      <div className={`p-4 ${!activity.image ? 'pt-4' : 'pt-3'}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-[#1A1A2E] font-bold text-sm truncate hover:text-[#006CE4] transition-colors">
              {activity.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 bg-[#F0F9FF] rounded-full px-2 py-1 w-fit">
              <MapPin size={10} className="text-[#006CE4]" />
              <p className="text-xs font-semibold text-[#006CE4]">
                {activity.city || activity.cityId || 'Unknown Location'}{activity.country ? `, ${activity.country}` : ''}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B7280] leading-relaxed mb-3 line-clamp-2">
          {activity.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1 font-medium">
              <Clock size={12} className="text-[#006CE4]" />
              {activity.durationHours < 1
                ? `${activity.durationHours * 60}min`
                : `${activity.durationHours}hr`}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <DollarSign size={12} className="text-[#00A651]" />
              {activity.cost === 0 ? "Free" : `$${activity.cost}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {activity.url && (
              <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 px-2 py-1.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-lg hover:bg-[#E5E7EB] hover:text-[#374151] transition-all duration-200"
                title="Visit official website"
              >
                <ExternalLink size={10} />
              </a>
            )}
            {onAdd && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(activity);
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#E8F1FD] text-[#006CE4] text-xs rounded-lg hover:bg-[#006CE4] hover:text-white transition-all duration-200 font-semibold"
              >
                <Plus size={12} /> Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
