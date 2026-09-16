import React, { useState } from 'react';
import { NutrientRiskAssessment } from '@/types';
import { RiskBadge } from '@/components/RiskBadge';
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Utensils,
  Lightbulb,
  Sparkles,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface ResultCardProps {
  nutrient: NutrientRiskAssessment;
}

export function ResultCard({ nutrient }: ResultCardProps) {
  const [expanded, setExpanded] = useState(nutrient.riskLevel !== 'low');

  const cardBorder =
    nutrient.riskLevel === 'elevated'
      ? 'border-rose-200 bg-white hover:border-rose-300'
      : nutrient.riskLevel === 'moderate'
      ? 'border-amber-200 bg-white hover:border-amber-300'
      : 'border-slate-200/90 bg-white hover:border-emerald-200';

  const accentBadgeBg =
    nutrient.riskLevel === 'elevated'
      ? 'bg-rose-50 text-rose-700'
      : nutrient.riskLevel === 'moderate'
      ? 'bg-amber-50 text-amber-800'
      : 'bg-emerald-50 text-emerald-700';

  return (
    <div
      className={`rounded-2xl border ${cardBorder} shadow-xs transition-all overflow-hidden`}
    >
      {/* Header Bar */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {nutrient.name}
              </h3>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${accentBadgeBg}`}>
                {nutrient.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              ICMR Benchmark Target: {nutrient.icmrRDA}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <RiskBadge level={nutrient.riskLevel} size="md" />
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label={expanded ? 'Collapse details' : 'Expand details'}
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Primary Explanation Note */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700 space-y-1.5">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Why this area was flagged: </span>
              <span>{nutrient.reasons.join(' ')}</span>
            </div>
          </div>
        </div>

        {/* Quick Food Badges Preview */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Utensils className="w-3.5 h-3.5 text-emerald-600" />
            Top Foods:
          </span>
          {nutrient.foodRecommendations.slice(0, 3).map((food, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60"
            >
              {food}
            </span>
          ))}
          {nutrient.foodRecommendations.length > 3 && (
            <span className="text-xs text-slate-400 font-medium">
              +{nutrient.foodRecommendations.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Expandable Details Section */}
      {expanded && (
        <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-5 animate-fade-in">
          {/* Linked Inputs and Factors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            {nutrient.dietaryFactors.length > 0 && (
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  Relevant Dietary Inputs
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {nutrient.dietaryFactors.map((df, i) => (
                    <li key={i}>{df}</li>
                  ))}
                </ul>
              </div>
            )}

            {nutrient.symptomIndicators.length > 0 && (
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  Self-Reported Indicators Linked
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {nutrient.symptomIndicators.map((si, i) => (
                    <li key={i}>{si}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Full Food Sources List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              ICMR Recommended Food Sources
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {nutrient.foodRecommendations.map((food, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{food}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Awareness & Bioavailability Tips */}
          {nutrient.awarenessTips.length > 0 && (
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <Lightbulb className="w-4 h-4 text-emerald-700" />
                <span>NutriSense Awareness & Absorption Tips</span>
              </div>
              <ul className="space-y-1 text-emerald-900/90 list-disc list-inside">
                {nutrient.awarenessTips.map((tip, i) => (
                  <li key={i} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Educational guidance only. Not a prescription.</span>
            </div>
            <Link
              href={`/foods?nutrient=${nutrient.nutrientId}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>Explore Foods Rich in {nutrient.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
