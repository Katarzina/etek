import projectsData from '@/data/projects.json';

export type Project = {
  id: string;
  slug: string;
  year: number;
  category: 'residential' | 'commercial' | 'industrial' | 'public';
  location: string;
  area: number;
  cover: string;
  images: string[];
  translations: Record<string, { title: string; description: string; details: string }>;
};

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}
