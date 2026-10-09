// src/lib/seo.ts
// Search-engine meta for every route, in one place (#13). BaseLayout looks the
// page up here by path; an entry here wins over the title/description props a
// page passes, so the page rewrites never have to touch meta.
// Wording follows the locked positioning spec (docs/specs/sf-website_positioning_v2.html):
// two front doors (Services · Solutions), Containers small, no prices, no
// inventory platform named.
// Keep titles <= 60 characters and descriptions <= 155 (what Google shows);
// the build fails if one runs over.
// `noindex: true` adds a robots noindex tag AND keeps the page out of the sitemap.
// Plain constants (no astro: imports) so astro.config.mjs can import this too.

export interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

export const SITE_URL = 'https://streichforce.com';

// Social preview image (1200x630). A new design gets a new file name, because
// link previews are cached by URL for weeks.
export const OG_IMAGE = '/og-image-v2.png';
export const OG_IMAGE_ALT = 'Streich Force Enterprises: Service & Repair and Solutions';

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Streich Force Enterprises | Real Work. Real Systems.',
    description:
      'One company that does the work and builds the systems behind it: commercial service and repair on site, and solutions that connect the tools you run on.',
  },
  '/services': {
    title: 'Commercial Service & Repair | Streich Force',
    description:
      'Repair, fabrication, doors and site maintenance for pharmacy and retail chains. 40+ years, and every Work order runs on SF Ops, from Quote to Work summary.',
  },
  '/services/gallery': {
    title: 'Our Work: Service & Repair Photos | Streich Force',
    description:
      'Before and after photos of real Streich Force jobs: custom fabrication, doors, fit-outs, site maintenance, structural repairs and security gates.',
  },
  '/solutions': {
    title: 'Streich Force Solutions | Connect the Tools You Run On',
    description:
      'Keep the systems that work. We connect them. Automation and applications for small and mid-sized operators, proven with container dealers and depots.',
  },
  '/containers': {
    title: 'Container Sourcing | Streich Force',
    description:
      'Need a shipping container? Tell us the size, condition and delivery location, and we will source it for you.',
  },
  '/contact/enterprise': {
    title: 'Request Service | Streich Force',
    description:
      'Tell us what needs fixing or building on site. Commercial service and repair for pharmacy, retail and multi-site operators.',
  },
  '/contact/solutions': {
    title: 'Book a Discovery Call | Streich Force Solutions',
    description:
      'Tell us which tools you run on and where work falls through the cracks. Every Solutions engagement starts with a discovery call.',
  },
  '/contact/containers': {
    title: 'Tell Us What You Need | Streich Force Containers',
    description:
      'Container size, condition and delivery location: send us the details and we will get back to you.',
  },
  '/contact/thanks': {
    title: 'Request Received | Streich Force',
    description: 'Thanks for reaching out to Streich Force. Your message is on its way to the right team.',
    noindex: true,
  },
  '/legal/privacy': {
    title: 'Privacy Policy | Streich Force Enterprises',
    description: 'How Streich Force Enterprises collects, uses and protects your personal information, including our SMS program.',
    noindex: true,
  },
  '/legal/msa': {
    title: 'Terms of Service | Streich Force Enterprises',
    description: 'Streich Force Enterprises terms of service and master services agreement.',
    noindex: true,
  },
};

/** '/services/' and '/services' are the same page. */
export function normalizePath(pathname: string): string {
  const p = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

export function metaFor(pathname: string): PageMeta | undefined {
  return PAGE_META[normalizePath(pathname)];
}

/** Paths that never go in the sitemap: noindex pages and retired routes. */
export const SITEMAP_EXCLUDE = new Set<string>([
  ...Object.entries(PAGE_META).filter(([, m]) => m.noindex).map(([p]) => p),
  '/enterprise', // 301 to /services (#10)
]);

for (const [path, m] of Object.entries(PAGE_META)) {
  if (m.title.length > TITLE_MAX) {
    throw new Error(`seo.ts: title for ${path} is ${m.title.length} chars (max ${TITLE_MAX})`);
  }
  if (m.description.length > DESCRIPTION_MAX) {
    throw new Error(`seo.ts: description for ${path} is ${m.description.length} chars (max ${DESCRIPTION_MAX})`);
  }
}
