# Solutions screenshots: capture recipe (#17)

The `/solutions` strip shows product screenshots, one `division: solutions`
entry each in `src/content/gallery/`. **Every pixel is demo data.** Never
Loadstar's or any customer's numbers, names, org ids or emails, and no
inventory platform's name anywhere in the picture, the file name or the alt
text.

## What is in (2026-11-04)

| `order` | File | Screen (sf-solutions route) | Caption |
|---|---|---|---|
| 1 | `dashboard-overview-2026-11.png` | `/c/demo` (dashboard, Overview) | Where the cash is: paid, obligated, in transit |
| 2 | `cash-cockpit-2026-11.png` | `/c/demo/m/cash_exposure`, from its headline down | Capital tied up in inventory, and how it has moved week to week |
| 3 | `dashboard-margin-2026-11.png` | `/c/demo?tab=margin` | Margin by size and type, and by customer, on the numbers you already have |
| 4 | `query-builder-2026-11.png` | `/c/demo/query` | Pick columns, stack filters, save the view, export |

**Not in yet: the SF Ops `/decide` Quote page.** It needs SF Ops' local
Supabase stack (Docker), which a cloud session cannot start. When it is
captured: run the sf-ops e2e seed (`supabase start`, `supabase db reset`,
`e2e/global-setup.ts`), rename the seeded org to "Demo Operator", give the
Quote two plain lines (e.g. "Replace door closer", "Patch and paint frame"),
open its signed `/decide` link on Playwright's `iPhone 14` device, and add it
as `order: 5`.

## The demo data

The screens come from sf-solutions' **demo client**, `/c/demo` "Demo
Operator" (sf-solutions PR #41, `src/clients/demo.ts`). It reads no Supabase
table and no source system:

- 300 units from a fixed-seed generator (mulberry32, seed 17), so every
  capture is identical. Sizes 20' / 40' Standard and 40' High Cube, three
  conditions, three yards ("North / South / Harbor Yard", "Metro A/B").
  Purchase prices are drawn in made-up ranges ($1,750–$3,300, rounded to $50).
  About 15% are sold, 20% in transit, the rest on the ground.
- The cockpit lanes, margin by size/type, margin by customer and aging are
  **computed from those units**, so the screens agree. The eight-week trend
  is the current position scaled by a fixed ramp (0.71 → 1.0).
- Container numbers are `DEMO 1xxxxx` (not a valid ISO 6346 owner code).
  Customers are "Customer 01"–"12". The data cut is fixed at 2026-11-01.
- Nothing is copied, sampled or scaled from Loadstar or any client.
- On the demo, the screens show "Demo data" instead of a sync stamp, no
  platform name, no org id and no client switcher.

## How to capture (what made the four above)

Signing in to sf-solutions needs Supabase. Locally there is none, so a
sign-in stand-in (`scripts/solutions-screenshots/auth-stub.mjs`) answers only
"this person is an operator" and returns no rows for anything else. The demo
reads nothing from it. It is capture tooling here, not code in the app.

1. `node scripts/solutions-screenshots/auth-stub.mjs` (port 54399).
2. In sf-solutions, with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
   unset and `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54399`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY=stub-anon`: `npm run build`, then
   `npm run start` (a production build, so no dev badge is in the picture).
3. `node scripts/solutions-screenshots/capture.mjs <out dir>`: Chromium
   (Playwright), viewport **1440×900**, `deviceScaleFactor: 2`, fonts loaded
   first, viewport only. The cockpit shot scrolls to its headline. It signs
   in with a session cookie the stand-in accepts.
4. **Privacy pass:** look at every pixel for a real name, number, email, id
   or a platform name. Then save a fresh Pillow image (no metadata:
   `Image.new` + `paste` + `save`) under the neutral name below and check
   `info` and EXIF are empty.
5. File name: `src/assets/gallery/solutions/<screen>-<YYYY-MM>.png`. The
   name is public (it ends up in the built URL).

On a sf-solutions preview with a real operator login, the same `/c/demo`
routes can be captured by hand at 1440×900 instead of steps 1–3.

## Adding one

`src/content/gallery/solutions-<screen>.yaml`:

```yaml
image: ../../assets/gallery/solutions/cash-cockpit-2026-11.png
caption: "Capital tied up in inventory, and how it has moved week to week"
alt: "What the screen shows, on demo data"
division: solutions
takenOn: "2026-11"
order: 2
```

No `before`, no `serviceLine`; `order` is required (the schema says so).
