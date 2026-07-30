'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/components/LanguageProvider';
import Testimonials, { Testimonial } from '@/components/Testimonials';
import { defaultTestimonials, defaultFaqs, type FaqItem } from './VecPageClient.data';

export { defaultTestimonials, defaultFaqs };
export type { FaqItem };

const services = [
  { icon: '📊', ar: 'دراسات الجدوى والتخطيط الاستراتيجي', en: 'Feasibility Studies & Strategic Planning' },
  { icon: '🏛️', ar: 'التصميم المعماري والتخطيط', en: 'Architectural Design & Planning' },
  { icon: '🏗️', ar: 'التصميم الإنشائي', en: 'Structural Design' },
  { icon: '🔧', ar: 'تصميم أنظمة الميكانيكا والكهرباء والسباكة (MEP)', en: 'MEP Systems Design' },
  { icon: '📐', ar: 'إعداد الرسومات التنفيذية والمخططات', en: 'Execution Drawings & Plans' },
  { icon: '🧩', ar: 'نمذجة معلومات المباني (BIM) والحصر الكمي', en: 'BIM Modelling & Quantity Surveying' },
  { icon: '👷', ar: 'إدارة المشاريع والإشراف', en: 'Project Management & Supervision' },
  { icon: '📋', ar: 'التنسيق مع الجهات وإصدار التراخيص', en: 'Authority Coordination & Licensing' }
];

const categories = [
  { ar: 'المشاريع الطبية', en: 'Medical Projects', descAr: 'مستشفيات، عيادات، مراكز طبية، معامل تحاليل', descEn: 'Hospitals, clinics, medical centres, laboratories' },
  { ar: 'المشاريع السكنية', en: 'Residential Projects', descAr: 'فلل، عمارات سكنية، شقق فاخرة، دوبلكس وبنتهاوس، مصانع', descEn: 'Villas, residential buildings, luxury apartments, duplexes & penthouses, factories' },
  { ar: 'المشاريع التجارية', en: 'Commercial Projects', descAr: 'مباني مكتبية، مقرات شركات، محلات تجزئة، صالات عرض', descEn: 'Office buildings, corporate headquarters, retail stores, showrooms' },
  { ar: 'مشاريع الضيافة والسياحة', en: 'Hospitality Projects', descAr: 'فنادق، شقق مخدومة، كافيهات', descEn: 'Hotels, serviced apartments, cafés' }
];

const workflow = [
  { ar: 'دراسة الجدوى', en: 'Feasibility Study' },
  { ar: 'التصميم المعماري والإنشائي', en: 'Architectural & Structural Design' },
  { ar: 'تصميم MEP وBIM', en: 'MEP & BIM Design' },
  { ar: 'التراخيص والتنسيق', en: 'Licensing & Coordination' },
  { ar: 'الإشراف وإدارة المشروع', en: 'Supervision & Project Management' }
];

type ProjectImage = { src: string; alt: string };
type Project = {
  key: string;
  nameAr: string; nameEn: string;
  locationAr: string; locationEn: string;
  tagAr: string; tagEn: string;
  images: ProjectImage[];
};

const projects: Project[] = [
  {
    key: 'almaza',
    nameAr: 'Midea — فرع سيتي سنتر الألماظة', nameEn: 'Midea Almaza Brand Shop',
    locationAr: 'سيتي سنتر الألماظة، القاهرة', locationEn: 'City Centre Almaza, Cairo',
    tagAr: 'مشروع تجاري', tagEn: 'Commercial Project',
    images: [
      { src: '/images/vec/vec-midea-almaza-1.jpg', alt: 'Midea Almaza Brand Shop 1' },
      { src: '/images/vec/vec-midea-almaza-2.jpg', alt: 'Midea Almaza Brand Shop 2' }
    ]
  },
  {
    key: 'alex',
    nameAr: 'Midea — فرع الإسكندرية', nameEn: 'Midea Alex Brand Shop',
    locationAr: 'العجمي، الإسكندرية', locationEn: 'Al Agamy, Alexandria',
    tagAr: 'مشروع تجاري', tagEn: 'Commercial Project',
    images: [{ src: '/images/vec/vec-midea-alex.jpg', alt: 'Midea Alex Brand Shop' }]
  },
  {
    key: 'sewedy',
    nameAr: 'مستشفى السويدي', nameEn: 'El Sewedy Hospital',
    locationAr: 'درب نجم، طه المرج، محافظة الشرقية', locationEn: 'Derb Najm, Taha Al-Marj, El Sharqia Governorate',
    tagAr: 'مشروع طبي', tagEn: 'Medical Project',
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/vec/vec-sewedy-${i + 1}.jpg`,
      alt: `El Sewedy Hospital ${i + 1}`
    }))
  }
];

export default function VecPageClient({
  faqs = defaultFaqs,
  testimonials = defaultTestimonials
}: {
  faqs?: FaqItem[];
  testimonials?: Testimonial[];
}) {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback((delta: number) => {
    setLightbox((cur) => {
      if (!cur) return cur;
      const len = cur.project.images.length;
      return { project: cur.project, index: (cur.index + delta + len) % len };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, step]);

  return (
    <main>
      {/* Hero */}
      <div className="relative h-[92vh] min-h-[620px] w-full overflow-hidden flex items-end">
        <Image src="/images/vec/vec-hero.jpg" alt="VEC — Engineering Consultancy" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="relative z-10 w-full pb-16 px-6 text-center text-white">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md mx-auto mb-6 p-2.5 flex items-center justify-center">
            <Image src="/images/logos/vec-logo.png" alt="VEC logo" width={56} height={56} className="w-full h-full object-contain" />
          </div>
          <p className="text-xs tracking-[3px] font-bold uppercase text-white/80 mb-4">{t('استشارات هندسية', 'Engineering Consultancy')}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">VEC — {t('حلول هندسية من الفكرة إلى التسليم', 'Engineering solutions from concept to delivery')}</h1>
          <p className="mt-5 max-w-xl mx-auto text-white/80 leading-relaxed">
            {t(
              'نقدم حلولًا هندسية متكاملة وإبداعية لمشاريعكم، من الفكرة إلى التنفيذ، من خلال فريق من الخبراء ملتزم بأعلى معايير الجودة والابتكار، لنحقق رؤيتكم بكفاءة واحترافية.',
              'We deliver integrated, creative engineering solutions for your projects, from concept to execution, through a team of experts committed to the highest standards of quality and innovation.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-white text-ink rounded-full px-8 py-3.5 font-bold hover:bg-primary hover:text-white transition-colors"
          >
            {t('ابدأ مشروعك الهندسي', 'Start your engineering project')}
          </Link>
        </div>
      </div>

      {/* Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[3px] font-bold uppercase text-ink mb-4">{t('أعمال الاستشارات الهندسية', 'Engineering Consultancy Services')}</p>
            <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t('من التخطيط إلى التنفيذ', 'From planning to execution')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
                <h4 className="text-ink group-hover:text-white text-sm font-bold leading-snug transition-colors duration-300">{t(s.ar, s.en)}</h4>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-ink text-white rounded-2xl p-8 flex items-start gap-4">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="text-xs tracking-widest uppercase text-white/60 font-bold mb-2">{t('الهدف الأساسي', 'Our Core Goal')}</p>
              <p className="text-sm leading-relaxed text-white/90 max-w-2xl">
                {t(
                  'تقديم حلول هندسية مبتكرة ومستدامة تحقق أعلى قيمة للمشاريع مع الالتزام بالوقت والجودة والتكلفة.',
                  'Delivering innovative, sustainable engineering solutions that achieve the highest value for projects while committing to time, quality and cost.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project categories */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[3px] font-bold uppercase text-ink mb-4">{t('قطاعات المشاريع', 'Project Categories')}</p>
            <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t('خبرة عبر قطاعات متعددة', 'Experience across multiple sectors')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {categories.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-line rounded-2xl p-7 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="w-9 h-9 rounded-full bg-ink/5 text-ink font-extrabold flex items-center justify-center flex-shrink-0 text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-ink font-bold mb-2">{t(c.ar, c.en)}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{t(c.descAr, c.descEn)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[3px] font-bold uppercase text-ink mb-4">{t('مشاريع مميزة', 'Featured Projects')}</p>
          <h2 className="text-3xl md:text-4xl text-ink mb-14 max-w-xl">{t('أعمال حقيقية، نتائج ملموسة', 'Real work, tangible results')}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.key} className="bg-bg border border-line rounded-2xl overflow-hidden">
                <button
                  onClick={() => setLightbox({ project: p, index: 0 })}
                  className="relative aspect-[4/3] w-full block group"
                >
                  <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.images.length > 1 && (
                    <span className="absolute bottom-3 end-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      +{p.images.length - 1}
                    </span>
                  )}
                </button>
                <div className="p-5">
                  <p className="text-[11px] tracking-widest uppercase text-ink/60 font-bold mb-1.5">{t(p.tagAr, p.tagEn)}</p>
                  <h4 className="text-ink font-bold mb-1">{t(p.nameAr, p.nameEn)}</h4>
                  <p className="text-secondary text-xs">{t(p.locationAr, p.locationEn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials testimonials={testimonials} />

      {/* Workflow */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[3px] font-bold uppercase text-ink mb-4">{t('مراحل العمل', 'Workflow')}</p>
            <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t('نهج هندسي واضح لكل مشروع', 'A clear engineering approach for every project')}</h2>
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
                className="relative bg-white border border-line rounded-2xl p-6 pt-8 text-center shadow-sm hover:shadow-md hover:border-ink/20 transition-all"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center text-base font-extrabold mx-auto mb-5 ring-4 ring-white shadow-sm">
                  {i + 1}
                </div>
                <p className="text-ink text-sm font-semibold leading-snug">{t(w.ar, w.en)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[3px] font-bold uppercase text-ink mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl text-ink">{t('أسئلة شائعة', 'Frequently asked questions')}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const openState = openFaq === i;
              return (
                <div
                  key={i}
                  className={`bg-bg border rounded-2xl overflow-hidden transition-colors ${openState ? 'border-ink/30 shadow-sm' : 'border-line'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openState ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className={`font-semibold text-sm transition-colors ${openState ? 'text-ink' : 'text-ink'}`}>
                      {t(f.qAr, f.qEn)}
                    </span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        openState ? 'bg-ink text-white rotate-45' : 'bg-white border border-line text-secondary'
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
        <h2 className="text-2xl md:text-3xl mb-5">{t('عندك مشروع يحتاج استشارة هندسية؟', 'Have a project that needs engineering consultancy?')}</h2>
        <Link href="/contact" className="inline-block bg-white text-ink rounded-full px-8 py-3.5 font-bold hover:bg-primary hover:text-white transition-colors">
          {t('تواصل معنا', 'Contact us')}
        </Link>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4 md:p-10" onClick={close}>
          <button onClick={(e) => { e.stopPropagation(); close(); }} className="absolute top-5 end-5 text-white/70 hover:text-white text-3xl leading-none" aria-label="Close">×</button>

          {lightbox.project.images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute start-3 md:start-8 text-white/70 hover:text-white text-4xl rtl:rotate-180" aria-label="Previous">‹</button>
          )}

          <img
            src={lightbox.project.images[lightbox.index].src}
            alt={lightbox.project.images[lightbox.index].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain rounded-lg"
          />

          {lightbox.project.images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute end-3 md:end-8 text-white/70 hover:text-white text-4xl rtl:rotate-180" aria-label="Next">›</button>
          )}

          <div className="absolute bottom-5 start-1/2 -translate-x-1/2 text-white/60 text-xs">
            {lightbox.index + 1} / {lightbox.project.images.length}
          </div>
        </div>
      )}
    </main>
  );
}
