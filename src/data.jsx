export const SOCIAL = {
  instagram: 'https://instagram.com/picture_republiq',
  tiktok: 'https://www.tiktok.com/@picture_republiq',
  whatsapp: 'https://wa.me/2348097633559',
  email: 'mailto:hello@picturerepubliq.com',
  handle: '@picture_republiq',
  phone: '+234 809 763 3559',
  emailText: 'hello@picturerepubliq.com',
}

export const GALLERY_COUNTS = { weddings: 116, portraits: 85, family: 32, events: 34 }
export const GALLERY_LABELS = { weddings: 'Weddings', portraits: 'Portraits', family: 'Family', events: 'Events' }

export const R2_PUBLIC_URL = 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev'
export const galleryImg = (cat, n) => `${R2_PUBLIC_URL}/gallery/${cat}/${cat}-${String(n).padStart(3, '0')}.jpg`

export const SITE_IMAGES = {
  services: {
    weddings: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/services/weddings/weddings-108.jpg',
    portraits: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/services/portraits/portraits-047.jpg',
    family: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/services/family/family-020.jpg',
    events: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/services/events/events-009.jpg',
  },
  home: {
    services: {
      weddings: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/services/weddings/weddings-099.jpg',
      portraits: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/services/portraits/portraits-007.jpg',
      family: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/services/family/family-032.jpg',
      events: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/services/events/events-010.jpg',
    },
    hero: [
      'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/hero/family-018.jpg',
      'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/hero/weddings-052.jpg',
      'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/hero/weddings-027.jpg',
    ],
    weddingFeature: 'https://pub-1bfd270d8f774de6bb03af107e2f4636.r2.dev/site-images/home/wedding-feature/weddings-013.jpg',
  },
}

// Our Services cards (home) — single gold accent colour on titles
export const SERVICE_CARDS = [
  { to: '/weddings', img: SITE_IMAGES.home.services.weddings, tag: '01 — The Big Day', title: 'Wedding Photography', text: 'From "Yes" to "I Do" — every vow, every tear, and every dance-floor moment, captured beautifully.', link: 'Explore' },
  { to: '/portraits', img: SITE_IMAGES.home.services.portraits, tag: '02 — In the Studio', title: 'Portraits & Headshots', text: 'Graduation, professional, and personal portraits that feel natural, confident, and timeless.', link: 'See the Work' },
  { to: '/family', img: SITE_IMAGES.home.services.family, tag: '03 — At Home Together', title: 'Family Stories', text: 'Honest, relaxed family sessions — the moments you never want to forget, exactly as they felt.', link: 'See More' },
  { to: '/events', img: SITE_IMAGES.home.services.events, tag: '04 — Milestones & Celebrations', title: 'Event Photography', text: 'Professional coverage for meaningful events — discreet, creative, and delivered on time.', link: 'Explore' },
]

export const STATS = [
  ['150+', 'Sessions\nPhotographed'],
  ['50+', 'Weddings & Events\nCovered'],
  ['5–10', 'Days to Your\nFull Gallery'],
]

export const WHY_ITEMS = [
  ['Experience', 'Years of capturing unforgettable moments — weddings, portraits, families, and events.'],
  ['Creativity', 'Every session is uniquely planned around you — no recycled poses, no formula.'],
  ['Professional Editing', 'True-to-colour, clean, and bold — every photograph is carefully perfected by hand.'],
  ['Client Experience', 'Relaxed, unhurried sessions that bring out genuine emotion in front of the camera.'],
  ['Timely Delivery', 'Beautiful online galleries delivered promptly — within 5–10 business days.'],
]

export const INSTA_IMAGES = [
  galleryImg('weddings', 5), galleryImg('portraits', 3), galleryImg('family', 2),
  galleryImg('events', 3), galleryImg('portraits', 15), galleryImg('weddings', 45),
]

export const INCLUDES = {
  weddings: ['Engagement Sessions', 'Traditional Weddings', 'White Weddings', 'Destination Weddings', 'Civil Ceremonies', 'Reception Coverage', 'Bridal Portraits', 'Family Portraits'],
  portraits: ['Professional Headshots', 'Creative Portraits', 'Personal Branding', 'Editorial Portraits'],
  family: ['Studio Family Portraits', 'Outdoor Family Sessions', 'Extended Family Photography'],
  events: ['Corporate Events', 'Church Events', 'Award Ceremonies', 'Conferences', 'Birthday Celebrations', 'Community Events', 'Networking Events', 'Professional Branding'],
}

export const PORTRAIT_COLLECTIONS = [
  { tag: 'Essential', title: 'The Essential Collection', blurb: 'Perfect for timeless portraits with a refined, minimalist experience.', price: '₦75,000', to: '/contact?service=portrait-essential', cta: 'Book The Essential Collection', features: ['Individual portrait session', '1 outfit', 'Up to 1-hour photography session', '5 professionally edited high-resolution images', 'Online gallery for image selection and download', 'Delivery within 5–10 business days'] },
  { tag: 'Most Popular', title: 'The Signature Collection', blurb: 'Designed for clients who want greater variety, creativity, and storytelling.', price: '₦135,000', to: '/contact?service=portrait-signature', cta: 'Book The Signature Collection', featured: true, features: ['Individual portrait session', '2 outfit changes', 'Up to 1-hour photography session', '11 professionally edited high-resolution images', 'Online gallery for image selection and download', 'Delivery within 5–10 business days'] },
  { tag: 'Prestige', title: 'The Prestige Collection', blurb: 'Our most comprehensive portrait experience, created for those who want a truly elevated session.', price: '₦200,000', to: '/contact?service=portrait-prestige', cta: 'Book The Prestige Collection', features: ['Individual portrait session', '3 outfit changes', 'Up to 2-hour photography session', '15 professionally edited high-resolution images', 'Online gallery for image selection and download', 'Delivery within 5–10 business days'] },
]

export const FAMILY_COLLECTIONS = [
  { tag: 'Classic', title: 'The Classic Collection', blurb: 'A beautifully curated session for capturing timeless family memories.', price: '₦100,000', to: '/contact?service=family-classic', cta: 'Book The Classic Collection', features: ['Family session (maximum of 7 people)', '1 outfit', 'Up to 1-hour photography session', '7 professionally edited high-resolution images', 'Private online gallery for image selection and download', 'Delivery within 5–10 business days'] },
  { tag: 'Most Popular', title: 'The Signature Collection', blurb: "More time, more variety, and more opportunities to tell your family's story.", price: '₦185,000', to: '/contact?service=family-signature', cta: 'Book The Signature Collection', featured: true, features: ['Family session (maximum of 7 people)', 'Up to 2 outfit changes', 'Up to 2-hour photography session', '12 professionally edited high-resolution images', 'Private online gallery for image selection and download', 'Delivery within 5–10 business days'] },
  { tag: 'Outdoor', title: 'The Outdoor Collection', blurb: 'A relaxed outdoor experience that captures your family in beautiful natural surroundings.', price: '₦200,000', to: '/contact?service=family-outdoor', cta: 'Book The Outdoor Collection', features: ['Family session (maximum of 7 people)', '1–2 outfit changes', 'Up to 2-hour outdoor photography session', '15 professionally edited high-resolution images', 'Private online gallery for image selection and download', 'Delivery within 5–10 business days'] },
]

export const SERVICE_ROWS = [
  { to: '/weddings', img: SITE_IMAGES.services.weddings, tag: '01 — Weddings', title: <>From &ldquo;Yes&rdquo; to &ldquo;I Do&rdquo; — <em className="text-golddark">Every Detail Captured</em></>, body: 'Your love story deserves to be remembered forever. We document every chapter of your day — the anticipation, the vows, the joyful tears, the celebration — with authenticity, elegance, and attention to detail.', items: ['Traditional & White Weddings', 'Engagement Sessions', 'Destination Weddings', 'Civil Ceremonies', 'Reception Coverage', 'Bridal Portraits'], btn: 'Explore Weddings' },
  { to: '/portraits', img: SITE_IMAGES.services.portraits, tag: '02 — Portraits', title: <>Portraits That Feel Like <em className="text-golddark">You</em></>, body: "Whether you're updating your professional image, celebrating a milestone, or simply capturing this season of life, we create portraits that feel natural, confident, and timeless — with collections starting from ₦75,000.", items: ['Professional Headshots', 'Creative Portraits', 'Personal Branding', 'Editorial Portraits'], btn: 'Explore Portraits', flip: true, bg: 'grey' },
  { to: '/family', img: SITE_IMAGES.services.family, tag: '03 — Family', title: <>The Moments You Never Want to <em className="text-golddark">Forget</em></>, body: "Relaxed sessions that let your family's story unfold naturally — genuine love, personality, and connection, photographed to be treasured for years. Collections start from ₦100,000.", items: ['Studio Family Portraits', 'Outdoor Family Sessions', 'Extended Family Photography'], btn: 'Explore Family' },
  { to: '/events', img: SITE_IMAGES.services.events, tag: '04 — Events', title: <>Professional Coverage for Meaningful <em className="text-golddark">Events</em></>, body: 'From intimate celebrations to corporate conferences, we document every event with professionalism, discretion, and creativity — and deliver on time, every time.', items: ['Corporate Events', 'Conferences', 'Award Ceremonies', 'Church Events', 'Birthdays & Celebrations', 'Community Events'], btn: 'Explore Events', flip: true, bg: 'grey' },
]
