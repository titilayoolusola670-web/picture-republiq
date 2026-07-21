# Picture Republiq — Website

Luxury wedding, portrait, family & event photography site, built with
**React (Vite) + Tailwind CSS**.

## Develop

```bash
npm install
npm run dev:api   # backend API -> http://127.0.0.1:4000
npm run dev       # local dev server -> http://127.0.0.1:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

Create a local `.env` file before starting the API:

```bash
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/picture-republiq
ADMIN_PASSWORD=your-admin-password
ADMIN_TOKEN_SECRET=replace-with-a-long-random-string
```

## Structure

- `src/pages/` — one component per page (Home, About, Services, Weddings,
  Portraits, Family, Events, Portfolio, Contact, Login, Admin)
- `src/components/` — shared UI (Header, Footer, NewsletterModal, forms, primitives)
- `src/data.jsx` — service cards, price collections, include lists, socials
- `public/assets/gallery/<category>/` — the photo library
  (`<category>-NNN.jpg`; update counts in `src/data.jsx` after adding photos)
- `docs/` — committed production build served by GitHub Pages

## Deployments

- **GitHub Pages** serves `docs/` on `main` — rebuild with
  `npm run build && rm -rf docs && cp -R dist docs`, then commit.
- **cPanel** — `.github/workflows/deploy-cpanel.yml` builds and FTP-uploads
  `dist/` on every push (requires `FTP_SERVER`, `FTP_USERNAME`,
  `FTP_PASSWORD`, `FTP_TARGET_DIR` repo secrets).

## Notes

- Admin dashboard: `/login`. Bookings/newsletter records are saved to
  MongoDB through the local API and every submission is also emailed via
  FormSubmit to the studio inbox.
- Routing uses clean URLs (`/services`, `/weddings`) with the production
  fallback rewrite in `public/.htaccess`.
