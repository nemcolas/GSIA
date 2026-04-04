"use client";

import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Line, ComposedChart, Scatter,
} from "recharts";
import mlData from "@/data/ml-results.json";
import { useLanguage } from "@/lib/LanguageContext";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f1019] border border-[#1c1e2d] px-4 py-3 text-xs font-mono shadow-xl">
      {payload.map((p) => (
        <p key={p.name} className="text-[#9da0b8]">
          <span className="text-[#52546a]">{p.name}: </span>
          {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
        </p>
      ))}
    </div>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-[#e8862a] text-xs">{n} /</span>
      <div className="flex-1 h-px bg-[#1c1e2d]" />
      <span className="font-mono text-[#52546a] text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function MLSection() {
  const { t } = useLanguage();
  const ml = t.ml;

  const scatterData = mlData.sample_predictions.map((d) => ({
    water_pollution: d.water_pollution,
    actual: d.actual_air_quality,
    predicted: d.predicted_air_quality,
  }));

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <SectionLabel n="03" label={ml.tag} />

      {/* R² as hero element */}
      <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-start mb-20">
        <div>
          <div className="font-mono font-bold text-[#eaebf5] leading-none"
               style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}>
            R²<span className="text-[#e8862a]">=</span>{mlData.r2}
          </div>
          <p className="font-mono text-[11px] text-[#52546a] mt-2 uppercase tracking-widest">
            {ml.r2_label}
          </p>
          <div className="mt-4 w-48 h-px bg-[#1c1e2d]">
            <div className="h-px bg-[#e8862a]" style={{ width: `${mlData.r2 * 100}%` }} />
          </div>
          <p className="font-mono text-[11px] text-[#52546a] mt-2">{ml.r2_footnote}</p>
        </div>

        <div className="pt-4">
          <h2 className="text-3xl font-bold text-[#eaebf5] mb-4 leading-tight">
            {ml.title}
          </h2>
          <p className="text-[#52546a] leading-relaxed font-light mb-8">{ml.description}</p>

          {/* Model metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: ml.model_label, value: mlData.model },
              { label: ml.feature_label, value: mlData.feature },
              { label: ml.split_label, value: `${mlData.train_size * 100}/${mlData.test_size * 100}%` },
              { label: ml.mse_label, value: String(mlData.mse) },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[10px] text-[#52546a] uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <p className="font-mono text-sm text-[#9da0b8]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-16">
        <h3 className="text-base font-semibold text-[#eaebf5] mb-1">{ml.chart_title}</h3>
        <p className="text-[#52546a] text-sm mb-6 font-light">{ml.chart_subtitle}</p>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={scatterData} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#1c1e2d" />
            <XAxis
              dataKey="water_pollution"
              name={ml.axis_water}
              tick={{ fill: "#52546a", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
              axisLine={false}
              tickLine={false}
              label={{ value: ml.axis_water, position: "insideBottom", offset: -12, fill: "#52546a", fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: "#52546a", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
              axisLine={false}
              tickLine={false}
              label={{ value: ml.axis_air, angle: -90, position: "insideLeft", fill: "#52546a", fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name={ml.legend_actual} dataKey="actual" fill="#4d8ef5" opacity={0.7} />
            <Line dataKey="predicted" stroke="#e8862a" strokeWidth={2} dot={false} name={ml.legend_predicted} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Interpretation + next steps */}
      <div className="grid md:grid-cols-2 gap-12 border-t border-[#1c1e2d] pt-12">
        <div>
          <p className="font-mono text-[11px] text-[#52546a] uppercase tracking-widest mb-4">
            {ml.interpretation_title}
          </p>
          <p className="text-[#52546a] text-sm leading-relaxed font-light">{ml.interpretation}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] text-[#52546a] uppercase tracking-widest mb-4">
            {ml.next_title}
          </p>
          <ul className="space-y-3">
            {ml.next_steps.map((step) => (
              <li key={step} className="flex gap-3 text-sm text-[#52546a] font-light">
                <span className="text-[#e8862a] mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
