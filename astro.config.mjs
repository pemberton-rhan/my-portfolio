// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://pemberton.dev',
  output: 'static',          // every page is prerendered; only /api/contact runs as a function
  adapter: vercel(),
  trailingSlash: 'ignore',
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', default: 'rhan@pemberton.dev' }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', default: 'Pemberton.dev <contact@pemberton.dev>' }),
    },
  },
});
