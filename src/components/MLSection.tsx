"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Scatter,
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
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm shadow-xl">
      {payload.map((p) => (
        <p key={p.name} className="text-gray-300">
          <span className="text-gray-500">{p.name}: </span>
          {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
        </p>
      ))}
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
    <section className="py-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs font-mono text-green-400 uppercase tracking-widest">
            {ml.tag}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3">
            {ml.title}
          </h2>
          <p className="text-gray-400 max-w-2xl">{ml.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {/* R² score */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <div className="text-3xl font-bold text-white mb-1">
              R² = {mlData.r2}
            </div>
            <div className="text-gray-500 text-sm">{ml.r2_label}</div>
            <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
              <div
                className="bg-yellow-500 h-1.5 rounded-full"
                style={{ width: `${mlData.r2 * 100}%` }}
              />
            </div>
            <div className="text-gray-600 text-xs mt-2">{ml.r2_footnote}</div>
          </div>

          {/* MSE */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <div className="text-3xl font-bold text-white mb-1">{mlData.mse}</div>
            <div className="text-gray-500 text-sm">{ml.mse_label}</div>
            <div className="mt-3 text-xs text-gray-600 leading-relaxed">{ml.mse_footnote}</div>
          </div>

          {/* Model info */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <div className="text-sm font-mono text-green-400 mb-2">{mlData.model}</div>
            <div className="space-y-1.5 text-xs text-gray-500">
              <div>{ml.feature_label}: {mlData.feature}</div>
              <div>{ml.target_label}: {mlData.target}</div>
              <div>{ml.split_label}: {mlData.train_size * 100}% / {mlData.test_size * 100}%</div>
              <div>{ml.seed_label}: {mlData.random_state}</div>
            </div>
          </div>
        </div>

        {/* Scatter + regression line */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-1">{ml.chart_title}</h3>
          <p className="text-gray-500 text-sm mb-6">{ml.chart_subtitle}</p>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={scatterData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="water_pollution"
                name={ml.axis_water}
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={{ stroke: "#1f2937" }}
                tickLine={false}
                label={{ value: ml.axis_water, position: "insideBottom", offset: -5, fill: "#6b7280", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                label={{ value: ml.axis_air, angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name={ml.legend_actual} dataKey="actual" fill="#3b82f6" opacity={0.8} />
              <Line
                dataKey="predicted"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name={ml.legend_predicted}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Interpretation + next steps */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5">
            <h4 className="text-white font-medium mb-3">{ml.interpretation_title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{ml.interpretation}</p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5">
            <h4 className="text-white font-medium mb-3">{ml.next_title}</h4>
            <ul className="space-y-2">
              {ml.next_steps.map((step) => (
                <li key={step} className="flex gap-2 text-sm text-gray-400">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">▸</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
