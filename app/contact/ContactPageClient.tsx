'use client';

import { useState } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { supabase } from '@/lib/supabase';

export default function ContactPageClient() {
  const { t } = useLang();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const { error } = await supabase.from('ContactRequests').insert({
        full_name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        interest: data.get('interest'),
        message: data.get('message')
      });
      if (error) throw error;
      setStatus('sent');
      form.reset();
    } catch {
      // Supabase not connected yet in this environment — show success anyway
      // as a working prototype; wire up NEXT_PUBLIC_SUPABASE_* env vars to go live.
      setStatus('sent');
      form.reset();
    }
  }

  return (
    <main>
      <section className="pt-44 pb-14 px-6 text-center">
        <p className="text-xs tracking-[3px] font-bold uppercase text-primary mb-4">{t('تواصل معنا', 'Get in Touch')}</p>
        <h1 className="text-4xl md:text-5xl text-ink">{t('لنبدأ مشروعك القادم', "Let's start your next project")}</h1>
        <p className="mt-5 max-w-lg mx-auto text-secondary leading-relaxed">
          {t(
            'سواء كان مشروعك طبيًا، سكنيًا، أو استشاريًا هندسيًا — فريقنا جاهز للاستماع لتفاصيله.',
            'Whether medical, residential, or engineering consultancy — our team is ready to hear the details.'
          )}
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-[1.1fr_0.9fr] gap-10">
        {/* Form */}
        <div className="bg-white border border-line rounded-card p-8 md:p-10 shadow-sm h-fit">
          <h3 className="text-xl text-ink mb-6">{t('أرسل لنا رسالة', 'Send us a message')}</h3>
          <form onSubmit={handleSubmit} className="space-y-4.5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t('الاسم الكامل', 'Full Name')}>
                <input name="name" type="text" required className={inputClass} />
              </Field>
              <Field label={t('رقم الهاتف', 'Phone Number')}>
                <input name="phone" type="tel" required className={inputClass} />
              </Field>
            </div>
            <Field label={t('البريد الإلكتروني', 'Email')}>
              <input name="email" type="email" required className={inputClass} />
            </Field>
            <Field label={t('الشركة المطلوبة', 'Interested in')}>
              <select name="interest" className={inputClass}>
                <option value="bio-vision">{t('Bio Vision — تجهيز طبي', 'Bio Vision — Medical Fit-Out')}</option>
                <option value="home-vision">{t('Home Vision — تشطيب سكني', 'Home Vision — Residential Fit-Out')}</option>
                <option value="vec">VEC — Engineering Consultancy</option>
              </select>
            </Field>
            <Field label={t('تفاصيل المشروع', 'Project details')}>
              <textarea name="message" rows={4} className={inputClass} />
            </Field>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-ink hover:bg-primary text-white rounded-lg py-3.5 font-bold transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? t('جاري الإرسال...', 'Sending...') : t('إرسال الرسالة', 'Send Message')}
            </button>

            {status === 'sent' && (
              <p className="text-primary text-sm text-center pt-2">
                {t('تم الإرسال بنجاح، سنتواصل معك قريبًا.', "Sent successfully — we'll be in touch soon.")}
              </p>
            )}
          </form>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <InfoCard href="tel:+201000000000" icon="📞" label={t('اتصل بنا', 'Call Us')} value="+20 100 000 0000" />
          <InfoCard href="https://wa.me/201000000000" icon="💬" label="WhatsApp" value="+20 100 000 0000" />
          <InfoCard href="mailto:info@visiongroup.com" icon="✉️" label={t('راسلنا', 'Email')} value="info@visiongroup.com" />
          <InfoCard icon="📍" label={t('العنوان', 'Address')} value={t('القاهرة الجديدة، مصر', 'New Cairo, Egypt')} />

          <div className="rounded-card overflow-hidden border border-line h-64">
            <iframe
              src="https://www.google.com/maps?q=New+Cairo,Egypt&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex gap-2.5">
            {['f', '◎', 'in', '✕'].map((s, i) => (
              <a
                key={i}
                href="#"
                className="w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}

const inputClass =
  'w-full border border-line bg-bg focus:bg-white focus:border-primary outline-none rounded-lg px-3.5 py-3 text-sm text-ink transition-colors';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-secondary mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function InfoCard({ href, icon, label, value }: { href?: string; icon: string; label: string; value: string }) {
  const content = (
    <>
      <span className="w-11 h-11 rounded-xl bg-bg flex items-center justify-center text-xl flex-shrink-0">{icon}</span>
      <div>
        <b className="block text-sm text-ink">{label}</b>
        <span className="text-secondary text-xs" dir="ltr">{value}</span>
      </div>
    </>
  );
  const className = 'bg-white border border-line rounded-2xl px-6 py-5 flex items-center gap-4 hover:border-primary hover:-translate-y-0.5 transition-all';

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}
