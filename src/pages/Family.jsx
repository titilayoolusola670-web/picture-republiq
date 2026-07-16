import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, IncludeGrid, PriceCard, ServiceHero, ServiceGallery, ServiceStory, WorkPointer, useTitle } from '../components/ui.jsx'
import { INCLUDES, FAMILY_COLLECTIONS, galleryImg } from '../data.jsx'

const FAMILY_HERO_IMAGES = [1, 11, 29].map((n) => galleryImg('family', n))
const FAMILY_IMAGES = [18, 32, 20, 5, 2, 11, 24, 30, 28, 12].map((n) => galleryImg('family', n))
const FAMILY_RECENT_IMAGES = [17, 32, 8].map((n) => galleryImg('family', n))

export default function Family() {
  useTitle('Family')
  return (
    <main>
      <ServiceHero images={FAMILY_HERO_IMAGES} eyebrow="Family"
        title={<>The Moments You Never<br />Want to Forget</>}
        sub="Relaxed family photographs that preserve connection, personality, laughter, and the small gestures that become priceless with time."
        cta="Start Your Family Enquiry"
        to="/contact?service=family"
        imagePosition="center top" />

      <ServiceGallery images={FAMILY_IMAGES} eyebrow="Family Highlights" title="Warm, natural frames with room for real connection." label="Family photography highlights" />

      <ServiceStory
        eyebrow="The Family Experience"
        title={<>A calm, natural space for real <em className="text-golddark">connection.</em></>}
        body={[
          "The laughter shared around the dinner table. The little moments between parents and children. The quiet embraces, playful interactions, and genuine connections that make your family unique.",
          "Our sessions are designed to feel natural, relaxed, and enjoyable, allowing your family's true connection to shine through every photograph.",
        ]}
        points={INCLUDES.family}
      />

      <Section bg="grey">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Services Include</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Family Photography Services</h2>
            <GoldRule />
          </Reveal>
          <IncludeGrid items={INCLUDES.family} />
        </Wrap>
      </Section>

      <Section bg="grey">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Book Your Session</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Choose the Experience That Best Tells Your Story</h2>
            <GoldRule />
            <p className="text-[15px] text-muted">All collections are designed for immediate families of up to seven (7) people.</p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14 text-left max-w-[520px] lg:max-w-none mx-auto">
            {FAMILY_COLLECTIONS.map((c) => <PriceCard key={c.title} {...c} />)}
          </div>
        </Wrap>
      </Section>

      <WorkPointer
        bg="white"
        title="Family Moments From Recent Work"
        lede="A short look at relaxed family photographs with warmth, connection, and personality."
        cat="family"
        btn="View Family Portfolio"
        images={FAMILY_RECENT_IMAGES}
        wide
      />

      <Section bg="black" className="text-center">
        <Wrap>
          <Reveal>
            <Eyebrow>Looking for Something Tailored to Your Family?</Eyebrow>
            <h2 className="text-white text-[clamp(29px,3.5vw,42px)] max-w-[760px] mx-auto">Every Family Is Unique</h2>
            <p className="text-white/75 max-w-[620px] mx-auto mt-5">Planning a larger family session? Including grandparents, cousins, or extended family members? Looking for locations or a longer photography experience? We'll be happy to create a bespoke photography package designed specifically around your family's needs and vision.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <Btn variant="gold" to="/contact?service=family-custom">Contact Us to Create Your Custom Family Collection</Btn>
            </div>
          </Reveal>
        </Wrap>
      </Section>

    </main>
  )
}
