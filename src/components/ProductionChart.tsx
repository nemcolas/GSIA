"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
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
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm shadow-xl">
      <p className="text-gray-400 mb-1">{t.charts.production.tooltip_year}: {label}</p>
      <p className="text-green-400 font-semibold">
        {payload[0].value}{t.charts.production.tooltip_value}
      </p>
    </div>
  );
}

export function ProductionChart() {
  const { t } = useLanguage();
  const c = t.charts.production;

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">{c.title}</h3>
        <p className="text-gray-500 text-sm">{c.subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={productionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#1f2937" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}M`}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={2010}
            stroke="#374151"
            strokeDasharray="4 4"
            label={{ value: "313M", position: "top", fill: "#6b7280", fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="tons"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#4ade80" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
