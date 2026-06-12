import certificatesData from '@/data/certificates.json';

export type Certificate = {
  id: string;
  image: string;
  translations: Record<string, { title: string; description: string }>;
};

export function getCertificates(): Certificate[] {
  return certificatesData as Certificate[];
}
