# SF Website — Conventions for Agents

The public marketing site for Streich Force Enterprises at **streichforce.com**.
Static Astro 4 site, no framework islands, no environment variables, no secrets.

## Stack + deploy

- **Astro 4**, fully static output (`dist/`). The only dependency is `astro` itself.
- **Netlify** auto-deploys `main` (config in `netlify.toml`, Node 20). There is no
  staging environment — a merge to `main` IS a production deploy, so the PR
  preview + the `verify` build check are the whole gate.
- `main` is PR-only with the `verify` (build) check required. Never push to it
  directly.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # the CI gate — must pass before any PR merges
npm run preview    # serve the production build locally
```

## Structure

- `src/pages/` — one folder per route: `index.astro` (homepage hub), plus
  `enterprise/`, `solutions/`, `containers/`, `services/`, `contact/`, `legal/`.
- `src/layouts/BaseLayout.astro` — HTML shell, favicon, SEO meta, Open Graph.
  Every page renders through it.
- `src/components/` — `Nav.astro` (with mobile menu) and `Footer.astro`.
- `src/styles/global.css` — **all brand tokens live here as CSS variables.**
  Style with the variables, never hardcoded hex values.
- `public/Brand/` — official SF logo/icon assets. These are shared with the
  SF Ops app (sf-ops repo); don't fork or recolor them here.

## Conventions

- This is a brochure site: keep it static. No client-side JS beyond what a
  component genuinely needs (the mobile nav is the current ceiling).
- New division/service pages copy the structure of an existing page and go
  through `BaseLayout` for SEO meta.
- Brand voice + colors: see the Brand Color Quick Reference in README.md.

## Sibling repos

The apps (sf-ops, sf-solutions, sf-sonja-hq) live in the same GitHub org and
follow the same PR-gated flow. This repo is intentionally the simplest of the
set — resist importing app-repo tooling it doesn't need.

## Working sessions: one ticket, one session, one icon

The website is built the same way as SF Ops (sf-ops `CLAUDE.md` → "Working
sessions", Sonja 2026-10-01 and 2026-10-04). Those rules apply here word for
word; the short form:

- **Tickets are GitHub issues in this repo**, each a sub-issue of a
  `Project: …` parent. The parents and their icons live in
  `scripts/status-page/projects.json` (🧱 Site foundation · 🖼️ Gallery ·
  ✍️ Content & positioning · 🪲 Bugs). An icon is never one SF Ops already
  uses, because Sonja sees every session side by side.
- **Session titles:** a ticket session is `<project icon>🛠️ #<n> · <title>`,
  e.g. `🖼️🛠️ #15 · Photo intake: first batch`. A session started without
  such a title renames itself first (`set_session_title`).
- **Only the 🧭 lead session starts or closes sessions.** A ticket session
  never starts another session and never asks Sonja to start one. Follow-up
  work becomes a GitHub issue under the right `Project:` parent, or a line
  in the PR description.
- **A ticket session never merges its own PR** and never turns on
  auto-merge. It finishes at a green draft PR (the `verify` build). Merging
  happens only on Sonja's "merge it", carried out by the lead. A merge to
  `main` is a production deploy, so this matters more here than in the app
  repos.
- **A ticket session finishes its own memory.** Before its PR is ready, it
  adds any lesson worth keeping to this file in the same PR.
- **One board.** The daily 📊 status steward (SF Ops issue #387, 7am
  Central) carries a "🌐 SF Website" section for this repo: open PRs,
  tickets waiting on Sonja, what shipped. Tickets waiting on her carry the
  `waiting-on-sonja` label; the steward keeps that label true.
- **The lead closes the loop.** Once a PR merges, the lead closes the
  ticket if GitHub did not, then archives the session.

## Spec deliverables

Any plan or scoping doc that needs Sonja's decisions is **HTML**, not
markdown (she gets lost in markdown prose): `docs/specs/sf-website_<topic>_v<N>.html`,
one self-contained file (inline CSS, no external deps), SF Red `#C0392B`
accent on neutral grays, with the sections Problem · Proposed flow ·
Open Decisions (recommended option highlighted) · What Changed in This
Revision. A refinement is a new versioned file; all versions are kept.

Active plan: **`docs/specs/sf-website_build-plan_v2.html`** (locked
2026-10-08, Sonja: "Go with all recommended", D1–D5 all A). Active
positioning: **`docs/specs/sf-website_positioning_v2.html`** (locked
2026-10-09, #18): two front doors (Services · Solutions), SF Ops sold
through both, Solutions for any operator with container proof, no inventory
platform named. Every content ticket (C2–C5) writes to it. Active draft
awaiting her decisions: **none.**

## Gallery

- **Originals live in `src/assets/gallery/<division>/`**, never in
  `public/`. Astro's image service resizes and converts them at build time.
  A hand-resized file in `public/` is the smell to question in review.
- **Sonja's drop folder is OneDrive `Documents/SF Website/Gallery inbox`**
  (D2), read through the Microsoft 365 connector (`sharepoint_folder_search`
  "Gallery inbox"). Files are named after the SF Ops Work order with a stage
  suffix, e.g. `260728-14734:WO-00023_Before.jpeg` / `…_After.jpeg`; a few
  have no WO. Use the WO to look up the Work order in SF Ops for the service
  line, month and what was done.
- **One entry per job in `src/content/gallery/`** (an Astro content
  collection): `image` (the After / finished shot), optional `before`,
  caption, division, service line, month, featured. A `before` makes the
  card a Before / After pair; the lightbox shows them side by side.
  The schema fails the build on a missing caption or an unknown service
  line. The service lines are the ones on the Services page (Sonja,
  2026-10-08: alphabetical, Doors replaced Compactor Chutes, Other /
  Miscellaneous last); the contact form's "Type of Work Needed" list
  matches them in the same order.
- **Captions say what was built or fixed, never who for.** No customer
  name, store number, address, signage with a chain's name, visible
  paperwork or recognisable face, unless Sonja says yes for that photo in
  the PR. Every gallery PR shows every new photo in its deploy preview so
  she approves them in one look.
- **Adding a job is one or two files plus one entry, no code:** put the original in
  `src/assets/gallery/services/`, add `src/content/gallery/<slug>.yaml` (copy
  a placeholder entry; `image:` is relative to the YAML file), set
  `featured: true` for the "See our work" strip on `/services` (first four,
  newest month first). The schema lives in `src/content/config.ts`; the
  service lines in `src/lib/service-lines.ts` (same order as the Services page). Delete the `placeholder-*`
  entries and images once real photos land (G2, #16).
- **One component, `GalleryGrid.astro`, no JavaScript:** the service-line
  filter is radio buttons + CSS, the lightbox is the native Popover API.
- **Solutions shows product screenshots, not photos**, always against demo
  data: never Loadstar's or any customer's numbers, names or ids.

## Content rules

- **The site says what the repos say.** Services content comes from what
  SF Ops does for a customer (sf-ops: Work order, Quote approved online,
  photos, Work summary, invoice, payment). Solutions content comes from
  what SF Solutions has built (sf-solutions: cash-exposure cockpit,
  QuickBooks and Pipedrive connectors, dashboards, query builder). Nothing on the site promises what neither repo can do.
- **Use the official names** from sf-ops `docs/ontology.md` on every page
  that names a thing from SF Ops (Work order, Site, Field tech, Work
  summary, Client Due). Never "job ticket", "location", "technician".
- **One page per division, one route per page.** `/services` is the
  Division 01 page; `/enterprise` 301-redirects to it (#10). A new
  entry point is a new route to the existing page, never a second page.
- **Name no inventory platform.** Not Triplemeter (dissolved) and not
  Container Trade HQ (a separate company with different IP), on any page,
  screenshot, form option or alt text (Sonja, 2026-10-09, positioning P5).
  Solutions says we set up the automation and applications an operator
  needs, around the tools they already use.
- **No prices on the site.** Strategy pricing (discovery fee, outgate rates,
  minimums) is provisional; the button is "Book a discovery call".

## Contact forms

Three Netlify Forms, one per division page. All three post to the shared
thank-you page `/contact/thanks/` (the form's `action`), not Netlify's default.

| Form (`form-name`)    | Page                  | Address the page shows       | Notifies             |
|-----------------------|-----------------------|------------------------------|----------------------|
| `enterprise-contact`  | `/contact/enterprise` | `services@streichforce.com`  | `services@` ✅ verified |
| `solutions-contact`   | `/contact/solutions`  | `solutions@streichforce.com` | `solutions@` ✅ verified |
| `containers-contact`  | `/contact/containers` | `containers@streichforce.com`| `containers@` ✅ verified |

- Verified 2026-10-09 (deploy preview #25): one test per form landed in
  Netlify and its email arrived. The three addresses are aliases that all
  deliver to Sonja's Inbox (`sstreich@`), from `formresponses@netlify.com`,
  subjects "Website Service / Solutions / Container Request". Email alerts
  are set in Netlify → Forms → Submission notifications (dashboard only;
  the connector cannot set them). Sonja removed Solutions' "gate volume" and
  Containers' "market" questions the same day.
- Each form notifies its own address (Sonja, 2026-10-08). Form detection
  was turned on the same day.
- Submissions are read in Netlify → project `sfwebite` → Forms, and by email.
  Netlify site id `3effd78e-9ecb-4655-bb3f-d1e5549d8607`.
- A new form must keep `data-netlify="true"`, the hidden `form-name` input,
  and the honeypot, and must be plain HTML in the built page (no JS-rendered
  forms), or Netlify never registers it.

## Things that have bitten us

- **Netlify form detection was off (found 2026-10-08, #12).** The three forms
  had correct markup since launch, but the `sfwebite` project had Forms "not
  enabled" and zero forms registered, so every submission went nowhere while
  the page looked fine. Markup alone proves nothing: check the Netlify project
  lists the form (connector `get-forms-for-project`) and that a test
  submission lands, before calling a form done.
- **Form emails land in Sonja's own Inbox, not separate mailboxes.**
  `services@`, `solutions@` and `containers@` are aliases on `sstreich@`.
  "No email at services@" means look in her Inbox (search sender
  `formresponses@netlify.com`); the Microsoft 365 connector can do that. (#12)
- **Astro `redirects` alone is not a 301 on Netlify.** With no adapter, Astro
  writes a meta-refresh page (`dist/enterprise/index.html`) and Netlify serves
  that file, since a file on disk shadows a redirect rule. A retired route
  therefore needs both: the Astro entry (so `npm run preview` still lands) and
  a `[[redirects]]` block in `netlify.toml` with `status = 301` and
  `force = true`. (#10)
- **The build does not catch dead links.** The nav pointed at `/login` (a page
  this site never had) for months with `verify` green. Any PR that touches
  Nav, Footer or a route checks every internal `href` in `dist/` resolves
  (#11): `cd dist && for h in $(grep -rhoE 'href="/[^"#]*' --include=*.html . | sed 's/href="//' | sort -u); do p=".${h%/}"; [ -f "$p" ] || [ -f "$p/index.html" ] || [ "$h" = / ] || echo "DEAD: $h"; done`
- **Login goes to SF Ops** (`https://ops.streichforce.com/login`, D3). This
  site has no login of its own and never gets one.
- **Sonja's strategy notes are in OneDrive, not on a path you can open.**
  A path like `/Users/sonjastreich/Library/CloudStorage/OneDrive-…/AI Analysis
  Work/ChatGPT/<file>.docx` lives on her Mac. Find it by file name with the
  Microsoft 365 connector (`sharepoint_search`, then `read_resource`). The
  `SFE_Strategy_Step_0N_*` series sits in that folder, so read its siblings
  too. These notes are strategy, not shipped product: pricing and roadmap
  items in them (outgate rates, AI autonomy levels) never go on the site
  (#18).
- **The original filename is public.** Astro keeps the source basename in
  the built URL (`/_astro/<name>.<hash>.webp`), so a photo committed as
  `WO-00023_Before.jpeg` publishes the Work order number. Rename on intake to
  a neutral slug (`doors-storefront-2026-07-before.jpg`) and never commit the
  inbox names (#9).
- **`<Image widths={…}>` without `width` ships the full-size original too.**
  Astro uses the source's own width for the `src` fallback, so every 4032 px
  phone photo emitted a ~3 MB webp nobody loads but every deploy carries.
  Always pass `width` as the largest size you want (#9).
- **`<img>` width/height attributes beat CSS `aspect-ratio`** unless the CSS
  also sets `height: auto`. Astro's `<Image>` always writes both attributes,
  so a 4:3 crop silently became a tall original-ratio image (#9).
- **`BaseLayout` already appends " | Streich Force Enterprises" to every
  `title`.** The old homepage passed the company name in its own title, so
  the tab and Google read "Streich Force Enterprises — … | Streich Force
  Enterprises". Pass the page's own words only (#21).
- **A clickable card needs no JavaScript.** The old homepage cards used
  `onclick="window.location=…"`. Use a stretched link instead: the card's
  title link gets `::after { position:absolute; inset:0 }` on a
  `position:relative` card, and the buttons sit above it with
  `position:relative; z-index:1` (`.door` on the homepage, #21).
- **Measure Lighthouse with a full gallery, not the placeholders.** With 23
  photos `/services/gallery` scored 93; the first thumbnails must load eagerly
  (`eager` prop), or the lazy LCP image costs the score. What holds every
  page near 90 is the render-blocking Google Fonts stylesheet, not images.
