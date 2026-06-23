import { sql } from '@/lib/db';
import { ReviewCard } from './ReviewCard';

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  created_at: string;
  social_url?: string | null;
};

export async function ReviewsGrid({ limit, emptyMessage }: { limit?: number; emptyMessage: string }) {
  const rows = (
    limit
      ? await sql`SELECT id, name, text, rating, created_at, social_url FROM reviews WHERE approved = TRUE ORDER BY created_at DESC LIMIT ${limit}`
      : await sql`SELECT id, name, text, rating, created_at, social_url FROM reviews WHERE approved = TRUE ORDER BY created_at DESC`
  ) as Review[];

  if (rows.length === 0) {
    return <p className="text-gray-400 text-sm">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rows.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
