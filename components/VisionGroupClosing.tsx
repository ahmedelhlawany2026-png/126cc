'use client';

import { motion } from 'framer-motion';
import { useLang } from './LanguageProvider';

const tiles = [
  { tag: 'Bio Vision', color: 'text-secondary', titleAr: 'تجهيز طبي', titleEn: 'Medical Fit-Out',
    descAr: 'حلول متكاملة للمنشآت الطبية بمعايير عالمية.', descEn: 'Complete solutions for medical facilities, to global standards.' },
  { tag: 'Home Vision', color: 'text-primary', titleAr: 'تشطيب سكني', titleEn: 'Residential Fit-Out',
    descAr: 'تشطيبات ومقاولات ولاندسكيب بذوق رفيع.', descEn: 'Finishing, contracting and landscaping with refined taste.' },
  { tag: 'VEC', color: 'text-ink', titleAr: 'استشارات هندسية', titleEn: 'Engineering Consultancy',
    descAr: 'تصميم وإشراف وإدارة مشاريع من الفكرة للتنفيذ.', descEn: 'Design, supervision and project management from concept to delivery.' }
];

export default function VisionGroupClosing() {
  const { t } = useLang();
  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">Vision Group</p>
        <h2 className="text-3xl md:text-4xl text-ink mb-14">
          {t('رؤية واحدة… ثلاث شركات متخصصة', 'One vision… three specialised companies')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tiles.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-bg border border-line hover:border-[#d4af37]/40 rounded-card p-8 text-start transition-colors duration-300 hover:bg-gradient-to-br hover:from-[#d4af37] hover:to-[#b8912b]"
            >
              <p className={`text-xs font-extrabold tracking-widest uppercase mb-3 ${tile.color} group-hover:text-white/80 transition-colors duration-300`}>{tile.tag}</p>
              <h3 className="text-xl text-ink group-hover:text-white mb-2 transition-colors duration-300">{t(tile.titleAr, tile.titleEn)}</h3>
              <p className="text-secondary group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">{t(tile.descAr, tile.descEn)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
