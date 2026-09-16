import React from 'react';
import { RiskLevel } from '@/types';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RiskBadge({ level, showIcon = true, size = 'md', className = '' }: RiskBadgeProps) {
  const configs = {
    low: {
      label: 'Low Risk Indication',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
    },
    moderate: {
      label: 'Moderate Risk Indication',
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      icon: AlertCircle,
      iconColor: 'text-amber-600',
      dotColor: 'bg-amber-500',
    },
    elevated: {
      label: 'Elevated Risk Indication',
      bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
      icon: AlertTriangle,
      iconColor: 'text-rose-600',
      dotColor: 'bg-rose-500',
    },
  }[level];

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  }[size];

  const Icon = configs.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs transition-all ${configs.bg} ${sizeClasses} ${className}`}
    >
      {showIcon ? (
        <Icon className={`shrink-0 ${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} ${configs.iconColor}`} />
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${configs.dotColor}`} />
      )}
      <span>{configs.label}</span>
    </span>
  );
}
