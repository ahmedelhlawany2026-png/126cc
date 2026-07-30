'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from './LanguageProvider';
import { defaultTestimonials, type Testimonial } from './Testimonials.data';

export type { Testimonial };
export { defaultTestimonials };

const tagColor: Record<Testimonial['companyTag'], string> = {
  bio: 'bg-secondary',
  home: 'bg-primary',
  vec: 'bg-ink'
};

const tagLabel: Record<Testimonial['companyTag'], { ar: string; en: string }> = {
  bio: { ar: 'بايو فيجن', en: 'Bio Vision' },
  home: { ar: 'هوم فيجن', en: 'Home Vision' },
  vec: { ar: 'VEC', en: 'VEC' }
};

function initials(name: string) {
  return name.trim().charAt(0);
}

export default function Testimonials({ testimonials = defaultTestimonials }: { testimonials?: Testimonial[] }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = testimonials[index];

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + testimonials.length) % testimonials.length),
    [testimonials.length]
  );

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, go, testimonials.length]);

  return (
    <section className="py-24 px-6 md:px-10 bg-bg">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('آراء عملائنا', 'What Our Clients Say')}</p>
        <h2 className="text-3xl md:text-4xl text-ink mb-14">{t('ثقة نبنيها بالنتائج', 'Trust built through results')}</h2>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Decorative quote mark */}
          <span className="pointer-events-none select-none absolute -top-8 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 text-[110px] leading-none font-serif text-primary/10">
            “
          </span>

          <div className="relative bg-white border border-line rounded-card shadow-sm px-6 py-10 md:px-16 md:py-14 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-center gap-1 mb-6 text-primary text-lg">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-lg md:text-2xl text-ink leading-relaxed mb-9 max-w-2xl mx-auto font-medium">
                  {t(current.quoteAr, current.quoteEn)}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <span className={`w-11 h-11 rounded-full ${tagColor[current.companyTag]} text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0`}>
                    {initials(t(current.nameAr, current.nameEn))}
                  </span>
                  <div className="text-start">
                    <b className="block text-sm text-ink">{t(current.nameAr, current.nameEn)}</b>
                    <span className="text-secondary text-xs">
                      {t(current.roleAr, current.roleEn)}
                      <span className="mx-1.5 text-line">•</span>
                      {t(tagLabel[current.companyTag].ar, tagLabel[current.companyTag].en)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="hidden md:flex items-center justify-center absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-line bg-white text-secondary hover:text-ink hover:border-ink/30 transition-colors rtl:rotate-180"
                >
                  ‹
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="hidden md:flex items-center justify-center absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-line bg-white text-secondary hover:text-ink hover:border-ink/30 transition-colors rtl:rotate-180"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-7 bg-ink' : 'w-2.5 bg-line hover:bg-secondary/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
