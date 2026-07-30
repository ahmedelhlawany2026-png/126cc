import type { Metadata } from 'next';
import VecPageClient from './VecPageClient';
import { defaultFaqs, defaultTestimonials } from './VecPageClient.data';
import { getFaqs, getTestimonials } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'VEC | Engineering Consultancy — Vision Group',
  description:
    'VEC: استشارات هندسية متكاملة — دراسات جدوى، تصميم معماري وإنشائي، MEP، BIM، إدارة مشاريع وإشراف هندسي، وتراخيص.',
  alternates: { canonical: '/vec' },
  openGraph: {
    title: 'VEC | Engineering Consultancy — Vision Group',
    description: 'استشارات هندسية متكاملة من دراسة الجدوى إلى الإشراف على التنفيذ.',
    url: '/vec',
    images: [{ url: '/images/vec/vec-hero.jpg' }]
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'VEC — Engineering Consultants',
  parentOrganization: { '@type': 'Organization', name: 'Vision Group' },
  description: 'Engineering consultancy: architectural & structural design, MEP, BIM, project management and licensing.',
  areaServed: 'EG'
};

export default async function VecPage() {
  const dbFaqs = await getFaqs(
    'vec',
    defaultFaqs.map((f) => ({ question_ar: f.qAr, question_en: f.qEn, answer_ar: f.aAr, answer_en: f.aEn }))
  );
  const faqs = dbFaqs.map((f) => ({ qAr: f.question_ar, qEn: f.question_en, aAr: f.answer_ar, aEn: f.answer_en }));

  const dbTestimonials = await getTestimonials(
    'vec',
    defaultTestimonials.map((t) => ({
      client_name: t.nameAr, role_ar: t.roleAr, role_en: t.roleEn,
      quote_ar: t.quoteAr, quote_en: t.quoteEn, rating: t.rating, color_tag: 'ink'
    }))
  );
  const testimonials = dbTestimonials.map((t) => ({
    nameAr: t.client_name, nameEn: t.client_name, roleAr: t.role_ar, roleEn: t.role_en,
    companyTag: 'vec' as const, quoteAr: t.quote_ar, quoteEn: t.quote_en, rating: t.rating
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VecPageClient faqs={faqs} testimonials={testimonials} />
    </>
  );
}
