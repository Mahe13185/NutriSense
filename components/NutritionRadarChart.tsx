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

interface NutritionRadarChartProps {
  nutrients: NutrientRiskAssessment[];
}

export function NutritionRadarChart({ nutrients }: NutritionRadarChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-200">
        <div className="text-xs text-slate-400 font-medium animate-pulse">
          Rendering dynamic nutrient chart...
        </div>
      </div>
    );
  }

  // Format data for radar chart: Map adequacy score (0-100) and risk score (0-100)
  const chartData = nutrients.map((n) => {
    let shortName = n.name;
    if (n.nutrientId === 'iron') shortName = 'Iron';
    if (n.nutrientId === 'vitamin_b12') shortName = 'Vit B12';
    if (n.nutrientId === 'vitamin_d') shortName = 'Vit D';
    if (n.nutrientId === 'calcium') shortName = 'Calcium';
    if (n.nutrientId === 'vitamin_a') shortName = 'Vit A';
    if (n.nutrientId === 'folate') shortName = 'Folate';
    if (n.nutrientId === 'protein') shortName = 'Protein';

    return {
      subject: shortName,
      adequacy: n.adequacyScore,
      risk: n.riskScore,
      fullName: n.name,
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
            <span className="text-slate-300">Intake Adequacy:</span>
            <span className="font-semibold text-emerald-300">{data.adequacy} / 100</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-300">Risk Indication:</span>
            <span className="font-semibold text-amber-300">{data.risk} / 100</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            {data.status}
          </p>
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
            Nutrient Adequacy & Risk Radar
          </h3>
          <p className="text-xs text-slate-500">
            Comparative multi-nutrient balance based on your reported intake and indicators
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/80" />
            <span className="text-slate-700">Estimated Adequacy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500/80" />
            <span className="text-slate-700">Risk Indication</span>
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
              name="Adequacy Score"
              dataKey="adequacy"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.4}
            />
            <Radar
              name="Risk Indication"
              dataKey="risk"
              stroke="#f43f5e"
              fill="#f43f5e"
              fillOpacity={0.25}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-slate-400 text-center">
        *Adequacy represents estimated dietary sufficiency (higher is better). Risk represents calculated vulnerability (lower is better).
      </p>
    </div>
  );
}
