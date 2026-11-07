'use client';

import React from 'react';
import Link from 'next/link';
import {
  GUIDELINES_SECTIONS,
  RDA_TABLE_DATA,
  WORKFLOW_STEPS,
  METHODOLOGY_LIMITATIONS,
} from '@/data/guidelines';
import { GuidelineCard } from '@/components/GuidelineCard';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { SectionHeader } from '@/components/SectionHeader';
import { useTranslation } from '@/lib/language-context';
import {
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Utensils,
  Activity,
  Cpu,
  FileText,
  User,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';

const WORKFLOW_ICONS: Record<string, any> = {
  User,
  Utensils,
  Activity,
  Cpu,
  FileText,
};

const NUTRIENT_KEYS = [
  'iron',
  'vitamin_b12',
  'vitamin_d',
  'calcium',
  'vitamin_a',
  'folate',
  'protein',
];

export default function GuidelinesPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <SectionHeader
          badge={t('guidelines.badge')}
          title={t('guidelines.title')}
          subtitle={t('guidelines.subtitle')}
        />
        <DisclaimerBanner variant="full" />
      </div>

      {/* ============================================================ */}
      {/* SECTION A: OUR PRIMARY REFERENCES */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('guidelines.sectionA')}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('guidelines.sectionATitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('guidelines.sectionADesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDELINES_SECTIONS.map((g) => (
            <GuidelineCard key={g.id} guideline={g} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION B & C: WHAT WE COLLECT & WHAT WE CONSIDER */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('guidelines.sectionsBC')}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('guidelines.sectionsBCTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('guidelines.sectionsBCDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What We Collect */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t('guidelines.whatWeCollectTitle')}
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.collectDemoLabel')}</strong> {t('guidelines.collectDemoDesc')}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.collectDietLabel')}</strong> {t('guidelines.collectDietDesc')}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.collectFoodLabel')}</strong> {t('guidelines.collectFoodDesc')}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.collectLifestyleLabel')}</strong> {t('guidelines.collectLifestyleDesc')}
                </div>
              </li>
            </ul>
          </div>

          {/* What We Consider */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t('guidelines.whatWeConsiderTitle')}
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.considerBioLabel')}</strong> {t('guidelines.considerBioDesc')}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.considerInhibitorLabel')}</strong> {t('guidelines.considerInhibitorDesc')}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.considerSexLabel')}</strong> {t('guidelines.considerSexDesc')}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">{t('guidelines.considerSynthesisLabel')}</strong> {t('guidelines.considerSynthesisDesc')}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION D: HOW ASSESSMENT WORKS (VISUAL WORKFLOW) */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('guidelines.sectionD')}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('guidelines.sectionDTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('guidelines.sectionDDesc')}
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = WORKFLOW_ICONS[step.icon] || Sparkles;
              const stepTitle = t(`guidelines.workflow.step${step.step}Title`) || step.title;
              const stepDesc = t(`guidelines.workflow.step${step.step}Desc`) || step.description;

              return (
                <div
                  key={step.step}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between space-y-3 relative group hover:border-emerald-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                      {step.step}
                    </div>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {stepTitle}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {stepDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>{t('guidelines.testWorkflowBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RDA BENCHMARK REFERENCE TABLE */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('guidelines.referenceDataBadge')}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('guidelines.rdaTableTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('guidelines.rdaTableDesc')}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">{t('guidelines.tableNutrient')}</th>
                <th className="py-3.5 px-4">{t('guidelines.tableMen')}</th>
                <th className="py-3.5 px-4">{t('guidelines.tableWomen')}</th>
                <th className="py-3.5 px-4">{t('guidelines.tableRole')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {RDA_TABLE_DATA.map((row, i) => {
                const nutKey = NUTRIENT_KEYS[i];
                const localizedRole = nutKey ? t(`guidelines.rdaRoles.${nutKey}`) : row.keyRole;
                const localizedNutrient = nutKey ? t(`nutrients.${nutKey}`) : row.nutrient;

                return (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{localizedNutrient || row.nutrient}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-800">{row.men}</td>
                    <td className="py-3.5 px-4 font-mono text-teal-800">{row.women}</td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">{localizedRole || row.keyRole}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION E: LIMITATIONS & ETHICS */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
            {t('guidelines.sectionE')}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('guidelines.sectionETitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('guidelines.sectionEDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {METHODOLOGY_LIMITATIONS.map((lim, i) => {
            const limTitle = t(`guidelines.limitations.lim${i + 1}Title`) || lim.title;
            const limDesc = t(`guidelines.limitations.lim${i + 1}Desc`) || lim.description;

            return (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{limTitle}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {limDesc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}