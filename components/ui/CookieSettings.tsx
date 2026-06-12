'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Consent = { analytics: boolean; marketing: boolean };

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-stone-800' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-5 w-5 mt-0.5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export function CookieSettings() {
  const t = useTranslations('cookies');
  const [consent, setConsent] = useState<Consent>({ analytics: false, marketing: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cookie_consent') ?? '{}');
      setConsent({ analytics: stored.analytics ?? false, marketing: stored.marketing ?? false });
    } catch {}
  }, []);

  const save = (overrides?: Partial<Consent>) => {
    const next = { necessary: true, ...consent, ...overrides };
    localStorage.setItem('cookie_consent', JSON.stringify(next));
    setConsent({ analytics: next.analytics, marketing: next.marketing });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    {
      key: 'necessary',
      title: t('necessary.title'),
      desc: t('necessary.desc'),
      checked: true,
      disabled: true,
    },
    {
      key: 'analytics',
      title: t('analytics.title'),
      desc: t('analytics.desc'),
      checked: consent.analytics,
      onChange: (v: boolean) => setConsent((p) => ({ ...p, analytics: v })),
    },
    {
      key: 'marketing',
      title: t('marketing.title'),
      desc: t('marketing.desc'),
      checked: consent.marketing,
      onChange: (v: boolean) => setConsent((p) => ({ ...p, marketing: v })),
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map(({ key, title, desc, checked, onChange, disabled }) => (
        <div key={key} className="flex items-start justify-between gap-6 bg-stone-50 rounded p-5">
          <div>
            <p className="font-medium text-stone-900 mb-1">{title}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
          <div className="mt-1 shrink-0">
            <Toggle checked={checked} onChange={onChange} disabled={disabled} />
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-3 pt-4">
        <button
          onClick={() => save()}
          className="px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded hover:bg-stone-700 transition-colors"
        >
          {saved ? '✓ Uloženo' : t('saveSettings')}
        </button>
        <button
          onClick={() => save({ analytics: true, marketing: true })}
          className="px-6 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded hover:bg-stone-100 transition-colors"
        >
          {t('acceptAll')}
        </button>
        <button
          onClick={() => save({ analytics: false, marketing: false })}
          className="px-6 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded hover:bg-stone-100 transition-colors"
        >
          {t('rejectAll')}
        </button>
      </div>
    </div>
  );
}
