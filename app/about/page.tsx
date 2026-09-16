import React from 'react';
import Link from 'next/link';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { SectionHeader } from '@/components/SectionHeader';
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
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <SectionHeader
          badge="Academic Project Architecture"
          title="About NutriSense: Objectives & Methodology"
          subtitle="A functional Computer Science Project (CSP) prototype designed to explore rule-based nutritional risk indication and raise public dietary awareness."
        />
        <DisclaimerBanner variant="subtle" />
      </div>

      {/* 1. PROJECT OBJECTIVE & PROBLEM STATEMENT */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Overview
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Project Objective & Problem Statement
          </h2>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            <strong className="text-slate-900 font-semibold">The Problem:</strong> Micronutrient deficiencies (often termed <em>&ldquo;hidden hunger&rdquo;</em>) affect a substantial proportion of the global population, particularly across diverse Indian dietary settings. Low intake of bioavailable iron, Vitamin B12 in strict vegetarian diets, minimal sunlight-derived Vitamin D in urban lifestyles, and inadequate dietary diversity often go unnoticed until clinical symptoms become severe.
          </p>
          <p>
            <strong className="text-slate-900 font-semibold">Our Solution:</strong> <span className="font-semibold text-emerald-800">NutriSense</span> provides an accessible, evidence-backed self-assessment tool that bridges the gap between daily food habits and clinical nutrition benchmarks (such as ICMR-NIN 2024 and WHO guidelines). It analyzes self-reported food group frequencies and lifestyle factors to generate transparent, explainable preliminary risk indications with whole-food dietary adjustments.
          </p>
        </div>
      </section>

      {/* 2. TECHNICAL ARCHITECTURE & STACK */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Tech Stack
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            System Architecture & Zero-Backend Design
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered entirely client-side with Next.js and TypeScript for privacy, speed, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Next.js 14 & React</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              App Router architecture providing fast client-side routing, server-rendered static guidelines, and accessible UI components.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">TypeScript & Tailwind</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict type safety across assessment data structures and clean, responsive health-tech design system with curated accessible contrast.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Recharts Visualizations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive multi-axis radar charts and progress distributions illustrating nutrient adequacy vs risk vulnerability.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Rule-Based Inference</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deterministic, explainable rule engine that cross-references dietary intakes, antinutrient inhibitors (tannins/phytates), and biological sex.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ServerOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Server / Zero DB</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No Spring Boot, Java backend, MySQL, Firebase, or cloud database tracking. Safe from cloud data leaks and external API downtime.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">LocalStorage Storage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assessment responses and evaluation summaries survive page reloads securely within the user&apos;s own local browser storage.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ASSESSMENT METHODOLOGY & EXPLAINABILITY */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Explainable AI / Logic
          </span>
          <h2 className="text-2xl font-bold text-white">
            Assessment Rule Methodology
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every score and risk level generated by NutriSense is deterministic and directly traceable back to specific user answers.
          </p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-emerald-300 font-semibold">1. Dietary Adequacy Scoring:</strong>
            <p>
              Food group frequencies are weighted based on their nutrient density and biological availability. For example, plant-based iron is scored alongside Vitamin C consumption (which triples non-heme absorption) and mealtime tea/coffee habits (which inhibit uptake).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-emerald-300 font-semibold">2. Self-Reported Indicator Weighting:</strong>
            <p>
              Reported cues (fatigue, pale appearance, cramps, skin changes) are treated as secondary weighting multipliers that elevate risk when dietary intake is suboptimal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-emerald-300 font-semibold">3. Non-Diagnostic Risk Classification:</strong>
            <p>
              Results are stratified into &ldquo;Low Risk Indication&rdquo; (&lt; 35 score), &ldquo;Moderate Risk Indication&rdquo; (35–59 score), and &ldquo;Elevated Risk Indication&rdquo; (&ge; 60 score), accompanied by transparent explanations and ICMR food sources.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION & GUIDELINES LINK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-emerald-950">
            Ready to test the assessment workflow?
          </h3>
          <p className="text-xs text-emerald-800">
            Experience the 4-step wizard and discover personalized dietary insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/assessment"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
