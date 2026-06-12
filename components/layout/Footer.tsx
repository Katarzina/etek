import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/lib/config';

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');

  const links = [
    { href: `/${locale}`,             label: tNav('home') },
    { href: `/${locale}/o-nas`,       label: tNav('about') },
    { href: `/${locale}/projekty`,    label: tNav('projects') },
    { href: `/${locale}/certifikaty`, label: tNav('certificates') },
    { href: `/${locale}/kontakty`,    label: tNav('contact') },
  ];

  return (
    <footer className="bg-stone-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <Link href={`/${locale}`}>
            <Image
              src="/logo.png"
              alt="ETEK"
              width={160}
              height={107}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-sm leading-relaxed text-gray-500">
            {t('tagline', { year: COMPANY.founded })}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Menu</p>
          <ul className="space-y-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Kontakt</p>
          <ul className="space-y-2 text-sm">
            <li>{COMPANY.address}</li>
            <li>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                {COMPANY.email}
              </a>
            </li>
            <li className="text-gray-600 pt-1">{COMPANY.hours}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© 2017 ETEK. {t('rights')}.</span>
          <div className="flex gap-5">
            <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">
              {t('cookieSettings')}
            </Link>
            <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
