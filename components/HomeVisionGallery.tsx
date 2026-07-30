'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLang } from './LanguageProvider';
import galleryData from '@/data/home-vision-gallery.json';

type CategoryKey = keyof typeof galleryData;

const categoryMeta: Record<CategoryKey, { ar: string; en: string }> = {
  living: { ar: 'معيشة', en: 'Living Rooms' },
  kitchen: { ar: 'مطابخ', en: 'Kitchens' },
  bedroom: { ar: 'غرف نوم', en: 'Bedrooms' },
  bathroom: { ar: 'حمامات', en: 'Bathrooms' },
  kids: { ar: 'غرف أطفال', en: 'Kids Rooms' },
  corridor: { ar: 'طرقات', en: 'Corridors' },
  stairs: { ar: 'سلالم', en: 'Staircases' },
  exterior: { ar: 'خارجي', en: 'Exterior' },
  other: { ar: 'ريسيبشن', en: 'Reception' }
};

const order: CategoryKey[] = ['living', 'kitchen', 'bedroom', 'bathroom', 'kids', 'corridor', 'stairs', 'exterior', 'other'];

function src(category: CategoryKey, file: string) {
  return `/images/home-vision/${file}`;
}

export default function HomeVisionGallery() {
  const { t } = useLang();
  const [active, setActive] = useState<CategoryKey>('living');
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const files = useMemo(() => (galleryData as Record<string, string[]>)[active] ?? [], [active]);
  const preview = files.slice(0, 4);
  const list = showAll ? files : preview;

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % files.length)), [files.length]);
  const prev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + files.length) % files.length)), [files.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, next, prev]);

  return (
    <section id="gallery" className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('معرض الأعمال', 'Project Gallery')}</p>
        <h2 className="text-3xl md:text-4xl text-ink mb-10">{t('لمسات هوم فيجن', 'The Home Vision touch')}</h2>

        {/* category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {order.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActive(cat);
                setShowAll(false);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                active === cat ? 'bg-ink text-white border-ink' : 'bg-bg text-secondary border-line hover:border-ink'
              }`}
            >
              {t(categoryMeta[cat].ar, categoryMeta[cat].en)}
              <span className="ms-1.5 opacity-60 text-xs">
                {(galleryData as Record<string, string[]>)[cat]?.length ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {list.map((file, i) => (
            <button
              key={file}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line group"
            >
              <img
                src={src(active, file)}
                alt={t(categoryMeta[active].ar, categoryMeta[active].en)}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>

        {!showAll && files.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="border border-ink text-ink rounded-full px-7 py-3 text-sm font-bold hover:bg-ink hover:text-white transition-colors"
            >
              {t('عرض المزيد', 'View More')} ({files.length - 4}+)
            </button>
          </div>
        )}
      </div>

      {/* lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-5 end-5 text-white/70 hover:text-white text-3xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute start-3 md:start-8 text-white/70 hover:text-white text-4xl rtl:rotate-180"
            aria-label="Previous"
          >
            ‹
          </button>

          <img
            src={src(active, files[lightboxIndex])}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain rounded-lg"
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute end-3 md:end-8 text-white/70 hover:text-white text-4xl rtl:rotate-180"
            aria-label="Next"
          >
            ›
          </button>

          <div className="absolute bottom-5 start-1/2 -translate-x-1/2 text-white/60 text-xs">
            {lightboxIndex + 1} / {files.length}
          </div>
        </div>
      )}
    </section>
  );
}
