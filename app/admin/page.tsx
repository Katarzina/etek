'use client';

import { useEffect, useState } from 'react';

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  created_at: string;
  approved: boolean;
};

type View = 'loading' | 'login' | 'list';

export default function AdminPage() {
  const [view, setView] = useState<View>('loading');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  async function loadReviews() {
    const res = await fetch('/api/admin/reviews');
    if (res.status === 401) { setView('login'); return; }
    const data = await res.json();
    setReviews(data);
    setView('list');
  }

  useEffect(() => { loadReviews(); }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoginLoading(false);
    if (res.ok) { await loadReviews(); }
    else { setLoginError('Nesprávné heslo.'); }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setView('login');
    setReviews([]);
  }

  async function handleApprove(id: number) {
    await fetch(`/api/admin/reviews/${id}`, { method: 'PATCH' });
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, approved: true } : r));
  }

  async function handleDelete(id: number) {
    if (!confirm('Smazat tuto recenzi?')) return;
    await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-400">Načítání…</p>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded shadow-sm p-8 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-stone-900 mb-6">Administrace recenzí</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Heslo</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500"
              />
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-stone-800 text-white rounded px-6 py-2.5 text-sm font-medium hover:bg-stone-900 transition-colors disabled:opacity-50"
            >
              {loginLoading ? 'Přihlašování…' : 'Přihlásit se'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold text-stone-900">Administrace recenzí</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          Odhlásit se
        </button>
      </div>

      {pending.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-medium text-stone-800 mb-4">
            Čekající ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map((review) => (
              <ReviewRow
                key={review.id}
                review={review}
                onApprove={() => handleApprove(review.id)}
                onDelete={() => handleDelete(review.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium text-stone-800 mb-4">
          Schválené ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-stone-400 text-sm">Žádné schválené recenze.</p>
        ) : (
          <div className="space-y-4">
            {approved.map((review) => (
              <ReviewRow
                key={review.id}
                review={review}
                onDelete={() => handleDelete(review.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewRow({
  review,
  onApprove,
  onDelete,
}: {
  review: Review;
  onApprove?: () => void;
  onDelete: () => void;
}) {
  const date = new Date(review.created_at).toLocaleDateString('cs-CZ');
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  return (
    <div className={`bg-white rounded border p-5 ${review.approved ? 'border-gray-100' : 'border-amber-200'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-medium text-stone-900 text-sm">{review.name}</span>
            <span className="text-amber-400 text-sm">{stars}</span>
            <span className="text-xs text-gray-400">{date}</span>
            {!review.approved && (
              <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">čekající</span>
            )}
          </div>
          <p className="text-stone-600 text-sm leading-relaxed">{review.text}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!review.approved && onApprove && (
            <button
              onClick={onApprove}
              className="text-xs bg-emerald-600 text-white rounded px-3 py-1.5 hover:bg-emerald-700 transition-colors"
            >
              Schválit
            </button>
          )}
          <button
            onClick={onDelete}
            className="text-xs bg-red-50 text-red-600 rounded px-3 py-1.5 hover:bg-red-100 transition-colors"
          >
            Smazat
          </button>
        </div>
      </div>
    </div>
  );
}
