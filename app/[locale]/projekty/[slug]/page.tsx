import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getProjects, getProjectBySlug } from '@/lib/getProjects';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { locales } from '@/i18n';
import { COMPANY } from '@/lib/config';
import { buildAlternates } from '@/lib/alternates';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.flatMap((p) =>
    locales.map((locale) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const tr = project.translations[locale] ?? project.translations['cs'];
  return {
    title: `${tr.title} | ${COMPANY.fullName}`,
    description: tr.description,
    openGraph: {
      type: 'website',
      siteName: 'ETEK Stavby',
      images: [{ url: project.cover, alt: tr.title }],
    },
    alternates: buildAlternates(locale, `/projekty/${slug}`),
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  residential: 'bg-emerald-100 text-emerald-800',
  commercial:  'bg-blue-100 text-blue-800',
  industrial:  'bg-orange-100 text-orange-800',
  public:      'bg-purple-100 text-purple-800',
};

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations('projects');
  const tFilters = await getTranslations('projects.filters');
  const tNav = await getTranslations('nav');

  const tr = project.translations[locale] ?? project.translations['cs'];
  const categoryLabel = tFilters(project.category as Parameters<typeof tFilters>[0]);

  return (
    <main className="flex flex-col flex-1">
      <div className="bg-stone-900 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-stone-400">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {tNav('home')}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/projekty`} className="hover:text-white transition-colors">
              {tNav('projects')}
            </Link>
            <span>/</span>
            <span className="text-white">{tr.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded mb-4 ${CATEGORY_COLORS[project.category]}`}>
              {categoryLabel}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-stone-900 mb-4">
              {tr.title}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">{tr.description}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{tr.details}</p>
          </div>

          <aside className="bg-stone-50 rounded p-6 space-y-4 h-fit">
            {[
              { label: t('year'),     value: String(project.year) },
              { label: t('location'), value: project.location },
              { label: t('area'),     value: `${project.area.toLocaleString('cs-CZ')} m²` },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-stone-400 mb-0.5">{label}</span>
                <span className="text-stone-800 font-medium">{value}</span>
              </div>
            ))}
          </aside>
        </div>

        <h2 className="font-heading text-2xl font-semibold text-stone-900 mb-6">{t('gallery')}</h2>
        <ProjectGallery images={project.images} title={tr.title} />

        <div className="mt-12">
          <Link
            href={`/${locale}/projekty`}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 pb-0.5 hover:text-stone-900 hover:border-stone-900 transition-colors"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {t('backToProjects')}
          </Link>
        </div>
      </div>
    </main>
  );
}
