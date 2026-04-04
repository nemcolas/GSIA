"use client";

import { useState, useEffect } from "react";
import { NotebookViewer, type NotebookCell } from "@/components/NotebookViewer";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

type NotebookFile = {
  cells: NotebookCell[];
};

const TABS = [
  {
    id: "analises",
    labelPt: "Análise Exploratória",
    labelEn: "Exploratory Analysis",
    file: "/notebooks/analises.ipynb",
    descPt: "5 datasets CSV, limpeza com Pandas, gráficos com Matplotlib e Seaborn",
    descEn: "5 CSV datasets, cleaning with Pandas, charts with Matplotlib and Seaborn",
    cells: "31 células",
  },
  {
    id: "ml",
    labelPt: "Machine Learning",
    labelEn: "Machine Learning",
    file: "/notebooks/machine-learning.ipynb",
    descPt: "Regressão Linear com Scikit-learn — poluição da água vs qualidade do ar",
    descEn: "Linear Regression with Scikit-learn — water pollution vs air quality",
    cells: "13 células",
  },
];

export default function NotebookPage() {
  const { t, lang, toggle } = useLanguage();
  const [activeTab, setActiveTab] = useState("analises");
  const [notebooks, setNotebooks] = useState<Record<string, NotebookFile>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tab = TABS.find((t) => t.id === activeTab);
    if (!tab || notebooks[activeTab]) return;

    setLoading(true);
    fetch(tab.file)
      .then((r) => r.json())
      .then((data) => {
        setNotebooks((prev) => ({ ...prev, [activeTab]: data }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab, notebooks]);

  const notebook = notebooks[activeTab];

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-[#030712]/90 backdrop-blur-md z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
              ← {lang === "pt" ? "Dashboard" : "Dashboard"}
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-white text-sm font-medium">
              {lang === "pt" ? "Notebooks" : "Notebooks"}
            </span>
          </div>
          <div className="flex items-center gap-4">
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
              GitHub →
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Page title */}
        <div className="mb-10">
          <span className="text-xs font-mono text-green-400 uppercase tracking-widest">
            Jupyter Notebook
          </span>
          <h1 className="text-3xl font-bold text-white mt-2 mb-3">
            {lang === "pt" ? "Análise de Dados em Python" : "Python Data Analysis"}
          </h1>
          <p className="text-gray-400 max-w-2xl">
            {lang === "pt"
              ? "Os notebooks originais do projeto — desenvolvidos como parte do desafio Global Solution 2024 da FIAP. Todo o trabalho de análise foi feito aqui antes do dashboard."
              : "The original project notebooks — built as part of FIAP's Global Solution 2024 challenge. All analysis work happened here before the dashboard."}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative -mb-px ${
                activeTab === tab.id
                  ? "text-white border border-b-[#030712] border-gray-800 bg-[#030712]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    tab.id === "analises" ? "bg-blue-500" : "bg-yellow-500"
                  }`}
                />
                {lang === "pt" ? tab.labelPt : tab.labelEn}
              </span>
            </button>
          ))}
        </div>

        {/* Tab metadata */}
        {(() => {
          const tab = TABS.find((t) => t.id === activeTab)!;
          return (
            <div className="flex flex-wrap items-center gap-4 mb-6 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-600">{tab.cells}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Python", "Pandas", "Matplotlib", tab.id === "ml" ? "Scikit-learn" : "Seaborn"].map((lib) => (
                  <span
                    key={lib}
                    className="px-2 py-0.5 rounded text-xs font-mono text-gray-500 bg-gray-900 border border-gray-800"
                  >
                    {lib}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-xs ml-auto">
                {lang === "pt" ? tab.descPt : tab.descEn}
              </p>
            </div>
          );
        })()}

        {/* Notebook content */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Notebook top bar */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-800 bg-gray-900/50">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs font-mono text-gray-600">
              {activeTab === "analises" ? "analises.ipynb" : "machine-learning.ipynb"}
            </span>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-600 text-sm font-mono">
                {lang === "pt" ? "Carregando notebook..." : "Loading notebook..."}
              </div>
            </div>
          )}

          {!loading && notebook && (
            <NotebookViewer cells={notebook.cells} />
          )}

          {!loading && !notebook && (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-600 text-sm">
                {lang === "pt" ? "Não foi possível carregar o notebook." : "Could not load notebook."}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-sm">
          <span>Blue Future · FIAP Global Solution 2024</span>
          <span>
            {lang === "pt" ? "Desenvolvido por" : "Built by"}{" "}
            <a href="https://github.com/nemcolas" className="text-gray-400 hover:text-white transition-colors">
              Nicolas Martins
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
