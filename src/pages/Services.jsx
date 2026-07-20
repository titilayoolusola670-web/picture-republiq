import { Link } from 'react-router-dom'
import { Section, Wrap, Eyebrow, Btn, Reveal, Tile, useTitle } from '../components/ui.jsx'
import { SOCIAL, galleryImg } from '../data.jsx'

const HERO_IMAGES = [
  galleryImg('weddings', 39),
  galleryImg('portraits', 21),
  galleryImg('family', 28),
]

const SERVICE_DIRECTORY = [
  {
    to: '/weddings',
    number: '01',
    label: 'Weddings',
    img: galleryImg('weddings', 58),
    kicker: 'Traditional · White · Civil',
    line: 'For celebrations with emotion, movement, family, and all the little details that make the day yours.',
    items: ['Ceremony', 'Reception', 'Portraits'],
    cta: 'Explore Weddings',
  },
  {
    to: '/portraits',
    number: '02',
    label: 'Portraits',
    img: galleryImg('portraits', 60),
    kicker: 'Headshots · Branding · Editorial',
    line: 'Portraits with presence: composed, confident, natural, and shaped around the way you want to be seen.',
    items: ['Studio', 'Branding', 'Editorial'],
    cta: 'Explore Portraits',
  },
  {
    to: '/family',
    number: '03',
    label: 'Family',
    img: galleryImg('family', 30),
    kicker: 'Home · Studio · Outdoor',
    line: 'Warm, honest family photographs that leave room for personality, closeness, laughter, and real connection.',
    items: ['Children', 'Parents', 'Generations'],
    cta: 'Explore Family',
  },
  {
    to: '/events',
    number: '04',
    label: 'Events',
    img: galleryImg('events', 29),
    kicker: 'Corporate · Social · Milestones',
    line: 'Discreet, polished coverage for meaningful gatherings, brand moments, and celebrations worth remembering.',
    items: ['Guests', 'Details', 'Highlights'],
    cta: 'Explore Events',
  },
]

export default function Services() {
  useTitle('Our Services')
  return (
    <main>
      <section className="bg-warmgrey pt-[104px] md:pt-[132px] pb-14 md:pb-[72px] overflow-hidden">
        <Wrap>
          <div className="max-w-[760px] mx-auto text-center">
            <Reveal>
              <Eyebrow>Our Services</Eyebrow>
              <h1 className="text-[clamp(48px,7vw,96px)]">Services</h1>
              <p className="text-muted max-w-[600px] mx-auto mt-5 text-lg">Wedding, portrait, family, and event photography with a calm process and a refined, story-led finish.</p>
            </Reveal>
          </div>

          <div className="mt-12 md:mt-16 sm:hidden relative min-h-[590px]">
            <Reveal className="absolute left-0 top-0 w-[68%] z-[1]">
              <Tile src={HERO_IMAGES[0]} alt="Wedding photography by Picture Republiq" fit="contain" position="center" className="aspect-[4/5] shadow-[0_22px_46px_rgba(16,16,16,0.18)]" />
            </Reveal>
            <Reveal className="absolute right-0 top-[104px] w-[58%] z-[2]">
              <Tile src={HERO_IMAGES[1]} alt="Portrait photography by Picture Republiq" fit="contain" position="center" className="aspect-[4/5] shadow-[0_22px_46px_rgba(16,16,16,0.2)]" />
            </Reveal>
            <Reveal className="absolute left-[9%] -bottom-8 w-[66%] z-[3]">
              <Tile src={HERO_IMAGES[2]} alt="Family photography by Picture Republiq" fit="contain" position="center" className="aspect-[4/5] shadow-[0_22px_46px_rgba(16,16,16,0.18)]" />
            </Reveal>
          </div>

          <div className="hidden mt-12 md:mt-16 sm:grid sm:grid-cols-3 gap-3 md:gap-5 items-end">
            <Reveal className="sm:pb-10 md:pb-14">
              <Tile src={HERO_IMAGES[0]} alt="Wedding photography by Picture Republiq" fit="contain" position="center" className="aspect-[4/5]" />
            </Reveal>
            <Reveal>
              <Tile src={HERO_IMAGES[1]} alt="Portrait photography by Picture Republiq" fit="contain" position="center" className="aspect-[5/6] md:aspect-[4/5]" />
            </Reveal>
            <Reveal className="sm:pb-16 md:pb-24">
              <Tile src={HERO_IMAGES[2]} alt="Family photography by Picture Republiq" fit="contain" position="center" className="aspect-[4/5]" />
            </Reveal>
          </div>
        </Wrap>
      </section>

      <Section bg="white" tight className="py-12 md:py-16">
        <Wrap>
          <Reveal className="mb-10 md:mb-14 grid grid-cols-1 md:grid-cols-[0.72fr_1fr] gap-6 md:gap-12 items-end">
            <div>
              <Eyebrow>What We Photograph</Eyebrow>
              <h2 className="text-[clamp(31px,4vw,54px)]">Four ways to tell the story.</h2>
            </div>
            <p className="text-muted text-base md:text-lg max-w-[560px] md:justify-self-end">Each service has its own rhythm, but the approach stays the same: thoughtful direction, true-to-colour editing, and photographs that feel like the people in them.</p>
          </Reveal>

          <div className="grid gap-10 md:gap-14">
            {SERVICE_DIRECTORY.map((service, index) => (
              <Reveal key={service.to} className="group">
                <div className={`grid grid-cols-1 lg:grid-cols-[0.96fr_1.04fr] gap-0 bg-ivory border border-ink/10 ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <Link to={service.to} className="block overflow-hidden bg-warmgrey">
                    <img src={service.img} alt={`${service.label} photography by Picture Republiq`} loading="lazy" className="w-full h-[300px] md:h-[390px] lg:h-full lg:min-h-[420px] object-contain object-center transition-transform duration-[1000ms] group-hover:scale-[1.03]" />
                  </Link>
                  <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-5 mb-8">
                      <span className="font-serif text-[52px] leading-none text-golddark/55">{service.number}</span>
                      <span className="h-px flex-1 bg-gold/55" />
                    </div>
                    <span className="text-[11px] tracking-[0.26em] uppercase text-golddark">{service.kicker}</span>
                    <h3 className="mt-4 text-[clamp(32px,4vw,56px)]">{service.label}</h3>
                    <p className="mt-5 text-muted max-w-[560px] text-[16px] md:text-[17px] leading-relaxed">{service.line}</p>
                    <div className="flex flex-wrap gap-2 mt-7">
                      {service.items.map((item) => (
                        <span key={item} className="border border-ink/12 bg-warmgrey px-4 py-2 text-[11px] tracking-[0.16em] uppercase text-muted">{item}</span>
                      ))}
                    </div>
                    <Btn to={service.to} className="mt-9 w-full sm:w-fit">{service.cta}</Btn>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section bg="ivory" className="text-center">
        <Wrap>
          <Reveal>
            <Eyebrow>Not Sure Which Fits?</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)] max-w-[760px] mx-auto">Tell Us What You're Planning — <em className="text-golddark">We'll Guide You</em></h2>
            <p className="text-muted max-w-[560px] mx-auto mt-5">Every story is different. Share a few details and we'll recommend the right session or coverage for your day.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <Btn variant="gold" to="/contact">Book Your Session</Btn>
              <Btn href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</Btn>
            </div>
          </Reveal>
        </Wrap>
      </Section>
    </main>
  )
}
