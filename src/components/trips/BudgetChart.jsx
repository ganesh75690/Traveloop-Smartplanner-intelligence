import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#006CE4", "#FF6B35", "#00A651", "#F59E0B", "#8B5CF6"];

export default function BudgetChart({ breakdown }) {
  const data = breakdown.map((item) => ({
    name: item.category,
    value: item.estimated,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #E5E9F2",
            borderRadius: 12,
            color: "#1A1A2E",
            boxShadow: "0 4px 12px rgba(0,60,180,0.10)",
            fontSize: 13,
          }}
          formatter={(v) => [`$${v}`, ""]}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: "#6B7280", fontSize: 12, fontWeight: 500 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
