import type { Metadata } from 'next';
import TeamPageClient from './TeamPageClient';

export const metadata: Metadata = {
  title: 'فريقنا | Our Team — Vision Group',
  description:
    'الهيكل التنظيمي وفريق العمل في Vision Group: الإدارة، الأقسام الهندسية والتسويقية والمالية، وأعضاء الفريق عبر بايو فيجن، هوم فيجن، وVEC.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'فريقنا | Our Team — Vision Group',
    description: 'الهيكل التنظيمي وفريق العمل في Vision Group عبر الشركات الثلاث.',
    url: '/team',
    images: [{ url: '/images/hero-bg.jpg' }]
  }
};

export default function TeamPage() {
  return <TeamPageClient />;
}
