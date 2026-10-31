import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const image = z.object({
  src: z.string(),           // path under /public, e.g. /media/giving-funds/gf-how.webp
  width: z.number(),
  height: z.number(),
  alt: z.string(),
});

/** One project in Selected work. Add a `case` block to give it a case study page at /work/<file name>/. */
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),                     // position in Selected work, shown as 01, 02…
    industry: z.string(),
    summary: z.string(),                   // one line, used by Next project
    url: z.string().url().optional(),      // the live site, if it still exists
    thumb: z.string().optional(),          // small image for the homepage row
    case: z.object({
      intro: z.string(),                   // one sentence under the project name
      colors: z.object({
        light: z.string(),                 // intro background; text on it is ink-deep (check 4.5:1)
        deep: z.string(),                  // Screens band; text on it is paper
        videoMat: z.string().optional(),   // match the video's own background so the frame has no edge
      }),
      facts: z.object({
        role: z.string(),
        roleOrg: z.string().optional(),
        team: z.string(),
        stack: z.string(),
        launched: z.string(),
      }),
      fullPage: image,                     // Plate 1: the autoscrolling full-page capture
      video: z.object({ src: z.string(), poster: z.string(), label: z.string(), caption: z.string() }).optional(),
      heading: z.string(),                 // the brief's heading; the brief itself is the Markdown body
      did: z.array(z.object({ label: z.string(), text: z.string() })).max(4),
      plates: z.array(z.array(image.extend({ caption: z.string() })).min(1).max(2)),  // rows of one or two
      outcome: z.object({ heading: z.string(), text: z.string() }),
    }).optional(),
  }),
});

export const collections = { work };
