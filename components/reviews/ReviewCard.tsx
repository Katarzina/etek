type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  created_at: string;
};

export function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.created_at).toLocaleDateString('cs-CZ', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="bg-white rounded border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-stone-700 text-sm leading-relaxed flex-1">"{review.text}"</p>
      <div className="flex items-center justify-between mt-1">
        <span className="font-medium text-stone-900 text-sm">{review.name}</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
    </div>
  );
}
