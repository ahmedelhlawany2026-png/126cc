'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';

export default function Header() {
  const { t, toggle } = useLang();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-bg/80 backdrop-blur-md border-b border-line">
      <Link href="/" className="text-xl font-extrabold text-ink display">
        VISION <span className="text-primary">GROUP</span>
      </Link>

      <nav className="hidden md:flex gap-8 text-sm font-semibold text-ink/80">
        <Link href="/bio-vision" className="hover:text-ink">{t('بايو فيجن', 'Bio Vision')}</Link>
        <Link href="/home-vision" className="hover:text-ink">{t('هوم فيجن', 'Home Vision')}</Link>
        <Link href="/vec" className="hover:text-ink">VEC</Link>
        <Link href="/team" className="hover:text-ink">{t('فريقنا', 'Our Team')}</Link>
        <Link href="/contact" className="hover:text-ink">{t('تواصل معنا', 'Contact')}</Link>
      </nav>

      <button
        onClick={toggle}
        className="border border-ink text-ink rounded-full px-4 py-2 text-xs font-bold hover:bg-ink hover:text-white transition-colors"
      >
        EN / عربي
      </button>
    </header>
  );
}
