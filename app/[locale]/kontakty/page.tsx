import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/ui/ContactForm';
import { COMPANY } from '@/lib/config';
import { buildAlternates } from '@/lib/alternates';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale, '/kontakty') };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  const info = [
    {
      label: t('address'),
      value: COMPANY.address,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      label: t('phone'),
      value: COMPANY.phone,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      label: t('email'),
      value: COMPANY.email,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: t('openingHours'),
      value: t('hours'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="flex flex-col flex-1">
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-stone-900 mb-2">{t('infoTitle')}</h2>
            <p className="text-stone-700 font-medium mb-1">{COMPANY.fullName} · {COMPANY.contact}</p>
            <p className="text-sm text-stone-400 mb-4">IČO: {COMPANY.ico}</p>
            <p className="text-sm text-stone-500 leading-relaxed mb-8">{t('focus')}</p>
            <ul className="space-y-6 mb-10">
              {info.map(({ label, value, icon }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="mt-0.5 text-stone-400">{icon}</span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 mb-0.5">{label}</p>
                    <p className="text-stone-800 font-medium">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded overflow-hidden h-64 bg-stone-100">
              <iframe
                src="https://maps.google.com/maps?q=P%C5%99%C3%ADkop+838%2F6%2C+602+00+Brno&output=embed&hl=cs"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-stone-900 mb-8">{t('formTitle')}</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
