# Streich Force Enterprises — streichforce.com
## Astro + Netlify Website

### Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview production build
```

---

### Push to GitHub

```bash
cd streichforce
git init
git add .
git commit -m "Initial Streich Force site — homepage complete"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/streichforce.git
git push -u origin main
```

---

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Select your `streichforce` GitHub repo
3. Netlify auto-detects `netlify.toml` — no config needed
4. Click **Deploy site**

**Connect streichforce.com:**
- Netlify → Site settings → Domain management → Add custom domain
- Enter `streichforce.com`
- Update DNS at your registrar: point A record to Netlify's IP (shown in dashboard)
- SSL auto-provisions via Let's Encrypt

---

### Project Structure

```
src/
├── pages/
│   ├── index.astro              ← Homepage (hub) — COMPLETE
│   ├── enterprise/index.astro  ← Enterprise division — stub, ready to build
│   ├── solutions/index.astro   ← Solutions division — stub, ready to build
│   └── containers/index.astro  ← Containers division — stub, ready to build
├── components/
│   ├── Nav.astro               ← Site navigation with mobile menu
│   └── Footer.astro            ← Site footer
├── layouts/
│   └── BaseLayout.astro        ← HTML shell, favicon, SEO meta, Open Graph
└── styles/
    └── global.css              ← All brand tokens as CSS variables

public/
├── favicon.svg                 ← SF monogram favicon
└── hero-bg.png                 ← Homepage hero background image
```

---

### Brand Color Quick Reference

| Token | Value | Use |
|---|---|---|
| `--sf-rust` | `#C0392B` | Brand red — logo, CTAs, accents |
| `--sf-ent` | `#C0392B` | Enterprise division |
| `--sf-sol` | `#2E6DA4` | Solutions division |
| `--sf-con` | `#C47A0D` | Containers division |
| `--sf-text-primary` | `#F2EDE6` | Main text |
| `--sf-black` | `#111111` | Page background |

Full brand documentation: `StreichForce_Brand_Guidelines.docx`

---

### Next Steps (Division Pages)
- [ ] Build out `/enterprise` page with photo gallery
- [ ] Build out `/solutions` page with Triplemeter integration details
- [ ] Build out `/containers` page with inventory/quote request
- [ ] Add Netlify Forms to contact CTA
- [ ] Connect `streichforce.com` domain in Netlify

---

Built with [Astro](https://astro.build) · Hosted on [Netlify](https://netlify.com)
