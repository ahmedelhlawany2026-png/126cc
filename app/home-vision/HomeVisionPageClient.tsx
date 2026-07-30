'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/components/LanguageProvider';
import HomeVisionGallery from '@/components/HomeVisionGallery';
import FeaturedProjects, { FeaturedProject } from '@/components/FeaturedProjects';
import Testimonials, { Testimonial } from '@/components/Testimonials';
import { defaultTestimonials, defaultFaqs, type FaqItem } from './HomeVisionPageClient.data';

export { defaultTestimonials, defaultFaqs };
export type { FaqItem };

const featuredProjects: FeaturedProject[] = [
  {
    key: 'ashgar-darna',
    nameAr: 'دوبلكس أشجار درنة', nameEn: 'Ashgar Darna Duplex',
    locationAr: 'زهراء المعادي', locationEn: 'Zahraa El Maadi',
    area: '300 m²', durationAr: '6 أشهر', durationEn: '6 months',
    images: [1, 2, 3, 4].map((i) => ({ src: `/images/home-vision-featured/ashgar-darna-${i}.jpg`, alt: `Ashgar Darna Duplex ${i}` }))
  },
  {
    key: 'hyde-park',
    nameAr: 'دوبلكس هايد بارك', nameEn: 'Hyde Park Duplex',
    locationAr: 'ماونتن فيو هايد بارك', locationEn: 'Mountain View Hyde Park',
    area: '+500 m²', durationAr: '12 شهر', durationEn: '12 months',
    images: [1, 2, 3, 4, 5, 6, 7].map((i) => ({ src: `/images/home-vision-featured/hyde-park-${i}.jpg`, alt: `Hyde Park Duplex ${i}` }))
  },
  {
    key: 'sodic-villette',
    nameAr: 'فيلا سوديك فيليت', nameEn: 'Sodic Villette Villa',
    locationAr: 'سوديك فيليت، القاهرة الجديدة', locationEn: 'Sodic Villette, New Cairo',
    area: '+500 m²', durationAr: '12 شهر', durationEn: '12 months',
    images: [1, 2, 3, 4, 5, 6].map((i) => ({ src: `/images/home-vision-featured/sodic-villette-${i}.jpg`, alt: `Sodic Villette Villa ${i}` }))
  },
  {
    key: 'degla-compound',
    nameAr: 'دوبلكس دجلة كومباوند', nameEn: 'Degla Compound Duplex',
    locationAr: 'دجلة كومباوند، القاهرة الجديدة', locationEn: 'Degla Compound, New Cairo',
    area: '+300 m²', durationAr: '8 أشهر', durationEn: '8 months',
    images: [1, 2, 3, 4, 5].map((i) => ({ src: `/images/home-vision-featured/degla-compound-${i}.jpg`, alt: `Degla Compound Duplex ${i}` }))
  },
  {
    key: 'marasem-apartment',
    nameAr: 'شقة مراسم', nameEn: 'Marasem Apartment',
    locationAr: 'كومباوند مراسم', locationEn: 'Marasem Compound',
    area: '150 m²', durationAr: '4 أشهر', durationEn: '4 months',
    images: [1, 2, 3, 4, 5, 6, 7].map((i) => ({ src: `/images/home-vision-featured/marasem-apartment-${i}.jpg`, alt: `Marasem Apartment ${i}` }))
  }
];

const services = [
  { icon: '🏠', ar: 'الفلل والشقق', en: 'Villas & Apartments', descAr: 'تنفيذ وتشطيب كامل للوحدات السكنية بمختلف المساحات.', descEn: 'Full execution and finishing for residential units of all sizes.' },
  { icon: '🏢', ar: 'العمارات', en: 'Buildings', descAr: 'تشطيب المناطق المشتركة والوحدات في المباني السكنية.', descEn: 'Finishing common areas and units across residential buildings.' },
  { icon: '🎨', ar: 'التشطيبات الداخلية', en: 'Interior Finishing', descAr: 'دهانات، أرضيات، أسقف مستعارة، ونجارة بأعلى جودة.', descEn: 'Paint, flooring, false ceilings, and joinery at the highest quality.' },
  { icon: '🧱', ar: 'التشطيبات الخارجية', en: 'Exterior Finishing', descAr: 'واجهات ومظاهر خارجية تعكس هوية المبنى.', descEn: 'Facades and exteriors that reflect the building\u2019s identity.' },
  { icon: '📋', ar: 'المقاولات العامة', en: 'General Contracting', descAr: 'إدارة كاملة لمراحل التنفيذ من الأساسات للتسليم.', descEn: 'Full management of execution phases from foundation to handover.' },
  { icon: '🌿', ar: 'اللاندسكيب', en: 'Landscaping', descAr: 'تصميم وتنفيذ حدائق ومساحات خارجية متكاملة.', descEn: 'Design and execution of gardens and integrated outdoor spaces.' }
];

const workflow = [
  { ar: 'المعاينة والاستشارة', en: 'Site Visit & Consultation' },
  { ar: 'التصميم والعرض الفني', en: 'Design & Technical Proposal' },
  { ar: 'التعاقد والجدول الزمني', en: 'Contract & Timeline' },
  { ar: 'التنفيذ والمتابعة', en: 'Execution & Follow-up' },
  { ar: 'التسليم والضمان', en: 'Handover & Warranty' }
];

export default function HomeVisionPageClient({
  faqs = defaultFaqs,
  testimonials = defaultTestimonials
}: {
  faqs?: FaqItem[];
  testimonials?: Testimonial[];
}) {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      {/* Hero */}
      <div className="relative h-[92vh] min-h-[620px] w-full overflow-hidden flex items-end">
        <Image src="/images/home-vision-featured/home-hero.jpg" alt="Home Vision" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="relative z-10 w-full pb-16 px-6 text-center text-white">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md mx-auto mb-6 p-2.5 flex items-center justify-center">
            <Image src="/images/logos/home-vision-logo.png" alt="Home Vision logo" width={56} height={56} className="w-full h-full object-contain" />
          </div>
          <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('تشطيب سكني', 'Residential Fit-Out')}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">{t('هوم فيجن — بيتك بذوقك', 'Home Vision — your home, your taste')}</h1>
          <p className="mt-5 max-w-xl mx-auto text-white/80 leading-relaxed">
            {t(
              'فلل وشقق وعمارات، تشطيبات داخلية وخارجية، مقاولات عامة ولاندسكيب متكامل — بمعايير تنفيذ واحدة من الفكرة للتسليم.',
              'Villas, apartments and buildings, interior and exterior finishing, general contracting and integrated landscaping — one execution standard from concept to handover.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-white text-ink rounded-full px-8 py-3.5 font-bold hover:bg-primary hover:text-white transition-colors"
          >
            {t('احصل على عرض سعر', 'Get a quote')}
          </Link>
        </div>
      </div>

      {/* Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('خدماتنا', 'Our Services')}</p>
            <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t('كل ما يحتاجه منزلك تحت سقف واحد', 'Everything your home needs, under one roof')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group bg-bg border border-line hover:border-[#d4af37]/40 rounded-2xl p-6 transition-colors duration-300 hover:bg-gradient-to-br hover:from-[#d4af37] hover:to-[#b8912b]"
              >
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-lg mb-4">{s.icon}</div>
                <h4 className="text-ink group-hover:text-white font-bold mb-2 transition-colors duration-300">{t(s.ar, s.en)}</h4>
                <p className="text-secondary group-hover:text-white/90 text-xs leading-relaxed transition-colors duration-300">{t(s.descAr, s.descEn)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('مراحل العمل', 'Workflow')}</p>
            <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t('من الفكرة إلى التسليم', 'From concept to handover')}</h2>
          </div>

          <div className="relative grid md:grid-cols-5 gap-8 md:gap-4">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-line" style={{ marginInline: 'calc(100%/10)' }} />

            {workflow.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative bg-white border border-line rounded-2xl p-6 pt-8 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-base font-extrabold mx-auto mb-5 ring-4 ring-white shadow-sm">
                  {i + 1}
                </div>
                <p className="text-ink text-sm font-semibold leading-snug">{t(w.ar, w.en)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects — real project photos */}
      <FeaturedProjects
        eyebrowAr="مشاريع مميزة"
        eyebrowEn="Featured Projects"
        titleAr="أعمال حقيقية من هوم فيجن"
        titleEn="Real work from Home Vision"
        projects={featuredProjects}
      />

      {/* Gallery — Interior / Exterior / Landscape covered via categories */}
      <HomeVisionGallery />

      <Testimonials testimonials={testimonials} />

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl text-ink">{t('أسئلة شائعة', 'Frequently asked questions')}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const openState = openFaq === i;
              return (
                <div
                  key={i}
                  className={`bg-white border rounded-2xl overflow-hidden transition-colors ${openState ? 'border-primary/40 shadow-sm' : 'border-line'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openState ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className={`font-semibold text-sm transition-colors ${openState ? 'text-primary' : 'text-ink'}`}>
                      {t(f.qAr, f.qEn)}
                    </span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        openState ? 'bg-primary text-white rotate-45' : 'bg-bg border border-line text-secondary'
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openState && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-secondary text-sm leading-relaxed">{t(f.aAr, f.aEn)}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-ink text-white text-center">
        <h2 className="text-2xl md:text-3xl mb-5">{t('جاهز تبدأ مشروعك مع هوم فيجن؟', 'Ready to start your project with Home Vision?')}</h2>
        <Link
          href="/contact"
          className="inline-block bg-primary rounded-full px-8 py-3.5 font-bold hover:bg-white hover:text-ink transition-colors"
        >
          {t('تواصل معنا', 'Contact us')}
        </Link>
      </section>
    </main>
  );
}
