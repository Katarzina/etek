type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  created_at: string;
  social_url?: string | null;
};

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
}

function getAvatarColor(name: string): string {
  const colors = ['bg-stone-600', 'bg-amber-700', 'bg-teal-700', 'bg-indigo-700', 'bg-rose-700', 'bg-emerald-700'];
  return colors[name.charCodeAt(0) % colors.length];
}

type SocialNetwork = 'facebook' | 'instagram' | 'linkedin';

function detectNetwork(url: string): SocialNetwork | null {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    if (host.includes('facebook.com') || host === 'fb.com') return 'facebook';
    if (host.includes('instagram.com')) return 'instagram';
    if (host.includes('linkedin.com')) return 'linkedin';
    return null;
  } catch {
    return null;
  }
}

function SocialIcon({ network }: { network: SocialNetwork }) {
  if (network === 'facebook') return (
    <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  if (network === 'instagram') return (
    <svg className="w-4 h-4 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );

  if (network === 'linkedin') return (
    <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  return null;
}

export function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.created_at).toLocaleDateString('cs-CZ', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const network = review.social_url ? detectNetwork(review.social_url) : null;

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

      <div className="flex items-center gap-2.5 mt-1">
        <div className={`w-8 h-8 rounded-full ${getAvatarColor(review.name)} flex items-center justify-center shrink-0`}>
          <span className="text-white text-xs font-semibold">{getInitials(review.name)}</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-stone-900 text-sm">{review.name}</span>
            {review.social_url && network && (
              <a
                href={review.social_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={network}
                className="hover:opacity-75 transition-opacity"
              >
                <SocialIcon network={network} />
              </a>
            )}
          </div>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
