# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured.

## What's being built

A multilingual presentation website for a Czech construction company ("stavební firma"). Designed after kalab.cz — clean, professional, photo-dominant. Full spec is in `NEXTJS_PROJECT_INSTRUCTIONS.md`.

**Languages:** Czech (default) · English · Ukrainian · Russian — all via `next-intl`.

**Pages** (under `app/[locale]/`):
- `/` — Home (hero, stats bar, about preview, projects preview)
- `/o-nas` — About
- `/projekty` — Projects grid with client-side category filter
- `/projekty/[slug]` — Project detail with lightbox gallery
- `/certifikaty` — Certificates
- `/kontakty` — Contact form
- `/cookies` — Cookie settings

**Content management:** `data/projects.json` and `data/certificates.json` — pushing to GitHub triggers a Vercel redeploy. No admin panel.

**Deploy:** Vercel. Env vars needed: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`.

## Architecture

```
app/[locale]/         # i18n root — all pages nested here
components/
  layout/             # Header, Footer, CookieBanner
  home/               # HeroSection, StatsBar, AboutPreview, ProjectsPreview
  projects/           # ProjectCard, ProjectGrid, ProjectGallery, Lightbox
  certificates/
  ui/                 # LanguageSwitcher, SectionTitle, ContactForm
data/                 # projects.json, certificates.json (source of truth)
messages/             # cs.json, en.json, uk.json, ru.json (next-intl translations)
lib/                  # getProjects.ts, getCertificates.ts (read JSON data)
public/images/        # hero/, projects/project-N/, certificates/
i18n.ts               # next-intl config — locales: ['cs','en','uk','ru'], default: 'cs'
proxy.ts              # locale routing middleware (see below)
```

## Next.js 16 breaking changes

This project uses **Next.js 16.2.6**, which differs significantly from 14.x. Always read `node_modules/next/dist/docs/` before writing code. Key changes:

### `proxy.ts` replaces `middleware.ts`
The middleware file is renamed. Export a function named `proxy` (not `default` or `middleware`):
```ts
// proxy.ts  ← NOT middleware.ts
export function proxy(request: NextRequest) { ... }
export const config = { matcher: [...] }
```

### `params` is a Promise
Route params must be awaited in pages, layouts, and `generateMetadata`:
```tsx
// pages
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}

// or use the PageProps helper (globally available after next dev/build)
export default async function Page(props: PageProps<'/projekty/[slug]'>) {
  const { slug } = await props.params
}
```

### `generateMetadata` and `generateStaticParams`
Both also receive `params` as a Promise — await them before use.

## i18n pattern (next-intl 4.x)

All pages live under `app/[locale]/`. The `locale` param comes from the dynamic segment. Use server-side translation helpers:

```ts
import { getTranslations } from 'next-intl/server'
const t = await getTranslations('projects')  // keys from messages/cs.json → projects.*
```

For client components use `useTranslations('namespace')`.

The `LanguageSwitcher` replaces `pathname.split('/')[1]` with the new locale and calls `router.push()`.

## Data shape

`data/projects.json` entries have this structure:
```ts
{
  id: string,        // "projekt-rodinny-dum-brno"
  slug: string,      // "rodinny-dum-brno"
  year: number,
  category: "residential" | "commercial" | "industrial" | "public",
  location: string,  // "Brno, CZ"
  area: number,      // m²
  cover: string,     // "/images/projects/project-1/cover.jpg"
  images: string[],  // ["/images/projects/project-1/01.jpg", ...]
  translations: { cs, en, uk, ru: { title, description, details } }
}
```

Project slugs must be lowercase ASCII with hyphens only (strip Czech diacritics: č→c, š→s, ž→z, ř→r, ě→e, ů→u).

## Tailwind 4 + design tokens

Brand color: warm beige/brown (`#8b7355` = brand-500). Fonts: Inter (body), Playfair Display (headings). Placeholder images from Unsplash until real photos are available (URLs in `NEXTJS_PROJECT_INSTRUCTIONS.md` §11).

## Slow client-side navigations

If navigations feel slow after adding `<Suspense>`, export `unstable_instant` from the route and read `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.
