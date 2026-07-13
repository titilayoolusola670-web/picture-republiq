import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, Tile, PageHero, useTitle } from '../components/ui.jsx'
import { SERVICE_ROWS, SOCIAL } from '../data.jsx'

export default function Services() {
  useTitle('Our Services')
  return (
    <main>
      <PageHero eyebrow="Our Services"
        title={<>Photography for Every<br />Chapter of Your Story</>}
        compact />

      {SERVICE_ROWS.map((row) => (
        <Section key={row.to} bg={row.bg || 'white'}>
          <Wrap>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18 items-center">
              <Reveal className={`relative after:content-[''] after:absolute after:border after:border-gold after:-z-1 after:top-[18px] after:-right-[18px] after:-bottom-[18px] after:left-[18px] ${row.flip ? 'md:order-2' : ''}`}>
                <Tile src={row.img} alt={`${row.btn} — Picture Republiq`} />
              </Reveal>
              <Reveal className={row.flip ? 'md:order-1' : ''}>
                <span className="block font-mono text-[11px] tracking-[0.08em] text-muted mb-3.5">{row.tag}</span>
                <h2 className="text-[clamp(29px,3.5vw,42px)]">{row.title}</h2>
                <GoldRule left />
                <p className="mb-4">{row.body}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-[15px] text-muted mt-5 mb-1.5">
                  {row.items.map((i) => <li key={i}><span className="text-gold">— </span>{i}</li>)}
                </ul>
                <Btn variant="gold" to={row.to} className="mt-5">{row.btn}</Btn>
              </Reveal>
            </div>
          </Wrap>
        </Section>
      ))}

      <Section bg="black" className="text-center">
        <Wrap>
          <Reveal>
            <Eyebrow>Not Sure Which Fits?</Eyebrow>
            <h2 className="text-white text-[clamp(29px,3.5vw,42px)] max-w-[760px] mx-auto">Tell Us What You're Planning — <em className="text-gold">We'll Guide You</em></h2>
            <p className="text-white/75 max-w-[560px] mx-auto mt-5">Every story is different. Share a few details and we'll recommend the right session or coverage for your day.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <Btn variant="gold" to="/contact">Book Your Session</Btn>
              <Btn variant="ghost" href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</Btn>
            </div>
          </Reveal>
        </Wrap>
      </Section>
    </main>
  )
}
