import React from 'react';
import { NutrientRiskAssessment } from '@/types';
import { RiskBadge } from '@/components/RiskBadge';

interface NutrientDistributionBarProps {
  nutrients: NutrientRiskAssessment[];
}

export function NutrientDistributionBar({ nutrients }: NutrientDistributionBarProps) {
  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          Individual Nutrient Risk Breakdown
        </h3>
        <p className="text-xs text-slate-500">
          Evaluated against ICMR-NIN 2024 dietary intake recommendations and self-reported indicators
        </p>
      </div>

      <div className="space-y-4">
        {nutrients.map((n) => {
          const riskColor =
            n.riskLevel === 'elevated'
              ? 'bg-rose-500'
              : n.riskLevel === 'moderate'
              ? 'bg-amber-500'
              : 'bg-emerald-500';

          const textColor =
            n.riskLevel === 'elevated'
              ? 'text-rose-700'
              : n.riskLevel === 'moderate'
              ? 'text-amber-700'
              : 'text-emerald-700';

          return (
            <div key={n.nutrientId} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-sm">{n.name}</span>
                  <span className="text-slate-400">({n.category})</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RiskBadge level={n.riskLevel} size="sm" />
                  <span className={`font-mono font-bold ${textColor}`}>
                    {n.riskScore}/100 Risk
                  </span>
                </div>
              </div>

              {/* Stacked Progress Bar */}
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className={`h-full ${riskColor} transition-all duration-500 rounded-full`}
                  style={{ width: `${Math.max(5, n.riskScore)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>ICMR Benchmark: {n.icmrRDA}</span>
                <span>Adequacy: {n.adequacyScore}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
