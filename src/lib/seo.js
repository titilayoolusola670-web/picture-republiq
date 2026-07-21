const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://picturerepubliq.com').replace(/\/+$/, '')
const DEFAULT_TITLE = 'Luxury Wedding, Portrait & Event Photographer | Picture Republiq'
const DEFAULT_DESCRIPTION = 'Picture Republiq specializes in wedding, portrait, graduation, family, maternity, and corporate photography, creating timeless images that tell your unique story.'
const DEFAULT_IMAGE = `${SITE_URL}/assets/og-image.jpg`

const META = {
  '': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  About: {
    title: 'About | Picture Republiq',
    description: 'Meet Picture Republiq and the creative approach behind relaxed, story-led wedding, portrait, family, and event photography.',
    path: '/about',
  },
  'Our Services': {
    title: 'Photography Services | Picture Republiq',
    description: 'Explore Picture Republiq wedding, portrait, family, and event photography services with a calm process and refined delivery.',
    path: '/services',
  },
  Weddings: {
    title: 'Wedding Photography | Picture Republiq',
    description: 'Elegant wedding photography for traditional weddings, white weddings, civil ceremonies, receptions, and engagement sessions.',
    path: '/weddings',
  },
  Portraits: {
    title: 'Portraits & Headshots | Picture Republiq',
    description: 'Confident portraits, headshots, graduation photographs, personal branding images, and editorial-style portrait sessions.',
    path: '/portraits',
  },
  Family: {
    title: 'Family Photography | Picture Republiq',
    description: 'Warm family photography sessions for parents, children, extended family, studio portraits, and outdoor family memories.',
    path: '/family',
  },
  Events: {
    title: 'Event Photography | Picture Republiq',
    description: 'Professional photography coverage for corporate events, church programmes, birthdays, conferences, awards, and celebrations.',
    path: '/events',
  },
  Portfolio: {
    title: 'Photography Portfolio | Picture Republiq',
    description: 'Browse Picture Republiq wedding, portrait, family, and event photography highlights from recent work.',
    path: '/portfolio',
  },
  Contact: {
    title: 'Contact | Picture Republiq',
    description: 'Contact Picture Republiq to enquire about wedding, portrait, family, event, or custom photography sessions.',
    path: '/contact',
  },
  'Payment & Cancellation Policy': {
    title: 'Payment & Cancellation Policy | Picture Republiq',
    description: 'Review Picture Republiq payment, booking, cancellation, and rescheduling terms before confirming a photography session.',
    path: '/policy',
  },
  'Admin Login': {
    title: 'Admin Login | Picture Republiq',
    description: 'Picture Republiq admin login.',
    path: '/login',
    robots: 'noindex, nofollow',
  },
  'Admin Dashboard': {
    title: 'Admin Dashboard | Picture Republiq',
    description: 'Picture Republiq admin dashboard.',
    path: '/admin',
    robots: 'noindex, nofollow',
  },
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const name = selector.match(/\[(name|property)="([^"]+)"\]/)
    if (name) el.setAttribute(name[1], name[2])
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Picture Republiq',
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    description: DEFAULT_DESCRIPTION,
    telephone: '+2348097633559',
    email: 'info@picturerepubliq.com',
    sameAs: [
      'https://www.instagram.com/picture_republiq/',
      'https://www.tiktok.com/@picture_republiq',
    ],
    serviceType: [
      'Wedding photography',
      'Portrait photography',
      'Family photography',
      'Event photography',
    ],
  }

  let el = document.getElementById('picture-republiq-jsonld')
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'picture-republiq-jsonld'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function applySeo(pageTitle = '') {
  const meta = META[pageTitle] || {
    title: `${pageTitle} | Picture Republiq`,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  }
  const canonical = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`

  document.title = meta.title
  setMeta('meta[name="description"]', 'content', meta.description)
  setMeta('meta[name="robots"]', 'content', meta.robots || 'index, follow')
  setCanonical(canonical)
  setMeta('meta[property="og:title"]', 'content', meta.title)
  setMeta('meta[property="og:description"]', 'content', meta.description)
  setMeta('meta[property="og:url"]', 'content', canonical)
  setMeta('meta[property="og:image"]', 'content', DEFAULT_IMAGE)
  setMeta('meta[name="twitter:title"]', 'content', meta.title)
  setMeta('meta[name="twitter:description"]', 'content', meta.description)
  setMeta('meta[name="twitter:image"]', 'content', DEFAULT_IMAGE)
  setJsonLd()

  return meta.title
}
