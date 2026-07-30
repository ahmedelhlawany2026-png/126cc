import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'تواصل معنا | Contact — Vision Group',
  description:
    'تواصل مع Vision Group لمناقشة مشروعك الطبي أو السكني أو الاستشاري الهندسي. فورم مباشر، خريطة، واتساب، ورقم تواصل.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'تواصل معنا | Contact — Vision Group',
    description: 'تواصل مع Vision Group لمناقشة مشروعك القادم.',
    url: '/contact',
    images: [{ url: '/images/hero-bg.jpg' }]
  }
};

export default function ContactPage() {
  return <ContactPageClient />;
}
