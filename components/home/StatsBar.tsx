'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = to / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        setValue(to);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString('cs-CZ')}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const t = useTranslations('home.stats');

  const yearsOfExperience = new Date().getFullYear() - 2010;

  const stats = [
    { value: yearsOfExperience, suffix: '+', label: t('years') },
    { value: 80, suffix: '+', label: t('projects') },
    { value: 8850, suffix: '', label: t('area') },
  ];

  return (
    <section className="bg-stone-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map(({ value, suffix, label }) => (
          <div key={label}>
            <p className="font-heading text-5xl font-semibold mb-2">
              <Counter to={value} suffix={suffix} />
            </p>
            <p className="text-stone-400 text-sm uppercase tracking-widest">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
