'use client';

import { useLang } from './LanguageProvider';
import { defaultLogos } from './Clients.data';

export { defaultLogos };

export default function Clients({ logos = defaultLogos }: { logos?: string[] }) {
  const { t } = useLang();
  return (
    <section className="py-24 bg-white overflow-hidden border-y border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-14 text-center md:text-start">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('عملاؤنا', 'Our Clients')}</p>
        <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto md:mx-0">
          {t('ثقة نبنيها مشروعًا تلو الآخر', 'Trust, built project by project')}
        </h2>
      </div>

      <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex gap-5 w-max animate-[scroll_32s_linear_infinite] hover:[animation-play-state:paused] rtl:[animation-direction:reverse]">
          {[...logos, ...logos].map((l, i) => (
            <div
              key={i}
              className="group flex items-center justify-center whitespace-nowrap bg-bg border border-line rounded-2xl px-9 py-6 transition-all duration-300 hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5"
            >
              <span className="font-inter font-extrabold text-lg md:text-xl text-ink/40 group-hover:text-ink transition-colors">
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
