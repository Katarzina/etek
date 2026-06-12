import { locales } from '@/i18n';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://etek.cz';

export function buildAlternates(locale: string, path: string = '') {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: Object.fromEntries([
      ...locales.map((loc) => [loc, `${BASE_URL}/${loc}${path}`]),
      ['x-default', `${BASE_URL}/cs${path}`],
    ]) as Record<string, string>,
  };
}
