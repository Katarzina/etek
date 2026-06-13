import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { COMPANY } from '@/lib/config';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: `${t('title')} | ${COMPANY.fullName}` };
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  return (
    <main className="flex flex-col flex-1">
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="max-w-3xl mx-auto px-6 py-16 w-full space-y-10 text-stone-700">

        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('controller.title')}</h2>
          <p className="text-sm leading-relaxed">{t('controller.text')}</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('data.title')}</h2>
          <p className="text-sm leading-relaxed">{t('data.text')}</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('purpose.title')}</h2>
          <p className="text-sm leading-relaxed">{t('purpose.text')}</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('retention.title')}</h2>
          <p className="text-sm leading-relaxed">{t('retention.text')}</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('rights.title')}</h2>
          <p className="text-sm leading-relaxed">{t('rights.text')}</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('cookies.title')}</h2>
          <p className="text-sm leading-relaxed">{t('cookies.text')}</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('contact.title')}</h2>
          <p className="text-sm leading-relaxed">{t('contact.text')}</p>
        </div>

      </section>
    </main>
  );
}
