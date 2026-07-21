import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, Tile, Poem, Stats, useTitle } from '../components/ui.jsx'
import { InstagramIcon, TikTokIcon } from '../components/icons.jsx'
import { SERVICE_CARDS, STATS, WHY_ITEMS, INSTA_IMAGES, SOCIAL, SITE_IMAGES, galleryImg } from '../data.jsx'
import FaqSection from '../components/Faq.jsx'

const HERO_SLIDES = SITE_IMAGES.home.hero
const heroPosition = (src) => ({
  base: 'center top',
  lg: src.includes('weddings-027') ? 'center 30%' : 'center top',
})

function Hero() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % HERO_SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="relative mt-16 h-[calc(100svh-4rem)] min-h-[520px] flex items-center justify-center text-center bg-ink overflow-hidden">
      {HERO_SLIDES.map((src, i) => (
        <div key={src}
          className={`hero-slide-bg absolute inset-0 bg-cover bg-no-repeat blur-2xl scale-110 transition-opacity duration-2000 ${i === active ? 'opacity-45' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${src})`,
            '--hero-position': heroPosition(src).base,
            '--hero-position-lg': heroPosition(src).lg,
            transitionProperty: 'opacity, transform',
            transitionDuration: '2s, 8s',
          }} />
      ))}
      {HERO_SLIDES.map((src, i) => (
        <img
          key={`${src}-main`}
          src={src}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-contain transition-all duration-2000 ease-out ${i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.015]'}`}
          style={{ objectPosition: heroPosition(src).lg }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/52 via-[#0a0a0a]/26 to-[#0a0a0a]/72" />
      <div className="relative z-2 px-6 py-20 max-w-[960px]">
        <Eyebrow>Luxury Wedding · Portrait · Event Photography</Eyebrow>
        <h1 className="text-white text-[clamp(38px,5.2vw,62px)]">
          Every Moment Has a Story<br /><em className="text-gold">We Capture Yours Beautifully</em>
        </h1>
        <p className="text-white/85 text-lg font-light max-w-[640px] mx-auto mt-7">
          Picture Republiq creates timeless imagery that celebrates love, life, milestones, and the people who matter most.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-9">
          <Btn variant="ghost" to="/portfolio">View Portfolio</Btn>
          <Btn variant="gold" to="/contact">Book Your Session</Btn>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-3 z-3" aria-label="Slideshow navigation">
        {HERO_SLIDES.map((src, i) => (
          <button key={src} aria-label={`Slide ${i + 1}`} onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full border cursor-pointer transition-colors ${i === active ? 'bg-gold border-gold' : 'border-white/70'}`} />
        ))}
      </div>
    </section>
  )
}

function OurServices() {
  const serviceImagePosition = (to) => (to === '/weddings' || to === '/portraits' ? 'center top' : 'center')

  return (
    <Section bg="white">
      <Wrap>
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-12 border-t border-line pt-9">
          <h2 className="text-[clamp(29px,3.5vw,42px)] m-0">Our <em>Services.</em></h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 md:gap-y-18 gap-x-14 mt-15">
          {SERVICE_CARDS.map((c) => (
            <Reveal key={c.to}>
              <Link to={c.to} className="block group/card">
                <Tile src={c.img} alt={`${c.title} by Picture Republiq`} wide fit="cover" position={serviceImagePosition(c.to)} className="mb-6 h-[300px] sm:h-[360px] lg:h-[420px] aspect-auto" />
                <span className="block font-mono text-[11px] tracking-[0.08em] text-muted mb-3">{c.tag}</span>
                <h3 className="text-[clamp(22px,2.3vw,27px)] text-golddark mb-2.5">{c.title}</h3>
                <p className="text-[15.5px] text-muted max-w-[480px]">{c.text}</p>
                <span className="inline-block mt-4.5 text-xs font-medium tracking-[0.22em] uppercase text-ink border-b border-ink pb-1 transition-colors duration-300 group-hover/card:text-golddark group-hover/card:border-golddark">
                  {c.link} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </Section>
  )
}

function AboutTeaser() {
  return (
    <Section bg="grey">
      <Wrap>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18 items-center">
          <Reveal className="relative after:content-[''] after:absolute after:border after:border-gold after:-z-1 after:top-[18px] after:-right-[18px] after:-bottom-[18px] after:left-[18px]">
            <Tile src={galleryImg('about', 1)} alt="Jerry — the photographer behind Picture Republiq" fit="cover" />
          </Reveal>
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Behind Every Great Photograph Is a Story Worth Telling</h2>
            <GoldRule left />
            <p className="mb-4">At Picture Republiq, photography is about preserving life's most meaningful experiences.</p>
            <Poem className="text-[22px]" lines={['Every smile.', 'Every embrace.', 'Every celebration.', 'Every quiet moment.']} />
            <p className="mt-4">These are the memories that deserve to last forever.</p>
            <Stats items={STATS} />
            <Btn to="/about" className="mt-8">Our Story</Btn>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  )
}

function WeddingCta() {
  return (
    <Section bg="black">
      <Wrap>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18 items-center">
          {/* content left, image right */}
          <Reveal className="order-2 md:order-1">
            <Eyebrow>— Wedding Photography</Eyebrow>
            <h2 className="text-white text-[clamp(29px,3.5vw,42px)]">
              Dreaming of Wedding Photographs You'll Never Outgrow? <em className="text-gold">Let's Make Them.</em>
            </h2>
            <GoldRule left />
            <p className="text-white/78 mb-4 first-letter:font-serif first-letter:text-[52px] first-letter:leading-[0.85] first-letter:float-left first-letter:pt-[7px] first-letter:pr-3 first-letter:text-gold">
              We take on a limited number of weddings each season, so every couple receives our full attention — from the quiet nerves of getting ready to the last song of the night.
            </p>
            <p className="text-white/78 mb-4">
              Every celebration is photographed with care, honest colour, and an eye for the moments you'll want to relive: the vows, the laughter, the tears, and everything in between.
            </p>
            <p className="text-white/78">If you're planning your big day, we would love to hear your story.</p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Btn variant="gold" to="/weddings">View Wedding Collections</Btn>
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2 relative after:content-[''] after:absolute after:border after:border-gold/60 after:-z-1 after:top-[18px] after:-right-[18px] after:-bottom-[18px] after:left-[18px]">
            <Tile src={SITE_IMAGES.home.weddingFeature} alt="A wedding photographed by Picture Republiq" fit="cover" />
          </Reveal>
        </div>
      </Wrap>
    </Section>
  )
}

function WhyChoose() {
  return (
    <Section bg="grey">
      <Wrap>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-11 lg:gap-24 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Why Choose Picture Republiq</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">A Photography Experience <em>Worthy of Your Moments</em></h2>
            <GoldRule left />
            <p className="text-muted text-base">
              From the first hello to your finished gallery, everything is designed to feel effortless — so you can be present while we take care of the pictures.
            </p>
            <Btn to="/contact" className="mt-3.5">Book Your Session</Btn>
          </Reveal>
          <ol>
            {WHY_ITEMS.map(([title, text], i) => (
              <Reveal as="li" key={title} className={`flex gap-7 py-7 border-t border-ink/14 group/why ${i === WHY_ITEMS.length - 1 ? 'border-b border-b-ink/14' : ''}`}>
                <span className="font-serif text-[19px] text-golddark min-w-9 pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[21px] mb-2 transition-colors duration-300 group-hover/why:text-golddark">{title}</h3>
                  <p className="text-[15px] text-muted m-0">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Wrap>
    </Section>
  )
}

// HBA-style Instagram section: dark band, gold-dash eyebrow + big serif
// handle on the left, follow link on the right, infinite auto-scrolling
// filmstrip of photos below (pauses on hover).
function InstagramStrip() {
  return (
    <section className="bg-[#1f1f1f] py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div className="text-white">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold">On Instagram</span>
            </div>
            <h2 className="mt-4 font-serif text-white text-4xl sm:text-5xl font-normal leading-[1.1]">{SOCIAL.handle}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-gold hover:text-gold">
              <InstagramIcon className="w-[18px] h-[18px]" />
              Instagram
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-gold hover:text-gold">
              <TikTokIcon className="w-[18px] h-[18px]" />
              TikTok
            </a>
          </div>
        </Reveal>
      </div>
      <div className="overflow-hidden mt-2">
        <div className="ig-track">
          {[...INSTA_IMAGES, ...INSTA_IMAGES].map((src, i) => (
            <a key={`${src}-${i}`} href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="View on Instagram"
              className="block overflow-hidden shrink-0 w-[260px] h-[300px] sm:w-[320px] sm:h-[360px] lg:w-[360px] lg:h-[400px] bg-ink">
              <img src={src} alt="Picture Republiq on Instagram" loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.025]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useTitle('')
  return (
    <main>
      <Hero />
      <OurServices />
      <AboutTeaser />
      <WeddingCta />
      <WhyChoose />
      <FaqSection bg="white" limit={6} />
      <InstagramStrip />
    </main>
  )
}
