'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

export function AboutPreview() {
  const t = useTranslations('home.aboutPreview');
  const locale = useLocale();

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
            {t('title')}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-900 leading-snug mb-6">
            {t('text')}
          </h2>
          <Link
            href={`/${locale}/o-nas`}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 pb-0.5 hover:text-stone-900 hover:border-stone-900 transition-colors"
          >
            {t('link')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative aspect-[4/3] rounded overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
            alt="Construction team"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
