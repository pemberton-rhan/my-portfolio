# Handoff

Where pemberton.dev stands, what's been decided, and what's next. Update this file at the end of
every working session. Last updated: 2026-10-31.

## Status

The homepage and the first case study (GoFundMe Giving Funds) are built in Astro and match the
approved prototype. Nothing is deployed yet.

### Done

- Homepage: hero, About (bio, facts, logo ticker), Selected work (10 projects), Skills (masonry),
  Experience (timeline), Contact (sentence form), footer.
- Case study template at `/work/<name>/`, driven by the `work` content collection. Giving Funds is live
  in it: project-colored intro, autoscrolling full-page plate, launch video, What I did, screenshots on
  the project's dark color, Outcome, Next project.
- Contact endpoint `/api/contact` (Resend, Reply-To set to the visitor, hidden spam-trap field).
- Styles: one `global.css` plus scoped component styles; prototype CSS cleaned up and halved.
- Node pinned to 24 (`engines: 24.x`, `.nvmrc`) to match Vercel and stop the Node.js Version
  Override warning.
- Design system artifact updated with the case study components (CaseIntro, ScrollPlate, WhatIDid,
  PlateGallery, NextProject) and the project-color rules.

### Next up

1. **Finish deploy setup.** The Vercel project `my-portfolio` builds from `master`. Set `RESEND_API_KEY` and, if wanted,
   `CONTACT_FROM`; verify the sending domain in Resend. Point pemberton.dev at the project.
2. **Gordy Health case study.** Waiting on Rhan for a full-page capture from the Wayback Machine (see
   Gotchas for the console fix that makes the archived page render), his role, team, stack, year and
   3–4 things he did, plus brand colors. Then: crop plates into `public/media/gordy-health/` and add a
   `case` block to `src/content/work/gordy-health.md`, copying `giving-funds.md`.

### Waiting on Rhan

- Resume PDF. Then set `resume` in `src/data/site.ts` (it's `#` everywhere for now). The phone number
  goes on the resume, never on the site.
- Confirm the Giving Funds "What I did" points, Team and Stack. They were drafted from his GoFundMe
  experience, not from him. The product facts (June 2025 launch, no fees, $5 minimum, 1.4M charities)
  come from GoFundMe's announcement and live page.
- The Giving Funds video file is dated Dec 2025, after he left GoFundMe in Jul 2025. He should confirm
  he's comfortable showing that version.
- Real AI skills (the AI card in Skills holds placeholders).
- Materials for the other eight case studies, and thumbnails for the homepage rows (`thumb`).

### Later

- Build the resume (after the site is done), in the same design system.
- Refresh the business card in `brand/business-card/`: it still uses the old orange `#C96A40` and
  Lennon text; use `#D27A52` and the outlined wordmark.
- Delete `prototype/` once nobody needs it for reference.
- The nine homepage rows without case studies link to `#`. Decide whether they link to the live
  site, or stay unlinked until their case study exists.

## Decisions (don't relitigate without asking Rhan)

- **One orange:** `#D27A52` everywhere, screen and print. Small orange text on paper uses rust `#9A4A2A`.
- **Header:** the name is Lennon, outlined to SVG paths (the font is licensed and never shipped). Rhan's
  hand-drawn sprout sits left of it at 27px (22px on phones) and sways like a palm: the moon and trunk
  stay still, the crown bends, and hovering the name brings a stronger gust. Resume is a plain nav item
  with a download icon.
- **Homepage:** the hero is not full height. About has no portrait. Skills is masonry, with the
  Leadership card on `#E8E1D6` and no counts. The Experience resume link is a quiet text link, right
  aligned, just above the timeline rule. Contact has no "reply within two days" line and no
  details grid; the footer has no logo.
- **Arrows:** drawn SVGs only. The right arrow ("C" style) everywhere, the diagonal one only for
  external links (which open in a new tab).
- **Rules:** solid 1px lines, not the old rough SVG lines (they shimmered when scrolling).
- **Case studies:** short and scannable. The intro and header take the project's light color (Giving
  Funds: `#CCF88E`); the Screens band uses a dark color a shade lighter than the brand's darkest
  (`#133524`), so dark screenshots still read as panels. Screenshots have no borders, and are cropped
  inside a section so rounded corners never meet the square frame. No "product numbers" band
  (tried and removed).
- **Autoscroll plate (Plate 1):** starts when about 60% of the frame is on screen and stops when it
  leaves. Each scroll is 360–860px over `1.1s + 0.9ms/px` with `cubic-bezier(0.17, 0.66, 0.34, 0.98)`,
  then a 0.7–1.5s pause. At the bottom it rests 2.2s and glides back to the top over 2.6s
  (ease-in-out sine). Moving the pointer over it pauses it; scrolling the page never does. Tapping
  pauses it on phones. The full-page capture keeps the site's nav and drops its footer.

## Gotchas

- **Wayback captures render blank or broken** for sites whose scripts weren't archived (Gordy Health is
  one). Reload the archive page, scroll to the bottom and back so images load, then paste this in the
  DevTools console before running "Capture full size screenshot":

  ```js
  document.querySelectorAll('body *').forEach(e=>{if(e.closest('.mobile-menu,#wm-ipp-base'))return;const s=getComputedStyle(e);if(s.opacity==='0'||s.visibility==='hidden'){e.style.setProperty('opacity','1','important');e.style.setProperty('visibility','visible','important')}});
  jQuery('.web-ticker').webTicker({height:'auto'});
  jQuery('.slider-wrapper .slider').not('.slick-initialized').slick({dots:true,arrows:false,adaptiveHeight:true});
  document.querySelectorAll('.statement-slider .statement').forEach((s,i)=>{if(i)s.style.display='none'});
  (()=>{const b=document.querySelector('.video-container'),f=b&&b.querySelector('iframe');if(!f)return;const i=new Image();i.src='https://web.archive.org/web/20250522192015im_/https://i.vimeocdn.com/video/1421818248-01ce056015dab4f14a7088022ac398a9d11017e30464a528e41a7557eb6ad4c7-d_640';i.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover';b.style.position='relative';f.replaceWith(i)})();
  (()=>{const inp=document.querySelector('#gform_1 input[name="input_3"]'),sel=document.querySelector('#gform_1 select');if(!inp||!sel)return;const c=getComputedStyle(inp);const caret=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='${encodeURIComponent(c.color)}' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat right 4px center/12px 8px transparent`;Object.entries({appearance:'none','-webkit-appearance':'none',border:'0','border-radius':'0','border-bottom':c.borderBottom,background:caret,'font-family':c.fontFamily,'font-size':c.fontSize,'line-height':c.lineHeight,color:c.color,height:c.height,padding:`${c.paddingTop} 24px ${c.paddingBottom} ${c.paddingLeft}`,'box-shadow':'none',width:'100%'}).forEach(([k,v])=>sel.style.setProperty(k,v,'important'))})();
  ['wm-ipp-base','wm-ipp-print','donato'].forEach(id=>document.getElementById(id)?.remove());document.documentElement.style.marginTop='0';scrollTo(0,0);
  ```

  It reveals the scroll-animated sections, restarts the photo ticker and the testimonial slider, shows
  one rotating statement, swaps the deleted Vimeo video for its archived poster, styles the State
  dropdown, and hides the Wayback toolbar. Gordy's "Gordy Health Overview" video itself was deleted
  from Vimeo and isn't archived.
- **Scoped CSS specificity:** Astro adds an attribute per compound selector, so a rule with more
  compounds can now beat one that used to override it (this bit `.cs-did.strip>div+div` once).
- **Raw media:** cropped, compressed copies go in `public/media/<project>/`; the originals stay in the
  ignored `media/` and `screenshots/` folders.

## References

- Design system (Claude Design System artifact): https://claude.ai/artifact/CXhrywvGPrppxkGXaiZqUH
- Prototype preview, superseded by this repo: https://claude.ai/artifact/DfPdzvfyrVJX8ZSWxquRdQ
- Old site with the original project list and links: https://pemberton.dev
