import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import SignOutButton from './SignOutButton';

const navItems = [
  { href: '/admin', label: 'الرئيسية' },
  { href: '/admin/statistics', label: 'الأرقام' },
  { href: '/admin/clients', label: 'العملاء' },
  { href: '/admin/timeline', label: 'الجدول الزمني' },
  { href: '/admin/testimonials', label: 'آراء العملاء' },
  { href: '/admin/faqs', label: 'الأسئلة الشائعة' },
  { href: '/admin/team', label: 'الفريق' },
  { href: '/admin/projects', label: 'المشاريع' },
  { href: '/admin/contact-requests', label: 'رسائل التواصل' }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The middleware already redirects unauthenticated users to /admin/login,
  // this is a second, defense-in-depth check at the layout level.
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-bg flex" dir="rtl" lang="ar">
      <aside className="w-64 bg-white border-e border-line flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-line">
          <p className="font-extrabold text-ink">
            VISION <span className="text-primary">GROUP</span>
          </p>
          <p className="text-secondary text-xs mt-1">لوحة التحكم</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-bg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
