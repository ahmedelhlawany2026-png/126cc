'use client';

import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full text-start px-4 py-2.5 rounded-lg text-sm font-medium text-secondary hover:bg-bg hover:text-primary transition-colors"
    >
      تسجيل الخروج
    </button>
  );
}
