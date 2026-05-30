# Instrukce pro vytvoření Next.js webu stavební firmy

> Verze: 1.1 | Datum: 2026-05-30  
> Deploy: Vercel | Framework: Next.js 14+ (App Router) | CMS: GitHub (JSON + public/images)

---

## 1. Přehled projektu

Vícejazyčný prezentační web pro malou stavební firmu. Inspirace: [kalab.cz](https://www.kalab.cz) — čistý, profesionální design s dominantními fotografiemi projektů.

**Jazyky:** 🇨🇿 Čeština · 🇬🇧 Angličtina · 🇺🇦 Ukrajinština · 🇷🇺 Ruština  
**Stránky:** Domů · O nás · Naše projekty · Certifikáty · Kontakty · Nastavení cookies

---

## 2. Tech stack

| Technologie | Verze | Účel |
|---|---|---|
| Next.js | 14+ | Framework (App Router) |
| TypeScript | 5+ | Typová bezpečnost |
| Tailwind CSS | 3+ | Stylování |
| next-intl | 3+ | Internacionalizace (i18n) |
| yet-another-react-lightbox | latest | Prohlížeč obrázků |
| Framer Motion | 11+ | Animace |
| next-seo | latest | SEO meta tagy |
| sharp | latest | Optimalizace obrázků (Next.js Image) |

---

## 3. Struktura projektu

```
stavebni-firma/
├── app/
│   └── [locale]/
│       ├── layout.tsx                  # Root layout s i18n + cookie banner
│       ├── page.tsx                    # Domovská stránka (hero)
│       ├── o-nas/
│       │   └── page.tsx
│       ├── projekty/
│       │   ├── page.tsx                # Seznam projektů (grid 8 karet)
│       │   └── [slug]/
│       │       └── page.tsx            # Detail projektu + lightbox
│       ├── certifikaty/
│       │   └── page.tsx
│       ├── kontakty/
│       │   └── page.tsx
│       └── cookies/
│           └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  # Navigace + přepínač jazyků
│   │   ├── Footer.tsx
│   │   └── CookieBanner.tsx            # Cookie consent banner (spodní lišta)
│   ├── home/
│   │   ├── HeroSection.tsx             # Fullscreen obrázek domu
│   │   ├── AboutPreview.tsx            # Krátký úvod firmy
│   │   ├── ProjectsPreview.tsx         # 3 nejnovější projekty
│   │   └── StatsBar.tsx                # Čísla: roky praxe, projekty, m²
│   ├── projects/
│   │   ├── ProjectCard.tsx             # Karta projektu v gridu
│   │   ├── ProjectGrid.tsx             # Grid 8 karet
│   │   ├── ProjectGallery.tsx          # Galerie 5–6 obrázků
│   │   └── Lightbox.tsx                # Obal nad yet-another-react-lightbox
│   ├── certificates/
│   │   └── CertificateCard.tsx
│   └── ui/
│       ├── LanguageSwitcher.tsx
│       ├── SectionTitle.tsx
│       └── ContactForm.tsx
│
├── data/
│   ├── projects.json                   # Seznam 8 projektů
│   └── certificates.json
│
├── messages/                           # Překlady
│   ├── cs.json
│   ├── en.json
│   ├── uk.json
│   └── ru.json
│
├── public/
│   └── images/
│       ├── hero/
│       │   └── hero-house.jpg          # Hlavní foto pro hero sekci
│       ├── projects/
│       │   ├── project-1/
│       │   │   ├── cover.jpg
│       │   │   ├── 01.jpg
│       │   │   ├── 02.jpg
│       │   │   ├── 03.jpg
│       │   │   ├── 04.jpg
│       │   │   └── 05.jpg
│       │   ├── project-2/ ... (stejná struktura)
│       │   └── project-8/
│       └── certificates/
│           ├── cert-1.jpg
│           └── cert-2.jpg
│
├── lib/
│   ├── getProjects.ts                  # Helper pro načtení projects.json
│   └── getCertificates.ts
│
├── i18n.ts                             # next-intl konfigurace
├── middleware.ts                       # Locale routing middleware
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 4. Instalace závislostí

```bash
npx create-next-app@latest stavebni-firma \
  --typescript --tailwind --eslint --app --src-dir no

cd stavebni-firma

npm install next-intl framer-motion yet-another-react-lightbox sharp
npm install -D @types/node
```

---

## 5. Konfigurace i18n (next-intl)

### `i18n.ts`
```typescript
import { getRequestConfig } from 'next-intl/server';

export const locales = ['cs', 'en', 'uk', 'ru'] as const;
export const defaultLocale = 'cs' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
```

### `middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### `next.config.ts`
```typescript
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    // Pro placeholder obrázky z externích zdrojů (dočasně)
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default withNextIntl(nextConfig);
```

---

## 6. Datová struktura

### `data/projects.json`

```json
[
  {
    "id": "projekt-rodinny-dum-brno",
    "slug": "rodinny-dum-brno",
    "year": 2023,
    "category": "residential",
    "location": "Brno, CZ",
    "area": 320,
    "cover": "/images/projects/project-1/cover.jpg",
    "images": [
      "/images/projects/project-1/01.jpg",
      "/images/projects/project-1/02.jpg",
      "/images/projects/project-1/03.jpg",
      "/images/projects/project-1/04.jpg",
      "/images/projects/project-1/05.jpg"
    ],
    "translations": {
      "cs": {
        "title": "Rodinný dům Brno-Bystrc",
        "description": "Novostavba rodinného domu s garáží a zahradou. Moderní architektura s důrazem na energetickou účinnost.",
        "details": "Dřevostavba s pasivním standardem, tepelné čerpadlo, fotovoltaika."
      },
      "en": {
        "title": "Family House Brno-Bystrc",
        "description": "New family house with garage and garden. Modern architecture with emphasis on energy efficiency.",
        "details": "Timber construction with passive standard, heat pump, photovoltaics."
      },
      "uk": {
        "title": "Приватний будинок Брно-Бистрц",
        "description": "Нова будівля приватного будинку з гаражем і садом. Сучасна архітектура з акцентом на енергоефективність.",
        "details": "Дерев'яна конструкція пасивного стандарту, тепловий насос, фотовольтаїка."
      },
      "ru": {
        "title": "Частный дом Брно-Бистрц",
        "description": "Новостройка частного дома с гаражом и садом. Современная архитектура с акцентом на энергоэффективность.",
        "details": "Деревянная конструкция пассивного стандарта, тепловой насос, фотовольтаика."
      }
    }
  },
  {
    "id": "projekt-bytovy-dum-praha",
    "slug": "bytovy-dum-praha",
    "year": 2023,
    "category": "residential",
    "location": "Praha, CZ",
    "area": 1200,
    "cover": "/images/projects/project-2/cover.jpg",
    "images": [
      "/images/projects/project-2/01.jpg",
      "/images/projects/project-2/02.jpg",
      "/images/projects/project-2/03.jpg",
      "/images/projects/project-2/04.jpg",
      "/images/projects/project-2/05.jpg",
      "/images/projects/project-2/06.jpg"
    ],
    "translations": {
      "cs": { "title": "Bytový dům Praha-Žižkov", "description": "Rekonstrukce bytového domu z roku 1930 s 12 bytovými jednotkami.", "details": "Zateplení fasády, výměna oken, oprava střechy, modernizace elektroinstalace." },
      "en": { "title": "Apartment Building Prague-Žižkov", "description": "Reconstruction of 1930s apartment building with 12 units.", "details": "Facade insulation, window replacement, roof repair, electrical modernization." },
      "uk": { "title": "Багатоквартирний будинок Прага-Жижков", "description": "Реконструкція будинку 1930-х років з 12 квартирами.", "details": "Утеплення фасаду, заміна вікон, ремонт даху, модернізація електрики." },
      "ru": { "title": "Многоквартирный дом Прага-Жижков", "description": "Реконструкция дома 1930-х годов с 12 квартирами.", "details": "Утепление фасада, замена окон, ремонт крыши, модернизация электрики." }
    }
  },
  {
    "id": "projekt-administrativa-olomouc",
    "slug": "administrativa-olomouc",
    "year": 2022,
    "category": "commercial",
    "location": "Olomouc, CZ",
    "area": 850,
    "cover": "/images/projects/project-3/cover.jpg",
    "images": [
      "/images/projects/project-3/01.jpg",
      "/images/projects/project-3/02.jpg",
      "/images/projects/project-3/03.jpg",
      "/images/projects/project-3/04.jpg",
      "/images/projects/project-3/05.jpg"
    ],
    "translations": {
      "cs": { "title": "Administrativní budova Olomouc", "description": "Výstavba moderního administrativního centra s otevřenými kancelářemi.", "details": "Ocelová konstrukce, zelená střecha, BREEAM certifikace." },
      "en": { "title": "Office Building Olomouc", "description": "Construction of modern office center with open-plan offices.", "details": "Steel structure, green roof, BREEAM certification." },
      "uk": { "title": "Адміністративна будівля Оломоуц", "description": "Будівництво сучасного офісного центру з відкритими офісами.", "details": "Сталева конструкція, зелений дах, сертифікація BREEAM." },
      "ru": { "title": "Административное здание Оломоуц", "description": "Строительство современного офисного центра с открытыми офисами.", "details": "Стальная конструкция, зелёная крыша, сертификация BREEAM." }
    }
  },
  {
    "id": "projekt-vila-jihlava",
    "slug": "vila-jihlava",
    "year": 2022,
    "category": "residential",
    "location": "Jihlava, CZ",
    "area": 450,
    "cover": "/images/projects/project-4/cover.jpg",
    "images": [
      "/images/projects/project-4/01.jpg",
      "/images/projects/project-4/02.jpg",
      "/images/projects/project-4/03.jpg",
      "/images/projects/project-4/04.jpg",
      "/images/projects/project-4/05.jpg"
    ],
    "translations": {
      "cs": { "title": "Luxusní vila Jihlava", "description": "Nadstandardní rodinná vila s bazénem a wellness zónou.", "details": "Betonová monolitická konstrukce, podlahové vytápění, smart home systém." },
      "en": { "title": "Luxury Villa Jihlava", "description": "Premium family villa with swimming pool and wellness zone.", "details": "Monolithic concrete construction, underfloor heating, smart home system." },
      "uk": { "title": "Розкішна вілла Їглава", "description": "Преміальна сімейна вілла з басейном і велнес-зоною.", "details": "Монолітна бетонна конструкція, тепла підлога, система смарт-хоум." },
      "ru": { "title": "Элитная вилла Йиглава", "description": "Премиальная семейная вилла с бассейном и велнес-зоной.", "details": "Монолитная бетонная конструкция, тёплые полы, система умного дома." }
    }
  },
  {
    "id": "projekt-prumyslova-hala-zlin",
    "slug": "prumyslova-hala-zlin",
    "year": 2021,
    "category": "industrial",
    "location": "Zlín, CZ",
    "area": 3500,
    "cover": "/images/projects/project-5/cover.jpg",
    "images": [
      "/images/projects/project-5/01.jpg",
      "/images/projects/project-5/02.jpg",
      "/images/projects/project-5/03.jpg",
      "/images/projects/project-5/04.jpg",
      "/images/projects/project-5/05.jpg",
      "/images/projects/project-5/06.jpg"
    ],
    "translations": {
      "cs": { "title": "Průmyslová hala Zlín", "description": "Výstavba výrobní a skladovací haly pro logistickou společnost.", "details": "Prefabrikovaná ocelová konstrukce, jeřábová dráha 5t, průmyslová podlaha." },
      "en": { "title": "Industrial Hall Zlín", "description": "Construction of production and storage hall for logistics company.", "details": "Prefabricated steel structure, 5t crane runway, industrial floor." },
      "uk": { "title": "Промисловий цех Злін", "description": "Будівництво виробничо-складського цеху для логістичної компанії.", "details": "Збірна сталева конструкція, кранова колія 5т, промислова підлога." },
      "ru": { "title": "Промышленный цех Злин", "description": "Строительство производственно-складского цеха для логистической компании.", "details": "Сборная стальная конструкция, крановый путь 5т, промышленный пол." }
    }
  },
  {
    "id": "projekt-rekonstrukce-skoly-brno",
    "slug": "rekonstrukce-skoly-brno",
    "year": 2021,
    "category": "public",
    "location": "Brno, CZ",
    "area": 2100,
    "cover": "/images/projects/project-6/cover.jpg",
    "images": [
      "/images/projects/project-6/01.jpg",
      "/images/projects/project-6/02.jpg",
      "/images/projects/project-6/03.jpg",
      "/images/projects/project-6/04.jpg",
      "/images/projects/project-6/05.jpg"
    ],
    "translations": {
      "cs": { "title": "Rekonstrukce základní školy Brno", "description": "Celková rekonstrukce budovy základní školy včetně tělocvičny.", "details": "Výměna střechy, zateplení, rekonstrukce sociálního zařízení, nová tělocvična." },
      "en": { "title": "Primary School Reconstruction Brno", "description": "Complete reconstruction of primary school building including gym.", "details": "Roof replacement, insulation, bathroom renovation, new gymnasium." },
      "uk": { "title": "Реконструкція початкової школи Брно", "description": "Повна реконструкція будівлі початкової школи включно зі спортзалом.", "details": "Заміна даху, утеплення, реконструкція санвузлів, новий спортзал." },
      "ru": { "title": "Реконструкция начальной школы Брно", "description": "Полная реконструкция здания начальной школы со спортзалом.", "details": "Замена кровли, утепление, реконструкция санузлов, новый спортзал." }
    }
  },
  {
    "id": "projekt-restaurace-valtice",
    "slug": "restaurace-valtice",
    "year": 2020,
    "category": "commercial",
    "location": "Valtice, CZ",
    "area": 380,
    "cover": "/images/projects/project-7/cover.jpg",
    "images": [
      "/images/projects/project-7/01.jpg",
      "/images/projects/project-7/02.jpg",
      "/images/projects/project-7/03.jpg",
      "/images/projects/project-7/04.jpg",
      "/images/projects/project-7/05.jpg"
    ],
    "translations": {
      "cs": { "title": "Restaurace a penzion Valtice", "description": "Novostavba restaurace s penziónm ve vinařské oblasti jižní Moravy.", "details": "Kombinace tradiční a moderní architektury, vinotéka, terasa s výhledem." },
      "en": { "title": "Restaurant and Guesthouse Valtice", "description": "New restaurant and guesthouse in the wine region of South Moravia.", "details": "Traditional and modern architecture blend, wine cellar, terrace with view." },
      "uk": { "title": "Ресторан і пансіон Валтіце", "description": "Нова будівля ресторану з пансіоном у виноробному регіоні Південної Моравії.", "details": "Поєднання традиційної та сучасної архітектури, винний льох, тераса з видом." },
      "ru": { "title": "Ресторан и пансион Валтице", "description": "Новое здание ресторана с пансионом в винодельческом регионе Южной Моравии.", "details": "Сочетание традиционной и современной архитектуры, винный погреб, терраса с видом." }
    }
  },
  {
    "id": "projekt-rodinny-dum-mikulov",
    "slug": "rodinny-dum-mikulov",
    "year": 2020,
    "category": "residential",
    "location": "Mikulov, CZ",
    "area": 280,
    "cover": "/images/projects/project-8/cover.jpg",
    "images": [
      "/images/projects/project-8/01.jpg",
      "/images/projects/project-8/02.jpg",
      "/images/projects/project-8/03.jpg",
      "/images/projects/project-8/04.jpg",
      "/images/projects/project-8/05.jpg",
      "/images/projects/project-8/06.jpg"
    ],
    "translations": {
      "cs": { "title": "Rodinný dům Mikulov", "description": "Moderní rodinný dům s výhledem na Mikulovský zámek.", "details": "Nízkoenergetický standard, rekuperace vzduchu, plocha střecha s terasou." },
      "en": { "title": "Family House Mikulov", "description": "Modern family house with view of Mikulov Castle.", "details": "Low-energy standard, air recovery, flat roof with terrace." },
      "uk": { "title": "Приватний будинок Мікулов", "description": "Сучасний приватний будинок з видом на Мікуловський замок.", "details": "Низькоенергетичний стандарт, рекуперація повітря, плоский дах з терасою." },
      "ru": { "title": "Частный дом Микулов", "description": "Современный частный дом с видом на Микуловский замок.", "details": "Низкоэнергетический стандарт, рекуперация воздуха, плоская кровля с террасой." }
    }
  }
]
```

---

## 7. Překlady (messages/*.json)

### Struktura pro `cs.json` (stejná struktura pro en/uk/ru):

```json
{
  "nav": {
    "home": "Domů",
    "about": "O nás",
    "projects": "Naše projekty",
    "certificates": "Certifikáty",
    "contact": "Kontakty"
  },
  "home": {
    "hero": {
      "tagline": "Stavíme s vášní od roku 2005",
      "subtitle": "Kvalitní stavby pro rodiny, firmy i obce",
      "ctaProjects": "Naše projekty",
      "ctaContact": "Kontaktujte nás"
    },
    "stats": {
      "years": "let zkušeností",
      "projects": "dokončených projektů",
      "area": "m² postaveno"
    },
    "aboutPreview": {
      "title": "Kdo jsme",
      "text": "Jsme malá stavební firma s velkým srdcem. Od roku 2005 stavíme rodinné domy, bytové domy, komerční a průmyslové objekty po celé České republice. Zakládáme si na kvalitě, přesnosti a férovém jednání."
    },
    "projectsPreview": {
      "title": "Vybrané projekty",
      "seeAll": "Zobrazit všechny projekty"
    }
  },
  "about": {
    "title": "O nás",
    "subtitle": "Váš spolehlivý stavební partner",
    "story": "Firma byla založena v roce 2005 jedním stavebním mistrem s vizí...",
    "values": {
      "title": "Naše hodnoty",
      "quality": "Kvalita",
      "qualityDesc": "Používáme pouze certifikované materiály a ověřené postupy.",
      "reliability": "Spolehlivost",
      "reliabilityDesc": "Dodržujeme termíny a dohodnutý rozpočet.",
      "transparency": "Transparentnost",
      "transparencyDesc": "Jasná komunikace a férová cena bez skrytých poplatků."
    },
    "team": {
      "title": "Náš tým"
    }
  },
  "projects": {
    "title": "Naše projekty",
    "subtitle": "Přehled realizovaných staveb",
    "filters": {
      "all": "Vše",
      "residential": "Rodinné domy",
      "commercial": "Komerční",
      "industrial": "Průmyslové",
      "public": "Veřejné"
    },
    "area": "Plocha",
    "year": "Rok",
    "location": "Místo",
    "details": "Podrobnosti",
    "backToProjects": "Zpět na projekty",
    "gallery": "Galerie",
    "projectDetails": "Popis projektu"
  },
  "certificates": {
    "title": "Certifikáty",
    "subtitle": "Naše odborné způsobilosti a ocenění"
  },
  "contact": {
    "title": "Kontakty",
    "subtitle": "Ozvěte se nám",
    "address": "Adresa",
    "phone": "Telefon",
    "email": "Email",
    "form": {
      "name": "Jméno a příjmení",
      "email": "E-mail",
      "phone": "Telefon (volitelně)",
      "message": "Zpráva",
      "send": "Odeslat zprávu",
      "sending": "Odesílání...",
      "success": "Zpráva byla odeslána. Brzy se ozveme!",
      "error": "Nepodařilo se odeslat zprávu. Zkuste to prosím znovu."
    },
    "openingHours": "Pracovní doba",
    "hours": "Po–Pá: 7:00–17:00"
  },
  "cookies": {
    "title": "Nastavení cookies",
    "intro": "Tento web používá cookies ke zlepšení vašeho zážitku.",
    "necessary": {
      "title": "Nezbytné cookies",
      "desc": "Tyto cookies jsou nutné pro správnou funkci webu a nelze je vypnout."
    },
    "analytics": {
      "title": "Analytické cookies",
      "desc": "Pomáhají nám pochopit, jak návštěvníci web používají (Google Analytics)."
    },
    "marketing": {
      "title": "Marketingové cookies",
      "desc": "Používají se pro zobrazení relevantních reklam."
    },
    "saveSettings": "Uložit nastavení",
    "acceptAll": "Přijmout vše",
    "rejectAll": "Odmítnout vše"
  },
  "cookieBanner": {
    "text": "Tento web používá cookies. Podrobnosti v",
    "link": "nastavení cookies",
    "accept": "Přijmout vše",
    "settings": "Nastavení"
  },
  "footer": {
    "rights": "Všechna práva vyhrazena",
    "cookieSettings": "Nastavení cookies",
    "privacy": "Ochrana osobních údajů"
  },
  "meta": {
    "home": {
      "title": "Stavební firma | Kvalitní stavby od 2005",
      "description": "Profesionální stavební firma v České republice. Rodinné domy, bytové domy, komerční stavby. Kontaktujte nás ještě dnes."
    },
    "about": {
      "title": "O nás | Stavební firma",
      "description": "Zjistěte více o naší stavební firmě, historii a hodnotách. Stavíme s vášní od roku 2005."
    },
    "projects": {
      "title": "Naše projekty | Stavební firma",
      "description": "Prohlédněte si portfolio realizovaných projektů – rodinné domy, bytové domy, komerční a průmyslové stavby."
    },
    "certificates": {
      "title": "Certifikáty | Stavební firma",
      "description": "Naše odborné certifikáty a způsobilosti potvrzují nejvyšší standardy kvality."
    },
    "contact": {
      "title": "Kontakty | Stavební firma",
      "description": "Kontaktujte nás pro nezávaznou konzultaci. Rádi odpovíme na vaše otázky."
    }
  }
}
```

> **Poznámka:** Soubory `en.json`, `uk.json` a `ru.json` mají identickou strukturu klíčů, pouze přeložené hodnoty.

---

## 8. Popis stránek

### 8.1 Domovská stránka (`/[locale]/page.tsx`)

**Sekce (shora dolů):**

1. **HeroSection** — fullscreen (100vh) obrázek moderního domu s tmavým overlayem.  
   - Nadpis + podnadpis bílým textem uprostřed nebo vlevo dole  
   - Dvě CTA tlačítka: "Naše projekty" + "Kontaktujte nás"  
   - Jemná fade-in animace (Framer Motion)  
   - Dočasný obrázek: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920`

2. **StatsBar** — tmavý pruh se 3 čísly: "21 let zkušeností | 8+ projektů | 8 850 m² postaveno"  
   - Čísla se animují při scroll (counter up)

3. **AboutPreview** — 2 sloupce: text vlevo + obrázek vpravo  
   - Krátký popis firmy (2–3 věty) + tlačítko "Více o nás"

4. **ProjectsPreview** — grid 3 nejnovějších projektů (karty)  
   - Tlačítko "Zobrazit všechny projekty"

5. **Footer**

---

### 8.2 O nás (`/[locale]/o-nas/page.tsx`)

**Sekce:**
1. **Page hero** — obrázek stavby s nadpisem "O nás" přes overlay (výška 40vh)
2. **Příběh firmy** — text + foto týmu (2 sloupce)
3. **Naše hodnoty** — 3 ikony s textem (Kvalita / Spolehlivost / Transparentnost)
4. **Tým** — 2–3 karty zaměstnanců (foto + jméno + pozice) — dočasná data

---

### 8.3 Naše projekty (`/[locale]/projekty/page.tsx`)

**Sekce:**
1. **Page hero** — nadpis "Naše projekty" (40vh)
2. **Filtry** — tlačítka: Vše / Rodinné domy / Komerční / Průmyslové / Veřejné  
   - Filtry fungují client-side (useState), bez reload stránky
3. **ProjectGrid** — responzivní grid: 1 sloupec (mobile) → 2 (tablet) → 3 (desktop)  
   - 8 karet projektů

**ProjectCard obsahuje:**
- Obrázek (cover.jpg) s hover zoom efektem
- Kategorie badge
- Název projektu (přeložený)
- Rok + lokalita
- Plocha v m²
- Tlačítko "Detail"

---

### 8.4 Detail projektu (`/[locale]/projekty/[slug]/page.tsx`)

**Sekce:**
1. **Breadcrumbs** — Domů > Projekty > [Název projektu]
2. **Hlavní info** — název, rok, lokalita, plocha, kategorie, popis
3. **Galerie** — hlavní obrázek velký + thumbnaily pod ním (5–6 fotek)  
   - Kliknutím na thumbnail se otevře lightbox
4. **Lightbox** — yet-another-react-lightbox s šipkami pro listování

**SEO (generateMetadata):**
```typescript
export async function generateMetadata({ params }: { params: { slug: string; locale: string } }) {
  const project = getProjectBySlug(params.slug);
  return {
    title: `${project.translations[params.locale].title} | Stavební firma`,
    description: project.translations[params.locale].description,
    openGraph: {
      images: [project.cover],
    },
  };
}
```

**Static paths (generateStaticParams):**
```typescript
export async function generateStaticParams() {
  const projects = await getProjects();
  const locales = ['cs', 'en', 'uk', 'ru'];
  return projects.flatMap(p => locales.map(locale => ({ locale, slug: p.slug })));
}
```

---

### 8.5 Certifikáty (`/[locale]/certifikaty/page.tsx`)

**Sekce:**
1. **Page hero** — nadpis "Certifikáty"
2. **Grid certifikátů** — 2–3 sloupce, karty s obrázkem certifikátu + popisem  
   - Dočasné certifikáty: ISO 9001, ISO 14001, ČKAIT oprávnění, SolidBuild certifikát
3. Každý certifikát kliknutelný (lightbox nebo new tab)

---

### 8.6 Kontakty (`/[locale]/kontakty/page.tsx`)

**Layout:** 2 sloupce — kontaktní info vlevo, formulář vpravo

**Kontaktní info:**
```
Stavební firma s.r.o.
Hlavní 123, 602 00 Brno
+420 731 123 456
info@stavebni-firma.cz
Po–Pá: 7:00–17:00
```

**Google Maps embed** (volitelně — přidat iframe s mapou)

**Formulář** (client component):
- Jméno, Email, Telefon (volitelné), Zpráva
- Validace na frontendu (required + email format)
- `action` → Next.js Server Action nebo `/api/contact` route
- Po odeslání zobrazit success/error zprávu

---

### 8.7 Nastavení cookies (`/[locale]/cookies/page.tsx`)

**Komponenty:**
```typescript
// Tři sekce s toggle přepínači:
// 1. Nezbytné cookies — disabled toggle (vždy ON)
// 2. Analytické cookies — zapnout/vypnout
// 3. Marketingové cookies — zapnout/vypnout

// State se ukládá do localStorage:
// { necessary: true, analytics: boolean, marketing: boolean }
```

**Cookie Banner** (zobrazí se při první návštěvě):
```
"Tento web používá cookies. [Nastavení] [Přijmout vše]"
```
Banner se skryje po uložení preferencí. Uloží se do `localStorage` jako `cookie_consent`.

---

## 9. SEO implementace

### Metadata v `app/[locale]/layout.tsx`:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://vase-domena.cz'),
  alternates: {
    languages: {
      'cs': '/cs',
      'en': '/en',
      'uk': '/uk',
      'ru': '/ru',
    },
  },
};
```

### `hreflang` tagy — automaticky přes next-intl + alternates.

### `sitemap.ts` (`app/sitemap.ts`):
```typescript
import { MetadataRoute } from 'next';
import projects from '@/data/projects.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['cs', 'en', 'uk', 'ru'];
  const baseUrl = 'https://vase-domena.cz';

  const staticPages = ['', '/o-nas', '/projekty', '/certifikaty', '/kontakty'];
  const staticRoutes = locales.flatMap(locale =>
    staticPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  const projectRoutes = locales.flatMap(locale =>
    projects.map(p => ({
      url: `${baseUrl}/${locale}/projekty/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...projectRoutes];
}
```

### `robots.ts` (`app/robots.ts`):
```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://vase-domena.cz/sitemap.xml',
  };
}
```

---

## 10. Tailwind — doporučená paleta barev

Inspirace kalab.cz: neutrální, elegantní, profesionální.

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        50:  '#f5f3f0',
        100: '#e8e3db',
        200: '#d4cab8',
        300: '#b9a98e',
        400: '#a08b6c',
        500: '#8b7355',   // primary — teplá béžová/hnědá
        600: '#7a6348',
        700: '#64503b',
        800: '#52412f',
        900: '#453625',
      },
      dark: '#1a1a1a',
      light: '#f9f8f6',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Playfair Display', 'serif'],  // pro nadpisy
    },
  },
}
```

**Google Fonts** — přidat do `layout.tsx`:
```typescript
import { Inter, Playfair_Display } from 'next/font/google';
const inter = Inter({ subsets: ['latin', 'latin-ext'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
```

---

## 11. Dočasné placeholder obrázky

Dokud nejsou k dispozici skutečné fotografie, použijte tyto Unsplash zdroje:

| Použití | URL |
|---|---|
| Hero sekce | `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80` |
| Projekt — rodinný dům | `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80` |
| Projekt — bytový dům | `https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80` |
| Projekt — kancelář | `https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80` |
| Projekt — průmysl | `https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80` |
| Certifikát | `https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=600&q=80` |
| Tým — foto osoby | `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80` |

> **Výměna za skutečné fotografie:** Nahradit URL v `data/projects.json` za cesty `/images/projects/project-X/...` a vložit soubory do `public/images/`.

---

## 12. Komponenta Lightbox

```typescript
// components/projects/Lightbox.tsx
'use client';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface Props {
  images: string[];
  open: boolean;
  index: number;
  onClose: () => void;
}

export function ProjectLightbox({ images, open, index, onClose }: Props) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={images.map(src => ({ src }))}
      plugins={[Zoom, Thumbnails]}
    />
  );
}
```

---

## 13. Header a přepínač jazyků

```typescript
// components/layout/LanguageSwitcher.tsx
'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const LOCALES = [
  { code: 'cs', label: 'CZ', flag: '🇨🇿' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'uk', label: 'UA', flag: '🇺🇦' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // Nahradit aktuální locale v URL
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex gap-1">
      {LOCALES.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={`px-2 py-1 text-sm rounded transition ${
            locale === code
              ? 'bg-brand-500 text-white'
              : 'text-gray-600 hover:text-brand-500'
          }`}
        >
          <span className="mr-1">{flag}</span>{label}
        </button>
      ))}
    </div>
  );
}
```

---

## 14. GitHub jako CMS — jak to funguje

Celý obsah webu (texty, projekty, obrázky) žije přímo v GitHub repozitáři.  
Přidání nového projektu = push do GitHubu → Vercel automaticky přebuiluje a nasadí web. **Žádný admin panel není potřeba.**

```
GitHub repozitář
    ├── data/projects.json     ← přidat řádek = nový projekt
    └── public/images/         ← nahrát fotky = nové fotografie
              ↓  push
         Vercel detekuje změnu
              ↓  ~1–2 minuty
         Web je aktuální na produkci
```

---

## 15. Jak přidat nový projekt (krok za krokem)

### Možnost A — přes GitHub web (bez nutnosti mít kód lokálně)

**Krok 1: Nahrajte fotografie**

1. Otevřete repozitář na github.com
2. Přejděte do `public/images/projects/`
3. Klikněte **"Add file" → "Upload files"**
4. Vytvořte složku `project-9/` — při nahrávání napište cestu: `project-9/cover.jpg`
5. Nahrajte soubory: `cover.jpg`, `01.jpg`, `02.jpg`, `03.jpg`, `04.jpg`, `05.jpg`
6. Klikněte **"Commit changes"**

> **Doporučené rozměry fotografií:**
> - `cover.jpg` — 1200×800 px, max 300 KB (pro kartu v gridu)
> - `01.jpg` až `06.jpg` — 1600×1067 px, max 500 KB (pro lightbox)
> - Formát: JPEG, kvalita 80–85 %

**Krok 2: Přidejte projekt do JSON**

1. Otevřete soubor `data/projects.json`
2. Klikněte na tužku (Edit)
3. Přidejte nový objekt do pole — zkopírujte strukturu existujícího projektu:

```json
{
  "id": "projekt-rodinny-dum-ostrava",
  "slug": "rodinny-dum-ostrava",
  "year": 2024,
  "category": "residential",
  "location": "Ostrava, CZ",
  "area": 310,
  "cover": "/images/projects/project-9/cover.jpg",
  "images": [
    "/images/projects/project-9/01.jpg",
    "/images/projects/project-9/02.jpg",
    "/images/projects/project-9/03.jpg",
    "/images/projects/project-9/04.jpg",
    "/images/projects/project-9/05.jpg"
  ],
  "translations": {
    "cs": {
      "title": "Rodinný dům Ostrava",
      "description": "Popis projektu česky...",
      "details": "Technické detaily česky..."
    },
    "en": {
      "title": "Family House Ostrava",
      "description": "Project description in English...",
      "details": "Technical details in English..."
    },
    "uk": {
      "title": "Приватний будинок Острава",
      "description": "Опис проекту українською...",
      "details": "Технічні деталі..."
    },
    "ru": {
      "title": "Частный дом Острава",
      "description": "Описание проекта на русском...",
      "details": "Технические детали..."
    }
  }
}
```

4. Klikněte **"Commit changes"**
5. Vercel automaticky spustí build — za 1–2 minuty je projekt live

---

### Možnost B — lokálně přes terminál (pro vývojáře)

```bash
# 1. Přidat fotky
cp ~/Downloads/nove-fotky/* public/images/projects/project-9/

# 2. Upravit JSON
code data/projects.json   # nebo jakýkoliv editor

# 3. Pushovat na GitHub
git add public/images/projects/project-9/
git add data/projects.json
git commit -m "feat: přidat projekt Rodinný dům Ostrava"
git push origin main
# → Vercel automaticky nasadí
```

---

### Kategorie projektů (hodnoty pro pole `category`)

| Hodnota | Zobrazí se jako (CS) |
|---|---|
| `residential` | Rodinné domy |
| `commercial` | Komerční |
| `industrial` | Průmyslové |
| `public` | Veřejné |

---

### Pravidla pro `slug`

- Pouze malá písmena, číslice a pomlčky
- Bez diakritiky: `č→c`, `š→s`, `ž→z`, `ř→r`, `ě→e`, `ů→u`
- Unikátní — nesmí se opakovat
- Příklady: `rodinny-dum-brno`, `bytovy-dum-praha`, `administrativa-olomouc`

---

## 16. Deploy na Vercel — první nastavení

1. Vytvořit nový GitHub repozitář a pushovat kód
2. Na [vercel.com](https://vercel.com) → **"New Project"** → importovat z GitHubu
3. Framework: **Next.js** (auto-detekce)
4. Build command: `npm run build` (výchozí)
5. Output directory: `.next` (výchozí)
6. Přidat env proměnné (viz níže)
7. Nastavit vlastní doménu: Vercel Settings → Domains

**`.env.local` (lokálně) + Vercel Environment Variables (produkce):**
```env
NEXT_PUBLIC_SITE_URL=https://vase-domena.cz
# Pro kontaktní formulář — Resend (zdarma 100 emailů/den)
EMAIL_FROM=noreply@vase-domena.cz
EMAIL_TO=info@stavebni-firma.cz
RESEND_API_KEY=re_...
```

> **Automatický redeploy:** Každý push do větve `main` spustí nový build na Vercelu.  
> Průměrná doba buildu: **1–2 minuty**.

---

## 17. Checklist před spuštěním

- [ ] Vyměnit placeholder obrázky za skutečné fotografie v `public/images/`
- [ ] Aktualizovat texty v `messages/cs.json` (a ostatních jazycích)
- [ ] Vyplnit reálné kontaktní údaje (adresa, telefon, email)
- [ ] Nastavit funkční kontaktní formulář (Resend / Nodemailer)
- [ ] Přidat Google Analytics ID (pokud se používá)
- [ ] Nastavit vlastní doménu na Vercel
- [ ] Zkontrolovat SEO meta tagy pro každou stránku
- [ ] Otestovat responzivitu na mobilních zařízeních
- [ ] Ověřit správnou funkci přepínače jazyků
- [ ] Otestovat lightbox na detailu projektu
- [ ] Ověřit cookie banner a stránku nastavení cookies
- [ ] Spustit Lighthouse audit (cíl: Performance 90+, SEO 100)

---

## 18. Doporučené rozšíření (volitelně)

- **Google Analytics 4** — přidat `@next/third-parties` pro GA4
- **Kontaktní formulář** — použít [Resend](https://resend.com) API (zdarma 100 emailů/den)
- **Animace při scrollu** — Framer Motion `whileInView` na sekce
- **Progressive Web App** — přidat `next-pwa` pro offline podporu
- **Structured Data (JSON-LD)** — přidat schema.org pro LocalBusiness a projekty

---

*Instrukce vytvořena: 2026-05-28 | Aktualizována: 2026-05-30 | Projekt: Stavební firma web | Next.js 14 + Vercel + GitHub CMS*
