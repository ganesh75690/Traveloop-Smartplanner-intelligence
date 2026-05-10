import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit2, Trash2, ChevronDown, ChevronUp, StickyNote } from "lucide-react";
import useTrips from "../hooks/useTrips";
import { mockNotes } from "../data/mockData";

// TODO: replace with notesAPI.getAll(tripId)

function NoteCard({ note, stops, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const stop = stops?.find((s) => s.id === note.stopId);
  const isLong = note.content.length > 120;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 group hover:border-[#006CE4]/20 hover:shadow-md transition-all shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#9CA3AF] font-medium">{formatDate(note.createdAt)}</span>
          {stop && (
            <span className="text-xs px-2 py-0.5 bg-[#E8F1FD] text-[#006CE4] rounded-full border border-[#006CE4]/15 font-semibold">
              {stop.flag} {stop.cityName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button onClick={() => onEdit(note)} className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#006CE4] hover:bg-[#E8F1FD] transition-colors">
            <Edit2 size={13} />
          </button>
          <button onClick={() => onDelete(note.id)} className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <p className={`text-sm text-[#374151] leading-relaxed font-medium ${!expanded && isLong ? "line-clamp-3" : ""}`}>
        {note.content}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-xs text-[#006CE4] mt-2 hover:underline font-semibold"
        >
          {expanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Read more</>}
        </button>
      )}
    </div>
  );
}

export default function TripNotesPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById } = useTrips();
  const trip = getTripById(tripId);

  const [notes, setNotes]           = useState(mockNotes.filter((n) => n.tripId === tripId || tripId === "t1"));
  const [showForm, setShowForm]     = useState(false);
  const [editNote, setEditNote]     = useState(null);
  const [content, setContent]       = useState("");
  const [stopFilter, setStopFilter] = useState("all");

  const stops = trip?.stops || [];

  const saveNote = () => {
    if (!content.trim()) return;
    if (editNote) {
      setNotes((prev) => prev.map((n) => n.id === editNote.id ? { ...n, content, updatedAt: new Date().toISOString() } : n));
    } else {
      setNotes((prev) => [{
        id: "n" + Date.now(), tripId,
        stopId: stopFilter === "all" ? null : stopFilter,
        content, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      }, ...prev]);
    }
    setContent(""); setEditNote(null); setShowForm(false);
  };

  const handleEdit = (note) => { setEditNote(note); setContent(note.content); setShowForm(true); };
  const handleDelete = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const filtered = notes.filter((n) => stopFilter === "all" || n.stopId === stopFilter);
  const sorted   = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#006CE4] hover:border-[#006CE4]/30 transition-all shadow-sm">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Notes & Reminders</h1>
            <p className="text-xs text-[#6B7280] font-medium">{trip?.name || "Trip"}</p>
          </div>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditNote(null); setContent(""); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <Plus size={16} /> Add Note
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
        <button
          onClick={() => setStopFilter("all")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
            ${stopFilter === "all" ? "bg-[#006CE4] text-white shadow-sm" : "bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#374151] hover:border-[#006CE4]/30 shadow-sm"}`}
        >
          All stops
        </button>
        {stops.map((s) => (
          <button
            key={s.id}
            onClick={() => setStopFilter(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
              ${stopFilter === s.id ? "bg-[#006CE4] text-white shadow-sm" : "bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#374151] hover:border-[#006CE4]/30 shadow-sm"}`}
          >
            {s.flag} {s.cityName}
          </button>
        ))}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="bg-white border border-[#006CE4]/20 rounded-2xl p-5 mb-6 shadow-md">
          <p className="text-sm font-bold text-[#1A1A2E] mb-3">
            {editNote ? "Edit Note" : "New Note"}
          </p>
          <textarea
            rows={4}
            placeholder="Write your note or reminder..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all resize-none mb-3 font-medium"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowForm(false); setEditNote(null); setContent(""); }} className="px-4 py-2 bg-[#F3F4F6] text-[#6B7280] text-sm font-semibold rounded-xl hover:text-[#374151] transition-colors">
              Cancel
            </button>
            <button onClick={saveNote} className="px-4 py-2 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm">
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Notes list */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
          <div className="w-14 h-14 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-4">
            <StickyNote size={26} className="text-[#006CE4]" />
          </div>
          <p className="text-[#1A1A2E] font-bold mb-1">No notes yet</p>
          <p className="text-sm text-[#6B7280] mb-4 font-medium">Add reminders, tips, or anything useful</p>
          <button onClick={() => setShowForm(true)} className="px-5 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm">
            Add your first note
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((note) => (
            <NoteCard key={note.id} note={note} stops={stops} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
