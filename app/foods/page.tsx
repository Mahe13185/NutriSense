'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FOODS_DATABASE } from '@/data/foods';
import { FoodCard } from '@/components/FoodCard';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { SectionHeader } from '@/components/SectionHeader';
import {
  Search,
  Filter,
  X,
  Sparkles,
  Utensils,
  Leaf,
  Apple,
  Info,
  SlidersHorizontal,
} from 'lucide-react';

const NUTRIENT_FILTERS = [
  { id: 'all', label: 'All Nutrients' },
  { id: 'iron', label: 'Iron (Fe)' },
  { id: 'vitamin_b12', label: 'Vitamin B12' },
  { id: 'vitamin_d', label: 'Vitamin D' },
  { id: 'calcium', label: 'Calcium' },
  { id: 'vitamin_a', label: 'Vitamin A' },
  { id: 'folate', label: 'Folate (B9)' },
  { id: 'protein', label: 'Protein' },
];

const DIET_FILTERS = [
  { id: 'all', label: 'All Diets' },
  { id: 'vegan', label: 'Vegan Only' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'non_vegetarian', label: 'Non-Vegetarian' },
];

function FoodsContent() {
  const searchParams = useSearchParams();
  const initialNutrientParam = searchParams.get('nutrient') || 'all';

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNutrient, setSelectedNutrient] = useState<string>(initialNutrientParam);
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFoods = useMemo(() => {
    return FOODS_DATABASE.filter((food) => {
      // Search term filter (name, regional name, health benefits)
      const matchesSearch =
        searchTerm.trim() === '' ||
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (food.regionalNames && food.regionalNames.toLowerCase().includes(searchTerm.toLowerCase())) ||
        food.healthBenefits.toLowerCase().includes(searchTerm.toLowerCase());

      // Nutrient filter
      const matchesNutrient =
        selectedNutrient === 'all' || food.richIn.includes(selectedNutrient as any);

      // Diet filter
      const matchesDiet =
        selectedDiet === 'all' ||
        (selectedDiet === 'vegan' && food.dietType === 'vegan') ||
        (selectedDiet === 'vegetarian' && (food.dietType === 'vegetarian' || food.dietType === 'vegan')) ||
        (selectedDiet === 'non_vegetarian' && food.dietType === 'non_vegetarian');

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || food.category === selectedCategory;

      return matchesSearch && matchesNutrient && matchesDiet && matchesCategory;
    });
  }, [searchTerm, selectedNutrient, selectedDiet, selectedCategory]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedNutrient('all');
    setSelectedDiet('all');
    setSelectedCategory('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <SectionHeader
          badge="ICMR-NIN Aligned Food Database"
          title="Nutrient-Dense Food Explorer"
          subtitle="Discover regional Indian foods, fruits, grains, pulses, dairy, and seeds rich in vital micronutrients with evidence-backed preparation and bioavailability tips."
        />
        <DisclaimerBanner variant="compact" />
      </div>

      {/* SEARCH AND FILTER CONTROLS */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by food name, regional name (e.g. Moringa, Ragi, Palak, Halim, Dahi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm font-medium text-slate-900 shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Chips by Nutrient */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Filter by Nutrient Area
            </span>
            {(selectedNutrient !== 'all' || selectedDiet !== 'all' || searchTerm) && (
              <button
                onClick={handleResetFilters}
                className="text-emerald-700 hover:text-emerald-800 lowercase text-xs font-semibold hover:underline"
              >
                reset filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {NUTRIENT_FILTERS.map((nf) => (
              <button
                key={nf.id}
                onClick={() => setSelectedNutrient(nf.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedNutrient === nf.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                {nf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Preference Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Diet Type:</span>
            <div className="flex flex-wrap gap-1.5">
              {DIET_FILTERS.map((df) => (
                <button
                  key={df.id}
                  onClick={() => setSelectedDiet(df.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedDiet === df.id
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {df.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-medium text-slate-500">
            Showing <strong className="text-slate-900">{filteredFoods.length}</strong> of{' '}
            {FOODS_DATABASE.length} foods
          </div>
        </div>
      </div>

      {/* FOOD ITEMS GRID */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Utensils className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No foods match your criteria</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search keywords or clearing active nutrient and diet filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function FoodsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading Food Explorer...</p>
          </div>
        </div>
      }
    >
      <FoodsContent />
    </Suspense>
  );
}
