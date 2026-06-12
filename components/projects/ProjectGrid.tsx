'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import type { Project } from '@/lib/getProjects';

type Category = 'all' | 'residential' | 'commercial' | 'industrial' | 'public';

type Props = {
  projects: Project[];
  locale: string;
  labels: {
    filters: Record<string, string>;
    details: string;
  };
};

export function ProjectGrid({ projects, locale, labels }: Props) {
  const [active, setActive] = useState<Category>('all');

  const allFilters: { key: Category; label: string }[] = [
    { key: 'all',         label: labels.filters.all },
    { key: 'residential', label: labels.filters.residential },
    { key: 'commercial',  label: labels.filters.commercial },
    { key: 'industrial',  label: labels.filters.industrial },
    { key: 'public',      label: labels.filters.public },
  ];

  const filters = allFilters.filter(
    ({ key }) => key === 'all' || projects.some((p) => p.category === key)
  );

  const visible = active === 'all'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              active === key
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
            categoryLabel={labels.filters[project.category]}
            detailLabel={labels.details}
          />
        ))}
      </div>
    </div>
  );
}
