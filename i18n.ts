import { getRequestConfig } from 'next-intl/server';

export const locales = ['cs', 'en', 'uk', 'ru'] as const;
export const defaultLocale = 'cs' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
