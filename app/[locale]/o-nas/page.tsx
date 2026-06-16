import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { buildAlternates } from '@/lib/alternates';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale, '/o-nas') };
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  const values = [
    { key: 'quality',      icon: '🏆', title: t('values.quality'),      desc: t('values.qualityDesc') },
    { key: 'reliability',  icon: '🤝', title: t('values.reliability'),  desc: t('values.reliabilityDesc') },
    { key: 'transparency', icon: '💡', title: t('values.transparency'), desc: t('values.transparencyDesc') },
  ];


  return (
    <main className="flex flex-col flex-1">
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">{t('story.label')}</p>
            <h2 className="font-heading text-3xl font-semibold text-stone-900 mb-6 leading-snug">
              {t('story.title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{t('story.text1')}</p>
            <p className="text-gray-600 leading-relaxed">{t('story.text2')}</p>
          </div>
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/images/projects/zimni-zahrada/04.jpg"
              alt={t('story.label')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-3">{t('values.title')}</p>
            <h2 className="font-heading text-3xl font-semibold text-stone-900">{t('values.subtitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ key, icon, title, desc }) => (
              <div key={key} className="bg-white rounded p-8 shadow-sm text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-heading text-xl font-semibold text-stone-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-10">{t('quote.label')}</p>
          <blockquote className="relative">
            <span className="absolute -top-6 left-0 text-8xl text-stone-100 font-serif leading-none select-none">&ldquo;</span>
            <p className="font-heading text-2xl text-stone-800 leading-relaxed italic relative z-10">
              {t('quote.text')}
            </p>
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-stone-300" />
            <p className="text-sm font-medium text-stone-700">Evžen Bajer</p>
            <div className="h-px w-12 bg-stone-300" />
          </div>
          <p className="text-xs text-stone-400 mt-1">{t('quote.role')}</p>
        </div>
      </section>
    </main>
  );
}
