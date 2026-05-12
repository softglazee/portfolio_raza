# Muhammad Raza — SEO Portfolio

A production-ready React portfolio site for **Muhammad Raza, Senior SEO Expert**. Built with React, Vite, and Tailwind CSS.

**Highlights:** dark editorial design, animated scroll progress, side-dot navigation, interactive SERP console, animated metric bars, ranked-keywords gallery with filters, six client testimonials carousel, FAQ accordion, ATS-friendly print resume, and full mobile responsiveness.

---

## Quick start (run locally)

You will need [Node.js](https://nodejs.org) version 18 or higher installed.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (opens at http://localhost:5173)
npm run dev

# 3. Build the production version (output goes to /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## Upload to GitHub

```bash
# Inside the project folder
git init
git add .
git commit -m "Initial commit — SEO portfolio for Muhammad Raza"

# Create a new empty repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

That's it — the project is now on GitHub.

---

## Deploy to your subdomain (3 free options)

### Option 1 — Netlify (easiest, recommended)

1. Go to [netlify.com](https://netlify.com) and sign up using your GitHub account.
2. Click **Add new site → Import an existing project**.
3. Pick your GitHub repo. Netlify auto-detects Vite — just click **Deploy**.
4. Netlify gives you a live URL like `raza-seo.netlify.app`.
5. To use your own subdomain (for example `portfolio.yourdomain.com`):
   - In Netlify: **Site settings → Domain management → Add custom domain**
   - In your domain's DNS settings, add a CNAME record pointing your subdomain to the Netlify URL Netlify provides.

A `netlify.toml` file is already included in this repo, so the build settings are pre-configured.

### Option 2 — Vercel

1. Go to [vercel.com](https://vercel.com) and sign up using GitHub.
2. Click **Add New → Project**.
3. Import your GitHub repo. Vercel auto-detects Vite.
4. Click **Deploy**.
5. Add your custom subdomain under **Settings → Domains**.

### Option 3 — Your own hosting (cPanel, shared hosting, VPS)

1. Run `npm run build` locally.
2. Upload the **contents** of the `/dist` folder (not the folder itself) into your subdomain's root directory using FTP, cPanel File Manager, or SFTP.
3. Add this `.htaccess` file in the same folder so direct URLs work (the file is included in `/public` already, so it gets copied automatically):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Editing your content

All content is in `src/CV.jsx`. Open it in any text editor and search for the section you want to change:

| Looking for | Search for |
|---|---|
| Phone, email, contact details | `admin@leadsbids.com` |
| Job experience details | `Senior SEO Expert` |
| Ranked keywords list | `const rankings = [` |
| Client testimonials | `const testimonials = [` |
| FAQ questions | search for `// FAQ` |
| Skills toolkit | search for `// SKILLS` |
| Hero stats (3+, 460%, #1) | search for `Years Ranking` |

### Replacing your profile photo

Drop a new photo at `public/profile.jpg` (keep the same filename) and rebuild.

### Updating the resume PDF

Click **Download Resume** on the site — the browser opens its print dialog. Choose **Save as PDF**. The print stylesheet automatically generates a clean ATS-friendly version. To edit the content of the printed resume, find the `print-only` section near the top of `CV.jsx`.

---

## What's inside

```
raza-seo-portfolio/
├── public/
│   ├── profile.jpg              ← Your profile photo
│   ├── _redirects               ← Netlify SPA routing
│   └── .htaccess                ← Apache SPA routing (for cPanel hosting)
├── src/
│   ├── CV.jsx                   ← All content + components live here
│   ├── main.jsx                 ← React entry point
│   └── index.css                ← Global styles + Tailwind imports
├── index.html                   ← Meta tags, fonts, title
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── netlify.toml                 ← Netlify deploy config
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

---

## Built-in SEO

- Semantic HTML5 (`<section>`, `<nav>`, `<footer>`, proper headings)
- Open Graph meta tags for social previews
- Mobile-first responsive design
- Fast loading: Google Fonts preconnected, small JS bundle
- Accessible: proper ARIA labels, keyboard navigation (arrow keys)
- ATS-friendly print resume for download

---

## Tech stack

- **React 18** — UI library
- **Vite** — fast build tool
- **Tailwind CSS** — utility-first styling
- **Lucide Icons** — clean iconography
- **Google Fonts** — Inter, Space Grotesk, JetBrains Mono

---

## Licence

MIT — see [LICENSE](LICENSE) file.

---

Built with care for Muhammad Raza. Ship it.
