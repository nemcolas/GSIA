"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import disposalData from "@/data/disposal.json";
import { useLanguage } from "@/lib/LanguageContext";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
  const { t } = useLanguage();
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm shadow-xl">
      <p className="text-white font-medium mb-1">{d.name}</p>
      <p style={{ color: d.payload.color }} className="font-semibold">
        {d.value}% {t.charts.disposal.tooltip_suffix}
      </p>
    </div>
  );
}

export function DisposalChart() {
  const { t } = useLanguage();
  const c = t.charts.disposal;

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">{c.title}</h3>
        <p className="text-gray-500 text-sm">{c.subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={disposalData}
            dataKey="percentage"
            nameKey="method"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
          >
            {disposalData.map((entry) => (
              <Cell key={entry.method} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: "#9ca3af", fontSize: "12px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
