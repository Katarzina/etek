import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/getProjects';

const CATEGORY_COLORS: Record<string, string> = {
  residential: 'bg-emerald-100 text-emerald-800',
  commercial:  'bg-blue-100 text-blue-800',
  industrial:  'bg-orange-100 text-orange-800',
  public:      'bg-purple-100 text-purple-800',
};

type Props = {
  project: Project;
  locale: string;
  categoryLabel: string;
  detailLabel: string;
};

export function ProjectCard({ project, locale, categoryLabel, detailLabel }: Props) {
  const t = project.translations[locale] ?? project.translations['cs'];

  return (
    <article className="group relative flex flex-col bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.cover}
          alt={t.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`relative z-10 absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded ${CATEGORY_COLORS[project.category]}`}>
          {categoryLabel}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2 leading-snug">
          <Link
            href={`/${locale}/projekty/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {t.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{t.description}</p>

        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
          <span>{project.location} · {project.year}</span>
          {project.area > 0 && <span>{project.area.toLocaleString('cs-CZ')} m²</span>}
        </div>

        <span
          aria-hidden="true"
          className="mt-4 text-center text-sm font-medium text-stone-700 border border-stone-300 rounded py-2 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-colors"
        >
          {detailLabel}
        </span>
      </div>
    </article>
  );
}
