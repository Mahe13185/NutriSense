'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  Sex,
  ActivityLevel,
  DietaryPreference,
} from '@/types';
import {
  DIETARY_PREFERENCE_OPTIONS,
  ACTIVITY_LEVEL_OPTIONS,
} from '@/data/questions';
import { formatBmi } from '@/lib/utils';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import {
  User,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Activity,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading, updateProfile } = useAuth();

  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [sex, setSex] = useState<Sex | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | ''>('');
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference | ''>('');

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/profile');
    }
  }, [user, loading, router]);

  // Populate form from profile data
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setAge(profile.age ?? '');
      setSex(profile.sex || '');
      setHeight(profile.height ?? '');
      setWeight(profile.weight ?? '');
      setActivityLevel(profile.activity_level || '');
      setDietaryPreference(profile.dietary_preference || '');
    } else if (user) {
      setName(user.user_metadata?.name || user.email?.split('@')[0] || '');
    }
  }, [profile, user]);

  const bmiInfo = formatBmi(
    typeof weight === 'number' ? weight : 0,
    typeof height === 'number' ? height : 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (age !== '' && (Number(age) < 10 || Number(age) > 110)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid age between 10 and 110.' });
      return;
    }
    if (height !== '' && (Number(height) < 80 || Number(height) > 250)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid height in cm (80–250 cm).' });
      return;
    }
    if (weight !== '' && (Number(weight) < 20 || Number(weight) > 300)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid weight in kg (20–300 kg).' });
      return;
    }

    setIsSaving(true);
    const { profile: updated, error } = await updateProfile({
      name: name.trim(),
      age: age === '' ? null : Number(age),
      sex: sex === '' ? null : (sex as Sex),
      height: height === '' ? null : Number(height),
      weight: weight === '' ? null : Number(weight),
      activity_level: activityLevel === '' ? null : (activityLevel as ActivityLevel),
      dietary_preference: dietaryPreference === '' ? null : (dietaryPreference as DietaryPreference),
    });
    setIsSaving(false);

    if (error) {
      setStatusMessage({ type: 'error', text: error.message || 'Failed to update profile.' });
    } else {
      setStatusMessage({ type: 'success', text: 'Profile updated successfully! Basic information will prefill in new assessments.' });
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-400">Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
            <User className="w-7 h-7 text-emerald-600" />
            <span>Profile & Baseline Information</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Keep your demographic and dietary profile up to date to easily prefill future assessments.
          </p>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Demographics & Anthropometrics
            </h2>
            <p className="text-xs text-slate-500">
              Used to contextualize dietary recommendations with ICMR-NIN (2024) guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="fullName" className="block text-xs font-bold text-slate-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Email (Read only) */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="userEmail" className="block text-xs font-bold text-slate-700">
                Account Email <span className="text-[10px] text-slate-400">(Managed via Supabase Auth)</span>
              </label>
              <input
                id="userEmail"
                type="email"
                disabled
                value={user.email || ''}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium cursor-not-allowed"
              />
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label htmlFor="userAge" className="block text-xs font-bold text-slate-700">
                Age (years)
              </label>
              <input
                id="userAge"
                type="number"
                min={10}
                max={110}
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 25"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Biological Sex */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Biological Sex</label>
              <div className="grid grid-cols-3 gap-2">
                {(['female', 'male', 'other'] as Sex[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSex(s)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all text-center ${
                      sex === s
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            <div className="space-y-1.5">
              <label htmlFor="userHeight" className="block text-xs font-bold text-slate-700">
                Height (cm)
              </label>
              <input
                id="userHeight"
                type="number"
                min={80}
                max={250}
                value={height}
                onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 165"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm font-medium text-slate-900"
              />
            </div>

            {/* Weight */}
            <div className="space-y-1.5">
              <label htmlFor="userWeight" className="block text-xs font-bold text-slate-700">
                Weight (kg)
              </label>
              <input
                id="userWeight"
                type="number"
                min={20}
                max={300}
                value={weight}
                onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 60"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Live BMI Preview */}
          {bmiInfo.bmi > 0 && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-700 font-medium">Estimated Body Mass Index (BMI):</span>
              </div>
              <span className="font-bold text-emerald-900">
                {bmiInfo.bmi} kg/m² ({bmiInfo.category})
              </span>
            </div>
          )}
        </div>

        {/* Activity Level & Dietary Preference Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          {/* Activity Level */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Typical Physical Activity Level</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ACTIVITY_LEVEL_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  onClick={() => setActivityLevel(opt.value as ActivityLevel)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    activityLevel === opt.value
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{opt.label}</span>
                    <input
                      type="radio"
                      name="profileActivity"
                      checked={activityLevel === opt.value}
                      onChange={() => {}}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{opt.description}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Primary Dietary Preference */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Primary Dietary Pattern</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DIETARY_PREFERENCE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  onClick={() => setDietaryPreference(opt.value as DietaryPreference)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    dietaryPreference === opt.value
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{opt.label}</span>
                    <input
                      type="radio"
                      name="profileDiet"
                      checked={dietaryPreference === opt.value}
                      onChange={() => {}}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{opt.description}</p>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm transition-all active:scale-98 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>

      {/* Non-Diagnostic Disclaimer */}
      <DisclaimerBanner variant="compact" />
    </div>
  );
}
