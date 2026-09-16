import React from 'react';
import { User, Utensils, Activity, CheckCircle2 } from 'lucide-react';

interface AssessmentProgressProps {
  currentStep: number; // 1 to 4
  onStepClick?: (step: number) => void;
  maxAccessibleStep?: number;
}

const STEPS = [
  { step: 1, title: 'Basic Info', subtitle: 'Demographics & Diet Type', icon: User },
  { step: 2, title: 'Dietary Habits', subtitle: 'Food Group Frequency', icon: Utensils },
  { step: 3, title: 'Symptoms & Lifestyle', subtitle: 'Self-Reported Indicators', icon: Activity },
  { step: 4, title: 'Review & Analyze', subtitle: 'Verify Answers', icon: CheckCircle2 },
];

export function AssessmentProgress({
  currentStep,
  onStepClick,
  maxAccessibleStep = 4,
}: AssessmentProgressProps) {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Visual Step Cards for Desktop & Tablet */}
      <div className="hidden sm:grid grid-cols-4 gap-3">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isCurrent = currentStep === s.step;
          const isCompleted = currentStep > s.step;
          const isClickable = onStepClick && s.step <= maxAccessibleStep;

          return (
            <button
              key={s.step}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick && onStepClick(s.step)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                isCurrent
                  ? 'bg-emerald-50/80 border-emerald-500/80 ring-2 ring-emerald-500/20 shadow-sm'
                  : isCompleted
                  ? 'bg-white border-emerald-200 hover:border-emerald-300 text-slate-800'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-400 cursor-not-allowed opacity-75'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200/70 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step {s.step}
                    </span>
                    {isCompleted && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <h4
                    className={`text-sm font-semibold truncate ${
                      isCurrent ? 'text-emerald-900' : isCompleted ? 'text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    {s.title}
                  </h4>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Compact Progress Bar for Mobile */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-emerald-700">
            Step {currentStep} of 4: {STEPS[currentStep - 1].title}
          </span>
          <span className="text-slate-500 font-medium">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
