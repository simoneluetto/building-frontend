# Building Frontend Summary

## Purpose

This app is a simple public-facing website for a family-owned residential building in Turin called Bosco dell'Aquila. The current site acts as a static landing page to present the property, explain the offer, and collect interest via an external Google Form.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Vercel Analytics and Speed Insights enabled in the root layout

## Current App Shape

- Main route: `/`
- Secondary static routes: `/privacy`, `/regolamento`
- No active authenticated area in the current route tree
- All visible content is hardcoded in the frontend
- All main images are local files in `public/`

## Content And Product State

- Primary audience: students and young workers in Turin
- Lead flow: direct contact by email, not Google Forms
- Current positioning: renovated apartments plus shared community spaces
- The building is already open
- Language direction: Italian only for now

## Structure

- `src/app/layout.tsx`: global metadata, viewport, footer, analytics
- `src/app/page.tsx`: full landing page, hero, apartment section, shared spaces section, map section, final CTA, lightbox gallery logic
- `src/app/privacy/page.tsx`: privacy notice for lead collection through Google Forms
- `src/app/regolamento/page.tsx`: house rules / convivence guidelines
- `src/components/Header.tsx`: unused component with old auth/dashboard logic tied to a local Strapi API

## Important Technical Notes

- The homepage is a client component because it contains gallery state and keyboard handlers
- Images currently use plain `<img>` tags, not `next/image`
- `next.config.ts` allows remote images from local Strapi uploads at `http://127.0.0.1:1337/uploads/**`, but the current landing page only uses local assets
- Development and production builds use separate Next.js output directories: `.next-dev` for `next dev` and `.next-prod` for production build/server
- Builds currently succeed because linting is disabled during production builds
- Lint does not currently pass; most errors are `react/no-unescaped-entities`, plus some `any` usage and `img` warnings

## Known Mismatch / Cleanup Targets

- `src/components/Header.tsx` appears to be leftover code from a different product direction and is not used
- The project README is still the default `create-next-app` README
- Typography is inconsistent with the theme intent: layout loads Inter, but global CSS still sets Arial/Helvetica on `body`
- The app is effectively static marketing content today, despite traces of prior backend/auth integration
- Running `next build` while `next dev` is active used to corrupt the shared `.next` output; this was fixed by splitting the output directories

## Guidance For Future Changes

- Preserve the app's role as a polished marketing site unless the user explicitly asks to reintroduce account features
- Prefer improving content clarity, visual quality, mobile responsiveness, SEO, and image handling before adding complexity
- Treat unused auth/dashboard code as inactive future work to keep, but do not let it shape current site decisions
- Keep copy and legal text aligned with the user's real business details, since several facts are business-sensitive and time-sensitive

## Working Assumptions

- Keep the audience centered on students and young workers
- The site should describe the building as already open
- Contact should happen by email at `info@boscodellaquila.it`
- Keep the site Italian-first unless the user explicitly requests multilingual support later
- Keep `src/components/Header.tsx` in the repo for possible future account features, but treat it as dormant code