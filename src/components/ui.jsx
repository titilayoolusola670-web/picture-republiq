import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryImg } from '../data.jsx'

/* ---------- layout ---------- */

const SECTION_BG = {
  white: 'bg-warmgrey',
  grey: 'bg-warmgrey',
  beige: 'bg-beige',
  black: 'bg-ink text-white/80',
  ivory: 'bg-ivory',
  dark: 'bg-[#1f1f1f] text-white/80',
}

export function Section({ bg = 'white', tight = false, className = '', children, ...rest }) {
  return (
    <section className={`${SECTION_BG[bg]} ${tight ? 'py-20' : 'py-24 md:py-28'} ${className}`} {...rest}>
      {children}
    </section>
  )
}

export function Wrap({ narrow = false, className = '', children }) {
  return (
    <div className={`${narrow ? 'max-w-[820px]' : 'max-w-[1200px]'} mx-auto px-6 ${className}`}>
      {children}
    </div>
  )
}

export function Eyebrow({ className = '', children }) {
  return (
    <span className={`block font-sans text-[13px] font-medium tracking-[0.35em] uppercase text-gold mb-4 ${className}`}>
      {children}
    </span>
  )
}

export function GoldRule({ left = false, className = '' }) {
  return <hr className={`w-16 h-px bg-gold border-0 my-6 ${left ? '' : 'mx-auto'} ${className}`} />
}

/* ---------- button ---------- */

const BTN = {
  dark: 'border-ink text-ink hover:bg-ink hover:text-white',
  gold: 'border-gold bg-gold text-white hover:bg-golddark hover:border-golddark',
  ghost: 'border-white/85 text-white hover:bg-warmgrey hover:text-ink',
}

export function Btn({ variant = 'dark', to, href, className = '', children, ...rest }) {
  const cls = `inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-9 py-[15px] border cursor-pointer transition-all duration-300 text-center ${BTN[variant]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}

/* ---------- reveal on scroll ---------- */

export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }),
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`transition-all duration-[900ms] ease-out ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* ---------- page hero (inner pages) ---------- */

export function PageHero({ image, eyebrow, title, sub, compact = false, tight = false, imageFit = 'contain', imagePosition = 'center', textBelow = false }) {
  if (textBelow && image) {
    return (
      <section className="bg-warmgrey">
        <div className="bg-ink pt-[82px] md:pt-[98px]">
          <div className="h-[46vh] md:h-[62vh] max-h-[720px] bg-ink flex items-center justify-center overflow-hidden">
            <img src={image} alt="" className={`w-full h-full ${imageFit === 'cover' ? 'object-cover' : 'object-contain'}`} style={{ objectPosition: imagePosition }} />
          </div>
        </div>
        <Wrap className="text-center py-12 md:py-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(38px,5.2vw,62px)]">{title}</h1>
          {sub && <p className="text-muted max-w-[620px] mx-auto mt-5">{sub}</p>}
        </Wrap>
      </section>
    )
  }

  return (
    <section className={`relative bg-ink text-center overflow-hidden ${tight ? 'pt-[72px] pb-[34px] md:pt-[92px] md:pb-[46px]' : compact ? 'pt-[96px] pb-[46px] md:pt-[126px] md:pb-[66px]' : 'pt-[150px] pb-[72px] md:pt-[210px] md:pb-[110px]'}`}>
      {image && <div className={`absolute inset-0 bg-no-repeat opacity-[0.28] md:opacity-45 ${imageFit === 'cover' ? 'bg-cover' : 'bg-contain'}`} style={{ backgroundImage: `url(${image})`, backgroundPosition: imagePosition }} />}
      <Wrap className="relative z-[2]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-white text-[clamp(38px,5.2vw,62px)]">{title}</h1>
        {sub && <p className="text-white/80 max-w-[620px] mx-auto mt-5">{sub}</p>}
      </Wrap>
    </section>
  )
}

export function ServiceHero({ eyebrow, title, sub, images = [], mobileImages = [], cta = 'Start an Enquiry', to = '/contact', imagePosition = 'center', imageFit = 'contain' }) {
  const [active, setActive] = useState(0)
  const [useMobileImages, setUseMobileImages] = useState(false)
  const heroImages = mobileImages.length && useMobileImages ? mobileImages : images

  useEffect(() => {
    if (!mobileImages.length) return undefined
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setUseMobileImages(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [mobileImages.length])

  useEffect(() => {
    setActive(0)
  }, [heroImages.length])

  useEffect(() => {
    if (heroImages.length < 2) return undefined
    const t = setInterval(() => setActive((a) => (a + 1) % heroImages.length), 4600)
    return () => clearInterval(t)
  }, [heroImages.length])

  return (
    <section className="bg-warmgrey">
      <div className="relative bg-[#1b1712] overflow-hidden">
        <div className="relative h-screen flex items-center justify-center">
          {heroImages.map((src, i) => (
            <img
              key={`${src}-wash`}
              src={src}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-35 transition-opacity duration-[1600ms] ease-out ${i === active ? 'opacity-35' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(194,160,93,0.16),transparent_38%),linear-gradient(180deg,rgba(16,16,16,0.22),rgba(16,16,16,0.66))]" />
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              style={{ objectPosition: imagePosition }}
              className={`absolute inset-0 w-full h-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition-all duration-[1600ms] ease-out ${i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.015]'}`}
            />
          ))}
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 w-[min(560px,calc(100%-32px))]">
          {heroImages.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show ${eyebrow} image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[3px] cursor-pointer transition-all duration-300 ${i === active ? 'w-10 bg-gold' : 'w-5 bg-white/35 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>
      <Wrap className="py-9 md:py-11">
        <div className="max-w-[760px] mx-auto text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(28px,4vw,44px)]">{title}</h1>
          {sub && <p className="text-muted max-w-[610px] mx-auto mt-4 text-[15.5px] md:text-base leading-relaxed">{sub}</p>}
          <Btn variant="gold" to={to} className="mt-6">{cta}</Btn>
        </div>
      </Wrap>
    </section>
  )
}

export function ImageRail({ images = [], label = 'Selected Work' }) {
  const rail = [...images, ...images]
  return (
    <section className="bg-ink py-5 overflow-hidden" aria-label={label}>
      <div className="service-rail">
        {rail.map((src, i) => (
          <div key={`${src}-${i}`} className="w-[240px] sm:w-[330px] lg:w-[410px] h-[310px] sm:h-[390px] lg:h-[480px] shrink-0 overflow-hidden bg-ink2 border border-white/8">
            <img src={src} alt="" loading="lazy" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ServiceGallery({ images = [], eyebrow = 'Selected Work', title = 'A Closer Look', label = 'Selected photographs' }) {
  const slides = images.slice(0, 10)
  const rail = [...slides, ...slides]

  if (!slides.length) return null

  return (
    <Section bg="ivory" tight className="overflow-hidden pb-8 md:pb-10" aria-label={label}>
      <Wrap>
        <Reveal className="max-w-[720px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[clamp(30px,4vw,50px)]">{title}</h2>
          <GoldRule left />
        </Reveal>
      </Wrap>
      <div className="mt-11 overflow-hidden" aria-label={`${eyebrow} slider`}>
        <div className="service-highlight-track">
          {rail.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className="group/gallery relative w-[250px] sm:w-[330px] lg:w-[390px] h-[330px] sm:h-[420px] lg:h-[500px] shrink-0 bg-warmgrey p-2 border border-ink/12 shadow-[0_18px_48px_rgba(16,16,16,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/70"
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-contain transition-transform duration-[1200ms] group-hover/gallery:scale-[1.018]" />
            </figure>
          ))}
        </div>
      </div>
      <Wrap>
        <div className="mt-7 h-px w-full bg-ink/10" />
      </Wrap>
    </Section>
  )
}

export function ServiceStory({ eyebrow, title, body, points = [], image, reverse = false }) {
  if (!image) {
    return (
      <Section bg="white">
        <Wrap narrow>
          <Reveal className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,50px)]">{title}</h2>
            <GoldRule />
            <div className="grid gap-4 text-body text-left sm:text-center">
              {body.map((p) => <p key={p}>{p}</p>)}
            </div>
            {points.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 text-left">
                {points.map((point) => (
                  <span key={point} className="border border-ink/12 bg-ivory px-4 py-3 text-[13px] tracking-[0.13em] uppercase text-muted">{point}</span>
                ))}
              </div>
            )}
          </Reveal>
        </Wrap>
      </Section>
    )
  }

  return (
    <Section bg="white">
      <Wrap>
        <div className={`grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-20 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,50px)]">{title}</h2>
            <GoldRule left />
            <div className="grid gap-4 text-body">
              {body.map((p) => <p key={p}>{p}</p>)}
            </div>
            {points.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {points.map((point) => (
                  <span key={point} className="border border-ink/12 bg-ivory px-4 py-3 text-[13px] tracking-[0.13em] uppercase text-muted">{point}</span>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal className="relative min-h-[420px] lg:min-h-[620px]">
            <div className="absolute inset-0 border border-gold/60 translate-x-4 translate-y-4" />
            <Tile src={image} alt="" className="relative h-full min-h-[420px] lg:min-h-[620px]" />
          </Reveal>
        </div>
      </Wrap>
    </Section>
  )
}

/* ---------- image tile ---------- */

export function Tile({ src, alt, wide = false, fit = 'contain', position = 'center', className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-beige group ${wide ? 'aspect-[16/10]' : 'aspect-[3/4]'} ${className}`}>
      <img src={src} alt={alt} loading="lazy" style={{ objectPosition: position }} className={`w-full h-full ${fit === 'cover' ? 'object-cover group-hover:scale-105' : 'object-contain group-hover:scale-[1.025]'} transition-transform duration-[1200ms] ease-out`} />
    </div>
  )
}

/* ---------- rotating poem ---------- */

export function Poem({ lines, className = '' }) {
  const [active, setActive] = useState(lines.length - 1)
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % lines.length), 2000)
    return () => clearInterval(t)
  }, [lines.length])
  return (
    <p className={`font-serif italic text-ink leading-[1.6] ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className={`block transition-colors duration-500 ${i === active ? 'text-gold' : ''}`}>{line}</span>
      ))}
    </p>
  )
}

/* ---------- stats (about numbers) ---------- */

export function Stats({ items, dark = false, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-7 border-t ${dark ? 'border-white/15' : 'border-line'} mt-10 pt-8 ${className}`}>
      {items.map(([num, label]) => (
        <div key={label}>
          <span className={`block font-serif text-[clamp(34px,3.4vw,48px)] leading-none ${dark ? 'text-white' : 'text-ink'}`}>{num}</span>
          <span className="block mt-3 text-[11px] font-medium tracking-[0.16em] uppercase text-muted leading-[1.7] whitespace-pre-line">{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------- services include (numbered editorial grid) ---------- */

export function IncludeGrid({ items }) {
  const count = items.length
  const gridCols = count <= 3
    ? 'sm:grid-cols-3 max-w-[920px]'
    : count <= 4
      ? 'sm:grid-cols-2 lg:grid-cols-4 max-w-[1120px]'
      : 'sm:grid-cols-2 lg:grid-cols-4 max-w-[1120px]'
  const cardSize = count <= 3 ? 'min-h-[190px] px-6 py-7' : 'min-h-[150px] px-5 py-6'

  return (
    <div className={`grid grid-cols-1 gap-4 ${gridCols} mx-auto mt-12`}>
      {items.map((name, i) => (
        <Reveal key={name} className={`group/include vintage-paper border border-ink/13 ${cardSize} flex flex-col justify-between transition-all duration-350 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_20px_42px_rgba(16,16,16,0.12)]`}>
          <span className="font-serif text-[28px] leading-none text-golddark/75">{String(i + 1).padStart(2, '0')}</span>
          <span className={`block text-body mt-5 leading-snug ${count <= 3 ? 'text-[18px]' : 'text-[16px]'}`}>{name}</span>
          <span className="block w-10 h-px bg-gold/70 mt-5 transition-all duration-350 group-hover/include:w-16" />
        </Reveal>
      ))}
    </div>
  )
}

/* ---------- price card ---------- */

export function PriceCard({ tag, title, blurb, price, features, cta, to, featured = false }) {
  return (
    <Reveal className={`bg-ivory border border-line flex flex-col text-center px-10 pt-13 pb-11 transition-shadow hover:shadow-[0_24px_48px_rgba(16,16,16,0.10)] hover:-translate-y-1.5 ${featured ? 'border-t-[3px] border-t-gold' : ''}`}>
      <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3.5">{tag}</div>
      <h3 className="text-[clamp(22px,2.3vw,27px)] mb-3">{title}</h3>
      <p className="text-[15px] text-muted min-h-[72px]">{blurb}</p>
      <div className="font-serif text-[40px] text-ink mt-5 mb-1.5">
        <small className="block font-sans text-[11px] tracking-[0.3em] uppercase text-muted mb-2">Investment</small>
        {price}
      </div>
      <ul className="text-left my-6 mb-8 text-[15px] text-body flex-1">
        {features.map((f) => <li key={f} className="price-li">{f}</li>)}
      </ul>
      <Btn variant={featured ? 'gold' : 'dark'} to={to} className="w-full">{cta}</Btn>
    </Reveal>
  )
}

/* ---------- portfolio pointer ---------- */

export function WorkPointer({ bg = 'white', title, lede, cat, btn, images = [], wide = false }) {
  const previewImages = images.length ? images : [1, 2, 3].map((n) => galleryImg(cat, n))
  const shownImages = [...previewImages, ...[1, 2, 3].map((n) => galleryImg(cat, n))]
    .filter((src, index, all) => all.indexOf(src) === index)
    .slice(0, 3)
  return (
    <Section bg={bg} tight className="overflow-hidden">
      <Wrap>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:items-center">
          <Reveal className={wide ? 'max-w-[680px] lg:max-w-none' : ''}>
            <Eyebrow>Recent Work</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">{title}</h2>
            <GoldRule left />
            <p className="max-w-[520px] text-muted text-base">{lede}</p>
            <Btn variant="gold" to={`/portfolio?cat=${cat}`} className="mt-7">{btn}</Btn>
          </Reveal>
          <Reveal className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {shownImages.map((src) => (
              <Link
                key={src}
                to={`/portfolio?cat=${cat}`}
                className="block overflow-hidden border border-ink/12 bg-transparent p-2 shadow-[0_18px_38px_rgba(16,16,16,0.12)] transition-all duration-350 hover:-translate-y-1 hover:border-gold"
              >
                <img src={src} alt="" loading="lazy" className="h-auto w-full" />
              </Link>
            ))}
          </Reveal>
        </div>
      </Wrap>
    </Section>
  )
}

/* ---------- per-page title ---------- */

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Picture Republiq` : 'Luxury Wedding, Portrait & Event Photographer | Picture Republiq'
  }, [title])
}
