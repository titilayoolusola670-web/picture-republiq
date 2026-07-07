# Picture Republiq — Website

A complete static website built from the "Website requirement" document.

## Pages
- `index.html` — Home (cinematic hero slideshow, Why Choose, About teaser, services, CTA)
- `about.html` — About, Our Promise, Meet the Photographer (Jerry)
- `weddings.html` — Wedding services + Wedding Coverage Enquiry form
- `portraits.html` — Portrait services + Essential / Signature / Prestige collections
- `family.html` — Family services + Classic / Signature / Outdoor collections
- `events.html` — Event services + Event Coverage Enquiry form
- `portfolio.html` — Filterable gallery (placeholder tiles)
- `contact.html` — General inquiry form

## Features
- Fullscreen logo intro (`logo1.jpg`) on first entry, fades to the site after 2 seconds
  (shown once per browser session; logic in `js/main.js`).
- Cinematic hero slideshow, testimonials rotator, and newsletter signup on the homepage.
- Footer uses `logo2` (ivory logo) on a light editorial footer.

## To finish before launch

1. **Replace dummy photography.** All images in `assets/portfolio/` are free Unsplash
   stock photos used to make the site presentable. Swap them for Picture Republiq's
   real work (keep the same filenames for a zero-code swap, or update the `src`/
   `background-image` paths in the HTML).

2. **Replace sample testimonials.** The four quotes on the homepage are invented
   placeholders — replace with real client reviews.

3. **Connect the forms.** Enquiry forms and the newsletter show confirmation messages
   but don't send data anywhere yet. Easiest options:
   - [Formspree](https://formspree.io): add `action="https://formspree.io/f/YOUR_ID" method="POST"` to each `<form>`.
   - Newsletter: connect to Mailchimp or your email tool of choice.
   - Or use the built-in forms of whatever host you choose (Netlify Forms works by adding `netlify` to the form tag).

4. **Confirm the email address.** The requirement document left the footer email blank;
   `hello@picturerepubliq.com` is a placeholder in all pages' footers — replace with the real one.

5. **Hosting.** This is a plain static site — it can be uploaded to Netlify, Vercel,
   GitHub Pages, or any web host as-is.

## Design system (per requirement document)
- Colors: black `#101010`, white, warm gold `#c2a05d`, ivory `#f7f4ee`, warm grey `#edeae4`, accent beige `#e7ddcc`
- Fonts: Cormorant Garamond (headings/quotes), Poppins (body/menus/buttons/forms) — loaded from Google Fonts
- Type scale: hero 64–72px, section 42–48px, subheads 28–32px, body 18–20px, small 15–16px
