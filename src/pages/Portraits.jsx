import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, IncludeGrid, PriceCard, WorkPointer, ServiceHero, ImageRail, ServiceStory, useTitle } from '../components/ui.jsx'
import { INCLUDES, PORTRAIT_COLLECTIONS, galleryImg } from '../data.jsx'

const PORTRAIT_SLIDES = [7, 1, 10, 47].map((n) => galleryImg('portraits', n))
const PORTRAIT_RAIL = [7, 1, 3, 10, 15, 47, 52, 68].map((n) => galleryImg('portraits', n))

export default function Portraits() {
  useTitle('Portraits')
  return (
    <main>
      <ServiceHero images={PORTRAIT_SLIDES} eyebrow="Portraits"
        title="Portraits That Feel Like You"
        sub="Confident, polished, and personal images for milestones, branding, graduation, editorial concepts, and the season of life you are in now."
        cta="Start Your Portrait Enquiry"
        to="/contact?service=portrait" />

      <ImageRail images={PORTRAIT_RAIL} label="Portrait photography highlights" />

      <ServiceStory
        eyebrow="The Portrait Experience"
        title={<>A guided session built around your <em className="text-golddark">presence.</em></>}
        image={galleryImg('portraits', 47)}
        reverse
        body={[
          "Whether you are updating your professional image, celebrating a milestone, building a personal brand, or creating something editorial, your portrait session should feel considered from start to finish.",
          "We guide expression, posture, styling rhythm, and image selection so the final gallery feels natural, confident, and unmistakably personal.",
        ]}
        points={INCLUDES.portraits}
      />

      <Section bg="grey">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Services Include</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Portrait Photography Services</h2>
            <GoldRule />
          </Reveal>
          <IncludeGrid items={INCLUDES.portraits} />
        </Wrap>
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

      <WorkPointer bg="white" title="Portraits That Speak"
        lede="Our full body of work lives in the portfolio — browse the portraits we've created, filtered just for you."
        cat="portraits" btn="View Portrait Portfolio" images={[galleryImg('portraits', 7), galleryImg('portraits', 47), galleryImg('portraits', 10)]} />
    </main>
  )
}
