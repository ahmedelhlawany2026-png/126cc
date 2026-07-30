'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from './LanguageProvider';

const companies = [
  {
    id: 'bio',
    href: '/bio-vision',
    logo: '/images/logos/bio-vision-logo.png',
    image: '/images/bio-vision-featured/bio-hero.jpg',
    gradient: 'from-[#262625] to-[#525150]',
    tagAr: 'تجهيز طبي', tagEn: 'Medical Fit-Out',
    nameAr: 'بايو فيجن', nameEn: 'Bio Vision',
    descAr: 'مستشفيات، عيادات، مراكز أشعة ومعامل تحاليل وغرف عمليات — وفق أعلى المعايير الطبية العالمية.',
    descEn: 'Hospitals, clinics, radiology and lab centres, operating theatres — fitted out to global medical standards.'
  },
  {
    id: 'home-vision',
    href: '/home-vision',
    logo: '/images/logos/home-vision-logo.png',
    image: '/images/home-vision-featured/home-hero.jpg',
    gradient: 'from-[#4a1613] to-primary',
    tagAr: 'تشطيب سكني', tagEn: 'Residential Fit-Out',
    nameAr: 'هوم فيجن', nameEn: 'Home Vision',
    descAr: 'فلل وشقق وعمارات، تشطيبات داخلية وخارجية، مقاولات عامة ولاندسكيب متكامل.',
    descEn: 'Villas, apartments and buildings — interior and exterior finishing, general contracting and landscaping.'
  },
  {
    id: 'vec',
    href: '/vec',
    logo: '/images/logos/vec-logo.png',
    image: '/images/vec/vec-hero.jpg',
    gradient: 'from-[#141414] to-ink',
    tagAr: 'استشارات هندسية', tagEn: 'Engineering Consultancy',
    nameAr: 'VEC', nameEn: 'VEC',
    descAr: 'تصميم معماري وإنشائي، MEP، BIM، إدارة مشاريع وإشراف هندسي واستخراج تراخيص.',
    descEn: 'Architectural & structural design, MEP, BIM, project management, site supervision and licensing.'
  }
];

export default function Hero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section>
      {/* Hero visual */}
      <div ref={heroRef} className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0"
        >
          {/* Slow continuous Ken Burns motion keeps the buildings feeling alive */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 26, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero-bg.jpg"
              alt="Vision Group — Bio Vision, Home Vision, VEC"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </motion.div>
        </motion.div>
        {/* Very light bottom fade only — keeps the artwork sharp and clear */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="text-center px-6 md:px-10 pt-14 pb-16">
        <p className="text-xs tracking-[3px] font-bold uppercase text-secondary mb-4">
          {t('رؤية واحدة، ثلاث شركات متخصصة', 'One vision, three specialised companies')}
        </p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-4xl md:text-6xl leading-tight text-ink max-w-4xl mx-auto"
      >
        {t('نبني المستشفيات، والمنازل،', 'We fit out hospitals, build homes,')}
        <br />
        {t('ونُصمّم ', 'and design the ')}
        <span className="text-primary">{t('الهندسة', 'engineering')}</span>
        {t(' التي تجمعهما', ' between them')}
      </motion.h1>

      <p className="mt-6 max-w-xl mx-auto text-secondary text-lg leading-relaxed">
        {t(
          'Vision Group ليست شركة واحدة — بل ثلاث كيانات متخصصة تعمل تحت مظلة واحدة، كل واحدة بمعاييرها الخاصة وخبرتها العميقة.',
          "Vision Group isn't one company — it's three specialised entities under a single umbrella, each with its own standards and deep expertise."
        )}
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {companies.map((c, i) => (
          <motion.a
            key={c.id}
            id={c.id}
            href={c.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`group relative h-[440px] rounded-card overflow-hidden shadow-xl text-start flex flex-col justify-end p-8 text-white bg-gradient-to-br ${c.gradient}`}
          >
            <Image
              src={c.image}
              alt={`${c.nameEn} — ${c.tagEn}`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-top absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/90 -z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center mb-5 p-2">
                <Image src={c.logo} alt={`${c.nameEn} logo`} width={44} height={44} className="w-full h-full object-contain" />
              </div>
              <p className="text-xs tracking-widest uppercase opacity-75 font-bold mb-2">
                {t(c.tagAr, c.tagEn)}
              </p>
              <h3 className="text-2xl mb-2 font-extrabold">{t(c.nameAr, c.nameEn)}</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-6 max-w-[32ch]">
                {t(c.descAr, c.descEn)}
              </p>
              <span className="inline-flex items-center gap-2 w-fit border border-white/50 group-hover:bg-white group-hover:text-ink group-hover:border-white rounded-full px-5 py-2.5 text-xs font-bold transition-colors">
                {t('استكشف', 'Explore')}
                <span className="rtl:rotate-180 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
      </div>
    </section>
  );
}
