'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-50 border-t border-red-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <p className="text-sm text-red-600 flex-1 leading-relaxed">
          {t('text')}{' '}
          <a
            href="https://policies.google.com/technologies/cookies?hl=cs"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-red-800 transition-colors"
          >
            {t('link')}
          </a>
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-5 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-full hover:bg-red-100 transition-colors"
          >
            {t('settings')}
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-medium bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            {t('accept')}
          </button>
          <button
            onClick={reject}
            aria-label="Zavřít"
            className="text-red-400 hover:text-red-600 transition-colors ml-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
