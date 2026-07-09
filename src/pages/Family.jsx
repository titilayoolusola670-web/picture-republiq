import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, Poem, IncludeGrid, PriceCard, WorkPointer, PageHero, useTitle } from '../components/ui.jsx'
import { INCLUDES, FAMILY_COLLECTIONS, galleryImg } from '../data.jsx'

export default function Family() {
  useTitle('Family')
  return (
    <main>
      <PageHero image={galleryImg('family', 5)} eyebrow="Family"
        title={<>The Moments You Never<br />Want to Forget</>}
        sub="Family is where our most meaningful stories begin." />

      <Section bg="white">
        <Wrap narrow className="text-center">
          <Reveal>
            <p className="mb-4">The laughter shared around the dinner table. The little moments between parents and children. The quiet embraces, playful interactions, and genuine connections that make your family unique.</p>
            <p>I create timeless family photography that captures the love, personality, and bond that exists between the people who matter most. Our sessions are designed to feel natural, relaxed, and enjoyable, allowing your family's true connection to shine through every photograph.</p>
            <Poem className="text-[clamp(22px,2.6vw,28px)] my-8" lines={['Because children grow.', 'Seasons change.', 'Moments pass.']} />
            <p>But beautiful photographs allow you to return to those memories again and again.</p>
          </Reveal>
        </Wrap>
        <Wrap><IncludeGrid items={INCLUDES.family} /></Wrap>
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

      <WorkPointer bg="white" title="See the Families We've Photographed"
        lede="Our full body of work lives in the portfolio — browse the family sessions we've captured, filtered just for you."
        cat="family" btn="View Family Portfolio" />

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
