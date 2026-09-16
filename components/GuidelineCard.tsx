import React from 'react';
import { GuidelineSection } from '@/types';
import { ExternalLink, CheckCircle2, Lightbulb } from 'lucide-react';

interface GuidelineCardProps {
  guideline: GuidelineSection;
}

export function GuidelineCard({ guideline }: GuidelineCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-card transition-all space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            {guideline.badge}
          </span>
          <a
            href={guideline.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            <span>Official Guidelines Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
          {guideline.title}
        </h3>
        <p className="text-xs text-slate-500 font-medium">Source: {guideline.source}</p>
        <p className="text-sm text-slate-700 leading-relaxed pt-1">
          {guideline.summary}
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Core Dietary Benchmarks
        </h4>
        <div className="space-y-2.5">
          {guideline.keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Action Tips */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Practical Action Insights:</span>
        </div>
        <ul className="space-y-1 text-slate-600 list-disc list-inside">
          {guideline.practicalTips.map((tip, i) => (
            <li key={i} className="leading-relaxed">
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
