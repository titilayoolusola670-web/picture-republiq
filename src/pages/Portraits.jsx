import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, IncludeGrid, PriceCard, WorkPointer, PageHero, useTitle } from '../components/ui.jsx'
import { INCLUDES, PORTRAIT_COLLECTIONS, galleryImg } from '../data.jsx'

export default function Portraits() {
  useTitle('Portraits')
  return (
    <main>
      <PageHero image={galleryImg('portraits', 1)} eyebrow="Portraits"
        title="Portraits That Feel Like You"
        sub="Every portrait should celebrate who you are." />

      <Section bg="white">
        <Wrap narrow className="text-center">
          <Reveal>
            <p>Whether you're updating your professional image, celebrating a milestone, or simply capturing this season of life, we create portraits that feel natural, confident, and timeless.</p>
          </Reveal>
        </Wrap>
        <Wrap><IncludeGrid items={INCLUDES.portraits} /></Wrap>
      </Section>

      <Section bg="grey">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Book Your Session</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Choose the Experience That Best Tells Your Story</h2>
            <GoldRule />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14 text-left max-w-[520px] lg:max-w-none mx-auto">
            {PORTRAIT_COLLECTIONS.map((c) => <PriceCard key={c.title} {...c} />)}
          </div>
        </Wrap>
      </Section>

      <WorkPointer bg="white" title="Portraits That Speak"
        lede="Our full body of work lives in the portfolio — browse the portraits we've created, filtered just for you."
        cat="portraits" btn="View Portrait Portfolio" />

      <Section bg="black" className="text-center">
        <Wrap>
          <Reveal>
            <Eyebrow>Need Something More Personalized?</Eyebrow>
            <h2 className="text-white text-[clamp(29px,3.5vw,42px)] max-w-[760px] mx-auto">Every Story Is Unique</h2>
            <p className="text-white/75 max-w-[560px] mx-auto mt-5">If you're planning multiple outfit changes, have a creative concept in mind, require custom props, or would like a longer photography session, we'd be delighted to create a package tailored specifically to your vision.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <Btn variant="gold" to="/contact?service=portrait-custom">Contact Us to Create Your Custom Collection</Btn>
            </div>
          </Reveal>
        </Wrap>
      </Section>
    </main>
  )
}
