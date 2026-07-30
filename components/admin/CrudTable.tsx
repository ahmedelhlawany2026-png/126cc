'use client';

import { useEffect, useState, useCallback } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

export interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'select';
  width?: string;
  options?: { value: string; label: string }[];
}

interface CrudTableProps {
  table: string;
  fields: FieldConfig[];
  orderBy?: string;
  /** Extra fixed values applied to every new row (e.g. { company_id }) */
  fixedValues?: Record<string, string | number>;
  /** Extra filter applied when reading rows (e.g. { company_id }) */
  filter?: Record<string, string | number>;
}

type Row = Record<string, string | number | null> & { id?: string };

export default function CrudTable({ table, fields, orderBy, fixedValues = {}, filter = {} }: CrudTableProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [draft, setDraft] = useState<Row>({});
  const [saving, setSaving] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase.from(table).select('*');
    Object.entries(filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    if (orderBy) query = query.order(orderBy);
    const { data, error } = await query;
    if (error) setError(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy, JSON.stringify(filter)]);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(row: Row) {
    setEditingId(row.id ?? null);
    setDraft(row);
  }

  function startNew() {
    setEditingId('new');
    const blank: Row = { ...fixedValues };
    fields.forEach((f) => (blank[f.key] = f.type === 'number' ? 0 : ''));
    setDraft(blank);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft({});
  }

  async function save() {
    setSaving(true);
    setError(null);
    const payload = { ...draft, ...fixedValues };
    delete payload.id;

    const result =
      editingId === 'new'
        ? await supabase.from(table).insert(payload)
        : await supabase.from(table).update(payload).eq('id', editingId);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    cancelEdit();
    load();
  }

  async function remove(id: string) {
    if (!confirm('تأكيد الحذف؟ / Confirm delete?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) setError(error.message);
    else load();
  }

  return (
    <div>
      {error && (
        <div className="mb-4 bg-primary/10 border border-primary/30 text-primary text-sm rounded-lg px-4 py-3">
          {error}
          {error.includes('Failed to fetch') || error.includes('NEXT_PUBLIC') ? (
            <span className="block mt-1 text-xs opacity-80">
              تأكد إن متغيرات Supabase مضبوطة في .env.local (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).
            </span>
          ) : null}
        </div>
      )}

      <div className="bg-white border border-line rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg text-secondary text-xs uppercase tracking-wide">
              {fields.map((f) => (
                <th key={f.key} className="text-start px-4 py-3 font-bold" style={{ width: f.width }}>
                  {f.label}
                </th>
              ))}
              <th className="w-32" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={fields.length + 1} className="px-4 py-6 text-center text-secondary">
                  جاري التحميل...
                </td>
              </tr>
            )}

            {!loading && rows.length === 0 && editingId !== 'new' && (
              <tr>
                <td colSpan={fields.length + 1} className="px-4 py-6 text-center text-secondary">
                  لا توجد بيانات بعد.
                </td>
              </tr>
            )}

            {rows.map((row) =>
              editingId === row.id ? (
                <tr key={row.id} className="border-t border-line bg-bg/50">
                  {fields.map((f) => (
                    <td key={f.key} className="px-4 py-2 align-top">
                      <EditableField field={f} value={draft[f.key]} onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} />
                    </td>
                  ))}
                  <td className="px-4 py-2 whitespace-nowrap">
                    <RowActions saving={saving} onSave={save} onCancel={cancelEdit} />
                  </td>
                </tr>
              ) : (
                <tr key={row.id} className="border-t border-line hover:bg-bg/40">
                  {fields.map((f) => (
                    <td key={f.key} className="px-4 py-3 align-top text-ink max-w-xs truncate">
                      {f.type === 'select'
                        ? f.options?.find((o) => o.value === row[f.key])?.label ?? row[f.key] ?? '—'
                        : row[f.key] ?? '—'}
                    </td>
                  ))}
                  <td className="px-4 py-3 whitespace-nowrap text-end">
                    <button onClick={() => startEdit(row)} className="text-secondary hover:text-ink text-xs font-semibold me-3">
                      تعديل
                    </button>
                    <button onClick={() => row.id && remove(row.id)} className="text-secondary hover:text-primary text-xs font-semibold">
                      حذف
                    </button>
                  </td>
                </tr>
              )
            )}

            {editingId === 'new' && (
              <tr className="border-t border-line bg-bg/50">
                {fields.map((f) => (
                  <td key={f.key} className="px-4 py-2 align-top">
                    <EditableField field={f} value={draft[f.key]} onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} />
                  </td>
                ))}
                <td className="px-4 py-2 whitespace-nowrap">
                  <RowActions saving={saving} onSave={save} onCancel={cancelEdit} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingId === null && (
        <button
          onClick={startNew}
          className="mt-4 border border-ink text-ink rounded-full px-5 py-2.5 text-sm font-bold hover:bg-ink hover:text-white transition-colors"
        >
          + إضافة عنصر جديد
        </button>
      )}
    </div>
  );
}

function EditableField({
  field,
  value,
  onChange
}: {
  field: FieldConfig;
  value: string | number | null | undefined;
  onChange: (value: string) => void;
}) {
  const common = 'w-full border border-line rounded-md px-2.5 py-1.5 text-sm bg-white focus:border-primary outline-none';
  if (field.type === 'textarea') {
    return <textarea rows={2} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={common} />;
  }
  if (field.type === 'select') {
    return (
      <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={common}>
        <option value="">—</option>
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      type={field.type === 'number' ? 'number' : 'text'}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className={common}
    />
  );
}

function RowActions({ saving, onSave, onCancel }: { saving: boolean; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onSave}
        disabled={saving}
        className="bg-ink text-white text-xs font-bold rounded-md px-3 py-1.5 hover:bg-primary transition-colors disabled:opacity-60"
      >
        {saving ? '...' : 'حفظ'}
      </button>
      <button onClick={onCancel} className="text-secondary text-xs font-semibold px-2">
        إلغاء
      </button>
    </div>
  );
}
