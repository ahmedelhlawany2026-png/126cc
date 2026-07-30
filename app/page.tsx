import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import { defaultTimeline } from '@/components/Timeline.data';
import Sectors from '@/components/Sectors';
import Numbers from '@/components/Numbers';
import { defaultStats } from '@/components/Numbers.data';
import Clients from '@/components/Clients';
import { defaultLogos } from '@/components/Clients.data';
import Testimonials from '@/components/Testimonials';
import { defaultTestimonials } from '@/components/Testimonials.data';
import Expansion from '@/components/Expansion';
import VisionGroupClosing from '@/components/VisionGroupClosing';
import { getStatistics, getClients, getTimeline, getTestimonials } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Vision Group — رؤية واحدة، ثلاث شركات متخصصة',
  description:
    'Vision Group: ثلاث شركات متخصصة تحت مظلة واحدة — Bio Vision للتجهيز الطبي، Home Vision للتشطيبات السكنية، وVEC للاستشارات الهندسية.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Vision Group — رؤية واحدة، ثلاث شركات متخصصة',
    description: 'Bio Vision (تجهيز طبي) · Home Vision (تشطيب سكني) · VEC (استشارات هندسية)',
    url: '/',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 1697 }]
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vision Group',
  description: 'One vision, three specialised companies: Bio Vision (Medical Fit-Out), Home Vision (Residential Fit-Out), VEC (Engineering Consultancy).',
  subOrganization: [
    { '@type': 'Organization', name: 'Bio Vision' },
    { '@type': 'Organization', name: 'Home Vision' },
    { '@type': 'Organization', name: 'VEC' }
  ]
};

export default async function HomePage() {
  const dbStats = await getStatistics(
    defaultStats.map((s) => ({ label_ar: s.labelAr, label_en: s.labelEn, value: s.target, prefix: s.prefix, suffix: s.suffix }))
  );
  const stats = dbStats.map((s) => ({ target: s.value, prefix: s.prefix, suffix: s.suffix, labelAr: s.label_ar, labelEn: s.label_en }));

  const dbClients = await getClients(defaultLogos.map((name) => ({ name })));
  const logos = dbClients.map((c) => c.name);

  const dbTimeline = await getTimeline(
    defaultTimeline.map((t) => ({
      year: t.year, tag_ar: t.tagAr, tag_en: t.tagEn, title_ar: t.titleAr, title_en: t.titleEn,
      description_ar: t.descAr, description_en: t.descEn
    }))
  );
  const timeline = dbTimeline.map((t) => ({
    year: t.year, tagAr: t.tag_ar, tagEn: t.tag_en, titleAr: t.title_ar, titleEn: t.title_en,
    descAr: t.description_ar, descEn: t.description_en
  }));

  const dbTestimonials = await getTestimonials(
    null,
    defaultTestimonials.map((t) => ({
      client_name: t.nameAr, role_ar: t.roleAr, role_en: t.roleEn,
      quote_ar: t.quoteAr, quote_en: t.quoteEn, rating: t.rating, color_tag: t.companyTag === 'bio' ? 'secondary' : t.companyTag === 'home' ? 'primary' : 'ink'
    }))
  );
  const testimonials = dbTestimonials.map((t) => ({
    nameAr: t.client_name, nameEn: t.client_name, roleAr: t.role_ar, roleEn: t.role_en,
    companyTag: (t.color_tag === 'secondary' ? 'bio' : t.color_tag === 'primary' ? 'home' : 'vec') as 'bio' | 'home' | 'vec',
    quoteAr: t.quote_ar, quoteEn: t.quote_en, rating: t.rating
  }));

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <About />
      <Timeline items={timeline} />
      <Sectors />
      <Numbers stats={stats} />
      <Clients logos={logos} />
      <Testimonials testimonials={testimonials} />
      <Expansion />
      <VisionGroupClosing />
    </main>
  );
}
