'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('email')} *</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('phone')}</label>
        <input
          name="phone"
          type="tel"
          className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('message')} *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 transition-colors resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm">{t('error')}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-stone-900 text-white text-sm font-medium py-3 rounded hover:bg-stone-700 transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('send')}
      </button>
    </form>
  );
}
