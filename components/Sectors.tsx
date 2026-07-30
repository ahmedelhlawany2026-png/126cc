'use client';

import { motion } from 'framer-motion';
import { useLang } from './LanguageProvider';

const sectors = [
  { n: '01', ar: 'الرعاية الصحية', en: 'Healthcare', descAr: 'مستشفيات ومراكز طبية متكاملة التجهيز.', descEn: 'Hospitals and fully-equipped medical centres.' },
  { n: '02', ar: 'السكني', en: 'Residential', descAr: 'فلل وشقق بتشطيبات عالية الجودة.', descEn: 'Villas and apartments with premium finishing.' },
  { n: '03', ar: 'التجاري', en: 'Commercial', descAr: 'مساحات عمل ومكاتب وتجارية متكاملة.', descEn: 'Offices and integrated commercial spaces.' },
  { n: '04', ar: 'الضيافة', en: 'Hospitality', descAr: 'فنادق ومنشآت ضيافة بمعايير عالمية.', descEn: 'Hotels and hospitality venues to global standards.' }
];

export default function Sectors() {
  const { t } = useLang();
  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">
          {t('النمو عبر الخبرة', 'Growing Through Experience')}
        </p>
        <h2 className="text-3xl md:text-4xl text-ink mb-4 max-w-xl">{t('قطاعات نعمل بها', 'Sectors we serve')}</h2>
        <p className="text-secondary max-w-xl mb-14 leading-relaxed">
          {t(
            'من المشروع الأول إلى اليوم، توسّعت خبرتنا لتغطي قطاعات متعددة بمعايير تنفيذ واحدة.',
            'From our first project to today, our expertise has grown to cover multiple sectors under one execution standard.'
          )}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {sectors.map((s) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group bg-bg border border-line hover:border-[#d4af37]/40 rounded-2xl p-6 transition-colors duration-300 hover:bg-gradient-to-br hover:from-[#d4af37] hover:to-[#b8912b]"
            >
              <div className="text-xs font-extrabold text-secondary/50 group-hover:text-white/70 mb-5 transition-colors duration-300">{s.n}</div>
              <h4 className="text-lg text-ink group-hover:text-white mb-2 transition-colors duration-300">{t(s.ar, s.en)}</h4>
              <p className="text-secondary group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">{t(s.descAr, s.descEn)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
