import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, Tile, Stats, useTitle } from '../components/ui.jsx'
import { STATS, galleryImg } from '../data.jsx'
import { PageHero } from '../components/ui.jsx'
import FaqSection from '../components/Faq.jsx'

const PROMISES = [
  ['A Relaxed Experience', 'Sessions that feel like time with a friend — unhurried, easy, and genuinely enjoyable from start to finish.',
    <><circle cx="12" cy="12" r="9" /><path d="M8.5 14a4.5 4.5 0 0 0 7 0" /><circle cx="9" cy="9.6" r="0.6" fill="currentColor" stroke="none" /><circle cx="15" cy="9.6" r="0.6" fill="currentColor" stroke="none" /></>],
  ['Professional Guidance', 'From what to wear to how to stand — gentle direction at every step, so you always look your best.',
    <><circle cx="12" cy="12" r="9" /><path d="m14.8 9.2-1.9 4.7-4.7 1.9 1.9-4.7 4.7-1.9z" /></>],
  ['Artistic Creativity', 'Every session is planned around your story with fresh ideas — never a formula, never recycled poses.',
    <><circle cx="12" cy="12" r="9" /><path d="m14.31 8 5.52 9.56M9.69 8h11.04M7.38 12l5.52-9.56M9.69 16 4.17 6.44M14.31 16H3.27M16.62 12l-5.52 9.56" /></>],
  ['Exceptional Image Quality', 'Sharp, true-to-colour photographs made with professional equipment and an obsessive eye for detail.',
    <><path d="M6 3h12l4 6-10 12L2 9l4-6z" /><path d="M11 3 8 9l4 12 4-12-3-6" /><path d="M2 9h20" /></>],
  ['Timeless Editing', 'Clean, elegant retouching that will still look right decades from now — no passing trends.',
    <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></>],
  ['Outstanding Service', 'Clear communication, prompt gallery delivery, and a team that genuinely cares about your memories.',
    <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>],
]

export default function About() {
  useTitle('About')
  return (
    <main>
      <PageHero image={galleryImg('about', 2)} eyebrow="About" title={<>Behind Every Great Photograph<br />Is a Story Worth Telling</>} />

      <Section bg="white">
        <Wrap>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18 items-center">
            <Reveal className="relative after:content-[''] after:absolute after:border after:border-gold after:-z-1 after:top-[18px] after:-right-[18px] after:-bottom-[18px] after:left-[18px]">
              <Tile src={galleryImg('about', 1)} alt="Jerry, the photographer behind Picture Republiq" />
            </Reveal>
            <Reveal>
              <Eyebrow>Meet the Photographer</Eyebrow>
              <h2 className="text-[clamp(29px,3.5vw,42px)]">Photography isn't just about taking pictures. <em className="text-golddark">It's about preserving emotions.</em></h2>
              <GoldRule left />
              <p className="font-normal mb-4">Hi. I am Jerry.</p>
              <p className="mb-4">I'm the photographer behind Picture Republiq. Creating inspired wedding concepts and capturing flawless events with love, joy, and dedication is what I do. I approach every session with creativity, patience, and an eye for authentic storytelling. My goal is true-to-colour, clean, and bold. I create images that you'll proudly display for generations.</p>
              <p>From intimate portraits to grand celebrations, we are passionate about capturing moments that truly matter.</p>
              <Stats items={STATS} />
              <Btn variant="gold" to="/portfolio" className="mt-8">View Portfolio</Btn>
            </Reveal>
          </div>
        </Wrap>
      </Section>

      <Section bg="grey">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Our Promise</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Every Client Receives</h2>
            <GoldRule />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 text-left">
            {PROMISES.map(([title, text, icon]) => (
              <Reveal key={title} className="bg-white border border-line px-8 pt-11 pb-9 text-center transition-all duration-350 hover:-translate-y-1.5 hover:border-gold/55 hover:shadow-[0_22px_44px_rgba(16,16,16,0.08)] group/promise">
                <span className="w-[54px] h-[54px] border border-gold rounded-full flex items-center justify-center mx-auto mb-5 text-gold transition-colors duration-350 group-hover/promise:bg-gold group-hover/promise:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[22px] h-[22px]">{icon}</svg>
                </span>
                <h3 className="text-xl mb-2">{title}</h3>
                <p className="text-[14.5px] text-muted m-0">{text}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Section>

      <FaqSection bg="grey" />

      <Section bg="black" className="text-center">
        <Wrap>
          <Reveal>
            <Eyebrow>Ready When You Are</Eyebrow>
            <h2 className="text-white text-[clamp(29px,3.5vw,42px)] max-w-[760px] mx-auto">Let's Create Something Timeless Together</h2>
            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <Btn variant="gold" to="/contact">Book Your Session</Btn>
            </div>
          </Reveal>
        </Wrap>
      </Section>
    </main>
  )
}
