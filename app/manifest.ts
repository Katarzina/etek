import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.fullName} — Stavební firma`,
    short_name: COMPANY.fullName,
    description: 'Kompletní stavební práce, rekonstrukce a výstavba v České republice',
    start_url: '/cs',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
