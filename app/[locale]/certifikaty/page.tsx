import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getCertificates } from '@/lib/getCertificates';
import { PageHero } from '@/components/ui/PageHero';
import { buildAlternates } from '@/lib/alternates';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.certificates' });
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale, '/certifikaty') };
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('certificates');
  const certificates = getCertificates();

  return (
    <main className="flex flex-col flex-1">
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert) => {
            const tr = cert.translations[locale] ?? cert.translations['cs'];
            return (
              <div key={cert.id} className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] bg-stone-100">
                  <Image
                    src={cert.image}
                    alt={tr.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2">{tr.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tr.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
