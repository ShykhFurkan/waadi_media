# Redesign R: "Quiet valley luxury"

The site works, but it feels plain. Keep every route, all business content, pricing data, SEO metadata, JSON-LD, analytics events, the contact API and the tests exactly as they are. Change the visual design, layout rhythm, imagery slots and motion. This brief supersedes PRD Section 6 and the layout of Section 10. Copy stays as written in the PRD unless a layout needs a shorter line. Never invent facts, testimonials or numbers. Light mode only.

## DIRECTION: "Quiet valley luxury"
Editorial, high-contrast serif headlines at very large sizes, generous space, depth through layering, real imagery, one signature ridgeline moment, and refined motion. Luxury here is restraint plus craft: nothing flashy, everything intentional. The audience includes non-technical owners on mid-range Android phones, so rich effects are a bonus on desktop and every page must stay fast, clear and usable on mobile.

## HARD CONSTRAINTS
- Mobile Lighthouse: Performance 90 or higher, Accessibility 100, SEO 100, LCP 2.5s or less, CLS 0.05 or less, TBT 150ms or less. First-load JS on mobile for the home page 190KB gzipped or less.
- The hero H1 and lead text must be in the server-rendered HTML and visible at first paint. Animate them only with CSS transform masks, never opacity 0 until JavaScript runs.
- No blocking preloader. No scroll-hijacking that disables the wheel.
- Respect prefers-reduced-motion everywhere: all motion off, content visible instantly.
- Heavy libraries (Lenis, GSAP) are never downloaded on mobile or touch devices. Verify in the Network tab.
- Animate only transform, opacity and clip-path.

---

## 1. COLOR TOKENS (replace in globals.css)
- `--snow` `#F5F8FC` (page)
- `--pearl` `#EDF1F7` (alt sections)
- `--paper` `#FFFFFF` (surfaces)
- `--ink` `#000000` (headings, wordmark)
- `--graphite` `#2F343D` (body)
- `--mist` `#667085` (secondary text)
- `--line` `#E1E7F0` (borders)
- `--blue` `#0057FF` (buttons, links, active)
- `--blue-deep` `#0039B3` (hover)
- `--blue-tint` `#EAF1FF` (selected states)
- `--navy` `#0A1A3F` (anchor)
- `--saffron` `#B8893B` (metallic accent)

### Rules
- Saffron is decorative only (hairlines, thin rules, small ornaments, hover underlines, and text of 28px or larger). Never saffron for body text on light backgrounds. Saffron is at most 5% of any screen.
- Blue is the only action color.
- Build a `Section` component with `tone="light" | "pearl" | "anchor"`. The "anchor" tone (navy background, white text) must be fully built and accessible but NOT used on any page for now. Add a flag in `site.ts` (`ui.anchorSections = false`).

---

## 2. TYPOGRAPHY
- **Display (headings 40px and up):** Cormorant Garamond, weights 500 and 600 plus italic 500, via `next/font/google`.
- **UI and body:** Outfit 400, 500, 600 (keep).
- **Blog reading text and small headings (h3, h4, card titles under 32px):** Newsreader 400, 500 and italic 400.
- Never use Cormorant below 40px (thin strokes get fragile). Use `font-display: swap` with `next/font`'s automatic fallback metrics so there is no layout shift. Preload only the weights used above the fold.
- **Scale (fluid):**
  - display: `clamp(3.25rem, 9.5vw, 9rem)`, line-height `0.94`, tracking `-0.035em`
  - h1: `clamp(2.75rem, 6.5vw, 6rem)`, line-height `0.98`
  - h2: `clamp(2.25rem, 4.6vw, 4.25rem)`, line-height `1.02`
  - h3: Newsreader `1.5 to 2rem`
  - lead: Outfit 300 `1.125 to 1.5rem`
  - body: `17 to 18px`, line-height `1.65`, `60 to 68ch`
- Italic is for a whole phrase or sentence, never a single highlighted word. Sentence case everywhere, no tracked all-caps labels, no arrows on buttons.
- Prices use lining, tabular figures. Check that Cormorant renders lining numerals; if it does not, set prices in Newsreader.
- Build a temporary noindex page at `/dev/type-specimen` showing the hero H1, h2, a price and an italic line at 360px and 1440px in Cormorant Garamond and in Bodoni Moda (variable, optical size), with Outfit body. Load Bodoni Moda only on that page. The display font must be switchable through a single CSS variable. Remove the page before launch.

---

## 3. SPACING AND LAYOUT
- 8px base.
- Container: 1280px; wide: 1440px; side padding: `clamp(20px, 5vw, 64px)`.
- Section padding: `clamp(96px, 13vw, 200px)`.
- Asymmetric 12-column compositions (heading in columns 1 to 5, content in 7 to 12), deliberate empty columns, text left-aligned.
- Corners: buttons 999px, media 28px, inputs 12px.
- Hairline 1px dividers in `--line`. Shadows only on floating elements. No grids of identical cards, no hover-lift on everything.
- Add a very subtle static grain texture (inline SVG noise at about 3% opacity) to `--snow` backgrounds. It must not affect LCP.

---

## 4. HOME PAGE: NEW ORDER AND DESIGN
Order:
1. Hero
2. Work
3. Services (with a marquee band between)
4. Why Waadi
5. Process
6. Packages preview
7. Industries
8. Testimonials (render nothing if the data is empty)
9. FAQ
10. Final call to action
11. Footer

### Key section specifications:
- **Header:** slim; hides on scroll down and returns on scroll up (transform); transparent over the hero, then white with a hairline. Mobile menu: full-screen, large Cormorant links, staggered reveal.
- **Hero:** full viewport. H1 "Built in the valley." in roman and "Made for your business." in italic, each on its own masked line. Lead text and the two buttons below at left. A layered ridgeline (5 tonal layers, reuse the current component, improved) with a small saffron sun disc rising behind the ridges on load, a slow drifting mist layer, scroll parallax (CSS scroll-driven where supported), and 12px pointer depth on desktop. A thin animated scroll cue line.
- **Work (moved up):** a large list of the three projects. Each row shows the project name in display size with the sector and "Visit" details. On desktop hover, a preview (looping muted video if provided, otherwise the cover image) follows the cursor. On mobile, each row shows a thumbnail and taps through to the case study.
- **Services:** large rows in Newsreader/Cormorant at 40 to 64px, one line of description, "From" price at right; hover fills the row with `--blue-tint` and draws a saffron hairline.
- **Why Waadi:** one large editorial statement (about 3rem Cormorant) whose words gain opacity as it scrolls into view (CSS scroll-driven, content fully visible if unsupported). Below, the four statements in two columns with hairline dividers.
- **Process:** a vertical timeline with a saffron progress hairline that fills as you scroll (CSS scroll-driven; heading sticky on the left). This is the only numbered section.
- **Packages preview, Industries (a typographic list of large words), FAQ and call-to-action band:** same language; the call to action uses a huge display headline, a magnetic primary button on desktop, and the ridgeline as a low backdrop.
- **Footer:** light, a giant cropped "waadi media.com" wordmark at the bottom, the ridgeline above it, and the existing columns.

Apply the same visual language (huge masked page titles, ridgeline dividers, editorial asymmetry) to every inner page: services, pricing and calculator, work and case studies (full-bleed cover with a clip-path wipe reveal and gentle parallax), about, contact, blog (editorial list with large type), local pages, legal and 404.

---

## 5. IMAGERY
- **Work:** add optional video support to the Project data (webm and mp4, muted, loop, playsInline, preload="none", poster via next/image, play on hover on desktop only, never autoplay on mobile). Fall back to cover images. Screen recordings under `/public/work/<slug>/`.
- **Photography:** create `src/data/photos.ts` with slots for 10 to 15 photos (src, alt, focal point, orientation) and editorial layouts that use them (hero secondary, about, location pages, blog covers). Until photos are supplied, render tonal SVG "valley and mist" art generated in code as fallbacks. Never use stock photos or generated faces.
- Soft atmospheric gradients are allowed inside this art only, not as page backgrounds.

---

## 6. MOTION SYSTEM
Tokens:
- `--ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`
- Durations: 200, 320, 600, 900, 1200ms. Hover 200 to 400ms, scroll reveals 800 to 1200ms, page transitions 600 to 1000ms.

### TIER 1, CSS only, all devices:
- Reveal variants (mix, never the same one everywhere): `mask-line` (headlines), `clip-wipe` (images), `draw` (hairlines scaleX), `fade-rise` (opacity plus 8px, at most 30% of elements). Use `animation-timeline: view()` inside `@supports`, with a tiny IntersectionObserver fallback (under 1KB) for browsers without it. Content must be visible with no JavaScript.
- A `SplitHeading` server component that splits text into words or lines at render time (no runtime library) and staggers with a CSS variable.
- Link underline draw, button fill sweep, image hover scale 1.04, accordion height animation, form focus transitions, success check draw, calculator totals tween, one pulse on the WhatsApp button, marquee (slow, pauses on hover, static under reduced motion).

### TIER 2, JavaScript, desktop only (min-width 1024px, hover: hover, pointer: fine, not reduced motion), dynamically imported after first paint:
- Lenis smooth scroll (lerp about 0.1). Anchor links, keyboard scrolling, find-in-page and the mobile menu must all keep working. Add `data-lenis-prevent` to scrollable panels. Destroy on cleanup.
- Custom cursor: a dot plus a ring; the ring grows over interactive elements and shows "View" on work rows. Hide it on touch.
- Magnetic buttons (8px maximum) and the work hover preview.

### TIER 3, GSAP ScrollTrigger, desktop only, dynamically imported on idle:
- Used ONLY if CSS cannot do it, and for at most two features:
  (a) a pinned horizontal gallery of project screens on case study pages
  (b) a scrubbed version of the home page process timeline.
- Use `gsap.matchMedia` to exclude mobile and reduced motion.
- License check required prior to usage in commercial site.

### PAGE TRANSITIONS:
- Enable Next.js `viewTransition` with React's `ViewTransition` (600 to 800ms crossfade with slight translate, shared-element transition if stable). Must degrade gracefully and never delay LCP.

---

## 7. PHASES
- **R1 Foundation:** tokens, fonts, type scale, Section and Container, spacing, grain, motion primitives, SplitHeading, reveal system, restyle Button, Header, Footer, Accordion, forms; `/dev/type-specimen`.
- **R2 Home:** hero, ridgeline v2, work list, services, why, marquee, process, packages, industries, FAQ, call to action, footer.
- **R3 Desktop enhancement layer:** Lenis, cursor, magnetic, hover preview, GSAP features, page transitions.
- **R4 Inner pages in the new language.**
- **R5 Imagery slots, video support, SVG art fallbacks.**
- **R6 QA:** Lighthouse on five pages, keyboard and screen-reader check, reduced motion check, Chrome, Safari and Firefox, 360px, 390px and 1440px, and a Network tab check that no Lenis or GSAP loads on mobile.

*(Current execution target: R1 and R2 only, then report and wait for user go-ahead).*
