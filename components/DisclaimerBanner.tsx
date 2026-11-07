'use client';

import React from 'react';
import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/lib/language-context';

interface DisclaimerBannerProps {
  variant?: 'compact' | 'full' | 'subtle';
  className?: string;
}

export function DisclaimerBanner({ variant = 'full', className = '' }: DisclaimerBannerProps) {
  const { t } = useTranslation();

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs ${className}`}
      >
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="leading-tight">
          <strong className="font-semibold">{t('common.notice')}:</strong> {t('common.disclaimerCompact')}
        </p>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div
        className={`flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs ${className}`}
      >
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-medium text-slate-800">{t('common.disclaimerSubtleTitle')}</p>
          <p className="text-slate-500 leading-relaxed">
            {t('common.disclaimerSubtleText')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 border border-amber-200/80 shadow-xs ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-amber-950">
              {t('common.disclaimerTitle')}
            </h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-200/80 text-amber-900">
              {t('common.disclaimerNonDiagnostic')}
            </span>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            {t('common.disclaimerText')}
          </p>
          <div className="pt-1.5 flex items-center gap-2 text-[11px] text-amber-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('home.heroBadge')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
