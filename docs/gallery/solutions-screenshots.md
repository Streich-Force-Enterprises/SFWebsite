# Solutions screenshots: capture recipe (#17)

The `/solutions` strip shows 4–6 product screenshots, `division: solutions` in
`src/content/gallery/`. **Every pixel is demo data.** Never Loadstar's or any
customer's numbers, names, org ids or emails, and no inventory platform's name
anywhere in the picture, the file name or the alt text.

## Status (2026-11-04)

None are captured yet. The ticket session could not render either app on demo
data:

- **SF Ops `/decide`** needs the local Supabase stack (`supabase start`, Docker).
  The cloud session has no Docker daemon.
- **SF Solutions** (sf-solutions repo) has **no demo client**. Its two clients
  are real orgs, and the cockpit's only data is Loadstar's validated snapshot
  (`src/modules/cash-exposure/data/snapshot.ts`). The dashboard and query
  builder read live inventory data. The cockpit also prints the inventory
  platform's name and the org id on screen (header eyebrow, data-source badge,
  footnote), and the portal header has a client switcher naming other clients.

So a capture first needs a demo client in sf-solutions (below), or that screen
cannot be used.

## The screens

| # | `order` | App · route | Caption (draft) |
|---|---|---|---|
| 1 | 1 | SF Solutions · `/c/<demo>/cash-exposure` | Where the cash is: paid, obligated, in transit |
| 2 | 2 | SF Solutions · `/c/<demo>` (the dashboard, portal home) | Margin, aging and the metrics you choose, in one view |
| 3 | 3 | SF Solutions · `/c/<demo>/query` | Pick columns, stack filters, save the view, export |
| 4 | 4 | SF Ops · `/decide/<quote>` on a phone | Your customer approves the Quote from their phone |
| 5 | 5 | SF Solutions · `/c/<demo>/metrics`, optional | Switch each metric on or off for your team |

## Demo data

**SF Solutions.** Add a demo client in a local, uncommitted edit (or a
sf-solutions PR, the lead's call): slug `demo`, name "Demo Operator", no
`tmOrgId`, and a demo snapshot of the same `CockpitSnapshot` shape with round,
made-up figures (for example 3 lanes of $412,000 / $186,500 / $97,250). The
dashboard and query builder need demo rows behind the same queries. Before
capturing, the header must show only "Demo Operator", with no switcher, and the
cockpit must show no platform name and no org id (a capture-time crop is fine
if the product keeps those lines).

**SF Ops.** Run the e2e seed on the local stack (`supabase start`,
`supabase db reset`, then `e2e/global-setup.ts`). It makes org "E2E Smoke
<tag>", client "E2E Client" and a Quote. Before capturing, rename the org to
"Demo Operator" and give the Quote two plain lines (e.g. "Replace door closer",
"Patch and paint frame"). Open the customer's signed `/decide` link (the
`decide` URL helper in `e2e/workflow-declined-quote-choices.spec.ts` builds
one).

## How to capture

- Desktop screens: Chromium (Playwright), viewport **1440×900**,
  `deviceScaleFactor: 2`, wait for `document.fonts.ready`, full viewport (not
  full page).
- `/decide`: Playwright's `iPhone 14` device, viewport only.
- Save as PNG, then run the privacy pass in `CLAUDE.md` → Gallery: look at
  every pixel for a real name, number, email or id, save a fresh Pillow image
  with no metadata and check none is left.
- File name: `src/assets/gallery/solutions/<screen>-<YYYY-MM>.png`, e.g.
  `cash-cockpit-2026-11.png`. Neutral words only; the name is public.

## Adding one

`src/content/gallery/solutions-<screen>.yaml`:

```yaml
image: ../../assets/gallery/solutions/cash-cockpit-2026-11.png
caption: "Where the cash is: paid, obligated, in transit"
alt: "Cash-exposure cockpit with three lanes of demo totals: paid, obligated and in transit"
division: solutions
takenOn: "2026-11"
order: 1
```

No `before`, no `serviceLine`; `order` is required (the schema says so). The
strip appears on `/solutions` once the first entry exists.
