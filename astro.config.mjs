import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITEMAP_EXCLUDE, normalizePath } from './src/lib/seo.ts';

export default defineConfig({
  site: 'https://streichforce.com',
  compressHTML: true,
  // One page per division (#10): /services is Division 01. The 301 itself is
  // in netlify.toml; this generates the fallback page for `npm run preview`.
  redirects: {
    '/enterprise': '/services',
  },
  integrations: [
    // /sitemap-index.xml (#13). noindex pages and the /enterprise redirect
    // are left out; the list lives in src/lib/seo.ts.
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.has(normalizePath(new URL(page).pathname)),
    }),
  ],
});
