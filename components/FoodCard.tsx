'use client';

import React from 'react';
import { FoodItem } from '@/types';
import { Sparkles, Info } from 'lucide-react';
import { useTranslation } from '@/lib/language-context';

interface FoodCardProps {
  food: FoodItem;
}

export function FoodCard({ food }: FoodCardProps) {
  const { t } = useTranslation();

  const dietBadge = {
    vegan: { labelKey: 'foods.veganOnly', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    vegetarian: { labelKey: 'foods.vegetarian', bg: 'bg-green-50 text-green-700 border-green-200' },
    non_vegetarian: { labelKey: 'foods.nonVegetarian', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
  }[food.dietType];

  const categoryName = t(`foodCategories.${food.category}`) || food.category.replace('_', ' ');

  return (
    <div className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-card-hover transition-all group">
      <div className="space-y-3.5">
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${dietBadge.bg}`}>
            {t(dietBadge.labelKey)}
          </span>
          <span className="text-[11px] font-medium text-slate-400 capitalize">
            {categoryName}
          </span>
        </div>

        {/* Food Title & Regional Names */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {food.name}
          </h3>
          {food.regionalNames && (
            <p className="text-xs text-slate-500 italic mt-0.5">
              {t('foods.alsoKnownAs')} {food.regionalNames}
            </p>
          )}
        </div>

        {/* Nutrient Rich In Badges */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            {t('foods.richIn')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {food.richIn.map((nut) => (
              <span
                key={nut}
                className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
              >
                {t(`nutrients.${nut}`) || nut}
              </span>
            ))}
          </div>
        </div>

        {/* Approximate Content & Portion */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-slate-500">{t('foods.servingSize')}</span>
            <span className="font-semibold text-slate-900">{food.servingSize}</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50/80 px-2 py-1 rounded border border-emerald-200/60">
            {food.approxNutrientContent}
          </div>
        </div>

        {/* Health Benefits */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {food.healthBenefits}
        </p>
      </div>

      {/* ICMR Prep Tip at Bottom */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-950 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 space-y-1">
        <div className="font-bold flex items-center gap-1 text-emerald-800">
          <Info className="w-3.5 h-3.5" />
          <span>{t('foods.prepTip')}</span>
        </div>
        <p className="leading-snug text-slate-700">{food.icmrPrepTip}</p>
      </div>
    </div>
  );
}
