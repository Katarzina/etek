import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ProjectsPreview } from '@/components/home/ProjectsPreview';
import { buildAlternates } from '@/lib/alternates';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="flex flex-col flex-1">
      <HeroSection />
      <StatsBar />
      <AboutPreview />
      <ProjectsPreview locale={locale} />
    </main>
  );
}
