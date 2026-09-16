import { AssessmentFormData, AssessmentResult } from '@/types';

const ASSESSMENT_RESULT_KEY = 'nutrisense_latest_result';
const ASSESSMENT_FORM_KEY = 'nutrisense_draft_form';

export function saveAssessmentResult(result: AssessmentResult): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ASSESSMENT_RESULT_KEY, JSON.stringify(result));
  } catch (error) {
    console.error('Failed to save assessment result to localStorage:', error);
  }
}

export function getLatestAssessmentResult(): AssessmentResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(ASSESSMENT_RESULT_KEY);
    if (!data) return null;
    return JSON.parse(data) as AssessmentResult;
  } catch (error) {
    console.error('Failed to parse assessment result from localStorage:', error);
    return null;
  }
}

export function saveDraftFormData(formData: AssessmentFormData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ASSESSMENT_FORM_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Failed to save draft form data:', error);
  }
}

export function getDraftFormData(): AssessmentFormData | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(ASSESSMENT_FORM_KEY);
    if (!data) return null;
    return JSON.parse(data) as AssessmentFormData;
  } catch (error) {
    console.error('Failed to parse draft form data:', error);
    return null;
  }
}

export function clearAssessmentData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ASSESSMENT_RESULT_KEY);
    localStorage.removeItem(ASSESSMENT_FORM_KEY);
  } catch (error) {
    console.error('Failed to clear assessment data:', error);
  }
}
