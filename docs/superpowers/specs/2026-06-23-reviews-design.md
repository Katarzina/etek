# Reviews Feature Design

## Overview

Add a reviews/testimonials section to the E-Tek Group website. Clients submit reviews via a form; the owner approves them via an admin panel before they appear publicly. A "Leave a review on Google" button links to the company's Google Business Profile.

## Database

**Provider:** Neon Postgres (free tier, connected via Vercel Marketplace)

**Table: `reviews`**

| Column       | Type        | Notes                        |
|-------------|-------------|------------------------------|
| id          | SERIAL PK   |                              |
| name        | TEXT        | Reviewer's name              |
| text        | TEXT        | Review body                  |
| rating      | INTEGER     | 1–5                          |
| created_at  | TIMESTAMPTZ | Default NOW()                |
| approved    | BOOLEAN     | Default false                |

## Pages & Components

### `/recenze` (new page, all 4 locales)
- Page hero (title + subtitle)
- Grid of approved reviews (star rating, name, text, date)
- "Leave a review on Google" button → Google Business Profile URL (env var `NEXT_PUBLIC_GOOGLE_REVIEW_URL`)
- Review submission form (name, rating 1–5, text)
- On submit: POST `/api/reviews` → saved as pending → success message shown

### Home page (`/`)
- New `ReviewsPreview` section after `ProjectsPreview`
- Shows 3 most recent approved reviews as cards
- "See all reviews" link → `/recenze`

### `/admin` (new, no locale prefix)
- Login page: single password field → POST `/api/admin/login` → sets `admin_session` cookie (24h, httpOnly)
- Reviews list: pending reviews first, then approved. Each row has "Approve" / "Delete" buttons
- Logout button

### Navigation
- Add "Отзывы / Reviews / Відгуки / Отзывы" to Header nav links (all locales)

## API Routes

| Route                    | Method | Auth     | Action                                  |
|--------------------------|--------|----------|-----------------------------------------|
| `/api/reviews`           | POST   | none     | Submit review (saved as pending)        |
| `/api/admin/login`       | POST   | none     | Verify password → set cookie            |
| `/api/admin/reviews`     | GET    | cookie   | List all reviews                        |
| `/api/admin/reviews/[id]`| PATCH  | cookie   | Approve review (`approved = true`)      |
| `/api/admin/reviews/[id]`| DELETE | cookie   | Delete review                           |

## Data Flow

1. Client fills form on `/recenze` → POST `/api/reviews`
2. Review saved with `approved = false`
3. Resend email sent to `EMAIL_TO` — "New review from [name]"
4. Owner visits `/admin`, enters `ADMIN_PASSWORD`
5. Cookie set, redirected to reviews list
6. Owner clicks "Approve" → PATCH `/api/admin/reviews/[id]`
7. Review appears on `/recenze` and home page

## Admin Authentication

- Password stored in env var `ADMIN_PASSWORD`
- On login: `timingSafeEqual` comparison to prevent timing attacks
- Session cookie: `admin_session`, httpOnly, sameSite=strict, maxAge=86400
- Cookie value: HMAC-signed token using `ADMIN_SECRET` env var
- All `/api/admin/*` routes verify cookie before responding

## i18n

New keys added to `messages/{cs,en,uk,ru}.json` under namespace `reviews`:
- `title`, `subtitle`
- `form.name`, `form.rating`, `form.text`, `form.send`, `form.sending`, `form.success`, `form.error`
- `googleButton`
- `seeAll`
- `preview.title`, `preview.heading`

## Environment Variables

| Variable                      | Purpose                              |
|-------------------------------|--------------------------------------|
| `DATABASE_URL`                | Neon Postgres connection string      |
| `ADMIN_PASSWORD`              | Admin panel password                 |
| `ADMIN_SECRET`                | HMAC signing secret for session      |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | Direct Google review link          |

## Out of Scope

- Multiple admin users
- Email verification for reviewers
- Review editing after submission
- Pagination on `/recenze` (can add later if reviews grow)
