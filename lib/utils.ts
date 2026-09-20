import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBmi(weightKg: number, heightCm: number): { bmi: number; category: string } {
  if (!weightKg || !heightCm || heightCm <= 0) return { bmi: 0, category: 'N/A' };
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  
  let category = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 23) category = 'Normal (Asian Indian ICMR cut-off)';
  else if (bmi < 27.5) category = 'Overweight';
  else category = 'Obese';

  return { bmi, category };
}

/**
 * Validates that a redirect path is a safe internal application route.
 * Prevents open-redirect vulnerabilities (e.g., //evil.com, https://attacker.com).
 */
export function getSafeRedirect(redirectParam: string | null | undefined, fallback = '/dashboard'): string {
  if (!redirectParam) return fallback;
  const trimmed = redirectParam.trim();
  if (
    trimmed.startsWith('/') &&
    !trimmed.startsWith('//') &&
    !trimmed.includes('\\') &&
    !trimmed.includes(':')
  ) {
    return trimmed;
  }
  return fallback;
}
