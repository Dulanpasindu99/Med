# MedLink – Scaffold

A minimal but production-minded scaffold matching your UI and flows.

## Quick start

```bash
npm i
cp .env.example .env    # fill DATABASE_URL
npx prisma migrate dev --name init
npm run dev
```

## Tech
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- React Query
- Zod
