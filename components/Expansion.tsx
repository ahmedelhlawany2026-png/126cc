'use client';

import { motion } from 'framer-motion';
import { useLang } from './LanguageProvider';

const nodes = [
  {
    color: 'bg-secondary', icon: '🏥', n: '01',
    ar: 'تجهيز طبي', en: 'Medical Fit-Out',
    descAr: 'حلول تجهيز متكاملة للمستشفيات والعيادات والمعامل.',
    descEn: 'End-to-end fit-out for hospitals, clinics and laboratories.'
  },
  {
    color: 'bg-primary', icon: '🏡', n: '02',
    ar: 'تشطيب سكني', en: 'Residential Fit-Out',
    descAr: 'تشطيبات ومقاولات ولاندسكيب للفلل والشقق والعمارات.',
    descEn: 'Finishing, contracting and landscaping for villas, apartments and buildings.'
  },
  {
    color: 'bg-ink', icon: '📐', n: '03',
    ar: 'استشارات هندسية', en: 'Engineering Consultancy',
    descAr: 'تصميم وإشراف وإدارة مشاريع من الفكرة حتى التسليم.',
    descEn: 'Design, supervision and project management from concept to handover.'
  }
];

export default function Expansion() {
  const { t } = useLang();
  return (
    <section className="py-24 px-6 md:px-10 bg-bg">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('التوسع', 'Expansion')}</p>
        <h2 className="text-3xl md:text-4xl text-ink mb-4">{t('من التخصص إلى التكامل', 'From specialisation to integration')}</h2>
        <p className="text-secondary max-w-xl mx-auto mb-16 leading-relaxed">
          {t(
            'رحلة متكاملة عبر ثلاث مراحل، كل مرحلة تبني على سابقتها لتكوّن منظومة عمل واحدة موحّدة.',
            'An integrated journey across three stages, each building on the last to form one unified system.'
          )}
        </p>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line across desktop steps */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-[2px] bg-line" style={{ marginInline: 'calc(100%/6)' }} />

          {nodes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative bg-white border border-line rounded-2xl px-7 pt-16 pb-8 text-start shadow-sm hover:shadow-md transition-shadow"
            >
              <span className={`absolute -top-8 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-16 h-16 rounded-full ${n.color} text-white flex items-center justify-center text-2xl shadow-lg ring-4 ring-white`}>
                {n.icon}
              </span>
              <span className="absolute top-6 end-6 text-[11px] font-extrabold text-secondary/40 tracking-widest">{n.n}</span>
              <h3 className="text-lg font-bold text-ink mb-2 text-center">{t(n.ar, n.en)}</h3>
              <p className="text-secondary text-sm leading-relaxed text-center">{t(n.descAr, n.descEn)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
