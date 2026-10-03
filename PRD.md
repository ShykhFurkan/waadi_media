# Waadi Media Website: Product Requirements Document (PRD)

**Version:** 1.0 | **Date:** 3 October 2026 | **Owner:** Furkan Mushtaq | **Build tool:** Antigravity
**Site:** https://waadimedia.com | **Tagline:** *Built in the valley. Made for your business.*

---

## 0. How to use this document (instructions for the build agent)

This PRD is the single source of truth for the new Waadi Media website. Read it fully before writing code, then build in the phases listed in Section 14.

**Hard rules**

1. **Never invent facts.** No made-up testimonials, client logos, statistics, awards, ratings, street addresses, social handles, or team members. Where real data is missing, render nothing or a clearly marked `TODO` in the data file, never fake content on the live page.
2. **Content lives in typed data files** (`/src/data/*.ts` and `/content/blog/*.mdx`), not hard-coded inside components. Prices especially must exist in exactly one place (`/src/data/pricing.ts`).
3. **Use the copy in this document as written.** It is intentionally plain and local. Do not "polish" it into generic marketing language.
4. **Items tagged `[CONFIRM]`** are proposed business defaults the owner has not approved yet. Implement them, but keep each one editable in `/src/config/site.ts` or the relevant data file.
5. **Light mode only.** No dark theme, no theme toggle.
6. **English only.** No i18n scaffolding in v1.
7. **No CMS, no database.** Content is files in the repo. Forms send email. Nothing else is stored.
8. Follow the design rules in Section 6 strictly, especially the "avoid" list. The goal is a site that does not look like a template.
9. Check the latest stable versions of every package at scaffold time. Do not pin to versions mentioned from memory.

---

## 1. Product overview

### 1.1 What this is
The marketing and lead-generation website for **Waadi Media**, a full-service creative and technology agency based in Anantnag, Jammu & Kashmir, serving clients across India (mainly J&K). It replaces the current waadimedia.com site.

### 1.2 Positioning
Waadi Media is the agency that Kashmiri businesses can actually talk to. It does websites, SEO, brand identity, ads, social media, software and automation under one roof, explains everything in plain language, and publishes its prices.

**Positioning statement:** For Kashmir-based businesses and startups that want to grow online but find agencies confusing and expensive, Waadi Media is a local digital agency that builds and promotes their business in simple language, at open prices, with fast delivery.

### 1.3 Why "Waadi"
*Waadi* means valley. The name is a deliberate, relatable nod to Kashmir. It is the root of the tagline and of the visual concept (Section 6.2).

### 1.4 Goals

| Priority | Goal |
|---|---|
| Primary | Generate enquiries and booked calls, and announce that a new agency has arrived in Kashmir |
| Secondary | Showcase real work and capabilities |
| Secondary | Rank on Google for Kashmir-related agency searches (Section 8) |
| Secondary | Build trust fast for a new agency with few projects (honest case studies, public pricing, real contact details) |

### 1.5 Success metrics (targets are `[CONFIRM]`)

- Lighthouse (mobile) of 95 or higher for Performance, Accessibility, Best Practices and SEO on all main templates
- LCP under 2.0s, CLS under 0.05, INP under 200ms on a mid-range Android phone on 4G
- All pages indexed in Google Search Console within 3 weeks of launch
- At least 10 qualified enquiries per month (form + WhatsApp + booked calls) by month 3
- Contact conversion tracked from day one (Section 12)

### 1.6 Non-goals for v1

- Client login or portal (the "clients" request is met by a Clients and testimonials section; a portal is a possible phase 2)
- Taking online payments on the site
- CMS or admin dashboard
- Multiple languages or dark mode
- Live chat widget (WhatsApp covers this)

---

## 2. Business facts (use everywhere, centralize in `/src/config/site.ts`)

| Field | Value |
|---|---|
| Legal/brand name | Waadi Media |
| Domain | waadimedia.com (owned; current site hosted there) |
| Founded | 2026 |
| Based in | Anantnag, Jammu & Kashmir, India |
| Serves | Clients across India, mainly Jammu & Kashmir |
| Phone / WhatsApp | +91 77809 40317 (`tel:+917780940317`, `https://wa.me/917780940317`) |
| Email | contact@waadimedia.com |
| Street address | `TODO` (not provided; show "Anantnag, Jammu & Kashmir" until supplied) |
| Social links | `TODO` (Instagram, LinkedIn, Facebook, YouTube, GitHub; hide any that are empty) |
| Founder | Furkan Mushtaq |
| Team model | Founder-led, with a small circle of friends and creators who help on projects (do not call them employees) |
| Analytics | Google Analytics 4 and Search Console already set up (IDs via env) |
| Business hours | Monday to Saturday, 10:00 to 19:00 IST `[CONFIRM]` |
| Reply promise | "We reply within one business day." `[CONFIRM]` |

**Google Maps embed** (use on Contact page and location pages, lazy-loaded):

```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.8970439720943!2d75.21139585007596!3d33.7374783179307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e20f9f983cb67d%3A0x91ab9d8edfdc7d2d!2sWaadi%20media!5e0!3m2!1sen!2sin!4v1791025594229!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
```

Wrap it in a responsive container with rounded corners and a title attribute ("Waadi Media location in Anantnag").

**Logo:** `waadi_logo.jpeg` (provided): the word "waadi" in a bold blue geometric sans on the first line, "media.com" in black below it, on white. Only a JPEG exists, so see Section 15 for the asset to-do (SVG/transparent PNG).

---

## 3. Audience

Most visitors will be on **Android phones**, often on average mobile networks, and many prefer calling or WhatsApp over filling forms. The site must be fast, light, and make WhatsApp and call buttons one tap away.

| Persona | Who | What they need from the site |
|---|---|---|
| Local business owner | Shop, hotel, clinic, workshop, orchard owner in Kashmir; not technical | To see plain prices, understand what they get, and talk to a person |
| Startup founder | Early-stage founder in J&K | A single team for brand, site and software; clear packages |
| Tourism and education operators | Travel agencies, consultancies, schools | Proof from similar projects (Wonder Delight, Kaali Edge) |
| Agri and horticulture entrepreneurs | Sellers of apples, saffron, dry fruits, handicrafts | A way to sell online and be found beyond the valley |

**Industries to speak to:** tourism and hospitality, education, horticulture, agriculture, handicrafts and retail, e-commerce, startups.

---

## 4. Brand voice and copy rules

**Voice:** a helpful neighbour who happens to be good with technology. Warm, direct, plain.

**Do**
- Use short sentences and everyday words. Say "website", not "digital presence".
- Explain what the person gets and what happens next.
- Use sentence case for all headings, buttons and labels.
- Name actions exactly: "Book a free call", "Send on WhatsApp", "Get a quote".
- Be honest about timelines and about SEO taking time.

**Do not**
- Use jargon (synergy, leverage, holistic, ecosystem, cutting-edge, 360-degree).
- Make unverifiable claims ("best agency in Kashmir", "#1", "guaranteed rankings"). Keywords like "web design agency in Kashmir" are used naturally in headings and copy without superlatives.
- Add arrows or symbols to the end of button text.
- Write errors that apologize. State what went wrong and how to fix it.
- Overwhelm. If a section can say it in one line, it does.

**Reading level:** around grade 7. Line length under 70 characters for sans-serif body text, and under 75 for serif text.

---

## 5. Technical specification

### 5.1 Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), latest stable, TypeScript strict |
| Styling | Tailwind CSS (latest stable, CSS-first `@theme` config) with CSS variables for tokens |
| Animation | `motion` (the library formerly named Framer Motion), imported from `motion/react` |
| Icons | `lucide-react` (stroke 1.5) |
| Forms | `react-hook-form` + `zod` |
| Email | Resend (API route `/api/contact`), sending to contact@waadimedia.com |
| Call booking | Cal.com inline embed via `@calcom/embed-react` (free plan), username from env |
| Blog | MDX files in `/content/blog`, parsed with `gray-matter` + `next-mdx-remote`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings` |
| Fonts | `next/font/google` (Section 6.3) |
| Analytics | `@next/third-parties/google` (GA4) plus custom events (Section 12) |
| OG images | `next/og` dynamic images per page |
| Hosting | Vercel (free tier is enough to start), domain waadimedia.com pointed via DNS |
| Utilities | `clsx`, `tailwind-merge`, `reading-time` |

### 5.2 Project structure

```
/app
  layout.tsx, page.tsx, not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx
  /services/page.tsx, /services/[slug]/page.tsx
  /pricing/page.tsx
  /work/page.tsx, /work/[slug]/page.tsx
  /blog/page.tsx, /blog/[slug]/page.tsx, /blog/feed.xml/route.ts
  /about/page.tsx, /contact/page.tsx, /book-a-call/page.tsx
  /web-design-agency-kashmir/page.tsx
  /web-design-agency-srinagar/page.tsx
  /web-design-agency-anantnag/page.tsx
  /privacy/page.tsx, /terms/page.tsx
  /api/contact/route.ts
/components
  /layout (Header, Footer, MobileMenu, FloatingActions)
  /sections (Hero, ServicesList, WorkPanels, Process, PackagesPreview, Testimonials, Faq, CtaBand, ...)
  /ui (Button, Input, Select, Accordion, Badge, Tabs, Reveal, Marquee, MagneticButton)
  /calculator, /forms, /seo (JsonLd), /illustrations (Ridgeline, motifs)
/content/blog/*.mdx
/data
  services.ts, pricing.ts, packages.ts, projects.ts, testimonials.ts, faqs.ts, locations.ts
/config/site.ts
/lib (mdx.ts, seo.ts, analytics.ts, whatsapp.ts, format.ts)
/public (brand, work, og, illustrations)
```

### 5.3 Environment variables

```
NEXT_PUBLIC_SITE_URL=https://waadimedia.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CAL_LINK=your-username/free-call
RESEND_API_KEY=
CONTACT_TO_EMAIL=contact@waadimedia.com
CONTACT_FROM_EMAIL=Waadi Media <no-reply@waadimedia.com>
GOOGLE_SITE_VERIFICATION=
```

### 5.4 Core data models (TypeScript)

```ts
type Service = {
  slug: string; name: string; shortLine: string; startingPrice: number;
  priceUnit: 'one-time' | 'per month'; icon: string;
  metaTitle: string; metaDescription: string; h1: string;
  intro: string; included: string[]; howItWorks: {title: string; text: string}[];
  priceItems: PriceItem[]; faqs: {q: string; a: string}[]; related: string[];
};
type PriceItem = { id: string; label: string; price: number; unit: 'one-time' | 'per month'; serviceSlug: string; note?: string };
type Package = { id: string; name: string; price: number; unit: 'one-time' | 'per month'; plus?: boolean; forWhom: string; includes: string[]; popular?: boolean };
type Project = { slug: string; name: string; sector: string; liveUrl: string; summary: string; services: string[]; challenge: string; whatWeDid: string[]; results?: string[]; quote?: Testimonial; images: {src: string; alt: string}[]; featured: boolean };
type Testimonial = { quote: string; name: string; business: string; role?: string };
```

---
## 6. Design system

### 6.1 Brief in one paragraph
Light mode, luxury and minimal, professional but playful, with subtle animation. It should feel calm, expensive and unmistakably Kashmiri without using tourist clichés. It must feel premium for a founder-led agency but never cold or corporate.

### 6.2 Concept: "the valley" (the one memorable thing)
The site's single signature element is a **layered ridgeline**: 4 to 5 flat, overlapping mountain silhouettes in tonal blues (pale at the back, brand blue at the front), drawn as inline SVG. It anchors the hero, sits quietly under the footer, and returns as a small divider on a few pages. It gently shifts at different speeds as the user scrolls (parallax) and the layers rise into place once on page load. It is a direct visual translation of "Built in the valley."

Everything else stays quiet: lots of white space, large type, thin lines, little decoration. **Spend the boldness in one place.**

**Avoid (these read as templated):**
- A warm cream background paired with a serif and a terracotta accent (we use a cool snow-white and brand blue instead)
- A tracked-out ALL-CAPS label above every heading
- Highlighting a single word of a headline in italic or a different color
- Numbered markers (01/02/03) except for the real step sequence in "How we work"
- Every section chopped into identical rounded cards with identical soft shadows
- Gradient washes as decoration, glassmorphism, neon glows
- Arrows (→) appended to buttons and links; middle-dot meta strings; monospace data labels
- Fade-and-slide-up on every section and hover lift on every card

### 6.3 Typography

Two typefaces with distinct roles:

| Role | Font | Notes |
|---|---|---|
| Display and headings | **Newsreader** (Google Fonts, variable, with optical size axis) | Use the display optical size for large headings. Weights 300 to 500. Italic is used for whole phrases or full sentences, never a single highlighted word. |
| UI, body, buttons, forms | **Outfit** (Google Fonts, variable) | Geometric, echoes the logo wordmark. Weights 300 to 600. |

Load both with `next/font/google`, `display: 'swap'`, subsets `latin`, and CSS variables `--font-display` and `--font-sans`. Use lining, tabular numerals for prices (`font-variant-numeric: lining-nums tabular-nums`).

**Type scale (fluid)**

| Token | Size | Line height | Tracking | Font / weight |
|---|---|---|---|---|
| `display` (home hero H1) | `clamp(2.75rem, 7.2vw, 6.25rem)` | 1.0 | -0.025em | Newsreader 400 |
| `h1` | `clamp(2.5rem, 5.2vw, 4.5rem)` | 1.04 | -0.02em | Newsreader 400 |
| `h2` | `clamp(2rem, 3.6vw, 3.25rem)` | 1.1 | -0.015em | Newsreader 400 |
| `h3` | `clamp(1.375rem, 2vw, 1.75rem)` | 1.25 | -0.01em | Newsreader 500 |
| `lead` | `clamp(1.125rem, 1.5vw, 1.375rem)` | 1.55 | 0 | Outfit 300 |
| `body` | `1.0625rem` (17px) | 1.65 | 0 | Outfit 400 |
| `small` | `0.875rem` | 1.5 | 0.005em | Outfit 400 |
| `button` | `1rem` | 1 | 0.005em | Outfit 500, sentence case |
| `price` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.1 | -0.01em | Newsreader 400, tabular |

Blog body text uses Newsreader at 1.1875rem / 1.75 for comfortable reading, max width 68ch.

### 6.4 Color tokens

Define as CSS variables and expose through Tailwind `@theme`.

| Token | Hex | Use |
|---|---|---|
| `--snow` | `#F5F8FC` | Page background (cool white, a nod to Kashmir snow) |
| `--paper` | `#FFFFFF` | Raised surfaces, form fields, header when scrolled |
| `--ink` | `#000000` | Headings and logo black (matches the logo exactly) |
| `--graphite` | `#2F343D` | Body text |
| `--mist` | `#667085` | Secondary text, captions |
| `--line` | `#E1E7F0` | Borders and dividers |
| `--blue` | `#0057FF` | Brand blue: primary buttons, links, key numerals, ridgeline front layer. **Sample the exact value from the logo file with a color picker and update this token.** |
| `--blue-deep` | `#0039B3` | Hover/pressed state, text links on tinted backgrounds |
| `--blue-tint` | `#EAF1FF` | Subtle highlights, selected states, tag backgrounds |
| Ridgeline layers | `#E6EEFF`, `#C9DAFF`, `#9DBAFF`, `#5C8DFF`, `#0057FF` | Back to front |
| `--success` | `#0F7B4F` | Form success only |
| `--error` | `#C62828` | Form errors only |
| `--whatsapp` | `#25D366` | WhatsApp floating button only |

Rules: blue is the only accent. Never use blue for large background washes (the ridgeline is the exception). Text on `--snow` and `--paper` uses `--ink` or `--graphite`. White text on `--blue` passes AA (about 5.5:1). Focus ring: 2px `--blue` with 3px offset on every interactive element.

### 6.5 Layout

- Container max width 1200px, with 1360px for full-bleed media panels. Side padding `clamp(20px, 5vw, 64px)`.
- 12-column grid, 24px gutters (16px on mobile). Spacing scale on a 4px base.
- Section vertical padding `clamp(72px, 10vw, 140px)`.
- **Alignment: left-aligned text by default.** Compose asymmetrically (a 5/7 or 4/8 column split) instead of centering everything. Center only the final call-to-action band and short intro lines on the pricing calculator.
- Breakpoints: 480, 768, 1024, 1280, 1536.

### 6.6 Shape, borders and depth

| Element | Radius | Treatment |
|---|---|---|
| Buttons | 999px (pill) | Filled blue or 1.5px ink outline |
| Inputs and selects | 12px | 1.5px `--line` border, `--paper` fill, 52px tall |
| Media panels (project images, large illustrations) | 28px | No border; image only |
| Chips and tags | 8px | `--blue-tint` background |
| Package columns | 20px | 1px `--line` border; the featured one has a 1.5px `--blue` border and sits 12px higher |
| Service rows | 0 | Separated by 1px `--line` dividers (a list, not a card grid) |

Shadows only on elements that float above the page: the sticky header after scrolling, the WhatsApp button, and popovers (`0 10px 30px rgba(0, 30, 90, 0.08)`). Static content has no shadow.

### 6.7 Components

- **Header:** logo at left; links Services (dropdown with the 8 services), Work, Pricing, Blog, About, Contact; primary button "Book a free call" at right. Transparent over the hero, then white with a subtle bottom border and shadow after 24px of scroll. Mobile: full-screen menu sheet with large Newsreader links, plus Call and WhatsApp buttons at the bottom.
- **Buttons:** Primary (blue pill, white text, 52px tall, 28px side padding), Secondary (ink outline pill), Text link (blue, underline draws in from the left on hover). Magnetic hover (max 8px pull) on primary buttons on desktop only.
- **Services list:** a full-width list of rows. Each row: service name in `h3`, a one-line description, the starting price at the right (`From ₹15,000`), and a thin divider. On hover the row's blue underline draws and the price shifts 6px.
- **Work panels:** large alternating panels (image 7 columns, text 5 columns) with the project mockup in a 28px-radius frame.
- **Package columns:** three columns on desktop, stacked on mobile. Name, price (with "Starting at"), who it's for, an inclusion list with check icons.
- **Accordion (FAQ):** single column, smooth height animation, plus/minus icon rotating 45 degrees.
- **Forms:** labels above fields, helper text below, errors in `--error` beneath the field in plain language, with `aria-describedby`.
- **Floating actions (desktop):** a 56px circular WhatsApp button bottom-right with a soft pulse once on load. **On mobile:** a sticky bottom bar with three equal buttons: Call, WhatsApp, Book a call. Hide the bar when the on-screen keyboard is open.
- **Footer:** the ridgeline illustration along the top edge, then four columns (brand + tagline, Services, Company, Contact) and a bottom bar with the copyright and "Made with care in Anantnag, Kashmir."

### 6.8 Motion system

**Tokens:** easing `cubic-bezier(0.22, 1, 0.36, 1)`; durations 180ms (micro), 320ms (UI), 600ms (reveal), 1000ms (signature).

**Signature moment (one orchestrated sequence on first load):** the hero headline reveals line by line with a mask (text rising from a clipped baseline), while the five ridgeline layers rise from below in sequence, back to front, over about one second. After that, the ridgeline parallaxes with scroll (back layers 0.2x, front layers 0.6x) and subtly follows pointer movement on desktop (max 12px).

**Supporting motion (varied, not uniform):**
- Page titles on inner pages use the same masked line reveal
- Dividers and underlines **draw in** (scaleX from 0) when they enter view
- Project images use a **clip-path wipe** reveal once; images zoom 1.03x on hover
- A slow marquee of service names in `h2` size (60s linear loop, pauses on hover)
- Primary-button magnetic pull, link underline draw, price shift on row hover
- Accordion height animation; calculator totals count up/down smoothly (400ms)
- Form states: field border color transition, a check icon drawing in on success
- Blog: a thin blue reading-progress bar under the header

**Rules**
- Do not apply the same fade-up to every section. Choose the mechanism per element, as above.
- Animate only `transform` and `opacity` (plus `clip-path`). Never animate layout properties.
- Respect `prefers-reduced-motion`: disable parallax, marquee, magnetic effects and reveals (content appears instantly).
- Keep the main thread free: lazy-load `motion` features, and keep JS for animation under 40KB gzipped.

### 6.9 Imagery and illustration

There are no photos. Visuals come from four sources:

1. **Ridgeline SVG (hand-built in code)** for the hero, footer and dividers.
2. **Project mockups.** Use the provided homepage screenshots of Wonder Delight and Kaali Edge inside a clean browser-window frame (CSS), and a screenshot of SmartHire once supplied. Save as `/public/work/<slug>/cover.webp` at 1600px wide.
3. **AI-generated illustrations** in one consistent style: flat vector, tonal blues only (`#0057FF` down to `#E6EEFF`), lots of empty space, no text inside the image, no people's faces. Suggested prompts:
   - *About page:* "Minimal flat vector illustration of a quiet Kashmir valley at dawn, layered mountains and a single chinar tree, monochrome blue palette from #E6EEFF to #0057FF, wide 16:9, generous empty sky, no text."
   - *Contact page:* "Minimal flat vector illustration of a shikara boat on still water with distant mountains, monochrome blue palette, wide format, lots of negative space, no text."
   - *Tourism, education and agriculture industry tiles:* "Simple monochrome blue line-and-fill icon illustration of [a houseboat / an open book with a mountain / an apple branch], square, plain light background, no text."
   - *Blog covers:* a template of the ridgeline plus the post title, generated with `next/og`, so no per-post art is needed.
4. **Icons:** `lucide-react`, stroke 1.5, size 24, blue or ink.

Cultural motifs (chinar leaf, paisley, shikara, saffron crocus) are used **sparingly**: at most one per page, always in the tonal blue palette, never as a repeating wallpaper.

All images: WebP/AVIF through `next/image`, explicit width and height, `priority` only on the hero, descriptive alt text (decorative images use `alt=""`).

### 6.10 Accessibility

- WCAG 2.2 AA minimum. Visible focus on every interactive element. Skip-to-content link.
- Semantic landmarks (header, nav, main, footer), one H1 per page, logical heading order.
- Tap targets at least 44x44px. Body text at least 17px.
- Form fields have visible labels, errors are announced (`aria-live="polite"`), and required fields are marked in text.
- Marquee and parallax can be paused or are removed under reduced motion. Nothing flashes.
- Color is never the only signal.

---
## 7. Sitemap and routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Explain what Waadi does and drive calls |
| `/services` | Services overview | List all 8 services with starting prices |
| `/services/website-design-development` | Website design and development | Dedicated SEO page |
| `/services/ecommerce-websites` | E-commerce websites | Dedicated SEO page |
| `/services/seo` | SEO | Dedicated SEO page |
| `/services/brand-identity` | Brand identity | Dedicated SEO page |
| `/services/digital-advertising` | Digital advertising | Dedicated SEO page |
| `/services/social-media-content` | Social media and content | Dedicated SEO page |
| `/services/custom-software-apps` | Custom software and apps | Dedicated SEO page |
| `/services/automation-ai` | Automation and AI | Dedicated SEO page |
| `/pricing` | Pricing | Packages, price list, calculator |
| `/work` | Portfolio | All projects |
| `/work/wonder-delight-tours-travels` | Case study 1 | Tourism |
| `/work/kaali-edge` | Case study 2 | Education |
| `/work/smarthire` | Case study 3 | AI software |
| `/blog`, `/blog/[slug]` | Blog | SEO content |
| `/about` | About | Story and values |
| `/contact` | Contact | Form, WhatsApp, call, map |
| `/book-a-call` | Book a call | Cal.com embed, the main conversion page |
| `/web-design-agency-kashmir` | Local page | SEO for Kashmir |
| `/web-design-agency-srinagar` | Local page | SEO for Srinagar |
| `/web-design-agency-anantnag` | Local page | SEO for Anantnag |
| `/privacy`, `/terms` | Legal | Required |
| `/sitemap.xml`, `/robots.txt`, `/blog/feed.xml` | Generated | SEO |

**Header navigation:** Services (dropdown), Work, Pricing, Blog, About, Contact, and the button "Book a free call" (`/book-a-call`). The three local pages are linked from the footer and from the Home page and Contact page, not from the header.

---

## 8. SEO specification

### 8.1 Target keywords
Primary: web design agency in Kashmir, web design agency in Srinagar, web design agency in Anantnag, website development Kashmir, digital marketing agency Kashmir, SEO services Kashmir.
Secondary: ecommerce website development Kashmir, brand identity Kashmir, Google Ads Kashmir, social media marketing Srinagar, website for tour operators Kashmir, website for education consultancy Kashmir, app development Kashmir.

Use these naturally in titles, H1s, first paragraphs, image alt text and internal links. Do not stuff. Do not use "best" or other superlatives.

### 8.2 Page metadata (title 60 characters or fewer, description 155 or fewer)

| Page | Title | Meta description |
|---|---|---|
| Home | Waadi Media - Web Design and Digital Agency in Kashmir | Websites, SEO, branding, ads and software for Kashmir's businesses. Clear prices, fast delivery, built in Anantnag. Book a free call. |
| Services | Digital Services in Kashmir - Waadi Media | Website design, e-commerce, SEO, branding, ads, social media, software and automation from a Kashmir agency. See starting prices. |
| Website design | Website Design and Development in Kashmir - Waadi Media | Fast, mobile-friendly websites with on-page SEO for Kashmir businesses. Business sites from ₹15,000. Free call to start. |
| E-commerce | E-commerce Website Development in Kashmir - Waadi Media | Sell online with a store built for Kashmir sellers: UPI and card payments, shipping setup and product SEO. From ₹35,000. |
| SEO | SEO Services in Kashmir - Waadi Media | Get found on Google. Local SEO, audits, Google Business Profile and monthly SEO for Kashmir businesses. From ₹2,000. |
| Brand identity | Brand Identity and Logo Design in Kashmir - Waadi Media | Logos, brand kits and templates that make your business look trusted. Logo design from ₹3,500. |
| Advertising | Google and Meta Ads Management in Kashmir - Waadi Media | Run Google, Facebook and Instagram ads that bring real enquiries. Management from ₹8,000 per month plus ad spend. |
| Social media | Social Media and Content in Kashmir - Waadi Media | Posts, reels, photos, copy and email marketing for Kashmir businesses. Social media management from ₹8,000 per month. |
| Software | Custom Software and App Development in Kashmir - Waadi Media | CRMs, booking systems, dashboards and mobile apps built for your business. From ₹60,000. |
| Automation | WhatsApp Automation and AI Chatbots in Kashmir - Waadi Media | Answer customers instantly with WhatsApp automation and AI chatbots. Chatbots from ₹15,000. |
| Pricing | Pricing: Websites, SEO, Ads and Branding - Waadi Media | See our starting prices, compare packages and estimate your project with our calculator. No hidden costs. |
| Work | Our Work - Waadi Media | Websites and software we built for a Kashmir tour operator, an education consultancy and an AI hiring platform. |
| About | About Waadi Media - A Kashmiri Digital Agency | Waadi means valley. We are a Kashmir-based agency that explains technology in plain words and prices it openly. |
| Contact | Contact Waadi Media - Anantnag, Kashmir | Call, WhatsApp or write to us. Based in Anantnag, working with clients across India. We reply within one business day. |
| Book a call | Book a Free Call - Waadi Media | Pick a time for a free 20-minute call. Tell us about your business and we will suggest the right next step. |
| Local: Kashmir | Web Design Agency in Kashmir - Waadi Media | A Kashmir-based web design and digital agency for tourism, education, horticulture, retail and startups. |
| Local: Srinagar | Web Design Agency in Srinagar - Waadi Media | Websites, SEO and marketing for Srinagar businesses, from a Kashmiri agency that keeps things simple. |
| Local: Anantnag | Web Design Agency in Anantnag - Waadi Media | Waadi Media is based in Anantnag. Websites, branding, SEO and ads for local businesses at clear prices. |

Update prices in descriptions automatically from `/src/data/pricing.ts` where possible.

### 8.3 Technical SEO requirements

- `app/sitemap.ts` listing all routes and blog posts with `lastModified`; `app/robots.ts` allowing all and pointing to the sitemap
- Canonical URL on every page; `metadataBase` set from `NEXT_PUBLIC_SITE_URL`
- Open Graph and Twitter cards on every page, with a dynamic `next/og` image (page title over the ridgeline, brand blue)
- One H1 per page, logical headings, descriptive internal links (no "click here")
- Clean, keyword-led slugs as listed above; trailing slash off
- Breadcrumbs (visible plus `BreadcrumbList` JSON-LD) on service, work, blog and local pages
- Images: descriptive `alt`, WebP/AVIF, correct sizing, lazy loading below the fold
- Google Search Console verification via meta tag from env; GA4 through `@next/third-parties`
- Redirects: map every URL of the current waadimedia.com site to its new equivalent with 301s in `next.config.ts` (`TODO`: owner exports the old URL list before launch)
- 404 page with helpful links (Services, Pricing, Contact)
- RSS feed for the blog

### 8.4 Structured data (JSON-LD, via a `JsonLd` component)

- **Sitewide:** `ProfessionalService` (name Waadi Media, url, logo, telephone +917780940317, email, `address` with `addressLocality` Anantnag, `addressRegion` Jammu and Kashmir, `addressCountry` IN, `areaServed` India with J&K emphasised, `founder` Furkan Mushtaq, `foundingDate` 2026, `sameAs` social links when available) and `WebSite`
- **Service pages:** `Service` with `provider`, `areaServed`, `offers` (price from the price list, `priceCurrency` INR)
- **Pricing and FAQ sections:** `FAQPage` for every page that shows FAQs
- **Blog posts:** `Article` (author Furkan Mushtaq, datePublished, dateModified, image)
- **Work pages:** `CreativeWork` or `WebSite` for the project
- **Review / AggregateRating:** only add when real, verifiable reviews exist. Never fabricate.

### 8.5 Performance budgets

LCP under 2.0s, CLS under 0.05, INP under 200ms on mobile 4G. First-load JS under 130KB gzipped on the home page. No layout shift from fonts or the ridgeline (reserve its height). Third-party scripts (GA, Cal.com) load after interaction or on idle; the Cal.com embed loads only on `/book-a-call` or when its button is clicked.

---

## 9. Global elements

### 9.1 Floating actions and conversion paths
Every page must offer three one-tap actions: **Call** (`tel:`), **WhatsApp** (`https://wa.me/917780940317?text=...`) and **Book a free call** (`/book-a-call`). WhatsApp text is prefilled per page, for example: "Hi Waadi Media, I'm interested in website design. Can we talk?" Build a helper `whatsappLink(message)` in `/lib/whatsapp.ts`.

### 9.2 Cookie and analytics notice
A small, unobtrusive bar at the bottom-left on first visit: "We use analytics to improve this site. No ads, no tracking across other sites." Buttons: "Accept" and "Decline". Load GA only after Accept `[CONFIRM]`. Link to the Privacy page.

### 9.3 Footer content

- **Brand column:** logo, "Built in the valley. Made for your business.", "Anantnag, Jammu & Kashmir, India"
- **Services:** the 8 services
- **Company:** About, Work, Pricing, Blog, Contact, Book a call
- **Contact:** +91 77809 40317, contact@waadimedia.com, social icons (only those provided)
- **Local:** Web design in Kashmir, Srinagar, Anantnag
- **Bottom bar:** "© 2026 Waadi Media. Made with care in Anantnag, Kashmir.", Privacy, Terms

---

## 10. Page specifications and copy

### 10.1 Home (`/`)

**Section 1: Hero** (signature ridgeline animation, Section 6.2)
- H1 (`display`): **Built in the valley. Made for your business.**
- Lead: *Websites, branding, marketing and software for Kashmir's businesses. Explained simply, priced openly, delivered fast.*
- Buttons: **Book a free call** (primary), **See our work** (secondary)
- Small line under the buttons: "Based in Anantnag. Working with clients across India."
- Ridgeline fills the lower 40% of the viewport. Header is transparent over this section.

**Section 2: Marquee**
Slow-moving service names: Websites, Online stores, SEO, Brand identity, Google and Meta ads, Social media, Software and apps, WhatsApp and AI automation.

**Section 3: Why Waadi** (left: heading; right: four plain statements separated by dividers, not cards)
- Heading (h2): **A local agency that speaks your language.**
- **We understand Kashmir.** We know your customers, your seasons and your market, because we live here.
- **We keep it simple.** No jargon and no long reports you don't need. We tell you what matters and what happens next.
- **Prices you can see.** Our starting prices are on this site. You'll know the cost before you call.
- **We work fast.** Small team, direct line to the person building your project, quick answers.

**Section 4: Services** (list rows from `services.ts`, each with starting price; Section 6.7)
- Heading (h2): **Everything your business needs online.**
- Lead: *Pick one service or let us handle the lot.*
- Link: **See all services** (text link)

**Section 5: Selected work** (three alternating panels from `projects.ts`)
- Heading (h2): **Work we're proud of.**
- Each panel: project name, sector, two-line summary, services used, link **View case study** and **Visit site** (opens new tab, `rel="noopener"`)

**Section 6: How we work** (the only numbered section: it is a true sequence)
- Heading (h2): **How a project works.**
  1. **We talk.** A free 20-minute call. You tell us about your business and goals.
  2. **We plan.** You get a clear scope, a fixed price and a timeline in writing.
  3. **We build.** You see progress along the way and share feedback easily.
  4. **We launch and grow.** We go live, train you, and stay on hand for support and marketing.

**Section 7: Packages preview** (three columns: Starter Launch, Business Launch, Growth; "Most popular" on Business Launch)
- Heading (h2): **Clear packages, clear prices.**
- Link: **Compare all packages** to `/pricing`

**Section 8: Industries**
- Heading (h2): **Built for Kashmir's businesses.**
- Short list with a one-line each: Tourism and hospitality, Education, Horticulture and agriculture, Handicrafts and retail, Startups. Link each to the most relevant service or case study.

**Section 9: Testimonials** (render only if `testimonials.ts` has entries; otherwise hide the whole section)
- Heading (h2): **What clients say.**
- Quote, name, business. Never fabricate.

**Section 10: FAQ** (6 items from `faqs.ts`, with `FAQPage` JSON-LD, see Section 11.4)

**Section 11: Final call-to-action band** (center aligned, ridgeline behind)
- Heading (h2): **Have an idea, or a website that needs a fresh start?**
- Lead: *Tell us about it. The first call is free and there is no pressure.*
- Buttons: **Book a free call**, **Message on WhatsApp**

---
### 10.2 Services overview (`/services`)

- H1: **Digital services for Kashmir's businesses**
- Lead: *One team for your website, brand, marketing and software. Start with what you need today and add more as you grow.*
- The 8 services as rows (same component as the home page), each with a short description and "From ₹X".
- Below the list: "Not sure where to start?" with buttons **Book a free call** and **Message on WhatsApp**.
- Final section: package teaser linking to `/pricing`.

### 10.3 Service page template (all 8 pages use the same structure)

1. **Hero:** H1, intro paragraph, "Starting from ₹X" tag, buttons **Get a quote** (scrolls to the quote form at the bottom of the page) and **Message on WhatsApp**
2. **What's included:** checklist
3. **How it works:** 3 to 4 short steps
4. **Pricing table:** the service's `priceItems`, each with price and unit, and a note "Final price depends on your project. Get an exact quote after a free call."
5. **Related work:** the most relevant project panel
6. **FAQs:** 3 questions (with `FAQPage` JSON-LD)
7. **Related services:** two links
8. **Quote form:** the same form as `/contact`, with this service pre-selected

---

#### Service 1: Website design and development
**Slug** `website-design-development` | **Starting price** ₹5,000 (landing page)
- **H1:** Website design and development in Kashmir
- **Intro:** Your website is the shop window for people who never walked past your door. We design and build fast, clear websites that look right on every phone and help visitors call, message or buy.
- **Included:** Design made for your business, not recycled templates • Mobile-first, fast loading pages • On-page SEO: titles, descriptions, schema, sitemap, speed • Contact form and WhatsApp button • Google Analytics and Search Console set up • Simple training so you can manage your site • Help with domain and hosting
- **How it works:** Talk about your goals • Agree pages, price and timeline • Design and build with your feedback • Launch, train and support
- **Price items:** Landing page ₹5,000 • Website redesign or speed optimization ₹12,000 • Business website, 5 pages with on-page SEO ₹15,000 • CMS-based website (WordPress or headless) ₹25,000 • Custom web app or portal ₹75,000 • Website maintenance plan ₹1,500 per month
- **FAQs:** *How long does a website take?* A landing page usually takes 3 to 5 days and a business website 2 to 3 weeks. We confirm the exact date before we start. `[CONFIRM]` • *Can I edit the website myself?* Yes. With a CMS-based site we train you to update text, images and pages without a developer. • *Do you also build the SEO?* Yes. Every website includes on-page SEO so Google can understand and rank it.

#### Service 2: E-commerce websites
**Slug** `ecommerce-websites` | **Starting price** ₹35,000
- **H1:** E-commerce websites for Kashmir's sellers
- **Intro:** From saffron and dry fruits to shawls and handicrafts, Kashmir makes things the whole country wants. We build online stores that let you sell beyond the valley, with simple payments and easy order management.
- **Included:** Product catalogue with categories and search • UPI, card and net banking payments • Shipping and delivery setup • Order emails and WhatsApp notifications • Product-page SEO • Analytics and conversion tracking • Training to add products and manage orders
- **How it works:** Plan products and shipping • Design and build the store • Test orders and payments • Launch and promote
- **Price items:** E-commerce store ₹35,000 • Payment gateway integration ₹5,000 • E-commerce Launch package ₹60,000 (see packages)
- **FAQs:** *Which platform do you use?* We choose between Shopify, WooCommerce or a custom build depending on your products and budget, and explain why. • *Can I accept UPI?* Yes. We set up UPI, cards and net banking through a trusted payment gateway. • *Can you help with product photos?* Yes. See our photography and content service.

#### Service 3: SEO
**Slug** `seo` | **Starting price** ₹2,000
- **H1:** SEO services in Kashmir: get found on Google
- **Intro:** When someone nearby searches for what you sell, you should show up. We improve your Google Business Profile and your website so the right customers find you.
- **Included:** Google Business Profile setup and optimization • Technical and on-page SEO audit • Keyword research and content plan • Local SEO for Srinagar, Anantnag and your area • Monthly reports in plain language
- **How it works:** Audit your current position • Fix the basics • Publish helpful content • Track and improve every month
- **Price items:** Google Business Profile setup ₹2,000 • SEO audit ₹5,000 • Local SEO ₹5,000 per month • Keyword research and content strategy ₹6,000 • Full SEO retainer ₹10,000 per month
- **FAQs:** *How long until I see results?* SEO is steady, not instant. Most businesses see movement in 3 to 6 months. We never promise a number-one ranking, and we show you what is improving. • *Do you need access to my website?* Yes, to make the fixes. We only change what we agree on. • *Is monthly SEO needed?* Setup helps right away; monthly work keeps you ahead as competitors improve.

#### Service 4: Brand identity
**Slug** `brand-identity` | **Starting price** ₹3,000
- **H1:** Brand identity and logo design in Kashmir
- **Intro:** People judge a business in seconds. A clear logo, colors and style make you look trusted before you say a word.
- **Included:** Logo with files for print and web • Colors and fonts chosen for your business • Brand guideline so everyone uses it correctly • Templates for social media, stationery and presentations
- **How it works:** Learn about your business • Show direction and options • Refine together • Deliver all files
- **Price items:** Social media templates, set of 10 ₹3,000 • Logo design ₹3,500 • Pitch deck design ₹5,000 • Full brand identity kit ₹15,000
- **FAQs:** *Do I own the logo?* Yes, once the project is paid for, you own the final design. `[CONFIRM]` • *How many logo options do I get?* We start with a direction we believe in, and refine it with you. `[CONFIRM]` • *Can you refresh an existing logo?* Yes.

#### Service 5: Digital advertising
**Slug** `digital-advertising` | **Starting price** ₹3,000
- **H1:** Google and Meta ads management in Kashmir
- **Intro:** Ads can bring customers this week, not next year. We set up and manage Google, Facebook and Instagram ads so your money goes toward real enquiries.
- **Included:** Campaign setup and targeting • Ad design and copy • Conversion tracking so we know what works • Monthly reports in plain language
- **How it works:** Set goals and budget • Build and launch campaigns • Watch results daily • Improve and report monthly
- **Price items:** Analytics and conversion tracking setup ₹3,000 • Monthly reporting dashboard ₹3,000 per month • Meta Ads management ₹8,000 per month • Google Ads management ₹10,000 per month
- **Note shown on the page:** Ad spend is paid by you directly to Google or Meta. Our fee covers the work of managing the ads.
- **FAQs:** *How much should I spend on ads?* We suggest a starting budget after learning your goals, and you can change it any time. • *Do I own the ad accounts?* Yes. Accounts are in your name. `[CONFIRM]` • *Is there a minimum contract?* Monthly services run on a 3-month minimum so we have time to test and improve. `[CONFIRM]`

#### Service 6: Social media and content
**Slug** `social-media-content` | **Starting price** ₹1,000
- **H1:** Social media and content for Kashmir businesses
- **Intro:** Consistent, good-looking content keeps customers coming back. We plan, design and post so you can focus on running your business.
- **Included:** Monthly content calendar • 12 designed posts and reels per month • Captions and hashtags • Product photography and short videos • Website and ad copywriting • Email campaigns
- **How it works:** Plan the month • Create content • Post and engage • Review and improve
- **Price items:** Copywriting ₹1,000 per page • Email marketing ₹5,000 per month • Product photoshoot ₹5,000 • Promo or reel video ₹8,000 • Social media management, 12 posts and reels ₹8,000 per month
- **FAQs:** *Which platforms do you cover?* Instagram and Facebook first, with LinkedIn and YouTube as needed. • *Will you visit for photoshoots?* We arrange shoots depending on the location and project. `[CONFIRM]` • *Can I approve posts before they go live?* Yes, always.

#### Service 7: Custom software and apps
**Slug** `custom-software-apps` | **Starting price** ₹60,000
- **H1:** Custom software and app development in Kashmir
- **Intro:** When off-the-shelf tools don't fit, we build software that does. Booking systems, CRMs, dashboards and mobile apps made around how your business actually works.
- **Included:** A short discovery phase to define what you need • Web or mobile (Android, iOS) • Secure login and data storage • Admin dashboard • Training and handover
- **How it works:** Define the problem • Design the flow • Build in stages you can review • Launch and support
- **Price items:** Mobile app (Android or iOS) ₹60,000 • Custom software: CRM, booking system or ERP ₹80,000 • Custom Tech Build package ₹80,000+
- **Proof:** link to the SmartHire case study ("An AI hiring platform we built from scratch")
- **FAQs:** *Can you build just a first version?* Yes. We recommend starting with the smallest useful version and growing it. • *Who owns the code?* You do, once the project is paid for. `[CONFIRM]` • *Do you support it after launch?* Yes, with a monthly support plan.

#### Service 8: Automation and AI
**Slug** `automation-ai` | **Starting price** ₹5,000
- **H1:** WhatsApp automation and AI chatbots in Kashmir
- **Intro:** Customers expect fast replies. We automate the repeat work, such as answering common questions, sending confirmations and following up, so nothing slips through.
- **Included:** WhatsApp and SMS automation • AI chatbot trained on your business information • Payment gateway and API integrations • Booking confirmations and reminders
- **How it works:** Find the repeat tasks • Design the flow • Build and test • Launch and tune
- **Price items:** Payment gateway or API integration ₹5,000 • WhatsApp or SMS automation ₹5,000 • AI chatbot ₹15,000
- **Proof:** link to SmartHire (AI applied to real hiring).
- **FAQs:** *Will a chatbot replace my staff?* No. It handles the common questions so your team can focus on real conversations. • *Can the chatbot speak Urdu or Kashmiri?* We build in English first and can discuss other languages for your project. • *Is it safe with customer data?* We only collect what is needed and explain how it is stored.

---

## 11. Pricing, packages and calculator

### 11.1 Pricing data (`/src/data/pricing.ts`, the only source of truth)

All prices in INR. "Starting" prices: final price depends on scope.

| ID | Service | Item | Price | Unit |
|---|---|---|---|---|
| gbp | seo | Google Business Profile setup | 2000 | one-time |
| social-templates | brand-identity | Social media templates (set of 10) | 3000 | one-time |
| analytics | digital-advertising | Analytics and conversion tracking setup | 3000 | one-time |
| report | digital-advertising | Monthly reporting dashboard | 3000 | per month |
| logo | brand-identity | Logo design | 3500 | one-time |
| landing | website-design-development | Landing page | 5000 | one-time |
| seo-audit | seo | SEO audit (technical and on-page) | 5000 | one-time |
| local-seo | seo | Local SEO | 5000 | per month |
| pitch-deck | brand-identity | Pitch deck design | 5000 | one-time |
| email | social-media-content | Email marketing | 5000 | per month |
| photoshoot | social-media-content | Product photoshoot | 5000 | one-time |
| gateway | automation-ai | Payment gateway or API integration | 5000 | one-time |
| whatsapp-auto | automation-ai | WhatsApp or SMS automation | 5000 | one-time |
| keywords | seo | Keyword research and content strategy | 6000 | one-time |
| meta-ads | digital-advertising | Meta Ads management | 8000 | per month |
| social-mgmt | social-media-content | Social media management (12 posts and reels) | 8000 | per month |
| video | social-media-content | Promo or reel video | 8000 | one-time |
| google-ads | digital-advertising | Google Ads management | 10000 | per month |
| seo-retainer | seo | Full SEO retainer | 10000 | per month |
| redesign | website-design-development | Website redesign or speed optimization | 12000 | one-time |
| brand-kit | brand-identity | Full brand identity kit | 15000 | one-time |
| business-site | website-design-development | Business website (5 pages, on-page SEO) | 15000 | one-time |
| chatbot | automation-ai | AI chatbot | 15000 | one-time |
| cms-site | website-design-development | CMS-based website | 25000 | one-time |
| ecommerce | ecommerce-websites | E-commerce store | 35000 | one-time |
| mobile-app | custom-software-apps | Mobile app (Android or iOS) | 60000 | one-time |
| web-app | website-design-development | Custom web app or portal | 75000 | one-time |
| custom-software | custom-software-apps | Custom software (CRM, booking, ERP) | 80000 | one-time |
| maintenance | website-design-development | Website maintenance plan | 1500 | per month |
| copywriting | social-media-content | Copywriting (per page) | 1000 | one-time |

Format all prices with `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })`.

### 11.2 Packages (`/src/data/packages.ts`)

| Package | Price | For | Includes |
|---|---|---|---|
| **Starter Launch** | ₹15,000 one-time | A new business that needs to get online | Logo, 3 to 5 page website, basic on-page SEO, Google Business Profile |
| **Business Launch** (Most popular) | ₹35,000 one-time | A business that wants a proper brand and site | Brand identity kit, 7-page CMS website, on-page SEO, analytics setup, 1 month of support |
| **Growth** | ₹15,000 per month | A business with a site that wants more customers | SEO, social media management, one ad platform, monthly report |
| **E-commerce Launch** | ₹60,000 one-time | A seller ready to sell online | Brand kit, online store, payment integration, product SEO, tracking |
| **Scale** | ₹30,000 per month | A business ready to grow across channels | SEO, social media, Google and Meta ads, email marketing, content, reporting |
| **Custom Tech Build** | ₹80,000+ one-time | A business that needs software or an app | Mobile app or custom software with automation and integrations |

Notes shown under the packages: "Monthly packages run on a 3-month minimum." `[CONFIRM]` "Ad spend is paid directly to Google or Meta." "Packages cost less than buying each service separately." `[CONFIRM]` Each package card has the buttons **Get this package** (opens `/contact?package=<id>`) and **Ask on WhatsApp**.

### 11.3 Pricing page (`/pricing`)

- **H1:** Prices you can see before you call
- **Lead:** *These are starting prices. Your final quote depends on what you need, and we tell you exactly what it will be after a free call. No hidden costs.*
- **Section A: Packages** (Section 11.2 layout; a toggle "One-time" / "Monthly" filters them)
- **Section B: Price list** (tabs per service category, using the pricing table; each row has a "Get a quote" link that opens `/contact?service=<id>`)
- **Section C: Calculator** (Section 11.5)
- **Section D: What affects the price** (plain list): number of pages • custom features • how much content you already have • how fast you need it • how long we support you after launch
- **Section E: FAQ** (payment, timelines, ownership, GST)
- **Final CTA band**

### 11.4 FAQs (`/src/data/faqs.ts`, shown on Home, Pricing and contextually on service pages)

1. **How much does a website cost?** A landing page starts at ₹5,000 and a 5-page business website at ₹15,000. The final price depends on your pages and features. We give you a fixed price in writing before we start.
2. **How long does it take?** Typical times: landing page 3 to 5 days, business website 2 to 3 weeks, online store 3 to 5 weeks. `[CONFIRM]`
3. **Do you only work with businesses in Kashmir?** No. We are based in Anantnag and work mostly with Kashmir businesses, but we serve clients across India.
4. **How do payments work?** For one-time projects, 50% to start and 50% on delivery. Monthly services are billed at the start of each month. `[CONFIRM]`
5. **Can I update the website myself later?** Yes. For sites with a CMS we train you. You can also choose a maintenance plan and we do updates for you.
6. **Who owns the website?** You do. Once the project is paid for, the domain, content and design files are yours. `[CONFIRM]`
7. **Do you run ads too?** Yes, on Google, Facebook and Instagram. Ad spend is paid by you directly to the platform.
8. **I'm not technical. Is that okay?** Yes, that's who we work best with. We explain everything in simple words and only share what you need to know.
9. **Are prices inclusive of GST?** `[CONFIRM]` (owner to decide; show a clear statement on the pricing page either way)

### 11.5 Pricing calculator (`/components/calculator`)

**Purpose:** let a visitor build a rough estimate in under a minute and turn it into a WhatsApp message or quote request.

**UI:** two columns on desktop (options left, sticky summary right), stacked on mobile with a sticky summary bar at the bottom.
- Step 1: "What do you need?" Grouped checkboxes per service category using `pricing.ts` items (each shows price and unit). Include quick-start chips: "New business", "Online store", "Get more customers" that pre-select sensible item sets.
- Step 2: "Tell us a little about you" (optional): business type (Tourism, Education, Horticulture, Retail, Startup, Other).
- **Summary:** two totals, **One-time (from)** and **Monthly (from)**. Show selected items with remove buttons.
- **Bundle saving** `[CONFIRM]`: when 3 or more one-time items are selected, apply a 10% saving to the one-time total, shown as a separate line ("Bundle saving"). The rate is a constant in `site.ts`.
- Totals animate with a short count (400ms). Never show a fake "exact" price: label it "Estimated starting price" with the note "Your final quote comes after a free call."
- Selection is stored in the URL query (shareable) and in React state. No localStorage.
- **Actions:** **Send on WhatsApp** (prefilled message listing items and totals), **Get an exact quote** (to `/contact` with items pre-filled), **Book a free call**.
- **Analytics:** `calculator_used` on first interaction and `calculator_cta_click` with the chosen action.
- Accessible: real checkboxes with labels, totals in an `aria-live="polite"` region.

---
### 10.4 Work (`/work`) and case studies

**`/work`:** H1 **Work we're proud of.** Lead: *A few projects that show how we think and build.* The three projects as large panels (Section 6.7). Below: "Want to be next?" with **Book a free call**.

**Case study template:** hero (project name, sector, services, **Visit live site**, cover mockup) • Overview • The challenge • What we did • Highlights • Results (only if verified numbers or quotes exist, otherwise hide) • Client quote (only if real) • Next project. Add `CreativeWork` JSON-LD and a visible "Visit site" link opening in a new tab.

All three drafts below are written from the owner's description and screenshots and are `[CONFIRM]` for accuracy before launch. **Do not add numbers or results that are not listed here.**

#### Project 1: Wonder Delight Tours & Travels
- **Slug** `wonder-delight-tours-travels` | **Sector** Tourism | **Live** https://wonderdelighttravels.com/
- **Summary:** A complete website and custom CMS for a Kashmir tour and travel agency, built quickly with strong SEO and a clean booking-focused design.
- **Services:** Website design and development, SEO, custom CMS
- **Overview:** Wonder Delight Tours & Travels plans Kashmir trips: tour packages, hotels, private transport and local guides. They needed a website that makes planning a trip feel easy and trustworthy.
- **The challenge:** Visitors planning a Kashmir trip compare many agencies in minutes. The site had to load fast, explain packages clearly, and make it easy to ask for a quote or book, while letting the team manage their own content.
- **What we did:** Handled the project end to end. Designed and built the website, set up on-page SEO, and created a custom CMS so the team can update tours, destinations and content themselves.
- **Highlights:** Tour packages, destinations, transport and travel guide pages • A "find your Kashmir getaway" search by destination, budget and month • Customize-trip and get-quote flows • Best-time-to-visit guidance for SEO • A custom CMS for the team
- **Results:** `TODO` (add only real numbers, for example ranking or enquiry changes)
- **Quote:** `TODO`

#### Project 2: Kaali Edge
- **Slug** `kaali-edge` | **Sector** Education | **Live** https://www.kaaliedge.com/
- **Summary:** A trust-first website for an education consultancy that guides Kashmiri students toward careers abroad.
- **Services:** Website design and development, SEO, blog setup
- **Overview:** Kaali Edge is an educational consultancy in Kashmir helping students and families choose where to study. Choosing a university abroad is a big decision, so trust matters more than anything.
- **The challenge:** Families need clear, honest information before they ever make a call. The site had to feel calm and credible, explain services and destinations simply, and make a free consultation easy to book.
- **What we did:** Designed a calm, premium look with a soft mountain backdrop and elegant serif headlines, structured the service and destination pages, built a blog for search, and added a prominent free-consultation button and WhatsApp chat.
- **Highlights:** Clear service and destination pages • Free consultation call-to-action on every page • Blog for search visibility • WhatsApp chat button
- **Results:** `TODO` | **Quote:** `TODO`

#### Project 3: SmartHire
- **Slug** `smarthire` | **Sector** AI software | **Live** https://smarthire-beige.vercel.app/
- **Summary:** An AI hiring platform that takes candidates and recruiters through four hiring stages in one place, designed to make hiring fairer. Built as an engineering final-year project.
- **Services:** Custom software, AI integration, full-stack development
- **Overview:** SmartHire brings the whole hiring process into a single application for candidates and recruiters, from first screening to final interview.
- **The challenge:** Hiring is often slow, scattered across tools and open to bias. The goal was a platform where every candidate goes through the same structured process.
- **What we did:** Built the full application: resume screening with AI, a multiple-choice round, a coding interview for technical roles, and a video call interview, all in one workflow.
- **Highlights:** Four stages in one platform • AI-assisted resume screening • Coding interview for technical jobs • Built-in video interviews • Designed for unbiased, consistent evaluation
- **Label on the page:** "Engineering final-year project", shown honestly as a software capability demo.
- **Results:** none to claim. **Quote:** none.

### 10.5 About (`/about`)

- **H1:** A Kashmiri agency that explains technology in plain words
- **Story (3 short paragraphs):**
  - *Waadi means valley. We chose the name because it's where we're from, and because a valley is where things grow.*
  - *Waadi Media started in Anantnag in 2026. It began with our founder, Furkan Mushtaq, building websites for local businesses. Now it's a full agency, so a business can get its brand, website, marketing and software from one team.*
  - *We kept seeing the same problem. Good Kashmiri businesses were held back because technology felt confusing, and many agencies spoke in jargon, hid their prices or were far away. We decided to do it differently: speak plainly, show prices, and stay close.*
- **What we stand for** (4 short statements in a list, no cards):
  - **Plain words.** If we can't explain it simply, we haven't understood it.
  - **Honest prices.** You see them before you call.
  - **Local first.** We build for Kashmir's businesses and Kashmir's customers.
  - **Built to last.** Fast, clear and easy to maintain.
- **Who you'll work with:** **Furkan Mushtaq, founder and developer.** Computer science engineer from Anantnag. He builds the websites and software and talks to clients directly. `[CONFIRM bio]` *When a project needs a designer, writer, photographer or video creator, we bring in trusted creators from our circle.*
- **Illustration:** the "quiet valley at dawn" AI illustration (Section 6.9)
- **CTA band:** Have a project in mind? **Book a free call**

### 10.6 Contact (`/contact`)

- **H1:** Let's talk about your business
- **Lead:** *Call, message or write. Whatever's easiest. We reply within one business day.* `[CONFIRM]`
- **Left column:** big tappable rows for Call (+91 77809 40317), WhatsApp, Email (contact@waadimedia.com), plus business hours `[CONFIRM]` and "Anantnag, Jammu & Kashmir"
- **Right column: contact form**

| Field | Type | Rules |
|---|---|---|
| Name | text | required |
| Phone or WhatsApp | tel | required, validated for Indian numbers (10 digits, optional +91) |
| Email | email | optional |
| What do you need? | multi-select chips | the 8 services plus "Not sure yet" |
| Budget | select | Under ₹10,000 • ₹10,000 to ₹25,000 • ₹25,000 to ₹60,000 • ₹60,000+ • Not sure |
| Tell us about your business | textarea | required, 10 to 2,000 characters |
| (hidden honeypot) | text | must be empty |

Prefill from query params: `?service=<id>`, `?package=<id>`, and calculator items.

- **Button:** **Send message.** Loading label: "Sending". Success state (inline, no page reload): **Thanks, we got your message.** *We'll reply on WhatsApp or by email within one business day. If it's urgent, call +91 77809 40317.* Failure: **Your message didn't send.** *Check your connection and try again, or message us on WhatsApp.* Field errors: "Enter your name", "Enter a 10-digit phone number", "Tell us a little about your business (at least 10 characters)".
- **Below the form:** the Google Maps embed (Section 2) in a 28px-radius frame, with the "quiet shikara" illustration beside it on desktop.

**API (`/api/contact`):** validate with the same zod schema server-side; reject if honeypot filled or if submitted under 3 seconds after load; basic rate limit per IP (for example 5 per hour; use Upstash Redis if available, otherwise in-memory with a note that it resets); send an email via Resend to `CONTACT_TO_EMAIL` with all fields and the page the visitor came from; send a short confirmation email to the visitor if they gave an email. Return JSON `{ ok: true }` or a typed error. Never log personal data.

### 10.7 Book a call (`/book-a-call`)

- **H1:** Book a free call
- **Lead:** *20 minutes, no pressure. Tell us about your business and we'll suggest the right next step.*
- Cal.com inline embed (event type "Free 20-minute call"), loaded on this page only. Under the embed: "Prefer to talk now? **Call** or **WhatsApp** us."
- If the embed fails to load, show the Call, WhatsApp and Contact form options instead.
- Fire `book_call_scheduled` from the Cal.com booking-success callback.

### 10.8 Blog (`/blog`)

- **H1:** Notes from the valley
- **Lead:** *Plain-language guides on websites, search, branding and growing a business in Kashmir.*
- List page: featured latest post, then a grid by date; category chips (Websites, SEO, Branding, Advertising, Business).
- Post front matter: `title, slug, description, date, updated, category, keyword, cover (optional), draft`.
- Post page: title, date, reading time, author (Furkan Mushtaq), table of contents for posts over 1,000 words, reading-progress bar, copy-link and WhatsApp share, related posts (2), and an end-of-post box: **"Want help with this? Book a free call."** Add `Article` JSON-LD and breadcrumbs.
- Cover images are generated (`next/og`) from the title over the ridgeline.
- Cadence target: 2 posts a month `[CONFIRM]`.

**Launch posts (briefs; each 1,200 to 1,800 words, plain language, practical):**

| # | Title | Target keyword |
|---|---|---|
| 1 | How much does a website cost in Kashmir? A 2026 price guide | website cost Kashmir |
| 2 | Why every Kashmir business needs a Google Business Profile (and how to set one up) | Google Business Profile Kashmir |
| 3 | Do you need a website, or is an Instagram page enough? | website vs Instagram for business |
| 4 | How to sell Kashmiri products online: saffron, dry fruits and handicrafts | sell Kashmiri products online |
| 5 | Local SEO for Srinagar businesses: a simple checklist | local SEO Srinagar |
| 6 | WordPress or a custom website: which is right for your business? | WordPress vs custom website |
| 7 | 7 things to ask before you hire a web design agency | hire web design agency |
| 8 | How Kashmir tour operators can get more direct bookings | tour operator website Kashmir |
| 9 | How education consultancies build trust online | education consultancy website |
| 10 | Why a slow website costs you customers (and how to fix it) | website speed |

The build agent writes posts 1 to 3 as MDX drafts (`draft: true`) so the owner can review accuracy before publishing. Do not invent statistics or sources in posts.

### 10.9 Local landing pages

Each local page must contain **genuinely unique content** (at least 700 words), not a copy of another page with the city swapped. Structure: H1 • intro • why a local agency matters here • services most relevant to businesses in this place • a small FAQ unique to the place • case study link • Google Map • CTA.

| Page | H1 | Opening copy | Unique angle |
|---|---|---|---|
| `/web-design-agency-kashmir` | Web design agency in Kashmir | *Kashmir's businesses have more to offer than ever, from tourism and horticulture to crafts and education. Waadi Media is a web design and digital agency from Anantnag that helps them get found, trusted and booked online.* | Statewide view; industries and seasons; selling beyond the valley; link to all three case studies |
| `/web-design-agency-srinagar` | Web design agency for Srinagar businesses | *Srinagar is Kashmir's business hub: hotels, houseboats, retailers, clinics, schools and startups. If you run one, your customers are searching for you on their phones right now.* | City business mix; Google Business Profile and local search in Srinagar; hospitality and retail focus; meeting by call, WhatsApp or in person `[CONFIRM]` |
| `/web-design-agency-anantnag` | Web design agency in Anantnag | *Waadi Media is based right here in Anantnag. We know the market, the shops, orchards and offices, and we're close enough to meet in person when it helps.* | Home-town story; Anantnag and south Kashmir businesses; horticulture and local retail; embedded map showing the real location |

Internal linking: each local page links to the pricing page, 3 relevant services and 1 case study; the footer links to all three.

### 10.10 Legal pages

- **`/privacy`:** what we collect (contact form fields, analytics data, call-booking details), why, which services process it (Vercel, Resend, Google Analytics, Cal.com), how long we keep it, how to ask for deletion, and contact details. Reference India's Digital Personal Data Protection Act, 2023, in plain words.
- **`/terms`:** use of the site, estimates are not offers until a written quote is accepted, intellectual property, limitation of liability, governing law India with courts at Anantnag, J&K `[CONFIRM]`.
- Write both in plain language. Mark at the top of each file: "Draft: have a qualified legal professional review before launch." Do not display that note on the live site, keep it as a code comment and in the PR notes.

### 10.11 404 page
H1: **This page has wandered off.** *Try one of these instead:* Services, Pricing, Work, Contact. Include the ridgeline.

---

## 12. Analytics and tracking

GA4 via `@next/third-parties`, loaded after consent (Section 9.2). Custom events through `/lib/analytics.ts`:

| Event | When |
|---|---|
| `click_whatsapp` | Any WhatsApp link (param: location, for example header, floating, footer, calculator) |
| `click_call` | Any `tel:` link |
| `click_email` | Any `mailto:` link |
| `form_start` / `form_submit` / `form_error` | Contact form |
| `book_call_view` / `book_call_scheduled` | Book-a-call page and Cal.com callback |
| `calculator_used` / `calculator_cta_click` | Pricing calculator |
| `cta_click` | Primary buttons (param: label, location) |
| `outbound_click` | Live project links |
| `blog_read_75` | 75% scroll on a blog post |

Mark `form_submit`, `click_whatsapp`, `click_call` and `book_call_scheduled` as key events in GA4.

---

## 13. Quality bar and acceptance criteria

- [ ] All routes in Section 7 exist and match the copy in this document
- [ ] Mobile-first: perfect at 360px width, no horizontal scroll, comfortable at 1440px
- [ ] Lighthouse mobile 95 or higher (Performance, Accessibility, Best Practices, SEO) on Home, a service page, Pricing, a blog post
- [ ] Core Web Vitals within the budgets in Section 8.5
- [ ] WCAG 2.2 AA: keyboard-navigable, visible focus, correct contrast, reduced motion respected
- [ ] Contact form works end to end (email arrives, confirmation sent, errors handled)
- [ ] Cal.com booking works and fires the event
- [ ] WhatsApp links open with the correct number and prefilled text
- [ ] Calculator totals are correct for every combination (write unit tests for the totals function)
- [ ] Every page has a unique title, description, canonical, Open Graph image, and correct JSON-LD
- [ ] No invented testimonials, numbers or logos anywhere
- [ ] `next build` passes with no TypeScript or ESLint errors; no console errors
- [ ] Sitemap, robots and RSS validate
- [ ] Light mode only; no theme flash; no layout shift from fonts or the ridgeline

---

## 14. Build phases (for Antigravity)

After each phase: run typecheck, lint and build, review in the browser at 360px and 1440px, then continue.

| Phase | Scope |
|---|---|
| 0. Scaffold | Next.js + TypeScript + Tailwind; tokens (Section 6.4); fonts; `site.ts`; all data files with the content above; folder structure |
| 1. Design system | Ridgeline SVG; Header, Footer, floating actions and mobile bar; buttons, inputs, accordion, marquee, magnetic button; motion helpers |
| 2. Home | All 11 sections with the hero signature animation |
| 3. Services and pricing | Service template, 8 service pages, services overview, pricing page, calculator with tests |
| 4. Work, About, Contact | Case studies, About, Contact form + API + emails, Book a call |
| 5. Content | Blog system with first 3 draft posts, 3 local pages, legal pages, 404 |
| 6. SEO and analytics | Metadata, JSON-LD, sitemap, robots, RSS, OG images, GA events, cookie notice, redirects |
| 7. Hardening | Lighthouse and accessibility pass, cross-browser check, content review against this PRD, Vercel preview |

### Launch checklist
1. Owner supplies the assets in Section 15 and answers the open items in Section 16
2. Deploy to Vercel preview; owner reviews all pages on a real phone
3. Verify the Resend domain (SPF and DKIM) so emails land in the inbox
4. Add the 301 redirects from the old site's URLs
5. Point waadimedia.com DNS to Vercel; confirm HTTPS
6. In Search Console: submit the sitemap and request indexing of key pages
7. In GA4: confirm events and key events fire
8. Update the Google Business Profile website link and add the new site to all social profiles
9. Test contact form, WhatsApp, call and booking on a live phone
10. Keep a backup of the old site for 30 days

---

## 15. Assets to supply

| Asset | Status |
|---|---|
| Logo | **Only `waadi_logo.jpeg` exists.** Provide an SVG or transparent PNG. Until then, recreate the wordmark in code (Outfit, bold, "waadi" in `--blue` over "media.com" in black) for the header and use the JPEG for Open Graph fallback |
| Favicon and app icons | Create from a simplified blue "w" mark: 32px, 180px, 512px, plus `icon.svg` |
| Project screenshots | Wonder Delight and Kaali Edge homepage screenshots provided; **SmartHire screenshot needed**; ideally 2 more screens per project |
| Testimonials and reviews | Owner has them; supply as `name, business, quote` (and written permission) |
| Social links | `TODO` |
| Cal.com account and event | `TODO` (create a free account, event "Free 20-minute call") |
| Resend account | `TODO` (add and verify waadimedia.com) |
| Street address | `TODO` (optional) |
| Old site URL list | `TODO` (for redirects) |
| Photo of Furkan | Optional for the About page |

---

## 16. Open items to confirm (everything tagged `[CONFIRM]`)

Business hours • "reply within one business day" • project timelines • payment terms (50/50) • ownership of design and code after payment • 3-month minimum on monthly services • "packages cost less than separate services" and the 10% bundle saving • GST wording • cookie-banner behavior • success-metric targets • exact brand blue (sample from logo) • founder bio wording • case-study wording for all three projects • AI-generated illustration style • meeting in person in Srinagar • which social profiles to link.

---

## 17. Appendix: kickoff prompt to paste into Antigravity

> Read `PRD.md` completely. You are building the Waadi Media website exactly as specified. Follow Section 0 rules strictly: never invent testimonials, numbers or logos; keep all content in typed data files; use the copy as written; light mode only; Next.js App Router with TypeScript, Tailwind and `motion`. Start with Phase 0 (scaffold, tokens, fonts, data files), then stop and show me the project structure and the tokens before moving to Phase 1. After each phase, run typecheck, lint and build, and tell me what to review.


go throung this rd we will redegin the website entirely
remove everything we have and we will make the website like this