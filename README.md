# Picture Republiq — Website

Luxury wedding, portrait, family & event photography site, built with
**React (Vite) + Tailwind CSS**.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
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

- Admin dashboard: `/#/login` (password-only). Bookings/newsletter records
  are stored per-browser (localStorage) and every submission is also emailed
  via FormSubmit to the studio inbox.
- Routing uses hash URLs (`/#/services`) so the static build works on any
  host without server rewrites.
