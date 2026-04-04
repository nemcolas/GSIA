export type Lang = "pt" | "en";

export const translations = {
  pt: {
    nav: {
      title: "Blue Future",
      subtitle: "/ Dashboard de Plásticos",
      github: "GitHub →",
      toggle: "EN",
    },
    hero: {
      badge: "🌊 Global Solution — FIAP 2024 · #salveasbaleia",
      title1: "A produção global de plástico",
      title2: "cresceu 230× em 70 anos.",
      description:
        "Este projeto transforma 5 datasets CSV e uma análise de machine learning em um painel interativo — desenvolvido em Python com Jupyter Notebook como parte do desafio Global Solution 2024 da FIAP.",
      cta_data: "Explorar os dados",
      cta_process: "Ver o processo",
      cta_ml: "Ver modelo de ML",
    },
    metrics: [
      { value: "460M", label: "Toneladas produzidas em 2019", trend: "+47% vs 2010" },
      { value: "9%", label: "De todo plástico já reciclado", trend: "Apenas 9% desde 1950" },
      { value: "8M", label: "Ton. entram nos oceanos/ano", trend: "1 caminhão por minuto" },
      { value: "R²=0.20", label: "Correlação água→qualidade do ar", trend: "Modelo baseline de ML" },
    ],
    process: {
      tag: "Processo",
      title: "Como analisei os dados",
      subtitle:
        "Todo o pipeline de dados foi desenvolvido em Python usando Jupyter Notebook — da coleta e limpeza dos CSVs até o modelo de Machine Learning.",
      stack_title: "Stack utilizada",
      flow_title: "Fluxo de análise",
      flow: [
        {
          step: "01",
          title: "Coleta & Limpeza",
          desc: "5 datasets CSV do Our World in Data. Remoção de nulos, normalização de nomes de países e padronização de unidades com Pandas.",
        },
        {
          step: "02",
          title: "Análise Exploratória",
          desc: "Estatísticas descritivas, identificação de tendências temporais e correlações entre variáveis ambientais com Pandas e Matplotlib.",
        },
        {
          step: "03",
          title: "Visualizações",
          desc: "Gráficos de linha, barras e dispersão para comunicar padrões. Foco em clareza para um público não técnico.",
        },
        {
          step: "04",
          title: "Modelo de ML",
          desc: "Regressão Linear com Scikit-learn para prever qualidade do ar a partir de poluição da água. Train/test split 67/33.",
        },
      ],
      snippets: [
        {
          label: "Limpeza dos dados",
          lang: "python",
          code: `import pandas as pd

df = pd.read_csv("plastic-waste-per-capita.csv")

# Remove linhas sem dados de descarte
df = df.dropna(subset=["waste_kg_per_person_per_day"])

# Filtra países com população > 1 milhão
df = df[df["population"] > 1_000_000]

print(f"Dataset: {len(df)} registros, {df['country'].nunique()} países")`,
        },
        {
          label: "Modelo de ML",
          lang: "python",
          code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

X = df[["water_pollution_index"]]
y = df["air_quality_index"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.33, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"R²: {r2_score(y_test, y_pred):.2f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.2f}")`,
        },
      ],
      notebook_cta: "Ver notebook completo no GitHub",
    },
    charts: {
      tag: "Análise de Dados",
      title: "70 anos de dados, três perspectivas",
      production: {
        title: "Produção Global de Plástico (1950–2019)",
        subtitle: "De 2 milhões para 460 milhões de toneladas em 70 anos — um aumento de 230×.",
        tooltip_year: "Ano",
        tooltip_value: "M toneladas métricas",
      },
      disposal: {
        title: "Métodos de Descarte de Plástico (Global)",
        subtitle: "Apenas 9% de todo o plástico já produzido foi reciclado.",
        tooltip_suffix: "de todo o plástico produzido",
      },
      countries: {
        title: "Resíduo Plástico per Capita (kg/pessoa/dia)",
        subtitle: "Países de alta renda dominam o descarte per capita. O Brasil gera 3× menos que a Alemanha.",
        tooltip_unit: "kg por pessoa/dia",
      },
    },
    ml: {
      tag: "Machine Learning",
      title: "Prevendo Qualidade do Ar a partir de Poluição da Água",
      description:
        "Um modelo de Regressão Linear foi treinado com índices de poluição da água e qualidade do ar em diferentes países. O modelo revela uma correlação estatisticamente significativa — embora uma única variável não conte toda a história.",
      r2_label: "Coeficiente de determinação",
      r2_footnote: "Explica 20% da variância na qualidade do ar",
      mse_label: "Erro Quadrático Médio (MSE)",
      mse_footnote: "Erro em unidades quadradas do Índice de Qualidade do Ar",
      model_label: "Modelo",
      feature_label: "Feature",
      target_label: "Alvo",
      split_label: "Treino/Teste",
      seed_label: "Seed aleatória",
      chart_title: "Valores Reais vs Previstos",
      chart_subtitle:
        "Previsões vs valores reais. Um modelo perfeito teria todos os pontos na diagonal.",
      axis_water: "Índice de Poluição da Água",
      axis_air: "Índice de Qualidade do Ar",
      legend_actual: "Real",
      legend_predicted: "Previsto",
      interpretation_title: "O que significa R² = 0,20",
      interpretation:
        "O modelo explica 20% da variância na qualidade do ar usando somente poluição da água. Isso confirma que água e ar são indicadores correlacionados de saúde ambiental — mas um modelo multivariado com volume de produção de plástico e métodos de descarte melhoraria muito o poder preditivo.",
      next_title: "Próximos passos para melhorar",
      next_steps: [
        "Adicionar volume de produção de plástico como feature",
        "Incluir distribuição de métodos de descarte por país",
        "Testar Random Forest ou Gradient Boosting para relações não lineares",
        "Usar K-fold cross-validation para estimativas de desempenho mais confiáveis",
      ],
    },
    sources: {
      title: "Fontes de Dados",
      items: [
        "Produção Global de Plástico (1950–2019)",
        "Emissões de Plástico nos Oceanos por País",
        "Métodos de Descarte de Resíduos Plásticos",
        "Resíduo Plástico per Capita",
        "Poluição da Água por Cidade/País",
      ],
      footnote:
        "Dados coletados e analisados em Python (Pandas, Scikit-learn) como parte do desafio Global Solution 2024 da FIAP. Dashboard construído com Next.js + Recharts.",
    },
    footer: {
      left: "Blue Future · FIAP Global Solution 2024",
      built_by: "Desenvolvido por",
      tech: "Next.js + Recharts",
    },
  },

  en: {
    nav: {
      title: "Blue Future",
      subtitle: "/ Plastics Dashboard",
      github: "GitHub →",
      toggle: "PT",
    },
    hero: {
      badge: "🌊 Global Solution — FIAP 2024 · #salveasbaleia",
      title1: "Global plastic production",
      title2: "grew 230× in 70 years.",
      description:
        "This project transforms 5 CSV datasets and a machine learning analysis into an interactive dashboard — built in Python with Jupyter Notebook as part of FIAP's Global Solution 2024 challenge.",
      cta_data: "Explore the data",
      cta_process: "See the process",
      cta_ml: "See ML model",
    },
    metrics: [
      { value: "460M", label: "Metric tons produced in 2019", trend: "+47% vs 2010" },
      { value: "9%", label: "Of all plastic ever recycled", trend: "Only 9% since 1950" },
      { value: "8M", label: "Metric tons enter oceans/year", trend: "1 truck per minute" },
      { value: "R²=0.20", label: "Water→Air quality correlation", trend: "ML baseline model" },
    ],
    process: {
      tag: "Process",
      title: "How I analyzed the data",
      subtitle:
        "The entire data pipeline was built in Python using Jupyter Notebook — from collecting and cleaning the CSVs to the Machine Learning model.",
      stack_title: "Stack used",
      flow_title: "Analysis flow",
      flow: [
        {
          step: "01",
          title: "Collection & Cleaning",
          desc: "5 CSV datasets from Our World in Data. Null removal, country name normalization and unit standardization with Pandas.",
        },
        {
          step: "02",
          title: "Exploratory Analysis",
          desc: "Descriptive statistics, temporal trend identification and correlation analysis between environmental variables with Pandas and Matplotlib.",
        },
        {
          step: "03",
          title: "Visualizations",
          desc: "Line, bar, and scatter charts to communicate patterns. Focus on clarity for a non-technical audience.",
        },
        {
          step: "04",
          title: "ML Model",
          desc: "Linear Regression with Scikit-learn to predict air quality from water pollution. 67/33 train/test split.",
        },
      ],
      snippets: [
        {
          label: "Data cleaning",
          lang: "python",
          code: `import pandas as pd

df = pd.read_csv("plastic-waste-per-capita.csv")

# Drop rows missing disposal data
df = df.dropna(subset=["waste_kg_per_person_per_day"])

# Keep countries with population > 1 million
df = df[df["population"] > 1_000_000]

print(f"Dataset: {len(df)} records, {df['country'].nunique()} countries")`,
        },
        {
          label: "ML model",
          lang: "python",
          code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

X = df[["water_pollution_index"]]
y = df["air_quality_index"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.33, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"R²: {r2_score(y_test, y_pred):.2f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.2f}")`,
        },
      ],
      notebook_cta: "View full notebook on GitHub",
    },
    charts: {
      tag: "Data Analysis",
      title: "70 years of data, three perspectives",
      production: {
        title: "Global Plastic Production (1950–2019)",
        subtitle: "From 2 million to 460 million metric tons in 70 years — a 230× increase.",
        tooltip_year: "Year",
        tooltip_value: "M metric tons",
      },
      disposal: {
        title: "Plastic Disposal Methods (Global)",
        subtitle: "Only 9% of all plastic ever produced has been recycled.",
        tooltip_suffix: "of all plastic produced",
      },
      countries: {
        title: "Per-Capita Plastic Waste (kg/person/day)",
        subtitle: "High-income countries dominate per-capita waste. Brazil generates 3× less than Germany.",
        tooltip_unit: "kg per person/day",
      },
    },
    ml: {
      tag: "Machine Learning",
      title: "Predicting Air Quality from Water Pollution",
      description:
        "A Linear Regression model was trained on water pollution and air quality indices across countries. The model reveals a statistically significant correlation — though a single feature can only tell part of the story.",
      r2_label: "Coefficient of determination",
      r2_footnote: "Explains 20% of air quality variance",
      mse_label: "Mean Squared Error (MSE)",
      mse_footnote: "Error in squared Air Quality Index units",
      model_label: "Model",
      feature_label: "Feature",
      target_label: "Target",
      split_label: "Train/Test",
      seed_label: "Random seed",
      chart_title: "Actual vs Predicted Air Quality",
      chart_subtitle:
        "Sample predictions vs ground truth. A perfect model would have all points on the diagonal.",
      axis_water: "Water Pollution Index",
      axis_air: "Air Quality Index",
      legend_actual: "Actual",
      legend_predicted: "Predicted",
      interpretation_title: "What R² = 0.20 means",
      interpretation:
        "The model explains 20% of variance in air quality from water pollution alone. This confirms that water and air quality are correlated indicators of overall environmental health — but a multivariate model incorporating plastic production volume and disposal methods would significantly improve predictive power.",
      next_title: "Next steps to improve",
      next_steps: [
        "Add plastic production volume as a feature",
        "Include disposal method distribution per country",
        "Try Random Forest or Gradient Boosting for non-linear relationships",
        "Use K-fold cross-validation for more reliable performance estimates",
      ],
    },
    sources: {
      title: "Data Sources",
      items: [
        "Global Plastic Production (1950–2019)",
        "Ocean Plastic Emissions by Country",
        "Plastic Waste Disposal Methods",
        "Per-Capita Plastic Waste",
        "Water Pollution by City/Country",
      ],
      footnote:
        "Original data collected and analyzed in Python (Pandas, Scikit-learn) as part of FIAP's Global Solution 2024 challenge. Dashboard layer built with Next.js + Recharts.",
    },
    footer: {
      left: "Blue Future · FIAP Global Solution 2024",
      built_by: "Built by",
      tech: "Next.js + Recharts",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
