# Waadi Media Website

> Built in the valley. Made for your business.  
> Official website for Waadi Media ([waadimedia.com](https://waadimedia.com)), a digital agency in Anantnag, Jammu & Kashmir providing web design, development, SEO, branding, and custom software.

---

## 1. Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Library:** React 19
- **Styling:** Tailwind CSS with custom design tokens (Snow `#F5F8FC`, Paper `#FFFFFF`, Ink `#0A1128`, Blue `#0057FF`, Line `#D9E2EC`)
- **Typography:** Newsreader (display serif) & Outfit (sans-serif) via `next/font/google`
- **Animations:** `motion/react` with strict `prefers-reduced-motion` compliance
- **Content:** MDX via `next-mdx-remote` with RSS feed generator
- **Form Handling & Validation:** `react-hook-form` + `zod`
- **Integrations:** Cal.com embed, Google Analytics 4 (gated behind consent notice), Resend email API

---

## 2. Getting Started

### Prerequisites
- Node.js 20+ (recommended 20.x or 22.x LTS)
- npm 10+

### Setup
```bash
# Clone the repository
git clone https://github.com/ShykhFurkan/waadi_media.git
cd waadi_media

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site locally.

---

## 3. Environment Variables

Create `.env.local` based on `.env.example`:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata & sitemaps | `https://waadimedia.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com booking slug | `waadimedia/free-call` |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification code | `your_google_verification_token` |
| `RESEND_API_KEY` | Resend API key for contact form emails | `re_xxxxxxxxxxxx` |
| `CONTACT_TO_EMAIL` | Target inbox for contact form submissions | `contact@waadimedia.com` |
| `CONTACT_FROM_EMAIL` | Sender address verified in Resend | `Waadi Media <no-reply@waadimedia.com>` |

---

## 4. Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts local development server on port 3000 |
| `npm run build` | Compiles optimized production bundle with Turbopack |
| `npm start` | Serves the compiled production build |
| `npm run lint` | Runs ESLint and Next.js compiler checks (0 warnings enforced) |
| `npm test` | Runs the automated pricing calculator test suite |
| `npm run seo:check` | Builds the site and verifies title lengths, description lengths, canonicals, H1s, and OG images across every route |

---

## 5. Adding or Editing Blog Posts

Articles are stored as MDX files in `/content/blog/`.

### Creating a Post
Create a file named `/content/blog/<slug>.mdx`:

```mdx
---
title: "Article Title (Under 60 characters)"
slug: "your-article-slug"
description: "A compelling summary of the article under 155 characters for search engines."
date: "2026-10-03"
category: "Websites" # Websites | SEO | Branding | Growth | Engineering
keyword: "primary target keyword"
author: "Furkan Mushtaq"
draft: false # Set to true to hide in production
---

Your article content written in standard Markdown or MDX.

## Section Heading

Paragraph text here.
```

### Draft Management
- If `draft: true`, the post will only appear in local development.
- In production (`npm run build`), draft posts are automatically omitted from the blog list, the XML sitemap (`/sitemap.xml`), the RSS feed (`/blog/feed.xml`), and direct URLs return a 404.
- When no posts have `draft: false`, the blog index automatically renders the empty state *"New articles are on the way."*

---

## 6. Managing Pricing & Packages

All prices across the entire website live in a single typed configuration file:  
`src/data/pricing.ts`

- **Packages:** Edit the `packagesData` array to update package deliverables, timelines, or starting prices.
- **Calculator Items:** Edit the `pricingItems` array to change individual one-time deliverables or monthly retainers.
- **Bundle Discounts:** Controlled in `src/config/site.ts` (`bundleDiscountRate: 0.10`, `minItemsForDiscount: 3`).

*Never hard-code price numbers inside page components or templates.*

---

## 7. Pre-Launch Checklist (PRD Section 14)

Before pointing production DNS to the new build:

- [ ] **Domain & DNS:** Set apex `waadimedia.com` and `www.waadimedia.com` records in host DNS.
- [ ] **Environment Variables:** Populate production values for `RESEND_API_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CAL_LINK`, and `GOOGLE_SITE_VERIFICATION`.
- [ ] **Email Delivery:** Verify sender domain in Resend and test submission via `/contact`.
- [ ] **Calendar Integration:** Confirm Cal.com booking slug and test timezone slot availability on `/book-a-call`.
- [ ] **Redirects:** Map any legacy URLs from the old website into `src/config/redirects.ts`.
- [ ] **Search Console:** Submit `https://waadimedia.com/sitemap.xml` in Google Search Console after verification.
- [ ] **Quality Checks:** Run `npm run lint`, `npm test`, `npm run seo:check`, and `npm run build` on deployment branch.
