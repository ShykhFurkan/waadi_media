# Redesign B: Neo-Brutalist ("Kashmir Pop") Brief

This document supersedes PRD Section 6, the layout of PRD Section 10, and the previous "Redesign R" luxury brief.

## Direction: "Kashmir Pop"
A neo-brutalist, hand-drawn, playful world that still reads as professionally designed. Cream paper, giant heavy type, thick black outlines, hard shadows, bright bento tiles, stickers, an illustrated valley scene behind the hero, and parallax depth.
Audience: Kashmiri business owners, many on mid-range Android phones, so the site must stay fast, legible and easy.

## What Keeps It Looking Professional (Strict Rules)
- **One border width**: 3px solid ink (4px on hero tiles, 2px on small chips).
- **One radius system**: tiles 20px, buttons 999px, inputs 14px.
- **One shadow system**: hard offset to bottom right, zero blur:
  - 4px: buttons and chips (`4px 4px 0px #0B0B0B`)
  - 6px: tiles (`6px 6px 0px #0B0B0B`)
  - 10px: hero tiles and featured items (`10px 10px 0px #0B0B0B`)
- **Color control**: Maximum three fill colors in any viewport, plus ink and paper.
- **Controlled rotation**: Rotation only between -3 and +3 degrees, and only on stickers, marquee bands, and a few tiles.
- **Grid discipline**: Everything on an 8px grid, aligned to a 12-column layout. Text only ever sits on solid fills or the paper, never on illustrations.
- **Strong hierarchy**: Giant heavy headlines against calm 17 to 18px body text.
- **One hero moment per section**: Do not scatter decoration everywhere.

## 1. Tokens (globals.css)
- `--paper`: `#FBF6EA`
- `--paper-2`: `#F3EAD3`
- `--ink`: `#0B0B0B`
- `--blue`: `#0057FF` (brand)
- `--saffron`: `#FFC72C`
- `--chinar`: `#FF5A36`
- `--almond`: `#FF9EC4`
- `--mint`: `#6FE3C1`
- `--sky`: `#9FD0FF`
- `--white`: `#FFFFFF`

### Contrast Rules
- Ink text on paper, saffron, chinar, almond, mint, sky.
- WHITE text on blue only. Never ink text on blue.
- Focus ring: 3px blue outline with 3px offset plus hard shadow on every interactive element.
- Subtle paper grain (inline SVG noise, ~4% opacity) and faint dotted grid on `--paper` backgrounds (zero LCP impact).

## 2. Typography
- **Display**: Archivo (variable/weight 900), expanded width, uppercase via CSS `text-transform: uppercase`, tracking -0.02em, line-height 0.9, text-wrap: balance. Long words must never overflow at 360px.
  - H1: `clamp(2.75rem, 9vw, 8.5rem)`
  - H2: `clamp(2.25rem, 5.5vw, 5rem)`
  - H3: `clamp(1.5rem, 2.6vw, 2.25rem)` at weight 800
- **Accent**: Instrument Serif italic, used for ONE phrase per headline at a larger size, set over a hand-drawn saffron highlighter swash (SVG).
- **Body & UI**: Outfit 400, 500, 600, 17 to 18px, line-height 1.65, max 68ch.
- **Stickers & chips**: Archivo 800, uppercase, 12 to 14px, tracking 0.04em.

## 3. Components
- **Button**: Pill (999px), 3px ink border, 4px hard shadow.
  - Hover: `translate(-2px, -2px)`, shadow 6px.
  - Active: `translate(4px, 4px)`, shadow 0.
  - Variants: saffron fill, blue fill with white text, paper outline.
- **Tile**: 3px border, 20px radius, 6px shadow, solid fill, 28 to 40px padding. Hover: lift.
- **Sticker**: Circle or pill with white 3px outline, ink border, hard shadow, short text, rotated -3 to 3 degrees. Hover: short wiggle.
- **Rotating badge**: Circular text badge ("Made in Kashmir" around saffron disc with small chinar leaf), rotating slowly (static under reduced motion).
- **Header**: Floating pill nav with 3px border and hard shadow, logo at left, links, saffron "Book a free call" button. Hides on scroll down, returns on scroll up. Mobile: full-screen sheet with giant Archivo links and large Call / WhatsApp buttons.
- **Inputs**: 3px ink border, 14px radius, 52px tall, hard shadow on focus, plain-language errors.
- **Accordion**: Bordered rows with plus sticker that rotates 45 degrees.
- **Footer**: Blue sheet with white text, giant cropped "waadi media.com" wordmark along bottom, existing columns, valley art along top edge.

## 4. The Art: "Valley Scene"
Flat vector SVG with 3px ink outlines and flat palette fills, subtle hatch or halftone dots. Layers:
1. Sky band (sky blue to paper)
2. Saffron sun disc (thick outline)
3. Drifting clouds
4. Far mountains (blue and sky)
5. Near mountains with snow caps (paper and mint)
6. Lake band (sky) with a chinar-red shikara
7. Big chinar tree with orange-red leaves
8. Foreground saffron crocus flowers & grass tufts
9. Drifting birds
- SVG budget: $\le 40\text{KB}$ gzipped, `aria-hidden="true"`, `pointer-events-none`.
- Sticker sprite sheet (stars, sparkles, almond blossoms, crocus, chinar leaf, apple, cloud, birds, lightning bolt).
- River ribbon path component with 3px ink outline.
- Slots file: `src/data/art.ts`.

## 5. Home Page Order
1. **Hero**: Full viewport. Scene in lower 55%, headline on clean sky/paper area above. H1 with Archivo and Instrument Serif italic swash. Lead text, two buttons, rotating badge, bottom pill strip with true facts ("Based in Anantnag", "Since 2026", "Clients across India", "Prices shown upfront"). Transform pop with slight overshoot.
2. **Crossing Marquees**: Two crossing bands between hero and work: ink at -3 deg and saffron at +2 deg.
3. **Work**: Three big bento tiles (saffron, almond, mint), thick-bordered browser frame, sector sticker, name and short line, video/cover hover preview.
4. **Services**: 8-tile bento of mixed sizes and fills, SVG icon stickers, service name, one line, price sticker.
5. **Why Waadi**: One giant statement with saffron swashes, four tilted tiles (-1.5 to +1.5 degrees).
6. **Process**: Four tiles connected by the river ribbon (drawing as you scroll).
7. **Packages**: Three tiles, Business Launch raised, saffron filled, with larger shadow & "Most popular" sticker.
8. **Industries**: Chunky pills with icons.
9. **Testimonials**: Render nothing when empty (`null`).
10. **FAQ**: Bordered rows with rotating plus sticker.
11. **Final CTA**: Giant blue sheet with white text, huge headline, saffron button, WhatsApp button, "Free first call" sticker, valley art along bottom.

## 6. Hard Constraints
- Mobile Lighthouse: Performance $\ge 90$, Accessibility 100, SEO 100, LCP $\le 2.5\text{s}$, CLS $\le 0.05$, TBT $\le 150\text{ms}$.
- First-load JS on mobile for home page $\le 190\text{KB}$ gzipped.
- Hero H1 and lead text in server-rendered HTML and visible at first paint.
- No blocking preloader, no scroll-hijacking, strict `prefers-reduced-motion` compliance.
- No heavy libraries (Lenis, GSAP) downloaded on mobile or touch devices.
