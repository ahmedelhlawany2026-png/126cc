'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, animate } from 'framer-motion';
import { useLang } from './LanguageProvider';
import { defaultStats, type Stat } from './Numbers.data';

export type { Stat };
export { defaultStats };

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.floor(v))
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span ref={ref}>{value.toLocaleString('en-US')}</span>;
}

export default function Numbers({ stats = defaultStats }: { stats?: Stat[] }) {
  const { t } = useLang();
  return (
    <section className="relative py-28 px-6 md:px-10 bg-ink text-white overflow-hidden">
      {/* Professional background photo, darkened for contrast */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-xs tracking-[4px] font-bold uppercase text-[#e8a09c] mb-4">
            {t('الأرقام تتحدث', 'Numbers Speak')}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold max-w-2xl">
            {t('أثر يُقاس بالأرقام', 'An impact measured in numbers')}
          </h2>
          <div className="mt-6 w-16 h-[3px] rounded-full bg-[#e8a09c]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 rounded-3xl border border-white/10 divide-x divide-y divide-white/10 rtl:divide-x-reverse bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group text-center px-6 py-10 md:py-14 transition-colors hover:bg-white/[0.04]"
            >
              <div className="font-inter text-4xl md:text-5xl font-extrabold tabular-nums">
                {s.prefix}
                <Counter target={s.target} />
                <span className="text-[#e8a09c]">{s.suffix}</span>
              </div>
              <p className="mt-3 text-xs md:text-sm tracking-wide text-white/60 group-hover:text-white/85 transition-colors">
                {t(s.labelAr, s.labelEn)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
