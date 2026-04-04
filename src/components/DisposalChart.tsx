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
    <div className="bg-[#0f1019] border border-[#1c1e2d] px-4 py-3 text-xs font-mono shadow-xl">
      <p className="text-[#eaebf5] font-medium mb-1">{d.name}</p>
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
    <div>
      <h3 className="text-lg font-semibold text-[#eaebf5] mb-1">{c.title}</h3>
      <p className="text-[#52546a] text-sm mb-6 font-light">{c.subtitle}</p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={disposalData}
            dataKey="percentage"
            nameKey="method"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {disposalData.map((entry) => (
              <Cell key={entry.method} fill={entry.color} opacity={0.9} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: "#52546a", fontSize: "11px", fontFamily: "var(--font-geist-mono)" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
