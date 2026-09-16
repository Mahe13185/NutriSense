'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AssessmentFormData,
  DietaryPreference,
  Sex,
  ActivityLevel,
  FoodFrequency,
  SymptomFrequency,
} from '@/types';
import {
  DIETARY_PREFERENCE_OPTIONS,
  ACTIVITY_LEVEL_OPTIONS,
  FOOD_FREQUENCY_OPTIONS,
  SYMPTOM_FREQUENCY_OPTIONS,
  DIETARY_QUESTIONS_CONFIG,
  SYMPTOM_QUESTIONS_CONFIG,
} from '@/data/questions';
import { evaluateAssessment } from '@/lib/assessmentEngine';
import {
  saveAssessmentResult,
  saveDraftFormData,
  getDraftFormData,
} from '@/lib/storage';
import { formatBmi } from '@/lib/utils';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { QuestionCard } from '@/components/QuestionCard';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import {
  User,
  Utensils,
  Activity,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Edit2,
  RotateCcw,
  Apple,
  Carrot,
  Salad,
  Wheat,
  Milk,
  Beef,
  Nut,
  Sun,
  Coffee,
  Moon,
} from 'lucide-react';

const INITIAL_FORM_DATA: AssessmentFormData = {
  basicInfo: {
    age: '',
    sex: '',
    heightCm: '',
    weightKg: '',
    activityLevel: '',
    dietaryPreference: '',
    isPregnantOrLactating: false,
  },
  dietaryHabits: {
    fruits: '',
    vegetables: '',
    greenLeafy: '',
    pulsesLegumes: '',
    dairyOrAlternatives: '',
    eggsMeatFish: '',
    nutsSeeds: '',
    wholeGrainsMillets: '',
    fortifiedFoods: '',
  },
  symptomsLifestyle: {
    frequentFatigue: '',
    generalWeakness: '',
    difficultyConcentrating: '',
    paleAppearance: '',
    muscleCrampsWeakness: '',
    hairSkinChanges: '',
    poorAppetite: '',
    sunExposure: '',
    teaCoffeeWithMeals: '',
    sleepQuality: '',
  },
};

const ICON_MAP: Record<string, any> = {
  Apple,
  Carrot,
  Salad,
  Wheat,
  Milk,
  Beef,
  Nut,
  Sparkles,
  Sun,
  Coffee,
  Moon,
};

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<AssessmentFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load draft if available
  useEffect(() => {
    const draft = getDraftFormData();
    if (draft) {
      setFormData(draft);
    }
  }, []);

  // Save draft on change
  useEffect(() => {
    saveDraftFormData(formData);
  }, [formData]);

  // Live BMI calculation
  const bmiInfo = formatBmi(
    typeof formData.basicInfo.weightKg === 'number' ? formData.basicInfo.weightKg : 0,
    typeof formData.basicInfo.heightCm === 'number' ? formData.basicInfo.heightCm : 0
  );

  // Validation logic per step
  const validateStep = (step: number): boolean => {
    const newErrors: string[] = [];

    if (step === 1) {
      const { age, sex, heightCm, weightKg, activityLevel, dietaryPreference } = formData.basicInfo;
      if (!age || Number(age) < 10 || Number(age) > 110) newErrors.push('Please enter a valid age between 10 and 110 years.');
      if (!sex) newErrors.push('Please select your biological sex.');
      if (!heightCm || Number(heightCm) < 80 || Number(heightCm) > 250) newErrors.push('Please enter a valid height in cm (80–250 cm).');
      if (!weightKg || Number(weightKg) < 20 || Number(weightKg) > 300) newErrors.push('Please enter a valid weight in kg (20–300 kg).');
      if (!activityLevel) newErrors.push('Please select your physical activity level.');
      if (!dietaryPreference) newErrors.push('Please select your primary dietary preference.');
    }

    if (step === 2) {
      const { fruits, vegetables, greenLeafy, pulsesLegumes, dairyOrAlternatives, nutsSeeds, wholeGrainsMillets, fortifiedFoods } =
        formData.dietaryHabits;
      if (!fruits) newErrors.push('Please rate your Fresh Fruits consumption frequency.');
      if (!vegetables) newErrors.push('Please rate your Vegetables consumption frequency.');
      if (!greenLeafy) newErrors.push('Please rate your Green Leafy Vegetables consumption frequency.');
      if (!pulsesLegumes) newErrors.push('Please rate your Pulses/Legumes consumption frequency.');
      if (!dairyOrAlternatives) newErrors.push('Please rate your Milk/Dairy or Plant-milk consumption frequency.');
      if (!nutsSeeds) newErrors.push('Please rate your Nuts and Seeds consumption frequency.');
      if (!wholeGrainsMillets) newErrors.push('Please rate your Whole Grains and Millets consumption frequency.');
      if (!fortifiedFoods) newErrors.push('Please rate your Fortified Foods consumption frequency.');
    }

    if (step === 3) {
      const {
        frequentFatigue,
        generalWeakness,
        difficultyConcentrating,
        paleAppearance,
        muscleCrampsWeakness,
        hairSkinChanges,
        poorAppetite,
        sunExposure,
        teaCoffeeWithMeals,
        sleepQuality,
      } = formData.symptomsLifestyle;
      if (!frequentFatigue) newErrors.push('Please answer the question regarding fatigue frequency.');
      if (!generalWeakness) newErrors.push('Please answer the question regarding general weakness.');
      if (!difficultyConcentrating) newErrors.push('Please answer the question regarding cognitive focus/brain fog.');
      if (!paleAppearance) newErrors.push('Please answer the question regarding pale skin / nail changes.');
      if (!muscleCrampsWeakness) newErrors.push('Please answer the question regarding muscle cramps or bone aches.');
      if (!hairSkinChanges) newErrors.push('Please answer the question regarding hair/skin changes.');
      if (!poorAppetite) newErrors.push('Please answer the question regarding appetite.');
      if (!sunExposure) newErrors.push('Please select your direct midday sunlight exposure.');
      if (!teaCoffeeWithMeals) newErrors.push('Please select your mealtime tea/coffee habits.');
      if (!sleepQuality) newErrors.push('Please select your sleep quality.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors([]);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Evaluate assessment through rule engine
      const evaluation = evaluateAssessment(formData);
      // Persist to localStorage
      saveAssessmentResult(evaluation);
      // Navigate to results
      setTimeout(() => {
        router.push('/results');
      }, 400);
    } catch (e) {
      console.error('Evaluation error:', e);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all assessment answers?')) {
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setErrors([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Info */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive Nutritional Assessment Wizard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Dietary & Lifestyle Self-Assessment
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Please answer the questions across the 3 sections to evaluate your dietary adequacy and explore explainable nutritional risk patterns.
        </p>
      </div>

      {/* Progress Bar Component */}
      <AssessmentProgress
        currentStep={currentStep}
        onStepClick={(step) => {
          if (step < currentStep || validateStep(currentStep)) {
            setCurrentStep(step);
            setErrors([]);
          }
        }}
      />

      {/* Validation Errors Box */}
      {errors.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1.5 animate-shake">
          <div className="flex items-center gap-2 font-bold text-rose-900">
            <AlertCircle className="w-4 h-4" />
            <span>Please complete the following required fields before proceeding:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* STEP 1: BASIC INFORMATION */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Step 1: Demographics & Dietary Preference
              </h2>
              <p className="text-xs text-slate-500">
                Helps tailor Recommended Dietary Allowances (RDA) per ICMR-NIN 2024 guidelines.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Step 1 of 4
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Age */}
            <QuestionCard
              title="Age (in years)"
              subtitle="RDA targets vary based on age brackets."
              required
            >
              <input
                type="number"
                min={10}
                max={110}
                placeholder="e.g. 24"
                value={formData.basicInfo.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      age: e.target.value === '' ? '' : Number(e.target.value),
                    },
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-slate-900 text-sm font-medium"
              />
            </QuestionCard>

            {/* Biological Sex */}
            <QuestionCard
              title="Biological Sex"
              subtitle="Accounts for physiological differences in iron and calorie RDA."
              required
            >
              <div className="grid grid-cols-3 gap-2.5">
                {(['female', 'male', 'other'] as Sex[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        basicInfo: { ...formData.basicInfo, sex: s },
                      })
                    }
                    className={`py-3 px-2 rounded-xl text-xs font-semibold capitalize border transition-all text-center ${
                      formData.basicInfo.sex === s
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </QuestionCard>

            {/* Height */}
            <QuestionCard
              title="Height (in cm)"
              subtitle="Used for BMI and body surface area estimations."
              required
            >
              <input
                type="number"
                min={80}
                max={250}
                placeholder="e.g. 170"
                value={formData.basicInfo.heightCm}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      heightCm: e.target.value === '' ? '' : Number(e.target.value),
                    },
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-slate-900 text-sm font-medium"
              />
            </QuestionCard>

            {/* Weight & BMI Info */}
            <QuestionCard
              title="Weight (in kg)"
              subtitle="Calculates your baseline protein requirement (0.83g/kg)."
              required
            >
              <input
                type="number"
                min={20}
                max={300}
                placeholder="e.g. 65"
                value={formData.basicInfo.weightKg}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      weightKg: e.target.value === '' ? '' : Number(e.target.value),
                    },
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-slate-900 text-sm font-medium"
              />

              {bmiInfo.bmi > 0 && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-xs flex items-center justify-between">
                  <span className="text-slate-600">Calculated BMI:</span>
                  <span className="font-bold text-emerald-800">
                    {bmiInfo.bmi} kg/m² ({bmiInfo.category})
                  </span>
                </div>
              )}
            </QuestionCard>
          </div>

          {/* Activity Level */}
          <QuestionCard
            title="Physical Activity Level"
            subtitle="Select the tier that best matches your typical weekly routine."
            required
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACTIVITY_LEVEL_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        activityLevel: opt.value as ActivityLevel,
                      },
                    })
                  }
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.basicInfo.activityLevel === opt.value
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{opt.label}</span>
                    <input
                      type="radio"
                      name="activityLevel"
                      checked={formData.basicInfo.activityLevel === opt.value}
                      onChange={() => {}}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{opt.description}</p>
                </label>
              ))}
            </div>
          </QuestionCard>

          {/* Dietary Preference */}
          <QuestionCard
            title="Primary Dietary Pattern"
            subtitle="Informs which natural nutrient sources (like Vitamin B12 and Heme Iron) are available in your diet."
            required
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DIETARY_PREFERENCE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  onClick={() => {
                    const newDiet = opt.value as DietaryPreference;
                    // If non-veg to vegan/veg, auto-set eggsMeatFish to never
                    let newDietaryHabits = { ...formData.dietaryHabits };
                    if (newDiet === 'vegan' || newDiet === 'vegetarian' || newDiet === 'lacto_vegetarian') {
                      newDietaryHabits.eggsMeatFish = 'never';
                    }
                    if (newDiet === 'vegan') {
                      newDietaryHabits.dairyOrAlternatives = 'rarely';
                    }
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        dietaryPreference: newDiet,
                      },
                      dietaryHabits: newDietaryHabits,
                    });
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.basicInfo.dietaryPreference === opt.value
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{opt.label}</span>
                    <input
                      type="radio"
                      name="dietaryPreference"
                      checked={formData.basicInfo.dietaryPreference === opt.value}
                      onChange={() => {}}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{opt.description}</p>
                </label>
              ))}
            </div>
          </QuestionCard>
        </div>
      )}

      {/* STEP 2: DIETARY HABITS */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" />
                Step 2: Food Group Consumption Frequency
              </h2>
              <p className="text-xs text-slate-500">
                Rate how often you typically consume each of the 9 essential food categories.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Step 2 of 4
            </span>
          </div>

          <div className="space-y-4">
            {DIETARY_QUESTIONS_CONFIG.map((q) => {
              const Icon = ICON_MAP[q.iconName] || Utensils;
              const currentValue = formData.dietaryHabits[q.key];

              // If vegetarian/vegan and this is eggsMeatFish, disable/mark as N/A
              const isMeatQuestion = q.key === 'eggsMeatFish';
              const isVegUser =
                formData.basicInfo.dietaryPreference === 'vegetarian' ||
                formData.basicInfo.dietaryPreference === 'vegan' ||
                formData.basicInfo.dietaryPreference === 'lacto_vegetarian';

              return (
                <QuestionCard
                  key={q.key}
                  icon={Icon}
                  title={q.title}
                  subtitle={q.subtitle}
                  examples={q.examples}
                  badge={q.relevance}
                  required
                >
                  {isMeatQuestion && isVegUser ? (
                    <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs flex items-center justify-between">
                      <span>Automatically marked as &ldquo;Never&rdquo; based on your vegetarian/vegan preference in Step 1.</span>
                      <span className="font-bold text-emerald-700 uppercase">Never (Veg)</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                      {FOOD_FREQUENCY_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              dietaryHabits: {
                                ...formData.dietaryHabits,
                                [q.key]: opt.value,
                              },
                            })
                          }
                          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 ${
                            currentValue === opt.value
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-xs font-bold">{opt.label.split('(')[0]}</span>
                          <span className="text-[10px] opacity-80 truncate max-w-full">
                            {opt.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </QuestionCard>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: SYMPTOMS & LIFESTYLE */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Step 3: Self-Reported Indicators & Lifestyle Factors
              </h2>
              <p className="text-xs text-slate-500">
                These self-reported cues help cross-reference your dietary intake against common nutritional patterns.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Step 3 of 4
            </span>
          </div>

          <DisclaimerBanner variant="compact" />

          <div className="space-y-4">
            {SYMPTOM_QUESTIONS_CONFIG.map((q) => {
              const currentValue = formData.symptomsLifestyle[q.key];

              if (q.type === 'sun' || q.type === 'tea' || q.type === 'sleep') {
                return (
                  <QuestionCard
                    key={q.key}
                    title={q.title}
                    subtitle={q.subtitle}
                    badge={`Linked area: ${q.indicators.join(', ')}`}
                    required
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {q.options?.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              symptomsLifestyle: {
                                ...formData.symptomsLifestyle,
                                [q.key]: opt.value,
                              },
                            })
                          }
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            currentValue === opt.value
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-xs font-bold">{opt.label}</span>
                          <span className={`text-[11px] mt-1 ${currentValue === opt.value ? 'text-emerald-100' : 'text-slate-500'}`}>
                            {opt.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </QuestionCard>
                );
              }

              // Standard symptom frequency question
              return (
                <QuestionCard
                  key={q.key}
                  title={q.title}
                  subtitle={q.subtitle}
                  badge={`Possible link: ${q.indicators.join(', ')}`}
                  required
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {SYMPTOM_FREQUENCY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            symptomsLifestyle: {
                              ...formData.symptomsLifestyle,
                              [q.key]: opt.value as SymptomFrequency,
                            },
                          })
                        }
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 ${
                          currentValue === opt.value
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs font-bold">{opt.label.split('/')[0]}</span>
                        <span className={`text-[10px] truncate max-w-full ${currentValue === opt.value ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {opt.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </QuestionCard>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & CONFIRM */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Step 4: Review Your Responses Before Analysis
              </h2>
              <p className="text-xs text-slate-500">
                Please review your entered responses. You can click &ldquo;Edit&rdquo; on any section to adjust your answers.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Step 4 of 4
            </span>
          </div>

          <div className="space-y-4">
            {/* Step 1 Review */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  1. Basic Information
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Age / Sex:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {formData.basicInfo.age} yrs • {formData.basicInfo.sex}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Height / Weight / BMI:</span>
                  <span className="font-semibold text-slate-800">
                    {formData.basicInfo.heightCm}cm • {formData.basicInfo.weightKg}kg ({bmiInfo.bmi} BMI)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Dietary Pattern:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {formData.basicInfo.dietaryPreference?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 Review */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-600" />
                  2. Dietary Habits Frequency
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {Object.entries(formData.dietaryHabits).map(([key, val]) => (
                  <div key={key} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block capitalize text-[11px]">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-bold text-slate-800 capitalize">
                      {val ? val.replace('_', ' ') : 'Not answered'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3 Review */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  3. Self-Reported Indicators & Lifestyle
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {Object.entries(formData.symptomsLifestyle).map(([key, val]) => (
                  <div key={key} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block capitalize text-[11px]">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-bold text-slate-800 capitalize">
                      {val ? val.replace(/_/g, ' ') : 'Not answered'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DisclaimerBanner variant="subtle" />
        </div>
      )}

      {/* Navigation Wizard Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <div>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-xs font-medium transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div>
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-98"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-base font-bold shadow-lg shadow-emerald-600/25 transition-all active:scale-98 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isSubmitting ? 'Analyzing Responses...' : 'Generate Nutrition Report'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
