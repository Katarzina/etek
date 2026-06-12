import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/getProjects';
import { locales } from '@/i18n';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://etek.cz';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects();

  const staticPages = ['', '/o-nas', '/projekty', '/certifikaty', '/kontakty'];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1 : 0.8,
    }))
  );

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${BASE_URL}/${locale}/projekty/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...projectRoutes];
}
