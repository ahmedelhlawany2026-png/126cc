'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLang } from './LanguageProvider';

const pills = [
  {
    href: '/bio-vision', logo: '/images/logos/bio-vision-logo.png', accent: 'bg-secondary', ring: 'group-hover:ring-secondary/30',
    nameAr: 'Bio Vision', nameEn: 'Bio Vision', descAr: 'تجهيز المنشآت الطبية', descEn: 'Medical facility fit-out'
  },
  {
    href: '/home-vision', logo: '/images/logos/home-vision-logo.png', accent: 'bg-primary', ring: 'group-hover:ring-primary/30',
    nameAr: 'Home Vision', nameEn: 'Home Vision', descAr: 'تشطيبات ومقاولات سكنية', descEn: 'Residential finishing & contracting'
  },
  {
    href: '/vec', logo: '/images/logos/vec-logo.png', accent: 'bg-ink', ring: 'group-hover:ring-ink/20',
    nameAr: 'VEC', nameEn: 'VEC', descAr: 'استشارات هندسية متكاملة', descEn: 'Integrated engineering consultancy'
  }
];

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="relative py-24 px-6 md:px-10 overflow-hidden">
      {/* Decorative watermark */}
      <span className="pointer-events-none select-none absolute -top-6 start-1/2 -translate-x-1/2 md:translate-x-0 md:start-auto md:-end-10 text-[140px] md:text-[220px] font-extrabold text-ink/[0.03] leading-none whitespace-nowrap -z-0">
        VISION
      </span>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
        <div>
          <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">
            {t('عن Vision Group', 'About Vision Group')}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-ink leading-relaxed"
          >
            {t('رؤية ', 'One ')}
            <span className="text-primary">{t('واحدة', 'vision')}</span>
            {t('… ثلاث شركات متخصصة، تتشارك نفس معايير الجودة والالتزام.', '… three specialised companies, sharing the same standards of quality and commitment.')}
          </motion.p>

          <div className="mt-8 flex items-center gap-3 text-secondary text-sm">
            <span className="flex -space-x-2 rtl:space-x-reverse">
              {pills.map((p) => (
                <span key={p.nameEn} className={`w-3 h-3 rounded-full ${p.accent} border-2 border-white`} />
              ))}
            </span>
            {t('ثلاث شركات، فريق واحد، معيار واحد للجودة.', 'Three companies, one team, one standard of quality.')}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {pills.map((p, i) => (
            <motion.a
              key={p.nameEn}
              href={p.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className={`group relative flex items-center gap-4 bg-white rounded-2xl border border-line px-6 py-5 shadow-sm hover:shadow-md ring-1 ring-transparent transition-all duration-300 ${p.ring}`}
            >
              <span className="w-12 h-12 rounded-xl bg-bg border border-line flex items-center justify-center p-2 flex-shrink-0">
                <Image src={p.logo} alt={`${p.nameEn} logo`} width={36} height={36} className="w-full h-full object-contain" />
              </span>
              <div className="flex-1">
                <b className="block text-ink text-sm">{p.nameEn}</b>
                <span className="text-secondary text-xs">{t(p.descAr, p.descEn)}</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${p.accent} flex-shrink-0`} />
              <span className="text-secondary/50 group-hover:text-ink group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all text-lg">
                {t('←', '→')}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
