"use client";

import { ProductionChart } from "@/components/ProductionChart";
import { DisposalChart } from "@/components/DisposalChart";
import { CountriesChart } from "@/components/CountriesChart";
import { MLSection } from "@/components/MLSection";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

const STACK = [
  { name: "Python 3", color: "#3b82f6" },
  { name: "Jupyter Notebook", color: "#f97316" },
  { name: "Pandas", color: "#22c55e" },
  { name: "Matplotlib", color: "#a855f7" },
  { name: "Scikit-learn", color: "#f59e0b" },
  { name: "NumPy", color: "#06b6d4" },
];

export default function Home() {
  const { t, lang, toggle } = useLanguage();

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-[#030712]/90 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-semibold text-white text-sm">{t.nav.title}</span>
            <span className="text-gray-600 text-sm">{t.nav.subtitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/notebook"
              className="text-gray-500 hover:text-white text-sm transition-colors hidden sm:block"
            >
              Notebooks
            </Link>
            <button
              onClick={toggle}
              className="px-2.5 py-1 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-xs font-mono transition-colors"
            >
              {t.nav.toggle}
            </button>
            <a
              href="https://github.com/nemcolas/GSIA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              {t.nav.github}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-6">
                {t.hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {t.hero.title1}
                <br />
                <span className="text-green-400">{t.hero.title2}</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#charts"
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {t.hero.cta_data}
                </a>
                <a
                  href="#process"
                  className="px-5 py-2.5 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all"
                >
                  {t.hero.cta_process}
                </a>
                <a
                  href="#ml"
                  className="px-5 py-2.5 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all"
                >
                  {t.hero.cta_ml}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key metrics */}
        <section className="py-12 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
                >
                  <div className="text-3xl font-bold text-white mb-1">{m.value}</div>
                  <div className="text-gray-500 text-sm mb-2">{m.label}</div>
                  <div className="text-green-500 text-xs font-medium">{m.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process section */}
        <section id="process" className="py-16 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10">
              <span className="text-xs font-mono text-green-400 uppercase tracking-widest">
                {t.process.tag}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3">
                {t.process.title}
              </h2>
              <p className="text-gray-400 max-w-2xl">{t.process.subtitle}</p>
            </div>

            {/* Stack badges */}
            <div className="mb-10">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-mono mb-4">
                {t.process.stack_title}
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s.name}
                    className="px-3 py-1.5 rounded-full text-xs font-mono font-medium border"
                    style={{
                      color: s.color,
                      borderColor: `${s.color}33`,
                      backgroundColor: `${s.color}11`,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Flow steps */}
            <div className="mb-10">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-mono mb-6">
                {t.process.flow_title}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {t.process.flow.map((step) => (
                  <div
                    key={step.step}
                    className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
                  >
                    <div className="text-xs font-mono text-green-500 mb-3">{step.step}</div>
                    <div className="text-white font-medium mb-2 text-sm">{step.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code snippets */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {t.process.snippets.map((snippet) => (
                <div
                  key={snippet.label}
                  className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
                    <span className="text-gray-400 text-xs font-mono">{snippet.label}</span>
                    <span className="text-gray-600 text-xs">{snippet.lang}</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/notebook"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-500 text-white rounded-lg text-sm font-medium transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                {lang === "pt" ? "Ver notebooks interativos" : "View interactive notebooks"}
              </Link>
              <a
                href="https://github.com/nemcolas/GSIA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-medium transition-colors py-2"
              >
                {t.process.notebook_cta} →
              </a>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section id="charts" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10">
              <span className="text-xs font-mono text-green-400 uppercase tracking-widest">
                {t.charts.tag}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                {t.charts.title}
              </h2>
            </div>

            <div className="mb-6">
              <ProductionChart />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <DisposalChart />
              <CountriesChart />
            </div>
          </div>
        </section>

        {/* ML section */}
        <div id="ml">
          <MLSection />
        </div>

        {/* Data sources */}
        <section className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-white font-semibold mb-4">{t.sources.title}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {t.sources.items.map((source) => (
                <div
                  key={source}
                  className="flex items-center gap-2 text-sm text-gray-500 py-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0" />
                  {source}
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-4">{t.sources.footnote}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-sm">
          <span>{t.footer.left}</span>
          <span>
            {t.footer.built_by}{" "}
            <a
              href="https://github.com/nemcolas"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Nicolas Martins
            </a>{" "}
            · {t.footer.tech}
          </span>
        </div>
      </footer>
    </div>
  );
}
