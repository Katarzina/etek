import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

const handleI18n = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
});

export function proxy(request: NextRequest) {
  return handleI18n(request);
}

export default proxy;

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
