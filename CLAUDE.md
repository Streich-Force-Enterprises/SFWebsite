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
