'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Lang = 'ar' | 'en';

interface LangContextValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  toggle: () => void;
  t: (ar: string, en: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');
  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const toggle = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  const t = (ar: string, en: string) => (lang === 'ar' ? ar : en);

  return (
    <LangContext.Provider value={{ lang, dir, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
