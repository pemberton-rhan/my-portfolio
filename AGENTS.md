# AGENTS.md

Instructions for AI coding agents working in this repo. Humans: see `README.md`. For where the
project stands right now and what's next, read `HANDOFF.md` first.

## The project

pemberton.dev, Rhan Pemberton's portfolio: a homepage plus a case study page for each project in
Selected work. Astro 7, deployed on Vercel. The only server code is the contact form endpoint,
which sends through Resend.

## Commands

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # must pass before you commit
```

Astro 7.4 needs Node 22.23.4 or newer. There is no test suite; verify changes by building and by
looking at the pages (see Verifying below).

## Layout

```
src/
  pages/index.astro            homepage
  pages/work/[slug].astro      case study template (one page per project with a `case` block)
  pages/api/contact.ts         contact endpoint (prerender = false; everything else is static)
  layouts/Base.astro           <head>, header, footer; imports styles/global.css once
  components/                  Header, Footer, home/*, case/*, icons/*
  content/work/*.md            one file per project; schema in src/content.config.ts
  data/                        site links, companies, skills, experience
  scripts/                     menu, palm, contact form, case study motion (plain JS modules)
  styles/global.css            the only global stylesheet
public/                        fonts, logos, media/<project>/ (pre-optimized WebP and MP4)
prototype/                     the frozen static HTML prototype; reference only, don't edit
brand/                         logo and client logo source files; business card (outdated)
```

`media/`, `screenshots/` and `inspo/` at the root are ignored by git: raw captures, source video and
reference material. Never commit them, and never commit anything from `inspo/` (it holds licensed fonts).

## Astro conventions (always follow Astro best practice)

- **Styles:** one `src/styles/global.css` for tokens, the reset and genuinely shared pieces, imported
  in the layout. Everything else goes in the component's scoped `<style>`. No `@import` chains and no
  new global stylesheets. When a scoped rule must style markup rendered by a child component (an
  `Icon`, `Sprout`, `Wordmark`, `Plate`, or Markdown from `<Content />`), wrap that part in `:global()`.
- Scoped selectors gain specificity (Astro adds an attribute to each compound). When you move or add
  rules, check that an override that used to win still wins.
- **Content:** projects are a content collection (`glob` loader, Zod schema from `astro/zod`). Add
  fields to the schema rather than hard-coding project data in templates.
- **Secrets:** read server env vars through `astro:env/server` (schema in `astro.config.mjs`), never
  `process.env` or `import.meta.env` in server code.
- **Scripts:** component `<script>` tags that import from `src/scripts/`. Use `is:inline` only for the
  tiny head script that must run before paint.
- Keep pages static. Only add `export const prerender = false` to routes that truly need a server.
- Images in `public/` are already optimized; reference them by path with width and height set.

## Design rules

The visual system is the "Rhan Pemberton" design system (a Claude Design System artifact; ask Rhan
for access). The essentials:

- **Color:** paper `#f2ede5` grounds everything; slate navy `#333f55` is the ink; `#161b27` is the
  deepest; the one orange is `#d27a52` (`--signal`). Use the tokens in `global.css`, never new hex values.
- **One color block per page.** The homepage hero (and header) is orange. A case study replaces it with
  the project's light color via `--proj` on `<body>`; its Screens band uses `--proj-deep`.
- **Structure with 1px rules**, drawn with the `--h/--v/--hd/--vd/--hp/--vp` gradients. No drop
  shadows, no rounded cards, no decorative gradients.
- **The sheet:** a 72px side rail, then 12 columns, max 1440px. Every section has its title rotated in
  the rail. Sections pad 96px (56px on phones).
- **Type:** Instrument Sans 500 for headings (-0.02em), IBM Plex Mono for labels, nav and values,
  IBM Plex Sans for reading. Lennon appears only as the outlined name in `Wordmark.astro`: never add the
  font file to this repo (its license forbids redistribution).
- **Icons:** the drawn SVG arrows in `Icon.astro`. Never type the → ↗ ↓ ↑ characters.
- **Motion:** the palm sways, the logo ticker scrolls, case study plates fade up, and the full-page
  plate autoscrolls. All of it must stop under `prefers-reduced-motion`. Don't add new ambient motion
  without asking.
- Responsive breakpoints: 1100px (tablet) and 760px (phone). Check both.

## Content rules

- Sentence case everywhere except eyebrows, labels and buttons. No emoji.
- Plain, specific, truthful claims in Rhan's voice. Product facts must come from the client's own
  sources; never present a product's numbers as Rhan's results.
- Never put Rhan's phone number on the site. It belongs on the downloadable resume only.
- Screenshots and video in case studies are captioned as plates ("Plate 3 …"), numbered in reading order.

## Accessibility

Keep it at WCAG AA: text contrast 4.5:1 (check any new project color against `--ink-deep`), visible
focus states, alt text on content images (empty alt on decorative ones), and links that open a new tab
say so to screen readers (`<span class="sr"> (opens in a new tab)</span>`).

## Verifying a change

1. `npm run build` passes.
2. Look at the homepage and `/work/giving-funds/` at 1440px, 1000px and 390px.
3. If you changed CSS, compare before and after screenshots at those widths; the site should not shift
   anywhere you didn't mean it to.
4. Check reduced motion (DevTools > Rendering > emulate `prefers-reduced-motion`).

## Git

- Small, focused commits with a plain-English subject line and a short body saying why.
- Don't commit `.env`, `node_modules/`, `dist/`, `.astro/` or `.vercel/` (all ignored).
- Rhan pushes; don't push or force-push unless asked.
