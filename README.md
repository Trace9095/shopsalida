# Shop Salida

Shopping and retail directory for Salida, Colorado — local boutiques, galleries, artisan shops, and unique finds in the heart of the Arkansas Valley.

**Production URL:** [shopsalida.com](https://shopsalida.com)
**Vercel Slug:** `shopsalida`
**GitHub:** [Trace9095/shopsalida](https://github.com/Trace9095/shopsalida)
**GA4:** G-D6RY9RYN3R | Color scheme: Gallery violet/coral

## Tech Stack

- **Web:** Next.js 16 (App Router) | Tailwind CSS v4 | TypeScript
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Analytics:** Vercel Analytics + GA4
- **Monorepo:** Turborepo

## Structure

```
apps/
  web/        — Next.js 16 web app (Vercel root dir)
  mobile/     — Expo mobile app
packages/
  shared/     — Shared types and utilities
```

## Local Development

```bash
npm install
cd apps/web && npx next dev
```

## Deployment

Auto-deploys to Vercel on push to `main`. Vercel root dir: `apps/web`.

## Business Rules

- Business listings: $99/mo minimum — NO free tier
- All businesses verified as real and OPEN before listing
- Real photos only — no stock photos
