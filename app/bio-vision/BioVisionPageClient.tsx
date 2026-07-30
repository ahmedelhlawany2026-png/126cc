'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/components/LanguageProvider';
import FeaturedProjects, { FeaturedProject } from '@/components/FeaturedProjects';
import Testimonials, { Testimonial } from '@/components/Testimonials';
import { defaultTestimonials, defaultFaqs, type FaqItem } from './BioVisionPageClient.data';

export { defaultTestimonials, defaultFaqs };
export type { FaqItem };

const featuredProjects: FeaturedProject[] = [
  {
    key: 'cairo-scan',
    nameAr: 'كايرو سكان', nameEn: 'Cairo Scan',
    locationAr: 'فرع الشيخ زايد (توين تاورز)', locationEn: 'El Sheikh Zayed Branch (Twin Towers)',
    area: '500 m²', durationAr: '6 أشهر', durationEn: '6 months',
    images: [1, 2, 3].map((i) => ({ src: `/images/bio-vision-featured/cairo-scan-${i}.jpg`, alt: `Cairo Scan ${i}` }))
  },
  {
    key: 'el-borg-scan',
    nameAr: 'البرج سكان — فرع المعادي', nameEn: 'El Borg Scan — Maadi Branch',
    locationAr: 'فرع المعادي', locationEn: 'Maadi Branch',
    area: '1,160 m²', durationAr: '9 أشهر', durationEn: '9 months',
    images: [1, 2, 3, 4, 5, 6].map((i) => ({ src: `/images/bio-vision-featured/el-borg-scan-${i}.jpg`, alt: `El Borg Scan Maadi ${i}` }))
  },
  {
    key: 'cleopatra-hospitals',
    nameAr: 'مستشفيات كليوباترا', nameEn: 'Cleopatra Hospitals',
    locationAr: 'عدة فروع', locationEn: 'Multiple branches',
    area: '', durationAr: '', durationEn: '',
    images: Array.from({ length: 11 }, (_, i) => ({
      src: `/images/bio-vision-featured/cleopatra-hospitals-${i + 1}.jpg`,
      alt: `Cleopatra Hospitals ${i + 1}`
    }))
  }
];

const services = [
  { icon: '🏥', ar: 'المستشفيات', en: 'Hospitals', descAr: 'تجهيز كامل للأقسام الطبية والإدارية وفق المعايير العالمية.', descEn: 'Complete fit-out of medical and administrative departments to global standards.' },
  { icon: '🩺', ar: 'العيادات', en: 'Clinics', descAr: 'تصميم وتنفيذ عيادات بمعايير راحة المريض وسير العمل الطبي.', descEn: 'Design and execution of clinics focused on patient comfort and clinical workflow.' },
  { icon: '🩻', ar: 'مراكز الأشعة', en: 'Radiology Centres', descAr: 'تجهيزات متخصصة تراعي التدريع الإشعاعي ومتطلبات الأجهزة.', descEn: 'Specialised fit-out accounting for radiation shielding and equipment requirements.' },
  { icon: '🧪', ar: 'معامل التحاليل', en: 'Laboratories', descAr: 'مساحات معملية مطابقة لاشتراطات السلامة الحيوية.', descEn: 'Lab spaces compliant with biosafety requirements.' },
  { icon: '⚕️', ar: 'غرف العمليات', en: 'Operating Theatres', descAr: 'تنفيذ دقيق لغرف عمليات معقّمة بأنظمة تهوية متخصصة.', descEn: 'Precise execution of sterile operating theatres with specialised ventilation systems.' },
  { icon: '🏗️', ar: 'تجهيز المنشآت الطبية', en: 'Medical Facility Fit-Out', descAr: 'إدارة متكاملة لمشاريع التجهيز الطبي من التصميم للتشغيل.', descEn: 'End-to-end management of medical fit-out projects from design to operation.' }
];

const standards = [
  { ar: 'التحكم في العدوى', en: 'Infection Control', descAr: 'أسطح ومواد مقاومة للبكتيريا وسهلة التعقيم في كل المساحات الحرجة.', descEn: 'Antibacterial, easy-to-sterilise surfaces and materials across all critical spaces.' },
  { ar: 'أنظمة التهوية والضغط', en: 'HVAC & Pressure Systems', descAr: 'تصميم أنظمة تهوية بفروق ضغط مطابقة لمتطلبات كل قسم طبي.', descEn: 'Ventilation systems designed with pressure differentials matching each department\u2019s requirements.' },
  { ar: 'التدريع الإشعاعي', en: 'Radiation Shielding', descAr: 'تنفيذ مطابق لاشتراطات الأمان الإشعاعي في أقسام الأشعة والعلاج.', descEn: 'Execution compliant with radiation safety requirements in imaging and treatment areas.' },
  { ar: 'إتاحة الحركة الطبية', en: 'Medical Accessibility', descAr: 'ممرات وأبواب ومساحات مصممة لحركة الأسرّة والمعدات الطبية بأمان.', descEn: 'Corridors, doors and spaces designed for the safe movement of beds and medical equipment.' }
];

const workflow = [
  { ar: 'المعاينة والتقييم الفني', en: 'Site Visit & Technical Assessment' },
  { ar: 'التصميم الطبي المتخصص', en: 'Specialised Medical Design' },
  { ar: 'التعاقد والجدول الزمني', en: 'Contract & Timeline' },
  { ar: 'التنفيذ تحت إشراف هندسي', en: 'Execution under Engineering Supervision' },
  { ar: 'التسليم والتشغيل التجريبي', en: 'Handover & Commissioning' }
];

export default function BioVisionPageClient({
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
        <Image src="/images/bio-vision-featured/bio-hero.jpg" alt="Bio Vision" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="relative z-10 w-full pb-16 px-6 text-center text-white">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md mx-auto mb-6 p-2.5 flex items-center justify-center">
            <Image src="/images/logos/bio-vision-logo.png" alt="Bio Vision logo" width={56} height={56} className="w-full h-full object-contain" />
          </div>
          <p className="text-xs tracking-[3px] font-bold uppercase text-secondary mb-4">{t('تجهيز طبي', 'Medical Fit-Out')}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">{t('بايو فيجن — دقة تليق بالرعاية الصحية', 'Bio Vision — precision worthy of healthcare')}</h1>
          <p className="mt-5 max-w-xl mx-auto text-white/80 leading-relaxed">
            {t(
              'مستشفيات وعيادات ومراكز أشعة ومعامل وغرف عمليات — تجهيز متكامل وفق أعلى المعايير الطبية العالمية.',
              'Hospitals, clinics, radiology centres, labs and operating theatres — complete fit-out to the highest global medical standards.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-white text-ink rounded-full px-8 py-3.5 font-bold hover:bg-secondary hover:text-white transition-colors"
          >
            {t('احصل على استشارة', 'Request a consultation')}
          </Link>
        </div>
      </div>

      {/* Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[3px] font-bold uppercase text-secondary mb-4">{t('خدماتنا', 'Our Services')}</p>
          <h2 className="text-3xl md:text-4xl text-ink mb-14 max-w-xl">{t('كل منشأة طبية بمتطلباتها الدقيقة', 'Every medical facility, to its exact requirements')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

      {/* Medical Standards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[3px] font-bold uppercase text-secondary mb-4">{t('المعايير الطبية', 'Medical Standards')}</p>
            <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t('نبني على أساس السلامة أولًا', 'Built on a foundation of safety first')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {standards.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-line rounded-2xl p-7 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="w-9 h-9 rounded-full bg-secondary/10 text-secondary font-extrabold flex items-center justify-center flex-shrink-0 text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-ink font-bold mb-2">{t(st.ar, st.en)}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{t(st.descAr, st.descEn)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[3px] font-bold uppercase text-secondary mb-4">{t('مراحل العمل', 'Workflow')}</p>
            <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t('من التقييم الفني إلى التشغيل', 'From technical assessment to commissioning')}</h2>
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
                className="relative bg-bg border border-line rounded-2xl p-6 pt-8 text-center shadow-sm hover:shadow-md hover:border-secondary/30 transition-all"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center text-base font-extrabold mx-auto mb-5 ring-4 ring-white shadow-sm">
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
        titleAr="أعمالنا الطبية الحقيقية"
        titleEn="Our real medical projects"
        projects={featuredProjects}
      />

      <Testimonials testimonials={testimonials} />

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[3px] font-bold uppercase text-secondary mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl text-ink">{t('أسئلة شائعة', 'Frequently asked questions')}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const openState = openFaq === i;
              return (
                <div
                  key={i}
                  className={`bg-bg border rounded-2xl overflow-hidden transition-colors ${openState ? 'border-secondary/40 shadow-sm' : 'border-line'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openState ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className={`font-semibold text-sm transition-colors ${openState ? 'text-secondary' : 'text-ink'}`}>
                      {t(f.qAr, f.qEn)}
                    </span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        openState ? 'bg-secondary text-white rotate-45' : 'bg-white border border-line text-secondary'
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
        <h2 className="text-2xl md:text-3xl mb-5">{t('جاهز تجهّز منشأتك الطبية؟', 'Ready to fit out your medical facility?')}</h2>
        <Link
          href="/contact"
          className="inline-block bg-secondary rounded-full px-8 py-3.5 font-bold hover:bg-white hover:text-ink transition-colors"
        >
          {t('تواصل معنا', 'Contact us')}
        </Link>
      </section>
    </main>
  );
}
