import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share2, Copy, MapPin, Calendar, DollarSign, Clock, Plane } from "lucide-react";
import { mockTrips } from "../data/mockData";
import Badge from "../components/ui/Badge";

// TODO: replace with tripsAPI.getShared(shareId)

const typeVariant = { sightseeing: "info", food: "warning", adventure: "accent", culture: "success", shopping: "default" };

export default function SharedItineraryPage() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const trip = mockTrips.find((t) => t.shareId === shareId) || mockTrips[0];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCost = trip.stops?.reduce((acc, stop) =>
    acc + (stop.activities?.reduce((a, act) => a + (act.cost || 0), 0) || 0), 0) || 0;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E9F2] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#006CE4] rounded-xl flex items-center justify-center shadow-sm">
            <Plane size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[#003580] text-xl font-bold tracking-tight">Traveloop</span>
        </div>
        <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-3 py-1.5 rounded-full font-semibold border border-[#E5E9F2]">
          Shared Itinerary
        </span>
      </header>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        {/* Trip summary */}
        <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 mb-6 shadow-sm">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-3">{trip.name}</h1>
          {trip.description && <p className="text-sm text-[#6B7280] mb-4 font-medium">{trip.description}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-[#6B7280]">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar size={14} className="text-[#006CE4]" />
              {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin size={14} className="text-[#006CE4]" />
              {trip.stops?.length || 0} cities
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#006CE4]">
              <DollarSign size={14} /> ${totalCost} estimated
            </span>
          </div>
        </div>

        {/* Itinerary */}
        <div className="space-y-6 mb-8">
          {trip.stops?.map((stop) => (
            <div key={stop.id}>
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 mb-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{stop.flag}</span>
                  <div>
                    <h2 className="text-lg font-bold text-[#1A1A2E]">{stop.cityName}</h2>
                    <p className="text-xs text-[#6B7280] font-medium">
                      {formatDate(stop.startDate)} – {formatDate(stop.endDate)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 pl-4">
                {stop.activities?.map((act) => (
                  <div key={act.id} className="flex items-center gap-4 bg-white border border-[#E5E9F2] rounded-xl px-4 py-3 shadow-sm">
                    <span className="text-xs text-[#6B7280] w-16 flex items-center gap-1 shrink-0 font-semibold">
                      <Clock size={11} className="text-[#006CE4]" /> {act.scheduledTime}
                    </span>
                    <span className="flex-1 text-sm text-[#374151] font-medium">{act.name}</span>
                    <Badge label={act.type} variant={typeVariant[act.type] || "default"} />
                    <span className="text-xs text-[#6B7280] shrink-0 font-semibold">{act.cost === 0 ? "Free" : "$" + act.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Share actions */}
        <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 mb-6 shadow-sm">
          <p className="text-sm font-bold text-[#1A1A2E] mb-4">Share this itinerary</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
            >
              <Copy size={15} /> Copy this Trip
            </button>
            <button
              onClick={() => window.open("https://twitter.com/intent/tweet?text=Check out my trip: " + trip.name + "&url=" + window.location.href, "_blank")}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#EFF6FF] text-[#3B82F6] text-sm font-bold rounded-xl hover:bg-[#DBEAFE] transition-colors border border-[#BFDBFE]"
            >
              𝕏 Twitter
            </button>
            <button
              onClick={() => window.open("https://wa.me/?text=Check out my trip: " + window.location.href, "_blank")}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#E6F7EE] text-[#00A651] text-sm font-bold rounded-xl hover:bg-[#D1F0E0] transition-colors border border-[#A7F3D0]"
            >
              <Share2 size={15} /> WhatsApp
            </button>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F3F4F6] text-[#374151] text-sm font-bold rounded-xl hover:bg-[#E5E7EB] transition-colors"
            >
              <Copy size={15} /> {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-6 border-t border-[#E5E9F2]">
          <p className="text-sm text-[#6B7280] mb-3 font-medium">Want to plan your own adventure?</p>
          <button
            onClick={() => navigate("/auth")}
            className="px-6 py-3 bg-[#006CE4] text-white font-bold rounded-xl hover:bg-[#0057B8] transition-all hover:-translate-y-0.5 shadow-md"
          >
            Plan your own trip on Traveloop →
          </button>
        </div>
      </div>
    </div>
  );
}
