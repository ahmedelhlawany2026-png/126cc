import type { Metadata } from 'next';
import { Cairo, Tajawal, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', weight: ['400', '600', '700', '800', '900'] });
const tajawal = Tajawal({ subsets: ['arabic', 'latin'], variable: '--font-tajawal', weight: ['300', '400', '500', '700', '900'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.visiongroup-eg.com'),
  title: {
    default: 'Vision Group — رؤية واحدة، ثلاث شركات متخصصة',
    template: '%s'
  },
  description:
    'Vision Group: Bio Vision (Medical Fit-Out), Home Vision (Residential Fit-Out) and VEC (Engineering Consultancy).',
  openGraph: {
    siteName: 'Vision Group',
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${tajawal.variable} ${inter.variable}`}>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
