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

export default function GuidelinesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <SectionHeader
          badge="Evidence-Based Foundations"
          title="Nutrition Guidelines & Methodology"
          subtitle="Explore the scientific references, rule-based inference models, Recommended Dietary Allowances (RDA), and academic methodology powering the NutriSense portal."
        />
        <DisclaimerBanner variant="full" />
      </div>

      {/* ============================================================ */}
      {/* SECTION A: OUR PRIMARY REFERENCES */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Section A
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Our Primary Scientific References
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            NutriSense references established public health standards published by premier Indian and international health authorities.
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
            Sections B & C
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Data Collection & Mapping Methodology
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            How user inputs are structured and matched against nutritional criteria.
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
                What We Collect
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Basic Demographics:</strong> Age, biological sex, height, weight (BMI calculation), and physical activity level.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Dietary Pattern:</strong> Vegetarian (lacto), vegan, non-vegetarian, ovo-vegetarian, or pescatarian habits.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Food Group Frequencies:</strong> Frequency of consuming fruits, vegetables, green leafy vegetables, pulses, dairy/alternatives, animal proteins, nuts/seeds, whole grains, and fortified items.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Self-Reported Cues & Lifestyle:</strong> Energy levels, skin/hair texture, muscle cramps, direct sunlight exposure, and mealtime tea/coffee habits.
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
                What We Consider
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Dietary Bioavailability:</strong> Distinguishes between plant-based (non-heme) and animal-based (heme) micronutrients, accounting for absorption enhancers and inhibitors.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Inhibitor Synergy:</strong> Accounts for tannins in mealtime tea/coffee which suppress plant iron absorption by up to 60–80%.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Physiological Sex Scaling:</strong> Applies elevated iron requirements for biological women (29 mg vs 19 mg per ICMR).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Endogenous Synthesis Factors:</strong> Considers sunlight duration for Vitamin D and dietary fats for fat-soluble vitamins (A & D).
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
            Section D
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Assessment System Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A step-by-step visual representation of how user input transforms into explainable nutritional recommendations.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {WORKFLOW_STEPS.map((step, index) => {
              const Icon = WORKFLOW_ICONS[step.icon] || Sparkles;
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
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {step.description}
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
              <span>Test The Interactive Workflow</span>
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
            Reference Data
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            ICMR-NIN (2024) Recommended Dietary Allowances (RDA)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Daily nutrient targets for reference Indian adults used as evaluation baselines in NutriSense.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Nutrient</th>
                <th className="py-3.5 px-4">Adult Men RDA</th>
                <th className="py-3.5 px-4">Adult Women RDA</th>
                <th className="py-3.5 px-4">Primary Biological Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {RDA_TABLE_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.nutrient}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-800">{row.men}</td>
                  <td className="py-3.5 px-4 font-mono text-teal-800">{row.women}</td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">{row.keyRole}</td>
                </tr>
              ))}
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
            Section E
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            System Limitations & Ethical Disclaimers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Essential boundaries regarding prototype capabilities and medical non-diagnostic framing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {METHODOLOGY_LIMITATIONS.map((lim, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{lim.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lim.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
