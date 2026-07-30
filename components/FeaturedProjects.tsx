'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from './LanguageProvider';

export interface FeaturedProjectImage {
  src: string;
  alt: string;
}

export interface FeaturedProject {
  key: string;
  nameAr: string;
  nameEn: string;
  locationAr: string;
  locationEn: string;
  area: string;
  durationAr: string;
  durationEn: string;
  images: FeaturedProjectImage[];
}

export default function FeaturedProjects({
  titleAr,
  titleEn,
  eyebrowAr,
  eyebrowEn,
  projects
}: {
  titleAr: string;
  titleEn: string;
  eyebrowAr: string;
  eyebrowEn: string;
  projects: FeaturedProject[];
}) {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<{ project: FeaturedProject; index: number } | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback((delta: number) => {
    setLightbox((cur) => {
      if (!cur) return cur;
      const len = cur.project.images.length;
      return { project: cur.project, index: (cur.index + delta + len) % len };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, step]);

  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t(eyebrowAr, eyebrowEn)}</p>
          <h2 className="text-3xl md:text-4xl text-ink max-w-xl mx-auto">{t(titleAr, titleEn)}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.key} className="bg-bg border border-line rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => setLightbox({ project: p, index: 0 })} className="relative aspect-[4/3] w-full block group">
                <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.images.length > 1 && (
                  <span className="absolute bottom-3 end-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    +{p.images.length - 1}
                  </span>
                )}
              </button>
              <div className="p-5">
                <h4 className="text-ink font-bold mb-1.5">{t(p.nameAr, p.nameEn)}</h4>
                <p className="text-secondary text-xs mb-1">{t(p.locationAr, p.locationEn)}</p>
                {(p.area || p.durationAr) && (
                  <p className="text-secondary text-xs">
                    {p.area}{p.area && (p.durationAr || p.durationEn) ? ' · ' : ''}{t(p.durationAr, p.durationEn)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4 md:p-10" onClick={close}>
          <button onClick={(e) => { e.stopPropagation(); close(); }} className="absolute top-5 end-5 text-white/70 hover:text-white text-3xl leading-none" aria-label="Close">×</button>

          {lightbox.project.images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute start-3 md:start-8 text-white/70 hover:text-white text-4xl rtl:rotate-180" aria-label="Previous">‹</button>
          )}

          <img
            src={lightbox.project.images[lightbox.index].src}
            alt={lightbox.project.images[lightbox.index].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain rounded-lg"
          />

          {lightbox.project.images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute end-3 md:end-8 text-white/70 hover:text-white text-4xl rtl:rotate-180" aria-label="Next">›</button>
          )}

          <div className="absolute bottom-5 start-1/2 -translate-x-1/2 text-white/60 text-xs">
            {lightbox.index + 1} / {lightbox.project.images.length}
          </div>
        </div>
      )}
    </section>
  );
}
