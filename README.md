[README.md](https://github.com/user-attachments/files/26484488/README.md)
# StreichForce — streichforce.com
## Astro + Netlify Website

### Project Structure

```
src/
├── pages/
│   ├── index.astro              ← Homepage (hub)
│   ├── solutions/index.astro    ← Streich Force Solutions
│   ├── containers/index.astro   ← Container Sales
│   └── enterprise/index.astro  ← Repair & Fabrication
├── components/
│   ├── Nav.astro                ← Site navigation
│   └── Footer.astro             ← Site footer
├── layouts/
│   └── BaseLayout.astro         ← HTML shell, SEO meta tags
└── styles/
    └── global.css               ← Design tokens & utilities
```

---

### Getting Started (Local Dev)

**Prerequisites:** Node.js 18 or 20

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

### Deploying to Netlify

#### Option A — Connect GitHub (Recommended)
1. Push this project to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Netlify auto-detects the `netlify.toml` — no config needed
5. Click **Deploy**

#### Option B — Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

### Connecting Your Domain (streichforce.com)
1. In Netlify: **Site settings** → **Domain management** → **Add custom domain**
2. Enter `streichforce.com`
3. In your domain registrar's DNS settings, point:
   - **A record** → Netlify's load balancer IP (shown in Netlify dashboard)
   - Or set nameservers to Netlify's nameservers for full DNS management
4. Netlify provisions SSL automatically via Let's Encrypt

---

### Email Addresses Used
Update these throughout if your actual email addresses differ:
- `info@streichforce.com` — General contact (homepage)
- `solutions@streichforce.com` — Solutions division
- `containers@streichforce.com` — Container sales
- `enterprise@streichforce.com` — Repair & fabrication

Consider setting up email forwarding through your domain registrar to route these to your actual inbox.

---

### Customization Checklist
- [ ] Replace placeholder copy with real services/details
- [ ] Add real photos (drop in `public/` folder, reference as `/your-image.jpg`)
- [ ] Update stats on homepage (years in business, projects completed, etc.)
- [ ] Add a real contact form (consider Netlify Forms — free, zero config)
- [ ] Set up Google Analytics or Fathom in `BaseLayout.astro`
- [ ] Add favicon (`public/favicon.svg`)

---

### Adding a Contact Form (Netlify Forms — Free)
Add this to any page to get form submissions in your Netlify dashboard:

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <input type="text" name="name" placeholder="Your Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <textarea name="message" placeholder="What do you need?" required></textarea>
  <button type="submit">Send</button>
</form>
```

---

Built with [Astro](https://astro.build) · Hosted on [Netlify](https://netlify.com)
