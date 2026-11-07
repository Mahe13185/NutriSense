'use client';

import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { NutrientRiskAssessment } from '@/types';
import { useTranslation } from '@/lib/language-context';

interface NutritionRadarChartProps {
  nutrients: NutrientRiskAssessment[];
}

export function NutritionRadarChart({ nutrients }: NutritionRadarChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-200">
        <div className="text-xs text-slate-400 font-medium animate-pulse">
          {t('common.loading')}
        </div>
      </div>
    );
  }

  // Format data for radar chart: Map adequacy score (0-100) and risk score (0-100)
  const chartData = nutrients.map((n) => {
    const localizedName = t(`nutrients.${n.nutrientId}`) || n.name;
    const shortName = localizedName.split(' ')[0];

    return {
      subject: shortName,
      adequacy: n.adequacyScore,
      risk: n.riskScore,
      fullName: localizedName,
      status: n.statusLabel,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-bold text-emerald-400 text-sm">{data.fullName}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-300">{t('results.intakeScore')}:</span>
            <span className="font-semibold text-emerald-300">{data.adequacy} / 100</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-300">{t('results.scoreLabel')}:</span>
            <span className="font-semibold text-amber-300">{data.risk} / 100</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {t('results.radarTitle')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('results.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/80" />
            <span className="text-slate-700">{t('results.intakeScore')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500/80" />
            <span className="text-slate-700">{t('results.scoreLabel')}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              stroke="#cbd5e1"
            />
            <Radar
              name={t('results.intakeScore')}
              dataKey="adequacy"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.4}
            />
            <Radar
              name={t('results.scoreLabel')}
              dataKey="risk"
              stroke="#f43f5e"
              fill="#f43f5e"
              fillOpacity={0.25}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
