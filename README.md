# StatusPulse ⚡

Production-grade uptime monitoring SaaS. Track website health, response times, and incidents with beautiful status pages.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **Auth.js v5** (GitHub, Google, magic link)
- **Prisma** + PostgreSQL (Neon)
- **Stripe** (billing)
- **Upstash Redis** (rate limiting + caching)
- **Vercel** (deployment + cron)
- **Resend** (alert emails)
- **Sentry** (error tracking)

## Features

- 📡 Real-time uptime monitoring (1–10 min intervals)
- 📊 30-day uptime history with bar visualizations
- ⚡ Response time tracking and charts
- 🚨 Incident management with status updates
- 🔔 Alerts via email, Slack, and webhooks
- 🌐 Public status pages with custom domains
- 👥 Multi-tenant workspaces with team roles
- 💳 Stripe billing (Free / Pro / Enterprise)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your credentials

# Initialize database
npx prisma generate
npx prisma db push

# Seed demo data
npx tsx prisma/seed.ts

# Run development server
npm run dev
```

## Pricing

| Feature | Free | Pro ($19/mo) | Enterprise ($49/mo) |
|---------|------|-------------|---------------------|
| Sites | 5 | 25 | Unlimited |
| Check interval | 10 min | 5 min | 1 min |
| History | 7 days | 30 days | 90 days |
| Alerts | Email | Email + Slack | All + webhook |
| Status pages | 1 | 3 | Unlimited |
| Team members | 1 | 5 | Unlimited |

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Public pages (landing, pricing)
│   ├── (auth)/             # Login/register
│   ├── (dashboard)/        # Protected app pages
│   └── api/                # API routes (cron, webhooks)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, sidebar, footer
│   ├── shared/             # Reusable components
│   └── features/           # Domain-specific components
├── lib/                    # Auth, DB, Stripe, utils
├── actions/                # Server Actions
└── types/                  # TypeScript types
```

## License

MIT
