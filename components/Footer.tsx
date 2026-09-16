import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Heart, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 font-bold shadow-md shadow-emerald-500/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Nutri<span className="text-emerald-400">Sense</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A Smart Nutritional Deficiency Detection and Awareness Portal. Helping individuals evaluate dietary habits, understand micronutrient synergy, and identify possible risk patterns based on evidence-backed nutritional benchmarks.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Academic Prototype for Computer Science Project (CSP)</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/assessment" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Start Assessment</span>
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-emerald-400 transition-colors">
                  Results Dashboard
                </Link>
              </li>
              <li>
                <Link href="/foods" className="hover:text-emerald-400 transition-colors">
                  Food & Nutrient Explorer
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  <span>ICMR & WHO Guidelines</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  System Architecture & About
                </Link>
              </li>
            </ul>
          </div>

          {/* Primary Evidence Sources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Reference Sources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.nin.res.in/dietaryguidelines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>ICMR-NIN Guidelines (2024)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>WHO Healthy Diet (Factsheet 394)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.fssai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>FSSAI +F Fortification Standards</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-400 block pt-1">
                  Mapped to 2024 Recommended Dietary Allowances (RDA) for Indians.
                </span>
              </li>
            </ul>
          </div>

          {/* Technical Scope */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Local Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built using Next.js 14, TypeScript, Tailwind CSS, and Recharts. All rule evaluation executes locally in your browser with zero external server or database tracking.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
              <span className="font-semibold text-emerald-400">Zero Cloud Leakage:</span> Assessment data is retained only in your browser&apos;s localStorage.
            </div>
          </div>
        </div>

        {/* Global Academic Health Disclaimer Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-300">Academic Disclaimer & Non-Diagnostic Notice:</span> NutriSense is an educational research prototype created for a Computer Science Project (CSP). It provides general nutritional awareness and preliminary risk indications based on user-entered answers. It does <strong className="text-white">NOT</strong> constitute medical diagnosis, clinical advice, or a substitute for laboratory testing. Always consult a qualified physician or registered dietitian for medical evaluation.
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} NutriSense — Smart Nutritional Deficiency Detection and Awareness Portal.</p>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Crafted for academic demonstration with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" />
              <span>and evidence-based nutrition science</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
