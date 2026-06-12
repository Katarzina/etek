import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { CookieSettings } from '@/components/ui/CookieSettings';
import { COMPANY } from '@/lib/config';

export async function generateMetadata(): Promise<Metadata> {
  return { title: `Nastavení cookies | ${COMPANY.fullName}` };
}

export default async function CookiesPage() {
  const t = await getTranslations('cookies');

  return (
    <main className="flex flex-col flex-1">
      <PageHero title={t('title')} />

      <section className="max-w-3xl mx-auto px-6 py-16 w-full">
        <p className="text-gray-500 mb-10">{t('intro')}</p>
        <CookieSettings />
      </section>
    </main>
  );
}
