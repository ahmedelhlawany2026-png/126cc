import type { Metadata } from 'next';
import HomeVisionPageClient from './HomeVisionPageClient';
import { defaultFaqs, defaultTestimonials } from './HomeVisionPageClient.data';
import { getFaqs, getTestimonials } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'هوم فيجن | Home Vision — Residential Fit-Out',
  description:
    'هوم فيجن: تشطيبات سكنية للفلل والشقق والعمارات، مقاولات عامة، ولاندسكيب متكامل، من التصميم إلى التسليم.',
  alternates: { canonical: '/home-vision' },
  openGraph: {
    title: 'هوم فيجن | Home Vision — Residential Fit-Out',
    description: 'تشطيبات سكنية للفلل والشقق والعمارات، مقاولات عامة، ولاندسكيب متكامل.',
    url: '/home-vision',
    images: [{ url: '/images/home-vision-featured/home-hero.jpg' }]
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Home Vision',
  parentOrganization: { '@type': 'Organization', name: 'Vision Group' },
  description: 'Residential fit-out: villas, apartments, buildings, interior/exterior finishing, general contracting and landscaping.',
  areaServed: 'EG'
};

export default async function HomeVisionPage() {
  const dbFaqs = await getFaqs(
    'home-vision',
    defaultFaqs.map((f) => ({ question_ar: f.qAr, question_en: f.qEn, answer_ar: f.aAr, answer_en: f.aEn }))
  );
  const faqs = dbFaqs.map((f) => ({ qAr: f.question_ar, qEn: f.question_en, aAr: f.answer_ar, aEn: f.answer_en }));

  const dbTestimonials = await getTestimonials(
    'home-vision',
    defaultTestimonials.map((t) => ({
      client_name: t.nameAr, role_ar: t.roleAr, role_en: t.roleEn,
      quote_ar: t.quoteAr, quote_en: t.quoteEn, rating: t.rating, color_tag: 'primary'
    }))
  );
  const testimonials = dbTestimonials.map((t) => ({
    nameAr: t.client_name, nameEn: t.client_name, roleAr: t.role_ar, roleEn: t.role_en,
    companyTag: 'home' as const, quoteAr: t.quote_ar, quoteEn: t.quote_en, rating: t.rating
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeVisionPageClient faqs={faqs} testimonials={testimonials} />
    </>
  );
}
