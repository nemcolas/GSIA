"use client";

import { ProductionChart } from "@/components/ProductionChart";
import { DisposalChart } from "@/components/DisposalChart";
import { CountriesChart } from "@/components/CountriesChart";
import { MLSection } from "@/components/MLSection";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

const STACK = [
  { name: "Python 3", color: "#4d8ef5" },
  { name: "Jupyter Notebook", color: "#e8862a" },
  { name: "Pandas", color: "#4d8ef5" },
  { name: "Matplotlib", color: "#4d8ef5" },
  { name: "Scikit-learn", color: "#e8862a" },
  { name: "NumPy", color: "#4d8ef5" },
];

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-[#e8862a] text-xs">{n} /</span>
      <div className="flex-1 h-px bg-[#1c1e2d]" />
      <span className="font-mono text-[#52546a] text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function Home() {
  const { t, lang, toggle } = useLanguage();

  return (
    <div className="min-h-screen bg-[#09090e] text-[#eaebf5]">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1c1e2d]/60">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between bg-[#09090e]/95">
          <span className="font-mono text-[11px] text-[#52546a] tracking-wider">
            Nicolas Martins / GSIA
          </span>
          <nav className="flex items-center gap-6">
            <Link href="/notebook" className="font-mono text-[11px] text-[#52546a] hover:text-[#eaebf5] transition-colors tracking-wider">
              NOTEBOOKS
            </Link>
            <button
              onClick={toggle}
              className="font-mono text-[11px] text-[#52546a] hover:text-[#eaebf5] transition-colors tracking-wider"
            >
              {t.nav.toggle}
            </button>
            <a
              href="https://github.com/nemcolas/GSIA"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[#52546a] hover:text-[#eaebf5] transition-colors tracking-wider"
            >
              GITHUB
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-end flex-1 py-12">
            {/* Left — headline */}
            <div>
              <p className="font-mono text-[11px] text-[#52546a] uppercase tracking-[0.2em] mb-10">
                FIAP · Global Solution 2024 · #salveasbaleia
              </p>
              <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.88] tracking-tight text-[#eaebf5] mb-10">
                {lang === "pt" ? (
                  <>
                    Plástico<br />
                    nos oceanos:<br />
                    <span className="text-[#e8862a]">uma análise</span><br />
                    de dados.
                  </>
                ) : (
                  <>
                    Plastic<br />
                    in the oceans:<br />
                    <span className="text-[#e8862a]">a data</span><br />
                    analysis.
                  </>
                )}
              </h1>
              <p className="text-[#52546a] text-base leading-relaxed max-w-lg mb-10 font-light">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-6">
                <a
                  href="#dados"
                  className="font-mono text-sm text-[#eaebf5] border-b border-[#eaebf5]/30 hover:border-[#e8862a] hover:text-[#e8862a] transition-colors pb-0.5"
                >
                  {t.hero.cta_data} →
                </a>
                <Link
                  href="/notebook"
                  className="font-mono text-sm text-[#52546a] border-b border-[#52546a]/30 hover:border-[#4d8ef5] hover:text-[#4d8ef5] transition-colors pb-0.5"
                >
                  {lang === "pt" ? "Notebooks Python" : "Python Notebooks"} →
                </Link>
                <a
                  href="#ml"
                  className="font-mono text-sm text-[#52546a] border-b border-[#52546a]/30 hover:border-[#52546a] hover:text-[#eaebf5] transition-colors pb-0.5"
                >
                  {t.hero.cta_ml} →
                </a>
              </div>
            </div>

            {/* Right — decorative stat */}
            <div className="flex flex-col items-end justify-end">
              <div
                className="font-mono font-bold text-right select-none leading-none"
                style={{ fontSize: "clamp(5rem,14vw,12rem)", color: "rgba(234,235,245,0.04)" }}
              >
                460M
              </div>
              <p className="font-mono text-[11px] text-[#52546a] tracking-wider text-right mt-2">
                {lang === "pt" ? "TONELADAS PRODUZIDAS · 2019" : "METRIC TONS PRODUCED · 2019"}
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-[#1c1e2d] pt-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-2xl font-bold text-[#eaebf5] mb-1">{m.value}</div>
                <div className="text-[11px] text-[#52546a] uppercase tracking-wider leading-tight mb-1">{m.label}</div>
                <div className="text-[11px] text-[#e8862a] font-mono">{m.trend}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Processo ───────────────────────────────────────────── */}
        <section id="processo" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#1c1e2d]">
          <SectionLabel n="01" label={t.process.tag} />

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[#eaebf5] mb-4 leading-tight">
                {t.process.title}
              </h2>
              <p className="text-[#52546a] leading-relaxed font-light">{t.process.subtitle}</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#52546a] uppercase tracking-widest mb-4">
                {t.process.stack_title}
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s.name}
                    className="px-3 py-1 text-xs font-mono border"
                    style={{ color: s.color, borderColor: `${s.color}33` }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-[#1c1e2d]" />
            <div className="space-y-10">
              {t.process.flow.map((step, i) => (
                <div key={step.step} className="flex gap-8">
                  <div className="flex-shrink-0 w-10 flex items-start justify-center pt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[#e8862a] bg-[#09090e]" />
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[11px] text-[#e8862a]">{step.step}</span>
                      <span className="text-[#eaebf5] font-semibold">{step.title}</span>
                    </div>
                    <p className="text-[#52546a] text-sm leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code snippets */}
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {t.process.snippets.map((snippet) => (
              <div key={snippet.label} className="border border-[#1c1e2d]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1c1e2d]">
                  <span className="text-[#52546a] font-mono text-xs">~</span>
                  <span className="text-[#52546a] font-mono text-xs">{snippet.label}</span>
                  <span className="ml-auto text-[#1c1e2d] font-mono text-xs">{snippet.lang}</span>
                </div>
                <pre className="px-4 py-4 text-[13px] font-mono text-[#9da0b8] overflow-x-auto leading-[1.7] bg-[#0a0b11]">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-6">
            <Link
              href="/notebook"
              className="font-mono text-sm text-[#4d8ef5] hover:text-[#eaebf5] transition-colors"
            >
              {lang === "pt" ? "← Ver notebooks completos" : "← View full notebooks"}
            </Link>
            <a
              href="https://github.com/nemcolas/GSIA"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-[#52546a] hover:text-[#eaebf5] transition-colors"
            >
              {t.process.notebook_cta} →
            </a>
          </div>
        </section>

        {/* ── Dados ──────────────────────────────────────────────── */}
        <section id="dados" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#1c1e2d]">
          <SectionLabel n="02" label={t.charts.tag} />

          <h2 className="text-3xl font-bold text-[#eaebf5] mb-16 leading-tight">
            {t.charts.title}
          </h2>

          {/* Production — full width, no card */}
          <div className="mb-20">
            <ProductionChart />
          </div>

          {/* Disposal + Countries */}
          <div className="grid md:grid-cols-2 gap-16">
            <DisposalChart />
            <CountriesChart />
          </div>
        </section>

        {/* ── ML ─────────────────────────────────────────────────── */}
        <div id="ml" className="border-t border-[#1c1e2d]">
          <MLSection />
        </div>

        {/* ── Fontes ─────────────────────────────────────────────── */}
        <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#1c1e2d]">
          <p className="font-mono text-[11px] text-[#52546a] uppercase tracking-widest mb-6">
            {t.sources.title}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {t.sources.items.map((src) => (
              <div key={src} className="flex items-center gap-3 text-sm text-[#52546a]">
                <span className="w-1 h-1 bg-[#1c1e2d] flex-shrink-0" />
                {src}
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-[#2d2f3e] mt-8 max-w-2xl leading-relaxed">
            {t.sources.footnote}
          </p>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-[#1c1e2d] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-[#2d2f3e] tracking-wider">
            {t.footer.left}
          </span>
          <span className="font-mono text-[11px] text-[#2d2f3e]">
            {t.footer.built_by}{" "}
            <a
              href="https://github.com/nemcolas"
              className="text-[#52546a] hover:text-[#eaebf5] transition-colors"
            >
              Nicolas Martins
            </a>
            {" "}· {t.footer.tech}
          </span>
        </div>
      </footer>
    </div>
  );
}
