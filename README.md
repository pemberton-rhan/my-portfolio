# pemberton.dev

Rhan Pemberton's portfolio: a homepage and a case study for each project in Selected work.
Built with [Astro](https://astro.build), deployed on Vercel. The contact form sends through [Resend](https://resend.com).

## Run it

Needs Node 22.12 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # production build
```

## Where things live

```
src/
  pages/
    index.astro            the homepage
    work/[slug].astro      the case study template: one page per project that has a `case` block
    api/contact.ts         the contact form endpoint (Resend)
  components/
    Header.astro, Footer.astro
    home/                  Hero, About (with the logo ticker), Work, Skills, Experience, Contact
    case/                  CaseIntro, ScrollPlate, Plate
    icons/                 Sprout (the palm), Wordmark (the outlined name), Icon (arrows, download)
  content/work/*.md        one file per project: feeds the homepage list and the case studies
  data/                    site links, companies, skills, experience
  scripts/                 menu, palm, contact form, case study motion
  styles/global.css        tokens, the reset and the pieces many components share; imported once,
                           in the layout. Every other style lives in its component's scoped <style>.
public/
  fonts/  logos/  media/<project>/
```

Styles follow Astro's conventions: one global stylesheet plus scoped `<style>` blocks. A rule that styles
something rendered by a child component (an `Icon`, say, or Markdown) wraps that part in `:global()`.
Case studies theme the orange block by setting `--proj` on the page.

The look follows the "Rhan Pemberton" design system: paper, slate navy and one terracotta,
1px rules, Instrument Sans for headings, IBM Plex Mono and Plex Sans for everything else.

## Add a case study

1. Crop the screenshots and put them in `public/media/<project>/`. Use WebP: about 1600px wide for the
   full-page capture, 2000px for full-width plates and 1400px for half-width ones. Crop inside a section
   so no rounded corners meet the square frame.
2. Open the project's file in `src/content/work/` and add a `case` block. `giving-funds.md` is the one to
   copy: colors, facts, the full-page capture, an optional video, the brief (the Markdown body),
   What I did, the plate rows (one or two plates per row) and the outcome.
3. Run `npm run dev` and open `/work/<file name>/`. The homepage row links to it automatically.

Take each project's two colors from its brand: a light one for the intro (its text is ink-deep, so check
it reaches 4.5:1) and a dark one for the Screens band.

## Contact form

The form posts to `/api/contact`, which emails Rhan with Reply-To set to the visitor. A hidden field
catches spam bots. Copy `.env.example` to `.env` to test locally, and set the same variables in Vercel:

- `RESEND_API_KEY`: a Resend API key that can send from the verified domain
- `CONTACT_TO`: where messages go (defaults to rhan@pemberton.dev)
- `CONTACT_FROM`: the sender, on a domain verified in Resend

Without a key, the form tells visitors it couldn't send and points them to the email address.

## Still to do

- Link the resume PDF (`src/data/site.ts`, `resume`). The phone number lives on the resume, never on the site.
- Case studies for the other nine projects, and thumbnails for the homepage rows (`thumb` in each project file).

## The prototype

`prototype/` is the static HTML version the site was designed in. It's kept for reference;
this Astro project is now the source of truth.
