import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'emerald' | 'teal' | 'amber' | 'blue';
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = 'emerald',
  title,
  subtitle,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  const badgeStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    teal: 'bg-teal-50 text-teal-700 border-teal-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
    blue: 'bg-blue-50 text-blue-700 border-blue-200/80',
  }[badgeVariant];

  return (
    <div className={`space-y-3 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-xs ${badgeStyles}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
