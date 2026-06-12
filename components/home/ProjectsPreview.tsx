import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getProjects } from '@/lib/getProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export async function ProjectsPreview({ locale }: { locale: string }) {
  const t = await getTranslations('home.projectsPreview');
  const tProjects = await getTranslations('projects');
  const tFilters = await getTranslations('projects.filters');

  const projects = getProjects().slice(0, 3);

  const categoryLabels: Record<string, string> = {
    residential: tFilters('residential'),
    commercial:  tFilters('commercial'),
    industrial:  tFilters('industrial'),
    public:      tFilters('public'),
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-2">
              {t('title')}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-900">
              {t('heading')}
            </h2>
          </div>
          <Link
            href={`/${locale}/projekty`}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 pb-0.5 hover:text-stone-900 hover:border-stone-900 transition-colors"
          >
            {t('seeAll')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              categoryLabel={categoryLabels[project.category]}
              detailLabel={tProjects('details')}
            />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href={`/${locale}/projekty`}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 pb-0.5"
          >
            {t('seeAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
