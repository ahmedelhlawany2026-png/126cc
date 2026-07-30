'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-ink text-white/55 py-12 px-6 text-center text-sm">
      <p>
        <b className="text-white">Vision Group</b> — {t('رؤية واحدة، ثلاث شركات متخصصة', 'One vision, three specialised companies')}
      </p>
      <p className="mt-3">
        <Link href="/contact" className="underline hover:text-white/80">{t('تواصل معنا', 'Contact us')}</Link>
        {' · '}
        <Link href="/team" className="underline hover:text-white/80">{t('فريقنا', 'Our Team')}</Link>
      </p>
      <p className="mt-2">© 2026 Vision Group. All rights reserved.</p>
    </footer>
  );
}
