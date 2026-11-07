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
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from '@/lib/language-context';
import { saveAssessmentToSupabase } from '@/lib/supabaseStorage';

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
  const { user, profile, loading } = useAuth();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<AssessmentFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Protect route against unauthenticated access
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/assessment');
    }
  }, [user, loading, router]);

  // Load draft or prefill from profile
  useEffect(() => {
    const draft = getDraftFormData();
    if (draft) {
      setFormData(draft);
    } else if (profile) {
      setFormData((prev) => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          age: profile.age ?? '',
          sex: profile.sex ?? '',
          heightCm: profile.height ?? '',
          weightKg: profile.weight ?? '',
          activityLevel: profile.activity_level ?? '',
          dietaryPreference: profile.dietary_preference ?? '',
        },
      }));
    }
  }, [profile]);

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
      if (!age || Number(age) < 10 || Number(age) > 110) newErrors.push(t('assessment.validation.age'));
      if (!sex) newErrors.push(t('assessment.validation.sex'));
      if (!heightCm || Number(heightCm) < 80 || Number(heightCm) > 250) newErrors.push(t('assessment.validation.height'));
      if (!weightKg || Number(weightKg) < 20 || Number(weightKg) > 300) newErrors.push(t('assessment.validation.weight'));
      if (!activityLevel) newErrors.push(t('assessment.validation.activity'));
      if (!dietaryPreference) newErrors.push(t('assessment.validation.diet'));
    }

    if (step === 2) {
      const { fruits, vegetables, greenLeafy, pulsesLegumes, dairyOrAlternatives, nutsSeeds, wholeGrainsMillets, fortifiedFoods, eggsMeatFish } =
        formData.dietaryHabits;
      const isVeg =
        formData.basicInfo.dietaryPreference === 'vegetarian' ||
        formData.basicInfo.dietaryPreference === 'vegan' ||
        formData.basicInfo.dietaryPreference === 'lacto_vegetarian';

      if (!fruits) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.fruits.title') }));
      if (!vegetables) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.vegetables.title') }));
      if (!greenLeafy) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.greenLeafy.title') }));
      if (!pulsesLegumes) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.pulsesLegumes.title') }));
      if (!dairyOrAlternatives) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.dairyOrAlternatives.title') }));
      if (!isVeg && !eggsMeatFish) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.eggsMeatFish.title') }));
      if (!nutsSeeds) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.nutsSeeds.title') }));
      if (!wholeGrainsMillets) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.wholeGrainsMillets.title') }));
      if (!fortifiedFoods) newErrors.push(t('assessment.validation.foodGroup', { foodGroup: t('assessment.step2.foodGroups.fortifiedFoods.title') }));
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
      if (!frequentFatigue) newErrors.push(t('assessment.validation.symptom', { symptom: t('assessment.step3.symptoms.frequentFatigue.title') }));
      if (!generalWeakness) newErrors.push(t('assessment.validation.symptom', { symptom: t('assessment.step3.symptoms.generalWeakness.title') }));
      if (!difficultyConcentrating) newErrors.push(t('assessment.validation.symptom', { symptom: t('assessment.step3.symptoms.difficultyConcentrating.title') }));
      if (!paleAppearance) newErrors.push(t('assessment.validation.symptom', { symptom: t('assessment.step3.symptoms.paleAppearance.title') }));
      if (!muscleCrampsWeakness) newErrors.push(t('assessment.validation.symptom', { symptom: t('assessment.step3.symptoms.muscleCrampsWeakness.title') }));
      if (!hairSkinChanges) newErrors.push(t('assessment.validation.symptom', { symptom: t('assessment.step3.symptoms.hairSkinChanges.title') }));
      if (!poorAppetite) newErrors.push(t('assessment.validation.symptom', { symptom: t('assessment.step3.symptoms.poorAppetite.title') }));
      if (!sunExposure) newErrors.push(t('assessment.validation.sun'));
      if (!teaCoffeeWithMeals) newErrors.push(t('assessment.validation.tea'));
      if (!sleepQuality) newErrors.push(t('assessment.validation.sleep'));
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

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Evaluate assessment through client-side rule engine
      const evaluation = evaluateAssessment(formData);
      // 2. Persist to localStorage for fallback & instant display
      saveAssessmentResult(evaluation);

      // 3. If authenticated, await Supabase save with graceful error handling
      let cloudId: string | null = null;
      if (user) {
        try {
          const { data: savedRecord, error: saveErr } = await saveAssessmentToSupabase(
            user.id,
            formData,
            evaluation
          );
          if (saveErr) {
            console.warn('Cloud assessment save warning:', saveErr.message);
          } else if (savedRecord?.id) {
            cloudId = savedRecord.id;
          }
        } catch (cloudErr) {
          console.warn('Could not save assessment to cloud:', cloudErr);
        }
      }

      // 4. Navigate to Results page
      if (cloudId) {
        router.push(`/results?id=${cloudId}`);
      } else {
        router.push('/results');
      }
    } catch (e) {
      console.error('Evaluation error:', e);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (confirm(t('assessment.step4.resetConfirm'))) {
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setErrors([]);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Info */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('home.heroBadge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {t('home.howItWorksTitle')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('home.howItWorksSubtitle')}
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
            <span>{t('common.notice')}:</span>
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
                {t('assessment.step1.title')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('assessment.step1.subtitle')}
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {t('assessment.step')} 1 {t('assessment.of')} 4
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Age */}
            <QuestionCard
              title={t('assessment.step1.ageLabel')}
              subtitle={t('assessment.step1.ageSubtitle')}
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
              title={t('assessment.step1.genderLabel')}
              subtitle={t('assessment.step1.genderSubtitle')}
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
                    {t(`assessment.step1.genders.${s}`)}
                  </button>
                ))}
              </div>
            </QuestionCard>

            {/* Height */}
            <QuestionCard
              title={t('assessment.step1.heightLabel')}
              subtitle={t('assessment.step1.heightSubtitle')}
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
              title={t('assessment.step1.weightLabel')}
              subtitle={t('assessment.step1.weightSubtitle')}
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
                <div className="mt-3 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">{t('assessment.step1.bmiLabel')}</span>
                    <span className="font-bold text-emerald-800">
                      {bmiInfo.bmi} kg/m² ({bmiInfo.category})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {t('assessment.step1.bmiContext')}
                  </p>
                </div>
              )}
            </QuestionCard>
          </div>

          {/* Activity Level */}
          <QuestionCard
            title={t('assessment.step1.activityLabel')}
            subtitle={t('assessment.step1.activitySubtitle')}
            required
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACTIVITY_LEVEL_OPTIONS.map((opt) => {
                const label = t(`assessment.step1.activityLevels.${opt.value}.label`) || opt.label;
                const desc = t(`assessment.step1.activityLevels.${opt.value}.desc`) || opt.description;

                return (
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
                      <span className="font-bold text-sm text-slate-900">{label}</span>
                      <input
                        type="radio"
                        name="activityLevel"
                        checked={formData.basicInfo.activityLevel === opt.value}
                        onChange={() => {}}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{desc}</p>
                  </label>
                );
              })}
            </div>
          </QuestionCard>

          {/* Dietary Preference */}
          <QuestionCard
            title={t('assessment.step1.dietLabel')}
            subtitle={t('assessment.step1.dietSubtitle')}
            required
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DIETARY_PREFERENCE_OPTIONS.map((opt) => {
                const label = t(`assessment.step1.dietTypes.${opt.value}.label`) || opt.label;
                const desc = t(`assessment.step1.dietTypes.${opt.value}.desc`) || opt.description;

                return (
                  <label
                    key={opt.value}
                    onClick={() => {
                      const newDiet = opt.value as DietaryPreference;
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
                      <span className="font-bold text-sm text-slate-900">{label}</span>
                      <input
                        type="radio"
                        name="dietaryPreference"
                        checked={formData.basicInfo.dietaryPreference === opt.value}
                        onChange={() => {}}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{desc}</p>
                  </label>
                );
              })}
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
                {t('assessment.step2.title')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('assessment.step2.subtitle')}
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {t('assessment.step')} 2 {t('assessment.of')} 4
            </span>
          </div>

          <div className="space-y-4">
            {DIETARY_QUESTIONS_CONFIG.map((q) => {
              const Icon = ICON_MAP[q.iconName] || Utensils;
              const currentValue = formData.dietaryHabits[q.key];

              const localizedTitle = t(`assessment.step2.foodGroups.${q.key}.question`) || q.question;
              const localizedBadge = t(`assessment.step2.foodGroups.${q.key}.title`) || q.name;
              const localizedSubtitle = t(`assessment.step2.foodGroups.${q.key}.subtitle`) || q.subtitle;
              const localizedExamples = t(`assessment.step2.foodGroups.${q.key}.examples`) || q.examples;

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
                  title={localizedTitle}
                  badge={localizedBadge}
                  subtitle={localizedSubtitle}
                  examples={localizedExamples}
                  required
                >
                  {isMeatQuestion && isVegUser ? (
                    <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs flex items-center justify-between">
                      <span>{t('assessment.step2.foodGroups.eggsMeatFish.subtitle')}</span>
                      <span className="font-bold text-emerald-700 uppercase">
                        {t('assessment.step2.frequencies.never.label')} ({t('assessment.step1.dietTypes.vegetarian.label').split(' ')[0]})
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                      {FOOD_FREQUENCY_OPTIONS.map((opt) => {
                        const optLabel = t(`assessment.step2.frequencies.${opt.value}.label`) || opt.label;
                        const optDesc = t(`assessment.step2.frequencies.${opt.value}.desc`) || opt.description;

                        return (
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
                            <span className="text-xs font-bold">{optLabel}</span>
                            <span className={`text-[10px] truncate max-w-full ${currentValue === opt.value ? 'text-emerald-100' : 'text-slate-400'}`}>
                              {optDesc}
                            </span>
                          </button>
                        );
                      })}
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
                {t('assessment.step3.title')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('assessment.step3.subtitle')}
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {t('assessment.step')} 3 {t('assessment.of')} 4
            </span>
          </div>

          <DisclaimerBanner variant="compact" />

          <div className="space-y-4">
            {SYMPTOM_QUESTIONS_CONFIG.map((q) => {
              const currentValue = formData.symptomsLifestyle[q.key];
              const localizedTitle = t(`assessment.step3.symptoms.${q.key}.title`) || q.title;
              const localizedSubtitle = t(`assessment.step3.symptoms.${q.key}.subtitle`) || q.subtitle;

              if (q.type === 'sun' || q.type === 'tea' || q.type === 'sleep') {
                return (
                  <QuestionCard
                    key={q.key}
                    title={localizedTitle}
                    subtitle={localizedSubtitle}
                    required
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {q.options?.map((opt) => {
                        const optLabel = t(`assessment.step3.symptoms.${q.key}.options.${opt.value}.label`) || opt.label;
                        const optDesc = t(`assessment.step3.symptoms.${q.key}.options.${opt.value}.desc`) || opt.description;

                        return (
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
                            <span className="text-xs font-bold">{optLabel}</span>
                            <span className={`text-[11px] mt-1 ${currentValue === opt.value ? 'text-emerald-100' : 'text-slate-500'}`}>
                              {optDesc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </QuestionCard>
                );
              }

              // Standard symptom frequency question
              return (
                <QuestionCard
                  key={q.key}
                  title={localizedTitle}
                  subtitle={localizedSubtitle}
                  required
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {SYMPTOM_FREQUENCY_OPTIONS.map((opt) => {
                      const optLabel = t(`assessment.step3.symptomFrequencies.${opt.value}.label`) || opt.label;
                      const optDesc = t(`assessment.step3.symptomFrequencies.${opt.value}.desc`) || opt.description;

                      return (
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
                          <span className="text-xs font-bold">{optLabel}</span>
                          <span className={`text-[10px] truncate max-w-full ${currentValue === opt.value ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {optDesc}
                          </span>
                        </button>
                      );
                    })}
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
                {t('assessment.step4.title')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('assessment.step4.subtitle')}
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {t('assessment.step')} 4 {t('assessment.of')} 4
            </span>
          </div>

          <div className="space-y-5">
            {/* Step 1 Review */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {t('assessment.step4.section1Title')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{t('assessment.step4.editSection')}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">{t('assessment.step1.ageLabel')}</span>
                  <span className="font-bold text-slate-800">
                    {formData.basicInfo.age ? `${formData.basicInfo.age}` : '—'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">{t('assessment.step1.genderLabel')}</span>
                  <span className="font-bold text-slate-800 capitalize">
                    {formData.basicInfo.sex
                      ? t(`assessment.step1.genders.${formData.basicInfo.sex}`)
                      : '—'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">{t('assessment.step1.heightLabel')} / {t('assessment.step1.weightLabel')}</span>
                  <span className="font-bold text-slate-800">
                    {formData.basicInfo.heightCm ? `${formData.basicInfo.heightCm} cm` : '—'} •{' '}
                    {formData.basicInfo.weightKg ? `${formData.basicInfo.weightKg} kg` : '—'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">{t('assessment.step1.bmiLabel')}</span>
                  <span className="font-bold text-emerald-800">
                    {bmiInfo.bmi > 0 ? `${bmiInfo.bmi} kg/m² (${bmiInfo.category})` : 'N/A'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">{t('assessment.step1.activityLabel')}</span>
                  <span className="font-bold text-slate-800">
                    {formData.basicInfo.activityLevel
                      ? t(`assessment.step1.activityLevels.${formData.basicInfo.activityLevel}.label`)
                      : '—'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">{t('assessment.step1.dietLabel')}</span>
                  <span className="font-bold text-slate-800">
                    {formData.basicInfo.dietaryPreference
                      ? t(`assessment.step1.dietTypes.${formData.basicInfo.dietaryPreference}.label`)
                      : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 Review */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {t('assessment.step4.section2Title')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{t('assessment.step4.editSection')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                {DIETARY_QUESTIONS_CONFIG.map((q) => {
                  const val = formData.dietaryHabits[q.key];
                  const isVeg =
                    formData.basicInfo.dietaryPreference === 'vegetarian' ||
                    formData.basicInfo.dietaryPreference === 'vegan' ||
                    formData.basicInfo.dietaryPreference === 'lacto_vegetarian';
                  const displayVal =
                    q.key === 'eggsMeatFish' && isVeg
                      ? `${t('assessment.step2.frequencies.never.label')} (${t('assessment.step1.dietTypes.vegetarian.label').split(' ')[0]})`
                      : val
                      ? t(`assessment.step2.frequencies.${val}.label`)
                      : '—';

                  const localizedName = t(`assessment.step2.foodGroups.${q.key}.title`) || q.name;

                  return (
                    <div
                      key={q.key}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2"
                    >
                      <span className="text-slate-600 font-medium">{localizedName}:</span>
                      <span className="font-bold text-slate-900 text-right">{displayVal}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3 Review */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {t('assessment.step4.section3Title')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{t('assessment.step4.editSection')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {SYMPTOM_QUESTIONS_CONFIG.map((q) => {
                  const val = formData.symptomsLifestyle[q.key];
                  let displayVal = '—';
                  if (val) {
                    if (q.type === 'sun' || q.type === 'tea' || q.type === 'sleep') {
                      displayVal = t(`assessment.step3.symptoms.${q.key}.options.${val}.label`) || val;
                    } else {
                      displayVal = t(`assessment.step3.symptomFrequencies.${val}.label`) || val;
                    }
                  }

                  const localizedTitle = t(`assessment.step3.symptoms.${q.key}.title`) || q.title;

                  return (
                    <div
                      key={q.key}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3"
                    >
                      <span className="text-slate-600 font-medium leading-snug">{localizedTitle}</span>
                      <span className="font-bold text-slate-900 shrink-0 text-right">{displayVal}</span>
                    </div>
                  );
                })}
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
              <span>{t('common.back')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-xs font-medium transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('common.reset')}</span>
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
              <span>{t('common.next')} ({t('assessment.step')} {currentStep + 1})</span>
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
              <span>{isSubmitting ? t('assessment.step4.evaluatingBtn') : t('assessment.step4.evaluateBtn')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
