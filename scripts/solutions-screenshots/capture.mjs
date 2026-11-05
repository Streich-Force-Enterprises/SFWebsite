// scripts/solutions-screenshots/capture.mjs
// Captures the SF Solutions demo client's screens for the /solutions strip
// (#17). Needs auth-stub.mjs running and sf-solutions on `next dev` against
// it (see docs/gallery/solutions-screenshots.md). Chromium (Playwright),
// 1440×900 at deviceScaleFactor 2, viewport only, fonts loaded first.
//
// Run:  node scripts/solutions-screenshots/capture.mjs <out dir>
import { createRequire } from 'node:module';
// Playwright is preinstalled globally; require() finds it from any folder.
const { chromium } = createRequire(import.meta.url)('playwright');

const APP = process.env.APP_URL ?? 'http://localhost:3000';
const OUT = process.argv[2] ?? '.';
const STUB_REF = '127'; // the cookie name's ref is the stub host's first label

const SCREENS = [
  // The detail page from its headline down, so the trend chart is in frame (the
  // dashboard shot carries the lanes alone).
  { file: 'cash-cockpit.png', path: '/c/demo/m/cash_exposure', scrollTo: 'text=Total capital exposure' },
  { file: 'dashboard-margin.png', path: '/c/demo?tab=margin' },
  { file: 'dashboard-overview.png', path: '/c/demo' },
  { file: 'query-builder.png', path: '/c/demo/query' },
];

// A session the stub accepts: an unsigned token whose only job is to be sent
// back to /auth/v1/user, far from expiry so nothing tries to refresh it.
const b64u = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const exp = Math.floor(Date.now() / 1000) + 3600 * 24;
const session = {
  access_token: `${b64u({ alg: 'none', typ: 'JWT' })}.${b64u({ sub: '00000000-0000-4000-8000-00000000d3e0', exp, role: 'authenticated' })}.x`,
  token_type: 'bearer',
  expires_in: 3600 * 24,
  expires_at: exp,
  refresh_token: 'stub',
  user: { id: '00000000-0000-4000-8000-00000000d3e0', email: 'operator@demo.invalid' },
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addCookies([
  {
    name: `sb-${STUB_REF}-auth-token`,
    value: `base64-${Buffer.from(JSON.stringify(session)).toString('base64url')}`,
    url: APP,
  },
]);
const page = await ctx.newPage();
for (const s of SCREENS) {
  const res = await page.goto(APP + s.path, { waitUntil: 'networkidle' });
  if (!res || res.status() !== 200 || !page.url().includes('/c/demo')) {
    throw new Error(`${s.path}: HTTP ${res?.status()} at ${page.url()}`);
  }
  await page.evaluate(() => document.fonts.ready);
  if (s.scrollTo) {
    await page.locator(s.scrollTo).first().evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 24));
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: `${OUT}/${s.file}` });
  console.log('captured', s.file);
}
await browser.close();
