# ShopSalida — Project Context

> Salida, CO shopping directory. Monorepo: Next.js 16 web + Expo mobile + shared packages.

## Overview

| | |
|---|---|
| GitHub | `Trace9095/shopsalida` |
| Vercel Slug | `shopsalida` |
| Vercel URL | https://shopsalida.vercel.app |
| Production domain | https://shopsalida.com (DNS not yet pointed) |
| Admin | `CEO@epicai.ai` / `Trace87223!` |
| Neon DB | **NOT YET CREATED** — see setup below |

## Monorepo Structure

```
shopsalida/
├── apps/web/           ← Next.js 16, App Router
│   ├── src/app/
│   │   ├── (site)/    ← Public pages (homepage, directory, blog, pricing, claim)
│   │   ├── admin/     ← Admin dashboard (login, shops, claims, blog)
│   │   ├── api/       ← Route handlers
│   │   └── dashboard/ ← User dashboard
│   ├── src/db/schema.ts
│   ├── src/lib/       ← auth.ts, db.ts, stripe.ts, resend.ts
│   └── scripts/seed.ts ← Seeds admin user
├── apps/mobile/        ← Expo Router
└── packages/shared/    ← Shared types/constants
```

## Tech Stack

- **Framework:** Next.js 16.1.6, Turbopack
- **DB:** Drizzle ORM + `@neondatabase/serverless` (lazy singleton via Proxy)
- **Auth:** Resend magic links + jose JWT + httpOnly cookies
- **Payments:** Stripe subscriptions — Premium $99/mo, Sponsored $199/mo
- **Email:** Resend API
- **Mobile:** Expo SDK 53, Expo Router, `@expo/vector-icons` Ionicons

## Brand / Design

- Primary: violet `#7C3AED`
- Teal: `#2DD4BF`
- Background: `#0A0A0F`
- No Epic AI branding visitor-facing

## Tiers

| Tier | Price | Features |
|------|-------|---------|
| Free | $0 | Basic listing, address/phone/website |
| Premium | $99/mo | Featured badge, priority position |
| Sponsored | $199/mo | Top position, homepage feature, teal badge |

## Env Vars Required

```
DATABASE_URL=          ← Neon PostgreSQL (URGENT — add via Vercel Storage)
JWT_SECRET=            ← Already set on Vercel
RESEND_API_KEY=        ← From resend.com
RESEND_CEO_EMAIL=      ← Already set: CEO@epicai.ai
STRIPE_SECRET_KEY=     ← From Stripe Dashboard
STRIPE_WEBHOOK_SECRET= ← After registering webhook
STRIPE_PRICE_PREMIUM=  ← After creating Stripe product ($99/mo)
STRIPE_PRICE_SPONSORED=← After creating Stripe product ($199/mo)
NEXT_PUBLIC_URL=       ← Already set: https://shopsalida.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= ← From Stripe Dashboard
```

## Setup Checklist (Human Tasks for Trace)

1. **Neon DB**: Vercel Dashboard → shopsalida project → Storage → Create Database → Neon
   - Name: `shopsalida-db`
   - This auto-adds `DATABASE_URL` (with POSTGRES prefix) to env vars
2. **Run DB migration**: `cd apps/web && npx drizzle-kit push`
3. **Seed admin**: `cd apps/web && npx tsx scripts/seed.ts`
4. **Stripe**: Create 2 products in Stripe Dashboard → copy price IDs to env vars
5. **Stripe Webhook**: Register `https://shopsalida.com/api/webhooks/stripe` for 5 events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
6. **DNS**: Point shopsalida.com → Vercel (A: 76.76.21.21, CNAME www: cname.vercel-dns.com)
7. **Add domain in Vercel**: `vercel domains add shopsalida.com --scope team_pGqkBUxWUXiBoZoKYPgweHDl`

## Routes

| Route | Type | Notes |
|-------|------|-------|
| `/` | Dynamic | Homepage with featured shops |
| `/directory` | Dynamic | Full directory, search + category filter |
| `/directory/[slug]` | Dynamic | Shop detail page |
| `/blog` | Dynamic | Blog listing |
| `/blog/[slug]` | Dynamic | Blog post |
| `/pricing` | Static | Tier comparison page |
| `/categories` | Dynamic | Category grid |
| `/claim/[slug]` | Dynamic | Claim a listing (free/paid) |
| `/request-listing` | Static | Request to add new listing |
| `/auth/login` | Static | Magic link email entry |
| `/auth/verify` | Dynamic | Magic link verification |
| `/dashboard` | Dynamic (auth) | User dashboard |
| `/admin/*` | Dynamic (auth) | Admin dashboard |
| `/api/shops` | Dynamic | GET shops with search/filter |
| `/api/shops/[slug]` | Dynamic | GET single shop |
| `/api/checkout` | Dynamic | POST → Stripe checkout session |
| `/api/webhooks/stripe` | Dynamic | Stripe webhook handler |
| `/api/claims` | Dynamic | POST claim request |
| `/api/listings/request` | Dynamic | POST add listing request |

## Key Patterns

- All DB-querying pages use `export const dynamic = 'force-dynamic'`
- Admin layout has `force-dynamic` — covers all `/admin/*` pages
- `requireAdmin()` / `requireUser()` return `null` if no session (don't throw)
- Stripe webhook verifies signature with `STRIPE_WEBHOOK_SECRET`
- Magic links expire in 30 minutes, stored in `magicLinkTokens` table

## Session History

| Session | Date | Work |
|---------|------|------|
| S127 | 2026-03-22 | Full MVP built: 82 files, Gold Standard OG images, mobile, admin, Stripe, deployed to Vercel. TypeScript: 0 errors. |
