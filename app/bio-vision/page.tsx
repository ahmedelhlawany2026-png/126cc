import type { Metadata } from 'next';
import BioVisionPageClient from './BioVisionPageClient';
import { defaultFaqs, defaultTestimonials } from './BioVisionPageClient.data';
import { getFaqs, getTestimonials } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'بايو فيجن | Bio Vision — Medical Fit-Out',
  description:
    'بايو فيجن: تجهيز طبي متكامل للمستشفيات والعيادات ومراكز الأشعة ومعامل التحاليل وغرف العمليات وفق أعلى المعايير الطبية العالمية.',
  alternates: { canonical: '/bio-vision' },
  openGraph: {
    title: 'بايو فيجن | Bio Vision — Medical Fit-Out',
    description: 'تجهيز طبي متكامل للمستشفيات والعيادات ومراكز الأشعة ومعامل التحاليل وغرف العمليات.',
    url: '/bio-vision',
    images: [{ url: '/images/bio-vision-featured/bio-hero.jpg' }]
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Bio Vision',
  parentOrganization: { '@type': 'Organization', name: 'Vision Group' },
  description: 'Medical fit-out: hospitals, clinics, radiology centres, laboratories and operating theatres to global medical standards.',
  areaServed: 'EG'
};

export default async function BioVisionPage() {
  const dbFaqs = await getFaqs(
    'bio-vision',
    defaultFaqs.map((f) => ({ question_ar: f.qAr, question_en: f.qEn, answer_ar: f.aAr, answer_en: f.aEn }))
  );
  const faqs = dbFaqs.map((f) => ({ qAr: f.question_ar, qEn: f.question_en, aAr: f.answer_ar, aEn: f.answer_en }));

  const dbTestimonials = await getTestimonials(
    'bio-vision',
    defaultTestimonials.map((t) => ({
      client_name: t.nameAr, role_ar: t.roleAr, role_en: t.roleEn,
      quote_ar: t.quoteAr, quote_en: t.quoteEn, rating: t.rating, color_tag: 'secondary'
    }))
  );
  const testimonials = dbTestimonials.map((t) => ({
    nameAr: t.client_name, nameEn: t.client_name, roleAr: t.role_ar, roleEn: t.role_en,
    companyTag: 'bio' as const, quoteAr: t.quote_ar, quoteEn: t.quote_en, rating: t.rating
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BioVisionPageClient faqs={faqs} testimonials={testimonials} />
    </>
  );
}
