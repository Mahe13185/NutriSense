import { supabase, isSupabaseConfigured } from './supabase';
import { AssessmentFormData, AssessmentResult, SavedAssessmentRecord } from '@/types';

/**
 * Saves a completed assessment snapshot to Supabase PostgreSQL assessments table.
 * Row Level Security guarantees the user can only insert records for their authenticated user ID.
 */
export async function saveAssessmentToSupabase(
  userId: string,
  assessmentData: AssessmentFormData,
  resultData: AssessmentResult
): Promise<{ data: SavedAssessmentRecord | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return {
      data: null,
      error: new Error('Supabase is not configured. Assessment saved locally only.'),
    };
  }

  try {
    const { data, error } = await supabase
      .from('assessments')
      .insert({
        user_id: userId,
        assessment_data: assessmentData,
        result_data: resultData,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving assessment to Supabase:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as SavedAssessmentRecord, error: null };
  } catch (err: any) {
    console.error('Unexpected error saving assessment:', err);
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Fetches all assessments belonging to the authenticated user.
 * Row Level Security enforces that only the current user's records are returned.
 */
export async function getUserAssessments(
  userId: string
): Promise<{ data: SavedAssessmentRecord[] | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: [], error: null };
  }

  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assessments from Supabase:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: (data as SavedAssessmentRecord[]) || [], error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching assessments:', err);
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Fetches a specific assessment by its UUID.
 * Row Level Security ensures a user can only load assessments that belong to their authenticated ID.
 */
export async function getAssessmentById(
  assessmentId: string
): Promise<{ data: SavedAssessmentRecord | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessmentId)
      .single();

    if (error) {
      console.error('Error fetching assessment by ID:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as SavedAssessmentRecord, error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching assessment by ID:', err);
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Deletes an assessment by its ID.
 * Row Level Security ensures a user can only delete their own assessment.
 */
export async function deleteAssessment(
  assessmentId: string
): Promise<{ success: boolean; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: new Error('Supabase is not configured.') };
  }

  try {
    const { error } = await supabase
      .from('assessments')
      .delete()
      .eq('id', assessmentId);

    if (error) {
      console.error('Error deleting assessment from Supabase:', error);
      return { success: false, error: new Error(error.message) };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error('Unexpected error deleting assessment:', err);
    return { success: false, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
