'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import ImageUploader from './ImageUploader';

interface ProjectOption {
  id: string;
  title_ar: string;
}

export default function ProjectImagesManager() {
  const supabase = createSupabaseBrowserClient();
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    supabase
      .from('projects')
      .select('id, title_ar')
      .order('sort_order')
      .then(({ data }) => setProjects((data as ProjectOption[]) ?? []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <label className="block text-xs font-semibold text-secondary mb-2">اختر مشروعًا لإدارة صوره</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border border-line rounded-lg px-3 py-2.5 text-sm mb-6 bg-white"
      >
        <option value="">— اختر مشروع —</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title_ar}
          </option>
        ))}
      </select>

      {selected && <ImageUploader table="project_images" foreignKey="project_id" foreignId={selected} />}
      {!selected && <p className="text-secondary text-sm">اختر مشروعًا من القائمة أولًا لعرض/رفع صوره.</p>}
    </div>
  );
}
