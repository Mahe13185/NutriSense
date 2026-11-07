'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from '@/lib/language-context';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  BookOpen,
  Utensils,
  Compass,
  ChevronRight,
  BarChart3,
  Lock,
} from 'lucide-react';
import { NUTRIENTS_DATA } from '@/data/nutrients';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { SectionHeader } from '@/components/SectionHeader';

export default function LandingPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const assessmentHref = user ? '/assessment' : '/login?redirect=/assessment';

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
            {/* Methodology Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('home.heroBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              {t('home.heroTitle1')}{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                {t('home.heroTitle2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {t('home.heroSubtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href={assessmentHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all active:scale-98"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t('home.startAssessmentBtn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/guidelines"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>{t('home.exploreGuidelinesBtn')}</span>
              </Link>
            </div>

            {/* Hero Trust Micro-Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('common.badge')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-teal-600" />
                <span>{t('footer.zeroCloud')} {t('footer.zeroCloudDesc')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>{t('guidelines.badge')}</span>
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
            badge={t('home.howItWorksBadge')}
            title={t('home.howItWorksTitle')}
            subtitle={t('home.howItWorksSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-xs">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                1. {t('home.step1Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('home.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm shadow-xs">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                2. {t('home.step2Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('home.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-xs">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                3. {t('home.step3Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('home.step3Desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm shadow-xs">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                4. {t('home.step4Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('home.step4Desc')}
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href={assessmentHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>{t('home.ctaButton')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. EVALUATED NUTRIENT CLUSTERS */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge={t('home.nutrientsBadge')}
          title={t('home.nutrientsTitle')}
          subtitle={t('home.nutrientsSubtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NUTRIENTS_DATA.map((nutrient) => {
            const localizedName = t(`nutrients.${nutrient.id}`) || nutrient.name;
            return (
              <div
                key={nutrient.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {nutrient.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ICMR 2024
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {localizedName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {nutrient.tagline}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {t('results.reportedSymptoms')}:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      {nutrient.keyFunctions.slice(0, 2).map((fn, i) => (
                        <li key={i} className="truncate">{fn}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900">
                    <span className="font-semibold block mb-0.5">{t('results.topFoods')}</span>
                    <span className="text-[11px] text-emerald-800">
                      {nutrient.topFoodSources.vegetarian.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. KEY ADVANTAGES & TRANSPARENCY */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl space-y-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('guidelines.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('about.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('about.solutionText')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t('guidelines.sectionA')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('home.heroBadge')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t('guidelines.sectionC')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('about.subtitle')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t('footer.zeroCloud')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('footer.zeroCloudDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CALL TO ACTION */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('home.ctaBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
              {t('home.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={assessmentHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg transition-all active:scale-98"
              >
                <span>{t('home.ctaButton')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/foods"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all"
              >
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span>{t('dashboard.foodDatabase')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
