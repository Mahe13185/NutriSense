# 🥗 NutriSense

### Smart Nutritional Deficiency Detection & Awareness Portal

<p align="center">
  <strong>Understand Your Nutrition. Build Better Habits.</strong>
</p>

<p align="center">
  A smart, explainable web-based nutrition assessment platform designed to help users understand their dietary patterns and identify possible nutritional risk areas.
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge\&logo=next.js\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Data_Visualization-22C55E?style=for-the-badge)
![License](https://img.shields.io/badge/License-Academic_Prototype-orange?style=for-the-badge)

</p>

---

## 🌱 About NutriSense

**NutriSense** is an academic prototype developed to address the lack of simple, accessible nutrition-awareness tools for individuals.

Many people may not recognize that their dietary habits can be associated with inadequate intake of essential nutrients such as:

* 🩸 Iron
* 🧠 Vitamin B12
* ☀️ Vitamin D
* 🦴 Calcium
* 🥕 Vitamin A
* 🌿 Folate
* 💪 Protein

NutriSense collects information about a user's **basic profile, dietary habits, lifestyle factors, and selected self-reported symptoms** and analyzes the responses using an **explainable rule-based assessment engine**.

The system then presents possible nutritional risk areas along with understandable explanations, food-group recommendations, and nutrition-awareness guidance.

> **NutriSense is an awareness and preliminary risk-indication platform. It does not diagnose nutritional deficiencies or replace professional medical evaluation.**

---

# ✨ Key Features

### 🧾 Smart Nutrition Assessment

A guided multi-step questionnaire collects:

* Basic information
* Dietary preferences
* Food consumption frequency
* Lifestyle information
* Selected self-reported symptoms

The assessment is designed to be simple enough for a general user to understand.

---

### 🧠 Explainable Risk Assessment

NutriSense uses a transparent rule-based assessment engine rather than a black-box prediction.

```text
User Information
       ↓
Dietary Patterns
       ↓
Lifestyle & Symptoms
       ↓
Assessment Rules
       ↓
Possible Nutritional Risk
       ↓
Explanation + Recommendations
```

Each result can explain **why a nutritional area was flagged**.

---

### 📊 Nutrition Risk Dashboard

The results dashboard provides:

* Nutrition risk overview
* Nutrient-specific indications
* Visual charts
* Explanations
* Relevant dietary factors
* Food recommendations
* Next-step awareness guidance

Risk terminology is intentionally limited to:

**Low → Moderate → Elevated**

---

### 🍎 Food & Nutrition Explorer

Explore commonly available food sources and filter them by nutritional area.

Supported categories include:

* Iron
* Vitamin B12
* Vitamin D
* Calcium
* Vitamin A
* Folate
* Protein

Users can also filter foods based on dietary preferences.

---

### 📚 Guidelines & Methodology

NutriSense provides a dedicated section explaining:

* What information is collected
* What factors are considered
* How the assessment works
* How recommendations are generated
* The project's reference sources
* System limitations

The project primarily references:

**ICMR – National Institute of Nutrition (ICMR-NIN)**
*Dietary Guidelines for Indians, 2024*

and supporting guidance from:

**World Health Organization (WHO)**
*Healthy Diet guidance*

---

### 🔒 Privacy-First Prototype

The current prototype does not require:

* User accounts
* Login
* Cloud database
* Personal health-data server
* External AI APIs

Assessment information is handled locally in the browser using `localStorage`.

---

# 🖥️ Application Flow

```text
                 ┌──────────────────┐
                 │   Landing Page   │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Start Assessment│
                 └────────┬─────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │    Basic Information   │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │    Dietary Habits      │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ Symptoms & Lifestyle    │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │    Review Responses     │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Assessment Engine      │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │     Results Dashboard   │
              └────────────┬───────────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
        Food Recommendations   Nutrition Awareness
```

---

# 🏗️ Architecture

NutriSense is intentionally designed as a lightweight frontend-first prototype.

```text
┌─────────────────────────────────────────────┐
│                 NEXT.JS APP                 │
│                                             │
│  Pages                                      │
│  Components                                 │
│  Assessment UI                              │
│  Results Dashboard                          │
│  Food Explorer                              │
│  Guidelines                                 │
│                                             │
└───────────────────┬─────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│             LOCAL DATA LAYER                │
│                                             │
│ Questions │ Nutrients │ Foods │ Guidelines  │
│ Assessment Rules                            │
└───────────────────┬─────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│          ASSESSMENT ENGINE                  │
│                                             │
│ Response Processing                         │
│ Rule Evaluation                             │
│ Risk Indication                             │
│ Explanations                                │
│ Recommendations                             │
└───────────────────┬─────────────────────────┘
                    │
                    ▼
              Browser Storage
               localStorage
```

---

# 🧰 Tech Stack

| Technology          | Purpose                      |
| ------------------- | ---------------------------- |
| **Next.js**         | Application framework        |
| **React**           | UI development               |
| **TypeScript**      | Type-safe development        |
| **Tailwind CSS**    | Styling and responsive UI    |
| **Lucide React**    | Icons                        |
| **Recharts**        | Nutrition data visualization |
| **React Hook Form** | Form management              |
| **Zod**             | Form validation              |
| **localStorage**    | Local assessment persistence |

---

# 📁 Project Structure

```text
NutriSense/
│
├── app/
│   ├── page.tsx
│   ├── assessment/
│   │   └── page.tsx
│   ├── results/
│   │   └── page.tsx
│   ├── guidelines/
│   │   └── page.tsx
│   ├── foods/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── DisclaimerBanner.tsx
│   ├── AssessmentProgress.tsx
│   ├── QuestionCard.tsx
│   ├── ResultCard.tsx
│   ├── RiskBadge.tsx
│   ├── FoodCard.tsx
│   ├── GuidelineCard.tsx
│   └── NutritionRadarChart.tsx
│
├── data/
│   ├── nutrients.ts
│   ├── questions.ts
│   ├── foods.ts
│   ├── guidelines.ts
│   └── assessmentRules.ts
│
├── lib/
│   ├── assessmentEngine.ts
│   ├── storage.ts
│   └── utils.ts
│
├── types/
│   └── index.ts
│
├── public/
│
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm

Check your versions:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Mahe13185/NutriSense.git
```

Move into the project:

```bash
cd NutriSense
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Build Verification

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

---

# 📋 Assessment Methodology

The assessment process follows an explainable workflow.

### 1. Basic Information

The system collects basic contextual information such as:

* Age
* Sex
* Height
* Weight
* Activity level
* Dietary preference

### 2. Dietary Habits

The user provides consumption frequency for selected food groups including:

* Fruits
* Vegetables
* Green leafy vegetables
* Pulses and legumes
* Dairy or alternatives
* Eggs/meat/fish
* Nuts and seeds
* Whole grains/millets
* Fortified foods

### 3. Symptoms & Lifestyle

Selected self-reported indicators are collected to provide additional context.

### 4. Rule-Based Analysis

Responses are evaluated against predefined prototype assessment rules.

### 5. Risk Indication

The system generates nutrient-specific indications:

```text
Low
Moderate
Elevated
```

### 6. Explanation

The system explains relevant factors that contributed to the indication.

### 7. Awareness Recommendations

The user receives general dietary and lifestyle awareness suggestions.

---

# 📚 Reference Guidelines

NutriSense uses nutrition guidance from recognized sources as the basis for its informational content.

### 🇮🇳 ICMR – National Institute of Nutrition

**Dietary Guidelines for Indians — 2024**

Primary reference for Indian dietary guidance and nutrition awareness.

[ICMR-NIN Dietary Guidelines for Indians 2024](https://nin.res.in/dietaryguidelines/pdfjs/locale/DGI_2024.pdf)

### 🌍 World Health Organization

Supporting reference for healthy-diet principles and general nutrition guidance.

[WHO — Healthy Diet](https://www.who.int/news-room/fact-sheets/detail/healthy-diet)

---

# ⚠️ Important Disclaimer

NutriSense is an **academic prototype for nutrition awareness and preliminary nutritional risk indication**.

It:

* Does not diagnose nutritional deficiencies.
* Does not provide medical diagnoses.
* Does not replace laboratory testing.
* Does not replace consultation with a qualified healthcare professional.
* Relies on information provided by the user.
* Should not be used to make medical decisions without professional guidance.

If a user has persistent or concerning symptoms, they should seek appropriate professional medical evaluation.

---

# 🎓 Academic Context

**Project:** NutriSense — Smart Nutritional Deficiency Detection and Awareness Portal

**Purpose:** Academic / CSP Prototype

The project demonstrates how a web-based system can combine:

```text
User Input
    +
Nutrition Knowledge
    +
Explainable Assessment Rules
    +
Data Visualization
    +
Food Awareness
```

to create an accessible nutrition-awareness experience.

---

# 🔐 Supabase Authentication & PostgreSQL Storage

NutriSense integrates **Supabase** for secure user authentication and persistent cloud storage of profiles and assessment history:

* **Authentication**: Email & password authentication with session persistence and React Context (`useAuth`).
* **Database Tables**:
  - `profiles`: User demographics and baseline dietary preferences.
  - `assessments`: Timestamped snapshots of completed assessment input data (`assessment_data`) and rule engine output (`result_data`).
* **Row Level Security (RLS)**: Enforced on all tables to ensure users can only read, write, and manage their own records. Cross-account access is strictly prevented.
* **Client-Side Assessment Engine**: The rule-based assessment engine remains completely client-side and is informed by documented nutrition references including ICMR-NIN (2024).

### Environment Setup

Create `.env.local` in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

For complete database schema and setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) and [`supabase/schema.sql`](./supabase/schema.sql).

---

# 🔮 Future Scope

The current implementation provides a complete interactive prototype with cloud authentication and persistence.

A future version could introduce:

* 🤖 Machine-learning-based risk prediction
* 📱 Progressive Web App / mobile application
* 📈 Long-term multi-month nutrition trend analysis
* 🧪 Integration with verified laboratory data
* 👨‍⚕️ Professional consultation workflows
* 🌐 Regional language support
* 🧠 AI-powered nutrition education assistant
* 🔄 Personalized meal planning
* 📊 Population-level anonymized nutrition insights

Any future ML/clinical functionality would require appropriate datasets, validation, privacy safeguards, and domain expertise before being used for real-world health decisions.

---

# 🤝 Contributing

This project is currently being developed as an academic prototype.

Suggestions, improvements, and contributions are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

---

# ⭐ Project Vision

> **Nutrition awareness should be simple, understandable, and accessible.**

NutriSense aims to turn everyday dietary information into meaningful nutritional awareness while keeping the reasoning transparent and the limitations clear.

---

<p align="center">
  <strong>🥗 NutriSense</strong>
  <br>
  <sub>Understand Your Nutrition. Build Better Habits.</sub>
</p>

<p align="center">
  Built as an academic CSP project with ❤️ using Next.js & TypeScript.
</p>

## Team Workflow

This project follows a collaborative Git workflow using feature branches and pull requests.