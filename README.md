# LaunchForge AI

LaunchForge AI is a polished AI-powered startup launch platform built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Auth.js. Users can answer a guided questionnaire, generate a complete startup launch kit, edit the resulting website, preview it, export a ZIP package, review mock analytics, and follow deploy-ready Vercel instructions.

https://launchforge-ai-nine.vercel.app/

## Features

- Guided startup creation flow with a structured questionnaire
- Mock-safe AI generation service for startup copy, branding, SEO, blog starters, social captions, and business ideas
- Auth.js authentication with protected dashboard routes and admin-only pages
- Prisma schema for users, projects, templates, subscriptions, generations, moderation, and analytics events
- Dashboard with project management, usage stats, plan visibility, and quick actions
- Template marketplace with built-in startup, service, AI, creator, newsletter, agency, student, and e-commerce templates
- Website editor with live preview, save, regenerate, export, and responsive preview toggles
- ZIP export route that packages `index.html`, `styles.css`, and `README.txt`
- Stripe-ready billing architecture with placeholder checkout and webhook routes
- Vercel deployment guidance and placeholder integration routes
- Admin console for users, projects, subscriptions, moderation, revenue, and platform metrics

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth credentials flow
- JSZip
- Zod

## Folder Structure

```text
app/
  api/
  admin/
  dashboard/
  login/
  pricing/
  signup/
components/
  admin/
  dashboard/
  editor/
  marketing/
  ui/
data/
lib/
prisma/
public/
styles/
types/
```

## Setup

1. Make sure Node.js and npm are installed on your machine.
2. Create a PostgreSQL database for LaunchForge AI.
3. Copy `.env.example` to `.env` and fill in the values you have available.
4. Install dependencies:

```bash
npm install
```

5. Generate the Prisma client:

```bash
npx prisma generate
```

6. Push the schema to your database:

```bash
npx prisma db push
```

7. Start the development server:

```bash
npm run dev
```

## Environment Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
VERCEL_ACCESS_TOKEN=
VERCEL_TEAM_ID=
NEXT_PUBLIC_APP_URL=
```

## Authentication Notes

- The app uses Auth.js credentials authentication with Prisma-backed users.
- `passwordHash` is stored on the `User` model for local email/password auth.
- The first registered account is promoted to `ADMIN` automatically to simplify local setup.
- Protected routes are enforced in `middleware.ts` and again server-side in page/API helpers.

## Database Notes

- Prisma schema lives in [`prisma/schema.prisma`](/home/davidb/codes/launchforge-ai/prisma/schema.prisma).
- The database provider is PostgreSQL.
- JSON fields are used for generated content, branding, SEO, and analytics so the MVP can evolve quickly without constant schema churn.

## Prisma Commands

```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

## AI Generation Behavior

- When `OPENAI_API_KEY` is missing, the platform returns deterministic high-quality mock outputs from [`data/mock.ts`](/home/davidb/codes/launchforge-ai/data/mock.ts).
- The abstraction layer lives in [`lib/ai.ts`](/home/davidb/codes/launchforge-ai/lib/ai.ts).
- Replace the mock branches in that file with real OpenAI-compatible provider calls when credentials are available.

## Stripe Setup Notes

- Billing is wired for Stripe Checkout Sessions in test mode.
- Required env vars for live test-mode billing:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_PRICE_STARTER`
  - `STRIPE_PRICE_PRO`
  - `STRIPE_PRICE_AGENCY`
- Create recurring Stripe Prices for Starter, Pro, and Agency in the Stripe dashboard, then paste those Price IDs into `.env`.
- Use Stripe CLI during local development to forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

- Test cards:
  - `4242 4242 4242 4242` for a successful payment
  - use any future expiration date and any CVC
- Relevant routes:
  - [`app/api/stripe/checkout/route.ts`](/home/davidb/codes/launchforge-ai/app/api/stripe/checkout/route.ts)
  - [`app/api/stripe/webhook/route.ts`](/home/davidb/codes/launchforge-ai/app/api/stripe/webhook/route.ts)
- Subscription rows are updated from Stripe webhook events and reflected in the billing dashboard.

## Vercel Deployment Instructions

1. Create a Vercel project and connect this repository, or deploy the generated export package separately.
2. Add the environment variables from `.env.example`.
3. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to the deployed URL.
4. Configure your PostgreSQL database for production.
5. Redeploy after adding live OpenAI, Stripe, or Vercel tokens.

Placeholder Vercel routes:

- [`app/api/vercel/connect/route.ts`](/home/davidb/codes/launchforge-ai/app/api/vercel/connect/route.ts)
- [`app/api/vercel/deploy/route.ts`](/home/davidb/codes/launchforge-ai/app/api/vercel/deploy/route.ts)

## Domain Connection Instructions

1. Buy a domain from Namecheap, GoDaddy, Cloudflare, or Vercel.
2. Add the domain in your Vercel project settings.
3. Update nameservers or create the requested DNS records.
4. Add the A or CNAME records Vercel provides.
5. Wait for DNS propagation.
6. Confirm HTTPS is active.

## Admin Account Setup

- Register the first user locally and that account will become `ADMIN`.
- Use that account to access `/admin` and manage users, projects, subscriptions, moderation, and revenue views.

## Running Without External Keys

- Missing `OPENAI_API_KEY`: startup generation falls back to realistic mock outputs
- Missing Stripe keys: checkout and webhook routes return placeholder responses
- Missing Vercel credentials: deployment routes return architecture guidance instead of failing

## Future Improvements

- Replace mock AI calls with streaming provider-backed generations
- Add template preview images and richer versioned template configs
- Add live charting and event ingestion
- Add real Stripe subscription lifecycle syncing
- Add live Vercel project creation and deployment automation
- Add richer content moderation workflows and audit logs

## Current Environment Limitation

The codebase was created in an environment where `node` and `npm` were not available on `PATH`, so dependency installation and runtime verification could not be executed here. The project structure, routes, and configuration are in place, but you will need a local Node.js toolchain to run the install, Prisma, typecheck, and dev commands.
