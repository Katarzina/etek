import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { ReviewsGrid } from '@/components/reviews/ReviewsGrid';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { buildAlternates } from '@/lib/alternates';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.reviews' });
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale, '/recenze') };
}

export default async function RecenzePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('reviews');
  const googleUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? '#';

  return (
    <main className="flex flex-col flex-1">
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-2xl font-semibold text-stone-900">
            {t('preview.heading')}
          </h2>
          {googleUrl !== '#' && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-stone-800 rounded px-4 py-2 hover:bg-stone-900 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('googleButton')}
            </a>
          )}
        </div>

        <ReviewsGrid emptyMessage={t('empty')} />
      </section>

      <section className="bg-stone-50 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-semibold text-stone-900 mb-8">
            {t('form.heading')}
          </h2>
          <ReviewForm />
        </div>
      </section>
    </main>
  );
}
