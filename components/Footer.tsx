'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Heart, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { useTranslation } from '@/lib/language-context';

export function Footer() {
  const { t } = useTranslation();

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
              {t('footer.description')}
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t('footer.explorePortal')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/assessment" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('footer.startAssessment')}</span>
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-emerald-400 transition-colors">
                  {t('footer.resultsDashboard')}
                </Link>
              </li>
              <li>
                <Link href="/foods" className="hover:text-emerald-400 transition-colors">
                  {t('footer.foodExplorer')}
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  <span>{t('footer.icmrGuidelines')}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  {t('footer.systemArch')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Primary Evidence Sources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t('footer.referenceSources')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.nin.res.in/dietaryguidelines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{t('footer.icmrReference')}</span>
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
                  <span>{t('footer.whoReference')}</span>
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
                  <span>{t('footer.fssaiReference')}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-400 block pt-1">
                  {t('footer.rdaBenchmark')}
                </span>
              </li>
            </ul>
          </div>

          {/* Technical Scope */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t('footer.localArchitecture')}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {t('footer.localArchDesc')}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
              <span className="font-semibold text-emerald-400">{t('footer.zeroCloud')}</span> {t('footer.zeroCloudDesc')}
            </div>
          </div>
        </div>

        {/* Global Health Disclaimer Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-300">{t('footer.healthNotice')} </span>
              {t('footer.healthNoticeDesc')}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
            <div className="flex items-center gap-1 text-slate-400">
              <span>{t('footer.craftedWith')}</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
