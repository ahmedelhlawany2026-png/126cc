'use client';

import { useCallback, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

interface ImageRow {
  id: string;
  image_url: string;
  sort_order: number;
}

export default function ImageUploader({
  table,
  foreignKey,
  foreignId,
  bucket = 'media'
}: {
  /** e.g. "project_images" */
  table: string;
  /** e.g. "project_id" */
  foreignKey: string;
  foreignId: string;
  bucket?: string;
}) {
  const supabase = createSupabaseBrowserClient();
  const [images, setImages] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select('id, image_url, sort_order')
      .eq(foreignKey, foreignId)
      .order('sort_order');
    if (error) setError(error.message);
    setImages((data as ImageRow[]) ?? []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, foreignKey, foreignId]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    for (const file of Array.from(files)) {
      const path = `${foreignKey}-${foreignId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);
      if (uploadError) {
        setError(uploadError.message);
        continue;
      }
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
      await supabase.from(table).insert({
        [foreignKey]: foreignId,
        image_url: urlData.publicUrl,
        sort_order: images.length
      });
    }

    setUploading(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm('حذف هذه الصورة؟')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) setError(error.message);
    load();
  }

  async function persistOrder(next: ImageRow[]) {
    setImages(next);
    await Promise.all(next.map((img, i) => supabase.from(table).update({ sort_order: i }).eq('id', img.id)));
  }

  function onDragStart(index: number) {
    setDragIndex(index);
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const next = [...images];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(index, 0, moved);
    setDragIndex(index);
    setImages(next);
  }

  function onDragEnd() {
    setDragIndex(null);
    persistOrder(images);
  }

  return (
    <div>
      {error && <p className="text-primary text-sm mb-3">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {images.map((img, i) => (
          <div
            key={img.id}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDragEnd={onDragEnd}
            className="relative aspect-square rounded-xl overflow-hidden border border-line cursor-move group bg-bg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.image_url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => remove(img.id)}
              className="absolute top-1.5 end-1.5 w-6 h-6 rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
            <span className="absolute bottom-1.5 start-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
              {i + 1}
            </span>
          </div>
        ))}

        {loading && <p className="text-secondary text-xs col-span-full">جاري التحميل...</p>}
      </div>

      <label className="inline-block border border-ink text-ink rounded-full px-5 py-2.5 text-sm font-bold hover:bg-ink hover:text-white transition-colors cursor-pointer">
        {uploading ? 'جاري الرفع...' : '+ رفع صور'}
        <input type="file" accept="image/*" multiple hidden onChange={(e) => handleUpload(e.target.files)} disabled={uploading} />
      </label>
      <p className="text-secondary text-xs mt-2">اسحب الصور لإعادة الترتيب. يتطلب bucket باسم &quot;{bucket}&quot; في Supabase Storage.</p>
    </div>
  );
}
