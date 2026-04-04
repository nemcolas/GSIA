"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import countriesData from "@/data/countries.json";
import { useLanguage } from "@/lib/LanguageContext";

const REGION_COLORS: Record<string, string> = {
  "Middle East": "#f97316",
  "South America": "#22c55e",
  "Europe": "#3b82f6",
  "North America": "#a855f7",
  "Oceania": "#06b6d4",
  "Asia": "#f59e0b",
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number; payload: { country: string; region: string } }>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
  const { t } = useLanguage();
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm shadow-xl">
      <p className="text-white font-medium mb-0.5">{d.payload.country}</p>
      <p className="text-gray-500 text-xs mb-2">{d.payload.region}</p>
      <p className="text-blue-400 font-semibold">
        {d.value} {t.charts.countries.tooltip_unit}
      </p>
    </div>
  );
}

export function CountriesChart() {
  const { t } = useLanguage();
  const c = t.charts.countries;

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">{c.title}</h3>
        <p className="text-gray-500 text-sm">{c.subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={countriesData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={{ stroke: "#1f2937" }}
            tickLine={false}
            tickFormatter={(v) => `${v}kg`}
          />
          <YAxis
            type="category"
            dataKey="country"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={65}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="waste_kg_day" radius={[0, 4, 4, 0]}>
            {countriesData.map((entry) => (
              <Cell
                key={entry.country}
                fill={REGION_COLORS[entry.region] ?? "#6b7280"}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
