import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useTrips from "../hooks/useTrips";
import BudgetChart from "../components/trips/BudgetChart";

// TODO: replace with tripsAPI.getBudget(tripId) and tripsAPI.updateBudget(tripId, { totalBudget })

const COLORS = ["#006CE4", "#FF6B35", "#00A651", "#F59E0B", "#8B5CF6"];

export default function BudgetPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById, updateTrip } = useTrips();
  const trip = getTripById(tripId);

  const [budgetInput, setBudgetInput] = useState(trip?.totalBudget || 0);
  const [editing, setEditing] = useState(false);

  if (!trip) return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center">
      <p className="text-[#6B7280] font-medium">Trip not found</p>
    </div>
  );

  const breakdown = trip.budget?.breakdown || [];
  const totalEstimated = breakdown.reduce((a, b) => a + b.estimated, 0);
  const remaining      = budgetInput - totalEstimated;
  const overBudget     = totalEstimated > budgetInput;

  const barData = breakdown.map((item, i) => ({
    name: item.category,
    estimated: item.estimated,
    actual: item.actual,
    fill: COLORS[i % COLORS.length],
  }));

  const saveBudget = () => {
    updateTrip(tripId, { totalBudget: budgetInput });
    setEditing(false);
    // TODO: tripsAPI.updateBudget(tripId, { totalBudget: budgetInput })
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white border border-[#E5E9F2] text-[#6B7280] hover:text-[#006CE4] hover:border-[#006CE4]/30 transition-all shadow-sm">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Budget Overview</h1>
          <p className="text-xs text-[#6B7280] font-medium">{trip.name}</p>
        </div>
      </div>

      {/* Over budget alert */}
      {overBudget && (
        <div className="flex items-center gap-3 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-2xl mb-6">
          <AlertTriangle size={18} className="text-[#EF4444] shrink-0" />
          <p className="text-sm text-[#EF4444] font-semibold">
            You're over budget by ${Math.abs(remaining).toLocaleString()}
          </p>
        </div>
      )}

      {/* Budget input */}
      <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 mb-6 shadow-sm">
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Total Budget</p>
        {editing ? (
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(Number(e.target.value))}
                className="w-full bg-[#F8FAFF] border border-[#006CE4] rounded-xl pl-9 pr-4 py-2.5 text-[#1A1A2E] outline-none text-lg font-bold focus:ring-2 focus:ring-[#006CE4]/15"
              />
            </div>
            <button onClick={saveBudget} className="px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm">Save</button>
            <button onClick={() => setEditing(false)} className="px-4 py-2.5 bg-[#F3F4F6] text-[#6B7280] text-sm font-semibold rounded-xl hover:text-[#374151] transition-colors">Cancel</button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#006CE4]">${budgetInput.toLocaleString()}</span>
            <button onClick={() => setEditing(true)} className="text-xs text-[#006CE4] hover:underline font-bold">Edit</button>
          </div>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Estimated", value: `$${totalEstimated.toLocaleString()}`, color: "text-[#1A1A2E]", bg: "bg-white" },
          { label: "Total Budget",    value: `$${budgetInput.toLocaleString()}`,    color: "text-[#006CE4]", bg: "bg-[#E8F1FD]" },
          { label: "Remaining",       value: `$${Math.abs(remaining).toLocaleString()}`, color: overBudget ? "text-[#EF4444]" : "text-[#00A651]", bg: overBudget ? "bg-[#FEF2F2]" : "bg-[#E6F7EE]" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-[#E5E9F2] rounded-2xl p-4 shadow-sm`}>
            <p className="text-xs text-[#6B7280] font-semibold mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie chart */}
        <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-bold text-[#1A1A2E] mb-4">Spending Breakdown</h2>
          <BudgetChart breakdown={breakdown} />
        </div>

        {/* Bar chart */}
        <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-bold text-[#1A1A2E] mb-4">Estimated vs Actual</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barGap={4}>
              <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E5E9F2", borderRadius: 12, color: "#1A1A2E", boxShadow: "0 4px 12px rgba(0,60,180,0.10)", fontSize: 13 }}
                formatter={(v) => [`$${v}`, ""]}
              />
              <Bar dataKey="estimated" radius={[6, 6, 0, 0]} fill="#006CE4" opacity={0.85} />
              <Bar dataKey="actual" radius={[6, 6, 0, 0]} fill="#FF6B35" opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-[#E5E9F2]">
          <h2 className="text-base font-bold text-[#1A1A2E]">Category Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E9F2] bg-[#F8FAFF]">
                {["Category", "Estimated", "Actual", "Difference"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {breakdown.map((row, i) => {
                const diff = row.actual - row.estimated;
                return (
                  <tr key={row.category} className="hover:bg-[#F8FAFF] transition-colors">
                    <td className="px-5 py-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-[#374151] font-medium">{row.category}</span>
                    </td>
                    <td className="px-5 py-3 text-[#374151] font-medium">${row.estimated}</td>
                    <td className="px-5 py-3 text-[#374151] font-medium">${row.actual}</td>
                    <td className={`px-5 py-3 font-bold ${diff > 0 ? "text-[#EF4444]" : diff < 0 ? "text-[#00A651]" : "text-[#6B7280]"}`}>
                      {diff > 0 ? `+$${diff}` : diff < 0 ? `-$${Math.abs(diff)}` : "$0"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
