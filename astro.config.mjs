import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://streichforce.com',
  compressHTML: true,
  // One page per division (#10): /services is Division 01. The 301 itself is
  // in netlify.toml; this generates the fallback page for `npm run preview`.
  redirects: {
    '/enterprise': '/services',
  },
});
