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

  const team = [
    { name: 'Jan Novák',        role: t('team.roles.founder'),   img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
    { name: 'Petra Svobodová',  role: t('team.roles.architect'), img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Tomáš Dvořák',    role: t('team.roles.foreman'),   img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
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
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
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

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-3">{t('team.title')}</p>
            <h2 className="font-heading text-3xl font-semibold text-stone-900">{t('team.subtitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map(({ name, role, img }) => (
              <div key={name} className="text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src={img} alt={name} fill sizes="128px" className="object-cover" />
                </div>
                <p className="font-semibold text-stone-900">{name}</p>
                <p className="text-sm text-stone-400 mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
