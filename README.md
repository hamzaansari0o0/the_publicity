# The Publicity - website

Website for **The Publicity**, a hybrid marketing agency in Lahore that combines
print (newsletters, flyers, flex & standees) with social media marketing - and puts a
trackable **QR code on every printed item** so physical marketing becomes measurable.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · MongoDB

The layout follows the "Arigo" agency template (big Phudu headlines, numbered sections,
stacked cards, slide-in menu), rebuilt in Tailwind and re-themed with the agency's logo
palette: dark red `#9B1C24` + dark gold `#C9971C` gradients on charcoal `#262626` / `#2D3134` and white.
Sections alternate between light and dark. Illustrations are original SVGs.

## Getting started

Requires Node.js 20.9+ (developed on Node 22).

```bash
npm install
cp .env.example .env      # then fill in your values (see below)
npm run dev               # http://localhost:3000
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route types + TypeScript check |
| `npm run qr:create -- <slug> <url> [label]` | Create a trackable QR link + export print-ready SVG/PNG |
| `npm run qr:list` | All QR links with scan counts |
| `npm run qr:stats -- <slug>` | Scans per day / device for one QR link |
| `npm run inquiries -- [n]` | Latest contact-form messages |

## Environment variables

All secrets and business details live in `.env` (git-ignored). `.env.example` documents
every variable and is the only env file that is committed.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (Atlas `mongodb+srv://...` or local). **Secret.** |
| `MONGODB_DB` | Database name (default `the_publicity`) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL - used for SEO, sitemap and the URL encoded in QR codes |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `_CONTACT_PHONE`, `_ADDRESS`, `_BUSINESS_HOURS` | Contact details shown on the site |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, e.g. `923001234567` |
| `NEXT_PUBLIC_FACEBOOK_URL`, `_INSTAGRAM_URL`, `_LINKEDIN_URL` | Social links |

`NEXT_PUBLIC_*` values are visible in the browser - never put secrets in them. Without
`MONGODB_URI` the site still runs; the contact form and QR tracking just report that the
database is not connected.

## What uses MongoDB

| Collection | Written by | Contents |
| --- | --- | --- |
| `inquiries` | Contact form (`POST /api/contact`) | name, email, phone, business type, service, message, status |
| `qrlinks` | `npm run qr:create` | slug, label, destination URL |
| `scans` | QR redirect (`GET /r/<slug>`) | slug, time, device class, country, referrer host |

### How QR tracking works

1. `npm run qr:create -- cafe-gulberg "https://wa.me/923001234567?text=Hi" Cafe flyer - Gulberg`
2. It saves the link and writes `qr-codes/cafe-gulberg.svg` (use the SVG for print). The QR
   encodes `https://your-site.com/r/cafe-gulberg`.
3. When someone scans it, the site records the scan and forwards them (HTTP 307) to the
   destination. Bots/link-previews are labelled and excluded from counts.
4. `npm run qr:stats -- cafe-gulberg` shows how it performed. Use **one code per area or
   placement** to compare locations.

> Set `NEXT_PUBLIC_SITE_URL` to your real domain **before** creating QR codes for print -
> printed codes keep pointing at whatever URL they were generated with.

The home page also has a live demo QR (`/r/demo`) with a public scan counter.

## Project structure

```
src/
  app/                  routes: /, /about, /services(/[slug]), /blog(/[slug]), /contact,
                        /api/contact, /api/qr/demo, /r/[slug] (QR redirect), sitemap, robots
  components/
    home/               home-page sections (Hero, Samples, ServicesList, PhygitalModel, ...)
    layout/             SiteHeader (slide-in menu), SiteFooter, PageBanner
    sections/ forms/    shared sections, ContactForm
    ui/                 Button, SplitText, Reveal, icons, Logo ...
    art/                PrintArt - the SVG illustrations that stand in for photos
  data/                 ALL editable content: site.ts, services.ts, posts.ts, content.ts
  lib/                  mongodb.ts, validators.ts, rate-limit.ts, ...
scripts/db-tools.mjs    CLI behind the qr:* / inquiries npm scripts
```

## Editing content

- **Contact details / socials** - defaults live in `src/data/site.ts` (email
  `sendtome2003@gmail.com`, phone `+92 323 27 27 100`); `.env` overrides them. WhatsApp
  buttons appear only when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set.
- **Services** (4 pages) - `src/data/services.ts`.
- **Blog posts** - `src/data/posts.ts` (sample articles; replace or delete freely).
- **Home page copy, stats, concept samples, "how we work"** - `src/data/content.ts`.
- **Images** - the SVG art in `src/components/art/PrintArt.tsx` can be swapped for real
  photos: drop files in `public/images/` and use `next/image`.
- **Colours / fonts** - tokens at the top of `src/app/globals.css`. Use the semantic
  classes (`bg-page`, `bg-surface`, `text-fg`, `text-muted`, `text-accent`, `border-line`);
  they flip automatically inside `data-theme="dark"` sections.
- **Logo & cover photo** - `public/images/logo.png` (transparent horizontal logo),
  `logo-mark.png` (emblem), `cover.jpg` (full cover banner, shown on the About page and used
  as the social-share image), `hero-visual.jpg` (crop of the cover used in the home hero).
  Favicon: `src/app/icon.png`, `apple-icon.png`; share image: `src/app/opengraph-image.jpg`.
  The logo's lettering is charcoal, so on dark backgrounds it sits on a white plate
  (`<Logo plate />`).

### Placeholder content to replace before launch

- Social links (Facebook / Instagram / LinkedIn are `#` until set in `.env`), street address
  and opening hours (not provided yet). Confirm that `+92 323 27 27 100` is on WhatsApp.
- Set `NEXT_PUBLIC_SITE_URL=https://www.publicity.com.pk` on the live host.
- The **concept samples** on the home page are design concepts, not client work - swap in
  real projects once you have them. There are intentionally no fake testimonials, client
  logos or team photos.
- Blog posts are sample articles.
- Terms / Privacy pages don't exist yet.

## Security notes

- `.env*`, `CLAUDE.md`, `.claude/`, `AGENTS.md`, `.mcp.json` and `qr-codes/` are git-ignored.
- Contact API: JSON only, same-origin check, input validation (Zod), honeypot field, and
  rate limiting (in-memory, per server instance - add a shared limiter such as Upstash if
  you deploy to serverless and see abuse). IP addresses are never stored.
- Security headers are set in `next.config.ts`.

## Deploying (e.g. Vercel)

Add the same variables from `.env.example` in the host's dashboard. For MongoDB Atlas,
allow your host's IPs under *Network Access* (Vercel uses dynamic IPs, so Atlas typically
needs `0.0.0.0/0` together with a strong database password, or use the Vercel/Atlas
integration).

## Next.js 16 notes

`partialPrefetching` is set to `false` in `next.config.ts` on purpose, so unknown URLs such as
`/services/typo` return a genuine HTTP 404 on the first visit instead of a 200 "app shell".

This project uses Cache Components. Anything non-deterministic in a Server Component
(e.g. `new Date()`) must be inside `"use cache"` or `<Suspense>` - see
`src/components/layout/CurrentYear.tsx`. Route handlers that must run per request call
`await connection()`. Docs for this exact version ship in `node_modules/next/dist/docs/`.
