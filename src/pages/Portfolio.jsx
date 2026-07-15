import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Section, Wrap, Eyebrow, Btn, Reveal, PageHero, useTitle } from '../components/ui.jsx'
import { GALLERY_COUNTS, GALLERY_LABELS, galleryImg } from '../data.jsx'

// Round-robin through categories so consecutive tiles differ in the "All" view.
function buildAll() {
  const cats = Object.keys(GALLERY_COUNTS)
  const idx = Object.fromEntries(cats.map((c) => [c, 1]))
  const out = []
  let remaining = cats.reduce((s, c) => s + GALLERY_COUNTS[c], 0)
  while (remaining > 0) {
    for (const c of cats) {
      if (idx[c] <= GALLERY_COUNTS[c]) {
        out.push({ cat: c, src: galleryImg(c, idx[c]) })
        idx[c] += 1
        remaining -= 1
      }
    }
  }
  return out
}

const ALL_TILES = buildAll()
const TOTAL = Object.values(GALLERY_COUNTS).reduce((a, b) => a + b, 0)
const FILTERS = [['all', 'All', TOTAL], ...Object.keys(GALLERY_COUNTS).map((c) => [c, GALLERY_LABELS[c], GALLERY_COUNTS[c]])]

function Lightbox({ items, index, onClose, onMove }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onMove(-1)
      if (e.key === 'ArrowRight') onMove(1)
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose, onMove])

  const [touchX, setTouchX] = useState(null)
  const btn = 'absolute border border-white/25 text-white/85 w-[52px] h-[52px] flex items-center justify-center text-xl cursor-pointer transition-colors hover:border-gold hover:text-gold'
  return (
    <div
      className="fixed inset-0 z-[500] bg-[#080808]/96 flex items-center justify-center"
      role="dialog" aria-label="Photo viewer"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return
        const dx = e.changedTouches[0].clientX - touchX
        if (Math.abs(dx) > 40) onMove(dx < 0 ? 1 : -1)
        setTouchX(null)
      }}
    >
      <img src={items[index].src} alt="" className="max-w-[min(92vw,1400px)] max-h-[86vh] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)]" />
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] uppercase text-white/60">{index + 1} / {items.length}</span>
      <button className={`${btn} top-6 right-6`} aria-label="Close" onClick={onClose}>✕</button>
      <button className={`${btn} left-3 sm:left-6 top-1/2 -translate-y-1/2`} aria-label="Previous photo" onClick={() => onMove(-1)}>‹</button>
      <button className={`${btn} right-3 sm:right-6 top-1/2 -translate-y-1/2`} aria-label="Next photo" onClick={() => onMove(1)}>›</button>
    </div>
  )
}

export default function Portfolio() {
  useTitle('Portfolio')
  const [params] = useSearchParams()
  const initial = GALLERY_COUNTS[params.get('cat')] ? params.get('cat') : 'all'
  const [filter, setFilter] = useState(initial)
  const [lb, setLb] = useState(null)

  const visible = useMemo(
    () => (filter === 'all' ? ALL_TILES : ALL_TILES.filter((t) => t.cat === filter)),
    [filter],
  )

  return (
    <main>
      <PageHero image="/assets/portfolio-camera-hero.png" imageFit="cover" imagePosition="center" eyebrow="Portfolio" title="Our Work"
        sub="A curated selection of the moments we've been honoured to capture." />

      <Section bg="white" className="pt-8 pb-16 md:py-28">
        <Wrap>
          <Reveal className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-7 sm:mb-10 md:mb-13">
            {FILTERS.map(([key, label, count]) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`font-sans text-[10.5px] sm:text-xs tracking-[0.16em] sm:tracking-[0.22em] uppercase px-3.5 sm:px-5.5 py-2 sm:py-[11px] border cursor-pointer transition-all duration-300
                ${filter === key ? 'bg-ink border-ink text-white' : 'border-line text-muted hover:border-gold hover:text-golddark'}`}>
                {label} <span className={`text-[9.5px] sm:text-[10px] ml-1 tracking-[0.08em] ${filter === key ? 'text-gold' : 'text-gold'}`}>{count}</span>
              </button>
            ))}
          </Reveal>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5.5">
            {visible.map((t, i) => (
              <button key={t.src} onClick={() => setLb(i)} aria-label="View photo"
                className="relative overflow-hidden cursor-zoom-in group bg-transparent block w-full mb-5.5 break-inside-avoid">
                <img src={t.src} alt={`${GALLERY_LABELS[t.cat]} photography by Picture Republiq`} loading="lazy" decoding="async"
                  className="w-full h-auto transition-transform duration-[1200ms] group-hover:scale-[1.025]" />
              </button>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section bg="black" className="text-center">
        <Wrap>
          <Reveal>
            <Eyebrow>Love What You See?</Eyebrow>
            <h2 className="text-white text-[clamp(29px,3.5vw,42px)]">Let's Create Yours Next</h2>
            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <Btn variant="gold" to="/contact">Book Your Session</Btn>
            </div>
          </Reveal>
        </Wrap>
      </Section>

      {lb !== null && (
        <Lightbox items={visible} index={lb} onClose={() => setLb(null)}
          onMove={(d) => setLb((i) => (i + d + visible.length) % visible.length)} />
      )}
    </main>
  )
}
