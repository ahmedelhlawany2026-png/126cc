import Link from 'next/link';

const sections = [
  { href: '/admin/statistics', title: 'الأرقام', desc: 'العدادات المتحركة في الصفحة الرئيسية' },
  { href: '/admin/clients', title: 'العملاء', desc: 'شعارات العملاء المتحركة' },
  { href: '/admin/timeline', title: 'الجدول الزمني', desc: 'مسيرة الشركة عبر السنين' },
  { href: '/admin/testimonials', title: 'آراء العملاء', desc: 'التوصيات المعروضة في كل صفحة' },
  { href: '/admin/faqs', title: 'الأسئلة الشائعة', desc: 'أسئلة كل شركة على حدة' },
  { href: '/admin/team', title: 'الفريق', desc: 'الأقسام والموظفين' },
  { href: '/admin/projects', title: 'المشاريع', desc: 'مشاريع كل شركة وصورها' },
  { href: '/admin/contact-requests', title: 'رسائل التواصل', desc: 'الرسائل الواردة من فورم التواصل' }
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink mb-1">أهلًا بيك في لوحة التحكم</h1>
      <p className="text-secondary text-sm mb-8">اختر قسم للبدء في التعديل — التغييرات تظهر فورًا على الموقع.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white border border-line rounded-2xl p-6 hover:border-primary hover:-translate-y-0.5 transition-all"
          >
            <h3 className="text-ink font-bold mb-1.5">{s.title}</h3>
            <p className="text-secondary text-xs leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
