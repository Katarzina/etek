import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProjects } from '@/lib/getProjects';
import { PageHero } from '@/components/ui/PageHero';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { buildAlternates } from '@/lib/alternates';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.projects' });
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale, '/projekty') };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const tFilters = await getTranslations('projects.filters');

  const projects = getProjects();

  const labels = {
    filters: {
      all:         tFilters('all'),
      residential: tFilters('residential'),
      commercial:  tFilters('commercial'),
      industrial:  tFilters('industrial'),
      public:      tFilters('public'),
    },
    details: t('details'),
  };

  return (
    <main className="flex flex-col flex-1">
      <PageHero title={t('title')} subtitle={t('subtitle')} />
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <ProjectGrid projects={projects} locale={locale} labels={labels} />
      </section>
    </main>
  );
}
