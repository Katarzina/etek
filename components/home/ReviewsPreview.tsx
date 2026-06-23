import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ReviewsGrid } from '@/components/reviews/ReviewsGrid';

export async function ReviewsPreview({ locale }: { locale: string }) {
  const t = await getTranslations('reviews');

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-2">
              {t('preview.title')}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-900">
              {t('preview.heading')}
            </h2>
          </div>
          <Link
            href={`/${locale}/recenze`}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 pb-0.5 hover:text-stone-900 hover:border-stone-900 transition-colors"
          >
            {t('seeAll')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <ReviewsGrid limit={3} emptyMessage={t('empty')} />

        <div className="mt-10 text-center sm:hidden">
          <Link
            href={`/${locale}/recenze`}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 pb-0.5"
          >
            {t('seeAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
