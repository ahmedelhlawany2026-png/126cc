'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError('بيانات الدخول غير صحيحة. Invalid email or password.');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white border border-line rounded-card p-8 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-xl font-extrabold text-ink">
            VISION <span className="text-primary">GROUP</span>
          </p>
          <p className="text-secondary text-sm mt-2">لوحة التحكم · Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-bg focus:bg-white focus:border-primary outline-none rounded-lg px-3.5 py-3 text-sm"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-secondary mb-1.5">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line bg-bg focus:bg-white focus:border-primary outline-none rounded-lg px-3.5 py-3 text-sm"
              dir="ltr"
            />
          </div>

          {error && <p className="text-primary text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink hover:bg-primary text-white rounded-lg py-3 font-bold transition-colors disabled:opacity-60"
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p className="text-secondary text-xs text-center mt-6">
          أنشئ المستخدمين من لوحة Supabase (Authentication → Users) أولًا.
        </p>
      </div>
    </div>
  );
}
