'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLang } from '@/components/LanguageProvider';
import { departments, topManagement, teamMembers } from '@/data/team';

export default function TeamPageClient() {
  const { t } = useLang();
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? teamMembers : teamMembers.filter((m) => m.deptKey === filter);

  const chairman = topManagement.find((m) => m.deptKey === 'chairman')!;
  const pmDirector = topManagement.find((m) => m.deptKey === 'pm-director')!;
  const qcDirector = topManagement.find((m) => m.deptKey === 'qc-director')!;

  return (
    <main>
      <section className="pt-44 pb-16 px-6 text-center">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">
          {t('الهيكل التنظيمي', 'Organizational Structure')}
        </p>
        <h1 className="text-4xl md:text-5xl text-ink">{t('الفريق وراء Vision Group', 'The team behind Vision Group')}</h1>
        <p className="mt-5 max-w-xl mx-auto text-secondary leading-relaxed">
          {t(
            'فريق متكامل من المهندسين والمديرين والاستشاريين، يعمل بمعايير واحدة عبر الشركات الثلاث.',
            'A complete team of engineers, managers and consultants, working to one standard across all three companies.'
          )}
        </p>
      </section>

      {/* Org chart */}
      <section className="px-6 pb-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="bg-ink text-white rounded-2xl px-8 py-5 text-center min-w-[220px]">
            <p className="text-[11px] tracking-widest uppercase text-[#e8a09c] font-extrabold mb-1">
              {t(chairman.roleAr, chairman.roleEn)}
            </p>
            <h4 className="font-bold">{chairman.nameAr}</h4>
          </div>
          <div className="w-0.5 h-9 bg-line" />
          <div className="flex gap-6 flex-wrap justify-center">
            {[pmDirector, qcDirector].map((n) => (
              <div key={n.roleEn} className="bg-white border border-line rounded-2xl px-7 py-5 text-center min-w-[200px] hover:border-primary transition-colors">
                <p className="text-[11px] tracking-widest uppercase text-primary font-extrabold mb-1">{t(n.roleAr, n.roleEn)}</p>
                <h4 className="font-bold text-ink">{n.nameAr}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('الأقسام', 'Departments')}</p>
          <h2 className="text-3xl md:text-4xl text-ink mb-14">{t('إدارات تعمل بتناغم', 'Departments working in sync')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {departments.map((d) => (
              <motion.button
                key={d.key}
                onClick={() => setFilter(d.key)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`text-start bg-bg border rounded-2xl p-6 transition-colors ${
                  filter === d.key ? 'border-primary' : 'border-line hover:border-ink'
                }`}
              >
                <h4 className="text-ink font-bold mb-2">{t(d.ar, d.en)}</h4>
                <p className="text-secondary text-xs">
                  {teamMembers.filter((m) => m.deptKey === d.key).length} {t('عضو', 'members')}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Team members */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('أعضاء الفريق', 'Team Members')}</p>
          <h2 className="text-3xl md:text-4xl text-ink mb-10">{t('تعرّف على فريقنا', 'Meet our people')}</h2>

          <div className="flex gap-2.5 flex-wrap mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-full px-4.5 py-2 text-sm font-semibold border transition-colors ${
                filter === 'all' ? 'bg-ink text-white border-ink' : 'bg-white text-secondary border-line hover:bg-ink hover:text-white hover:border-ink'
              }`}
            >
              {t('الكل', 'All')} ({teamMembers.length})
            </button>
            {departments.map((d) => (
              <button
                key={d.key}
                onClick={() => setFilter(d.key)}
                className={`rounded-full px-4.5 py-2 text-sm font-semibold border transition-colors ${
                  filter === d.key ? 'bg-ink text-white border-ink' : 'bg-white text-secondary border-line hover:bg-ink hover:text-white hover:border-ink'
                }`}
              >
                {t(d.ar, d.en)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {visible.map((m, i) => (
              <div key={i} className="bg-white border border-line rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform">
                <div className="relative h-44 bg-gradient-to-br from-[#e5e5e4] to-[#cfcfce]">
                  {m.image ? (
                    <Image src={m.image} alt={m.nameAr} fill sizes="200px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl text-secondary">👤</div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="text-ink text-sm font-bold mb-1">{m.nameAr}</h4>
                  <span className="text-secondary text-xs">{t(m.roleAr, m.roleEn)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
