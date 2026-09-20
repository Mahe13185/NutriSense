'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getUserAssessments, deleteAssessment } from '@/lib/supabaseStorage';
import { SavedAssessmentRecord } from '@/types';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import {
  History,
  Calendar,
  ArrowRight,
  Sparkles,
  Trash2,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';

export default function HistoryPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [assessments, setAssessments] = useState<SavedAssessmentRecord[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/history');
    }
  }, [user, loading, router]);

  // Fetch assessments
  useEffect(() => {
    async function loadAssessments() {
      if (user) {
        setFetching(true);
        const { data, error } = await getUserAssessments(user.id);
        if (data) {
          setAssessments(data);
        }
        setFetching(false);
      }
    }
    if (user) {
      loadAssessments();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this historical assessment? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    const { success, error } = await deleteAssessment(id);
    setDeletingId(null);

    if (success) {
      setAssessments((prev) => prev.filter((a) => a.id !== id));
      setStatusMessage('Assessment record removed successfully.');
      setTimeout(() => setStatusMessage(null), 3000);
    } else {
      alert(error?.message || 'Failed to delete assessment record.');
    }
  };

  if (loading || (!user && fetching)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading assessment history...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
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
            <span className="text-xs text-slate-400">Account History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
            <History className="w-7 h-7 text-emerald-600" />
            <span>Assessment History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review past dietary evaluations and track how your nutritional risk indications have evolved.
          </p>
        </div>

        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs transition-all active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Assessment</span>
        </Link>
      </div>

      {/* Success Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* History List */}
      {assessments.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {assessments.length} saved assessment{assessments.length > 1 ? 's' : ''}</span>
            <span>Sorted by most recent</span>
          </div>

          <div className="space-y-4">
            {assessments.map((record) => {
              const res = record.result_data;
              const elevated = res?.nutrients?.filter((n) => n.riskLevel === 'elevated') || [];
              const moderate = res?.nutrients?.filter((n) => n.riskLevel === 'moderate') || [];
              const low = res?.nutrients?.filter((n) => n.riskLevel === 'low') || [];

              const dateFormatted = new Date(record.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={record.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{dateFormatted}</span>
                        <span className="text-[11px] text-slate-500">
                          Diet: {record.assessment_data?.basicInfo?.dietaryPreference?.replace('_', ' ') || 'General'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/results?id=${record.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all border border-emerald-200"
                      >
                        <span>View Full Report</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId === record.id}
                        aria-label="Delete assessment"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Risk Overview Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
                      <span className="font-semibold text-rose-800">Elevated Indication:</span>
                      <span className="font-extrabold text-rose-900">{elevated.length} areas</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                      <span className="font-semibold text-amber-800">Moderate Indication:</span>
                      <span className="font-extrabold text-amber-900">{moderate.length} areas</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                      <span className="font-semibold text-emerald-800">Low Indication:</span>
                      <span className="font-extrabold text-emerald-900">{low.length} areas</span>
                    </div>
                  </div>

                  {/* Flagged Areas summary */}
                  {res?.topRiskAreas && res.topRiskAreas.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-500 mr-1">Focus Areas:</span>
                      {res.topRiskAreas.map((area, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/90 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <History className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">No Assessment History</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              When you complete and save dietary assessments while logged in, your preliminary nutritional risk indications will appear here.
            </p>
          </div>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>Take Your First Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Non-Diagnostic Disclaimer */}
      <DisclaimerBanner variant="compact" />
    </div>
  );
}
