"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import countriesData from "@/data/countries.json";
import { useLanguage } from "@/lib/LanguageContext";

const REGION_COLORS: Record<string, string> = {
  "Middle East":    "#e8862a",
  "South America":  "#4d8ef5",
  "Europe":         "#a78bfa",
  "North America":  "#f472b6",
  "Oceania":        "#34d399",
  "Asia":           "#fb923c",
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
    <div className="bg-[#0f1019] border border-[#1c1e2d] px-4 py-3 text-xs font-mono shadow-xl">
      <p className="text-[#eaebf5] font-medium mb-0.5">{d.payload.country}</p>
      <p className="text-[#52546a] text-[10px] mb-2">{d.payload.region}</p>
      <p className="text-[#4d8ef5] font-semibold">
        {d.value} {t.charts.countries.tooltip_unit}
      </p>
    </div>
  );
}

export function CountriesChart() {
  const { t } = useLanguage();
  const c = t.charts.countries;

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#eaebf5] mb-1">{c.title}</h3>
      <p className="text-[#52546a] text-sm mb-6 font-light">{c.subtitle}</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={countriesData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 4" stroke="#1c1e2d" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#52546a", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}kg`}
          />
          <YAxis
            type="category"
            dataKey="country"
            tick={{ fill: "#9da0b8", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            axisLine={false}
            tickLine={false}
            width={65}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
          <Bar dataKey="waste_kg_day" radius={[0, 2, 2, 0]}>
            {countriesData.map((entry) => (
              <Cell
                key={entry.country}
                fill={REGION_COLORS[entry.region] ?? "#52546a"}
                opacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
