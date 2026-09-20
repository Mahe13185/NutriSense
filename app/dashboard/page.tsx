'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getUserAssessments } from '@/lib/supabaseStorage';
import { SavedAssessmentRecord } from '@/types';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import {
  Sparkles,
  History,
  User,
  LogOut,
  ArrowRight,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  ChevronRight,
  Apple,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  const [assessments, setAssessments] = useState<SavedAssessmentRecord[]>([]);
  const [fetchingData, setFetchingData] = useState<boolean>(true);

  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/dashboard');
    }
  }, [user, loading, router]);

  // Load user assessments
  useEffect(() => {
    async function loadData() {
      if (user) {
        setFetchingData(true);
        const { data } = await getUserAssessments(user.id);
        if (data) {
          setAssessments(data);
        }
        setFetchingData(false);
      }
    }
    if (user) {
      loadData();
    }
  }, [user]);

  if (loading || (!user && fetchingData)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const latestAssessment = assessments.length > 0 ? assessments[0] : null;
  const latestResult = latestAssessment ? latestAssessment.result_data : null;

  // Compute risk indicators count for the latest assessment
  const elevatedAreas = latestResult
    ? latestResult.nutrients.filter((n) => n.riskLevel === 'elevated')
    : [];
  const moderateAreas = latestResult
    ? latestResult.nutrients.filter((n) => n.riskLevel === 'moderate')
    : [];
  const lowAreas = latestResult
    ? latestResult.nutrients.filter((n) => n.riskLevel === 'low')
    : [];

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const displayName = profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'Member';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Welcome Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              User Dashboard
            </span>
            <span className="text-xs text-slate-400">Personal Nutrition Awareness</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome, <span className="text-emerald-700">{displayName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your dietary profiles, review previous assessment indications, and explore food insights.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-all"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-semibold text-slate-700 shadow-xs transition-all"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Action Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-emerald-100 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Smart Nutrition Evaluation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ready to Evaluate Your Dietary Habits?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Answer our 3-step dietary and lifestyle questionnaire to explore explainable nutritional risk patterns informed by ICMR-NIN (2024) reference guidelines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full sm:w-auto">
          <Link
            href="/assessment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-bold shadow-md transition-all active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Take New Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metric Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Completed Assessments Count */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Assessments</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{assessments.length}</span>
            <span className="text-xs text-slate-500 font-medium">recorded</span>
          </div>
          <p className="text-xs text-slate-500">
            {assessments.length > 0 ? 'Saved securely in your account' : 'No assessments completed yet'}
          </p>
        </div>

        {/* Most Recent Assessment Date */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Latest Assessment</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              {latestAssessment
                ? new Date(latestAssessment.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'None yet'}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {latestAssessment ? 'Most recent analysis date' : 'Complete an assessment to view'}
          </p>
        </div>

        {/* Focus Areas Requiring Attention */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Focus Areas</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              {latestResult ? `${latestResult.topRiskAreas.length} Flagged` : '0 Areas'}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate">
            {latestResult && latestResult.topRiskAreas.length > 0
              ? latestResult.topRiskAreas.join(', ')
              : 'No areas requiring attention'}
          </p>
        </div>
      </div>

      {/* LATEST NUTRITION RISK OVERVIEW */}
      {latestAssessment && latestResult ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Latest Nutrition Risk Overview</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Nutrient Indications from Last Assessment
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/results?id=${latestAssessment.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs transition-all"
              >
                <span>View Full Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Breakdown summary badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
              <div>
                <span className="text-rose-800 font-bold block">Elevated Indication</span>
                <span className="text-rose-600 text-[11px]">Potential dietary deficit</span>
              </div>
              <span className="text-lg font-extrabold text-rose-900">{elevatedAreas.length}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
              <div>
                <span className="text-amber-800 font-bold block">Moderate Indication</span>
                <span className="text-amber-600 text-[11px]">May benefit from attention</span>
              </div>
              <span className="text-lg font-extrabold text-amber-900">{moderateAreas.length}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-emerald-800 font-bold block">Low Indication</span>
                <span className="text-emerald-600 text-[11px]">Adequate intake patterns</span>
              </div>
              <span className="text-lg font-extrabold text-emerald-900">{lowAreas.length}</span>
            </div>
          </div>

          {/* Flagged Nutrient Areas List */}
          {latestResult.topRiskAreas.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nutrient Areas Requiring Attention:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {latestResult.nutrients
                  .filter((n) => n.riskLevel === 'elevated' || n.riskLevel === 'moderate')
                  .map((nutrient) => (
                    <div
                      key={nutrient.nutrientId}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        nutrient.riskLevel === 'elevated'
                          ? 'bg-rose-50/60 border-rose-200'
                          : 'bg-amber-50/60 border-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{nutrient.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            nutrient.riskLevel === 'elevated'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {nutrient.riskLevel === 'elevated' ? 'Elevated Indication' : 'Moderate Indication'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] line-clamp-2">
                        {nutrient.reasons[0] || 'Dietary frequency indicates potential room for optimization.'}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Quick summary text */}
          <p className="text-xs text-slate-500 italic pt-1">
            *Preliminary nutritional risk indication. Informed by documented nutrition references including ICMR-NIN 2024. Not a clinical diagnosis.
          </p>
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">No Assessment History Found</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              You have not saved any dietary assessments yet. Complete your first assessment to start building your nutritional awareness profile.
            </p>
          </div>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>Start First Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Quick Navigation Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/history"
          className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">
                Assessment History
              </span>
              <span className="text-[11px] text-slate-500">View past assessments</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/profile"
          className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">
                Profile Settings
              </span>
              <span className="text-[11px] text-slate-500">Update basic info & diet</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/foods"
          className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Apple className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">
                Food Explorer
              </span>
              <span className="text-[11px] text-slate-500">Search nutrient-dense foods</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>

      {/* Non-Diagnostic Disclaimer */}
      <DisclaimerBanner variant="compact" />
    </div>
  );
}
