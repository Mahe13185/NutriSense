'use client';

import React from 'react';
import Link from 'next/link';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { SectionHeader } from '@/components/SectionHeader';
import { useTranslation } from '@/lib/language-context';
import {
  Activity,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  ServerOff,
  CheckCircle2,
  Lock,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <SectionHeader
          badge={t('about.badge')}
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />
        <DisclaimerBanner variant="subtle" />
      </div>

      {/* 1. PLATFORM OBJECTIVE & PURPOSE */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('about.overviewBadge')}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('about.overviewTitle')}
          </h2>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            <strong className="text-slate-900 font-semibold">{t('about.problemLabel')}</strong>{' '}
            {t('about.problemDesc')}
          </p>
          <p>
            <strong className="text-slate-900 font-semibold">{t('about.solutionLabel')}</strong>{' '}
            {t('about.solutionDesc')}
          </p>
        </div>
      </section>

      {/* 2. TECHNICAL ARCHITECTURE & STACK */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('about.techBadge')}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('about.techTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('about.techSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('about.techCards.nextjsTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.techCards.nextjsDesc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('about.techCards.tsTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.techCards.tsDesc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('about.techCards.rechartsTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.techCards.rechartsDesc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('about.techCards.ruleTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.techCards.ruleDesc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ServerOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('about.techCards.zeroBackendTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.techCards.zeroBackendDesc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('about.techCards.storageTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.techCards.storageDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. ASSESSMENT METHODOLOGY & EXPLAINABILITY */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {t('about.methodologyBadge')}
          </span>
          <h2 className="text-2xl font-bold text-white">
            {t('about.methodologyTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('about.methodologySubtitle')}
          </p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-emerald-300 font-semibold">{t('about.methodologyPoints.point1Title')}</strong>
            <p>
              {t('about.methodologyPoints.point1Desc')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-emerald-300 font-semibold">{t('about.methodologyPoints.point2Title')}</strong>
            <p>
              {t('about.methodologyPoints.point2Desc')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-emerald-300 font-semibold">{t('about.methodologyPoints.point3Title')}</strong>
            <p>
              {t('about.methodologyPoints.point3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION & GUIDELINES LINK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-emerald-950">
            {t('about.ctaTitle')}
          </h3>
          <p className="text-xs text-emerald-800">
            {t('about.ctaDesc')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/assessment"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>{t('about.ctaBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}