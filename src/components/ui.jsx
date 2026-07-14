import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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

export function PageHero({ image, eyebrow, title, sub, compact = false, tight = false }) {
  return (
    <section className={`relative bg-ink text-center overflow-hidden ${tight ? 'pt-[72px] pb-[34px] md:pt-[92px] md:pb-[46px]' : compact ? 'pt-[96px] pb-[46px] md:pt-[126px] md:pb-[66px]' : 'pt-[150px] pb-[72px] md:pt-[210px] md:pb-[110px]'}`}>
      {image && <div className="absolute inset-0 bg-cover bg-center opacity-[0.18] md:opacity-35" style={{ backgroundImage: `url(${image})` }} />}
      <Wrap className="relative z-[2]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-white text-[clamp(38px,5.2vw,62px)]">{title}</h1>
        {sub && <p className="text-white/80 max-w-[620px] mx-auto mt-5">{sub}</p>}
      </Wrap>
    </section>
  )
}

export function ServiceHero({ eyebrow, title, sub, images = [], cta = 'Start an Enquiry', to = '/contact' }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (images.length < 2) return undefined
    const t = setInterval(() => setActive((a) => (a + 1) % images.length), 4600)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <section className="relative min-h-[78vh] bg-ink overflow-hidden flex items-end">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1600ms] ease-out ${i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/88 via-[#080808]/50 to-[#080808]/24" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-[#080808]/35" />
      <Wrap className="relative z-[2] pb-14 pt-36 md:pb-20">
        <div className="max-w-[760px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-white text-[clamp(40px,6vw,74px)]">{title}</h1>
          {sub && <p className="text-white/82 max-w-[590px] mt-6 text-lg">{sub}</p>}
          <Btn variant="gold" to={to} className="mt-9">{cta}</Btn>
        </div>
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-[560px]">
          {images.slice(0, 4).map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show ${eyebrow} image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden border cursor-pointer transition-all duration-300 ${i === active ? 'border-gold opacity-100' : 'border-white/20 opacity-60 hover:opacity-90'}`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
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
          <div key={`${src}-${i}`} className="w-[240px] sm:w-[330px] lg:w-[410px] h-[310px] sm:h-[390px] lg:h-[480px] shrink-0 overflow-hidden bg-ink2">
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ServiceStory({ eyebrow, title, body, points = [], image, reverse = false }) {
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

export function Tile({ src, alt, wide = false, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-beige group ${wide ? 'aspect-[16/10]' : 'aspect-[3/4]'} ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[clamp(40px,6vw,90px)] max-w-[920px] mx-auto mt-12">
      {items.map((name, i) => (
        <Reveal key={name} className={`flex items-baseline gap-5 px-1 py-5 border-b border-ink/15 hover:pl-4 ${i < 2 ? 'sm:border-t sm:border-t-ink/15' : ''} ${i === 0 ? 'border-t border-t-ink/15' : ''}`}>
          <span className="font-serif text-[15px] text-golddark min-w-[26px]">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-[17px] text-body">{name}</span>
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

export function WorkPointer({ bg = 'white', title, lede, cat, btn }) {
  return (
    <Section bg={bg} tight>
      <Wrap className="text-center">
        <Reveal>
          <Eyebrow>Recent Work</Eyebrow>
          <h2 className="text-[clamp(29px,3.5vw,42px)]">{title}</h2>
          <GoldRule />
          <p className="max-w-[520px] mx-auto text-muted text-base">{lede}</p>
          <Btn variant="gold" to={`/portfolio?cat=${cat}`} className="mt-7">{btn}</Btn>
        </Reveal>
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
