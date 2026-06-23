'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ReviewForm() {
  const t = useTranslations('reviews.form');
  const [status, setStatus] = useState<Status>('idle');
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, rating }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 text-emerald-800 rounded p-6 text-center">
        <p className="font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('name')} *</label>
        <input
          name="name"
          required
          className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">{t('rating')} *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="focus:outline-none"
              aria-label={`${star} stars`}
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  star <= (hovered || rating) ? 'text-amber-400' : 'text-gray-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('text')} *</label>
        <textarea
          name="text"
          required
          rows={4}
          className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{t('error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-stone-800 text-white rounded px-6 py-3 text-sm font-medium hover:bg-stone-900 transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? t('sending') : t('send')}
      </button>
    </form>
  );
}
