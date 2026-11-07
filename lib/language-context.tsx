'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Language, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LanguageOption } from '@/types/language';
import en from '@/locales/en.json';
import te from '@/locales/te.json';
import hi from '@/locales/hi.json';
import ta from '@/locales/ta.json';

const DICTIONARIES: Record<Language, any> = {
  en,
  te,
  hi,
  ta,
};

const STORAGE_KEY = 'nutrisense_lang';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: LanguageOption[];
  t: (key: string, params?: Record<string, string | number>) => string;
  tRaw: <T = any>(key: string) => T | undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function resolveKey(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore saved language preference on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang && (savedLang === 'en' || savedLang === 'te' || savedLang === 'hi' || savedLang === 'ta')) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = DEFAULT_LANGUAGE;
      }
    } catch (e) {
      // LocalStorage might fail in restricted environments
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      // Ignore localStorage errors
    }
  };

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>): string => {
      const activeDict = DICTIONARIES[language] || DICTIONARIES[DEFAULT_LANGUAGE];
      let value = resolveKey(activeDict, key);

      // Fallback to English if missing in selected language
      if (value === undefined || value === null) {
        value = resolveKey(DICTIONARIES.en, key);
      }

      if (value === undefined || value === null) {
        return key;
      }

      if (typeof value !== 'string') {
        return String(value);
      }

      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramVal]) => {
          return str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        }, value);
      }

      return value;
    };
  }, [language]);

  const tRaw = useMemo(() => {
    return <T = any>(key: string): T | undefined => {
      const activeDict = DICTIONARIES[language] || DICTIONARIES[DEFAULT_LANGUAGE];
      let val = resolveKey(activeDict, key);
      if (val === undefined) {
        val = resolveKey(DICTIONARIES.en, key);
      }
      return val as T;
    };
  }, [language]);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      languages: SUPPORTED_LANGUAGES,
      t,
      tRaw,
    }),
    [language, t, tRaw]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  return useLanguage();
}

