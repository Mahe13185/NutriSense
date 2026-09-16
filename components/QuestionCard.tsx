import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuestionCardProps {
  icon?: LucideIcon;
  iconBg?: string;
  title: string;
  subtitle?: string;
  examples?: string;
  badge?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function QuestionCard({
  icon: Icon,
  iconBg = 'bg-emerald-100 text-emerald-700',
  title,
  subtitle,
  examples,
  badge,
  required = false,
  children,
  className = '',
}: QuestionCardProps) {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-subtle transition-all space-y-4 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          {Icon && (
            <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {title}
                {required && <span className="text-rose-500 ml-1">*</span>}
              </h3>
              {badge && (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{subtitle}</p>
            )}
            {examples && (
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-500">Key examples:</span> {examples}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2">{children}</div>
    </div>
  );
}
