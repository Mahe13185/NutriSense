'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AssessmentResult } from '@/types';
import { getLatestAssessmentResult } from '@/lib/storage';
import { getAssessmentById } from '@/lib/supabaseStorage';
import { evaluateAssessment } from '@/lib/assessmentEngine';
import { ResultCard } from '@/components/ResultCard';
import { NutritionRadarChart } from '@/components/NutritionRadarChart';
import { NutrientDistributionBar } from '@/components/NutrientDistributionBar';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Printer,
  Apple,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
  Share2,
} from 'lucide-react';

function ResultsContent() {
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get('id');

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function loadResult() {
      setLoading(true);

      // 1. If an assessment ID was provided in the query string, fetch from Supabase
      if (assessmentId) {
        const { data: cloudRecord, error } = await getAssessmentById(assessmentId);
        if (cloudRecord?.result_data) {
          setResult(cloudRecord.result_data);
          setLoading(false);
          return;
        }
      }

      // 2. Attempt to load latest result from localStorage
      const saved = getLatestAssessmentResult();
      if (saved) {
        setResult(saved);
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#10b981', '#0d9488', '#059669', '#3b82f6'],
          });
        } catch (e) {
          // Ignore in environments without canvas
        }
      } else {
        // 3. Fallback sample assessment if accessed directly without submission
        const sampleEvaluation = evaluateAssessment({
          basicInfo: {
            age: 26,
            sex: 'female',
            heightCm: 165,
            weightKg: 58,
            activityLevel: 'moderately_active',
            dietaryPreference: 'vegetarian',
          },
          dietaryHabits: {
            fruits: '1-3_per_week',
            vegetables: '4-6_per_week',
            greenLeafy: '1-3_per_week',
            pulsesLegumes: '4-6_per_week',
            dairyOrAlternatives: '1-3_per_week',
            eggsMeatFish: 'never',
            nutsSeeds: 'rarely',
            wholeGrainsMillets: '4-6_per_week',
            fortifiedFoods: 'rarely',
          },
          symptomsLifestyle: {
            frequentFatigue: 'frequently',
            generalWeakness: 'sometimes',
            difficultyConcentrating: 'sometimes',
            paleAppearance: 'sometimes',
            muscleCrampsWeakness: 'sometimes',
            hairSkinChanges: 'sometimes',
            poorAppetite: 'rarely',
            sunExposure: 'minimal_rare',
            teaCoffeeWithMeals: 'often',
            sleepQuality: 'average',
          },
        });
        setResult(sampleEvaluation);
      }
      setLoading(false);
    }

    loadResult();
  }, [assessmentId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Generating your nutritional report...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const elevatedCount = result.nutrients.filter((n) => n.riskLevel === 'elevated').length;
  const moderateCount = result.nutrients.filter((n) => n.riskLevel === 'moderate').length;
  const lowCount = result.nutrients.filter((n) => n.riskLevel === 'low').length;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `NutriSense Assessment Report:
Flagged Focus Areas: ${result.topRiskAreas.join(', ')}
Total Evaluated Nutrients: 7
(Preliminary educational indication - Not a medical diagnosis)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header & Quick Action Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/90 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Generated Report
            </span>
            <span className="text-xs text-slate-400">
              {new Date(result.timestamp).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Nutritional Risk & Dietary Awareness Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Self-assessment synthesis informed by documented nutrition references including ICMR-NIN (2024).
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied ? 'Summary Copied!' : 'Share Summary'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Report</span>
          </button>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </Link>
        </div>
      </div>

      {/* Prominent Non-Diagnostic Notice */}
      <DisclaimerBanner variant="full" />

      {/* OVERVIEW METRIC TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Breakdown Summary */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Nutritional Risk Overview
            </span>
            <h3 className="text-xl font-bold text-emerald-400">
              Status Summary
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {result.overallRiskSummary}
          </p>
          <div className="pt-2 border-t border-slate-700/80 flex items-center gap-2 text-xs text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Mapped across 7 key nutrient clusters</span>
          </div>
        </div>

        {/* Risk Distribution Summary */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Nutrient Risk Breakdown
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Evaluated Status Indicators
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50 border border-rose-100">
              <span className="font-semibold text-rose-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Elevated Risk Indication
              </span>
              <span className="font-bold text-rose-900">{elevatedCount} areas</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 border border-amber-100">
              <span className="font-semibold text-amber-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Moderate Risk Indication
              </span>
              <span className="font-bold text-amber-900">{moderateCount} areas</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Low Risk Indication
              </span>
              <span className="font-bold text-emerald-900">{lowCount} areas</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            *Indications reflect frequency deficits and self-reported cues.
          </p>
        </div>

        {/* Top Flagged Focus Areas */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Primary Awareness Focus
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Key Areas to Prioritize
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.topRiskAreas.map((area, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
            <span className="font-bold block">Quick Reference Tip:</span>
            <p className="text-slate-700 leading-snug">
              Enhance meal diversity with sprouted pulses, daily leafy greens, and midday sunlight exposure.
            </p>
          </div>
        </div>
      </div>

      {/* VISUAL CHARTS SECTION (Recharts Radar + Bar Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionRadarChart nutrients={result.nutrients} />
        <NutrientDistributionBar nutrients={result.nutrients} />
      </div>

      {/* DETAILED NUTRIENT RISK CARDS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Individual Nutrient Profiles & Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Detailed explanations of why each nutrient was flagged along with targeted whole-food sources.
            </p>
          </div>
          <Link
            href="/foods"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <Apple className="w-4 h-4" />
            <span>Search All 45+ Foods in Database</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {result.nutrients.map((nut) => (
            <ResultCard key={nut.nutrientId} nutrient={nut} />
          ))}
        </div>
      </div>

      {/* ACTIONABLE NEXT STEPS & LIFESTYLE HABITS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-lg">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Actionable Roadmap</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            What You Can Do Next: Building Sustainable Nutrition Habits
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Practical lifestyle and dietary steps informed by documented references including ICMR-NIN (2024) to systematically improve nutrient density and absorption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              1. Adopt the 100g Green Leafy & 400g Veggie Target
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Incorporate drumstick (moringa) leaves, spinach, or methi into daily dals. Pair them with lemon juice (Vitamin C) to overcome phytate barriers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              2. 45-Minute Tea/Coffee Separation Window
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Avoid having strong chai or coffee immediately with lunch or dinner. Allowing an hour gap ensures polyphenols do not bind to iron and zinc.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-teal-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              3. Sensible Midday Sunlight & Fortified Foods
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spend 15–20 minutes in midday sun (11 AM – 2 PM) without heavy sunscreen on arms/face, and choose FSSAI +F certified milk and edible oils.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-teal-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              4. Consult Healthcare Professionals When Indicated
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If self-reported fatigue or muscle weakness persists, schedule a consultation with a registered doctor for standard laboratory blood panels.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/guidelines"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read ICMR-NIN 2024 Dietary Guidelines & Methodology</span>
          </Link>
          <Link
            href="/foods"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
          >
            <span>Explore Recommended Foods</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
