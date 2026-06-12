import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { COMPANY } from '@/lib/config';
import '../globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://etek.cz';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: COMPANY.fullName,
  alternateName: COMPANY.name,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  foundingDate: String(COMPANY.founded),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Příkop 838/6',
    addressLocality: 'Brno',
    addressRegion: 'Jihomoravský kraj',
    postalCode: '602 00',
    addressCountry: 'CZ',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '17:00',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Jihomoravský kraj',
  },
  sameAs: [BASE_URL],
};

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const seoByLocale: Record<string, { title: string; description: string }> = {
  cs: {
    title: 'ETEK Stavby | Stavební firma Brno a Jihomoravský kraj',
    description: 'Stavební práce, rekonstrukce bytů a domů, výstavba rodinných domů v Brně a Jihomoravském kraji.',
  },
  en: {
    title: 'ETEK Stavby | Construction Company Brno, Czech Republic',
    description: 'Professional construction services, renovations and residential building in Brno and South Moravia.',
  },
  uk: {
    title: 'ETEK Stavby | Будівельна компанія Брно, Чехія',
    description: 'Будівельні роботи, реконструкція квартир і будинків, зведення житлових будинків у Брно та Південній Моравії.',
  },
  ru: {
    title: 'ETEK Stavby | Строительная компания Брно, Чехия',
    description: 'Строительные работы, реконструкция квартир и домов, строительство жилых домов в Брно и Южной Моравии.',
  },
};

const ogLocale: Record<string, string> = {
  cs: 'cs_CZ',
  en: 'en_US',
  uk: 'uk_UA',
  ru: 'ru_RU',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoByLocale[locale] ?? seoByLocale.cs;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: seo.title,
    description: seo.description,
    openGraph: {
      type: 'website',
      siteName: 'ETEK Stavby',
      locale: ogLocale[locale] ?? 'cs_CZ',
      title: seo.title,
      description: seo.description,
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'ETEK Stavby' }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer locale={locale} />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
