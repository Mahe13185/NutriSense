import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Heart,
  BookOpen,
  CheckCircle2,
  Utensils,
  Leaf,
  Compass,
  FileCheck,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Lock,
} from 'lucide-react';
import { NUTRIENTS_DATA } from '@/data/nutrients';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { SectionHeader } from '@/components/SectionHeader';

export default function LandingPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-12 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Academic Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Aligned with ICMR-NIN (2024) Dietary Guidelines for Indians</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Understand Your Nutrition.{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                Build Better Habits.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              A smart, rule-based nutrition awareness platform that evaluates your dietary habits and self-reported lifestyle factors to highlight possible micronutrient risk areas with evidence-backed dietary recommendations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all active:scale-98"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Free Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/guidelines"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Explore Guidelines</span>
              </Link>
            </div>

            {/* Hero Trust Micro-Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Non-Diagnostic Awareness</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-teal-600" />
                <span>100% Local & Private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Rule-Based Transparency</span>
              </div>
            </div>
          </div>

          {/* Prominent Health Disclaimer Banner */}
          <div className="mt-10 max-w-4xl mx-auto">
            <DisclaimerBanner variant="full" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HOW IT WORKS */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-white to-slate-50/60 rounded-3xl border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-xs space-y-10">
          <SectionHeader
            centered
            badge="Simple 4-Step Process"
            title="How NutriSense Evaluates Your Nutritional Patterns"
            subtitle="Our structured workflow compares your self-reported dietary habits with Indian dietary benchmarks to provide explainable preliminary risk indications."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-xs">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Demographics & Diet Type
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide basic information (age, sex, height, weight, activity level, and vegetarian/vegan/non-veg dietary pattern).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm shadow-xs">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Dietary Frequency Mapping
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share consumption frequency across 9 key food groups (greens, pulses, dairy, whole grains, fruits, seeds, fortified items).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center text-sm shadow-xs">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Self-Reported Indicators
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Report physical cues (fatigue, pale appearance, cramps) along with sunlight exposure and mealtime tea/coffee habits.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Actionable Awareness Report
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive interactive radar charts, explainable risk indications, nutrient synergies, and ICMR food recommendations.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>Take the 3-minute assessment now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SUPPORTED NUTRITION AREAS */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="7 Core Micronutrients & Macros"
          title="Essential Nutrition Areas Analyzed"
          subtitle="Explore the key vitamins, minerals, and macronutrients evaluated in our rule-based scoring engine."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NUTRIENTS_DATA.map((nutrient) => (
            <div
              key={nutrient.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-card-hover transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {nutrient.category}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    ICMR RDA Target
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {nutrient.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {nutrient.tagline}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <span className="font-semibold text-slate-800">Primary Role:</span>
                  <p className="text-slate-600">{nutrient.keyFunctions[0]}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium truncate max-w-[180px]">
                  RDA: {nutrient.icmrRda.general.split('(')[0]}
                </span>
                <Link
                  href={`/foods?nutrient=${nutrient.id}`}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>Foods</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CORE FEATURES & PRIVACY */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Evidence-Based Benchmarks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Rules and recommendations are derived from the ICMR-NIN 2024 Dietary Guidelines for Indians and WHO Healthy Diet principles, incorporating bioavailable food pairings.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Explainable Rule Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No black-box algorithms. Every flagged risk area provides clear reasoning highlighting the exact dietary frequency gap or self-reported indicator that triggered it.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No server logging, database storage, or external AI APIs. Your data remains strictly in your browser session with localStorage persistence.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CALL TO ACTION */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready in 3 Minutes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Begin Your Nutritional Self-Assessment Today
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Discover which food groups your diet excels in and where simple, traditional dietary additions could enhance your daily vitality.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg transition-all active:scale-98"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/foods"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all"
              >
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span>Explore 45+ Superfoods</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
