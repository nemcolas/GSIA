"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import productionData from "@/data/production.json";
import { useLanguage } from "@/lib/LanguageContext";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  const { t } = useLanguage();
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f1019] border border-[#1c1e2d] px-4 py-3 text-xs font-mono shadow-xl">
      <p className="text-[#52546a] mb-1">{t.charts.production.tooltip_year}: {label}</p>
      <p className="text-[#e8862a] font-semibold">
        {payload[0].value}{t.charts.production.tooltip_value}
      </p>
    </div>
  );
}

export function ProductionChart() {
  const { t } = useLanguage();
  const c = t.charts.production;

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#eaebf5] mb-1">{c.title}</h3>
      <p className="text-[#52546a] text-sm mb-6 font-light">{c.subtitle}</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={productionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#1c1e2d" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: "#52546a", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#52546a", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}M`}
            width={42}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#1c1e2d" }} />
          <ReferenceLine
            x={2010}
            stroke="#1c1e2d"
            strokeDasharray="3 3"
            label={{ value: "313M", position: "top", fill: "#52546a", fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
          />
          <Line
            type="monotone"
            dataKey="tons"
            stroke="#e8862a"
            strokeWidth={2}
            dot={{ r: 3, fill: "#e8862a", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#e8862a" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
