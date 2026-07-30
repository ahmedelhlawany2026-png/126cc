'use client';

import { motion } from 'framer-motion';
import { useLang } from './LanguageProvider';
import { defaultTimeline, type TimelineItem } from './Timeline.data';

export type { TimelineItem };
export { defaultTimeline };

export default function Timeline({ items = defaultTimeline }: { items?: TimelineItem[] }) {
  const { t } = useLang();
  return (
    <section className="py-24 px-6 md:px-10 bg-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('مسيرتنا', 'Our Journey')}</p>
          <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">
            {t('من فكرة إلى مجموعة متكاملة', 'From an idea to an integrated group')}
          </h2>
        </div>

        {/* Mobile: single left line. Desktop: centred alternating line */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 start-[9px] md:start-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary/40 via-line to-line" />

          <div className="space-y-10 md:space-y-4">
            {items.map((it, i) => {
              const isRight = i % 2 === 1;
              return (
                <div key={i} className="relative md:grid md:grid-cols-2 md:gap-x-10">
                  {/* Centre marker (desktop) */}
                  <span className="hidden md:flex absolute top-6 start-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-white border-[3px] border-primary shadow-sm" />

                  {/* Mobile marker */}
                  <span className="md:hidden absolute start-[1px] top-1.5 w-5 h-5 rounded-full bg-white border-[3px] border-primary" />

                  <motion.div
                    initial={{ opacity: 0, x: isRight ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    className={`ps-10 md:ps-0 ${isRight ? 'md:col-start-2 md:ps-10' : 'md:col-start-1 md:row-start-1 md:text-end md:pe-10'}`}
                  >
                    <div className="bg-white border border-line rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow inline-block w-full md:w-auto max-w-md">
                      <p className="text-xs font-extrabold tracking-wide text-primary mb-1.5">
                        {it.year} {it.year && (t(it.tagAr, it.tagEn) ? '— ' + t(it.tagAr, it.tagEn) : '')}
                      </p>
                      <h3 className="text-lg md:text-xl text-ink mb-2 font-bold">{t(it.titleAr, it.titleEn)}</h3>
                      <p className="text-secondary text-sm leading-relaxed">{t(it.descAr, it.descEn)}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
