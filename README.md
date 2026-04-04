# Blue Future — Global Plastic Waste Intelligence Dashboard

> Jupyter notebooks transformed into an interactive decision-support web app.

Analyzes global plastic production, disposal methods, per-capita waste by country,
and an ML model predicting air quality from water pollution data.

**Original research:** [github.com/nemcolas/GSIA](https://github.com/nemcolas/GSIA)

## What this is

The original project (`GSIA`) was a FIAP Global Solution challenge: 5 CSV datasets +
2 Jupyter notebooks analyzing plastic pollution with Python, Pandas, and Scikit-learn.

This dashboard is the product layer on top — a Next.js web app that makes the analysis
accessible to non-technical users with interactive Recharts visualizations.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Data | Pre-processed JSON |
| Deploy | Vercel |

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Static export
```

## Key Findings

- Plastic production: 2M tons (1950) → 460M tons (2019) — a 230x increase
- Only 9% of all plastic ever produced has been recycled
- Linear Regression R² = 0.20 — water/air quality are correlated

## Architecture

```
src/
├── app/page.tsx               # Dashboard composition
├── components/
│   ├── ProductionChart.tsx    # Line chart: production 1950-2019
│   ├── DisposalChart.tsx      # Pie chart: disposal methods
│   ├── CountriesChart.tsx     # Bar chart: per-capita waste by country
│   └── MLSection.tsx          # ML model results + scatter plot
└── data/
    ├── production.json
    ├── disposal.json
    ├── countries.json
    └── ml-results.json
```

## Original Team (FIAP Global Solution 2024)

- Ander Kamada (RM553449)
- Nicolas Martins (RM553478)
- Yago Lucas Gonçalves (RM553013)

## License

MIT
