import { useState, useRef, useEffect } from "react";
import { MoreVertical, MapPin, Calendar, Eye, Edit2, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import { useNavigate } from "react-router-dom";

const coverGradients = [
  "linear-gradient(135deg, #003580 0%, #006CE4 100%)",
  "linear-gradient(135deg, #0F4C81 0%, #1E88E5 100%)",
  "linear-gradient(135deg, #1A237E 0%, #3949AB 100%)",
  "linear-gradient(135deg, #004D40 0%, #00897B 100%)",
  "linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)",
];

const statusVariant = { Upcoming: "primary", Ongoing: "success", Past: "default" };

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function TripCard({ trip, onDelete, onClick, index = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  // Debug: Check what data we're getting
  console.log('TripCard data:', { id: trip.id, title: trip.title, coverPhoto: trip.coverPhoto });

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <div 
      className="bg-card border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-lg transition-all duration-300 group hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      {/* Cover */}
      <div className="h-40 relative flex items-end p-4 overflow-hidden">
        <>
            <img 
              src={trip.coverPhoto || "https://picsum.photos/600/400?random=99"} 
              alt={trip.title || trip.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
                e.target.parentElement.style.background = coverGradients[index % coverGradients.length];
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', e.target.src);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </>
        <Badge label={trip.status} variant={statusVariant[trip.status] || "default"} className="relative z-10" />

        {/* 3-dot menu */}
        <div ref={menuRef} className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            className="p-1.5 rounded-lg bg-black/30 text-white hover:bg-black/50 transition-colors duration-200 backdrop-blur-sm"
            aria-label="Trip options"
          >
            <MoreVertical size={15} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 w-36 bg-card border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-20">
              <button
                onClick={() => { setMenuOpen(false); navigate(`/trips/${trip.id}/view`); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-input)] transition-colors"
              >
                <Eye size={14} className="text-[var(--primary)]" /> View
              </button>
              <button
                onClick={() => { setMenuOpen(false); navigate(`/trips/${trip.id}/builder`); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-input)] transition-colors"
              >
                <Edit2 size={14} className="text-[var(--text-muted)]" /> Edit
              </button>
              <div className="h-px bg-[var(--border)]" />
              <button
                onClick={() => { setMenuOpen(false); onDelete?.(trip.id); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[var(--danger)] hover:bg-[var(--danger-light)] transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-[var(--text-primary)] font-bold text-base mb-3 truncate leading-tight">
          {trip.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
          <Calendar size={14} className="shrink-0 text-[var(--primary)]" />
          <span className="truncate">{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <MapPin size={14} className="shrink-0 text-[var(--primary)]" />
          <span>{trip.stops?.length || 0} {trip.stops?.length === 1 ? "city" : "cities"}</span>
        </div>
      </div>
    </div>
  );
}
