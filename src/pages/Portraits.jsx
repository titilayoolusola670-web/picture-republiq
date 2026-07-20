import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, IncludeGrid, PriceCard, ServiceHero, ServiceGallery, ServiceStory, WorkPointer, useTitle } from '../components/ui.jsx'
import { INCLUDES, PORTRAIT_COLLECTIONS, galleryImg } from '../data.jsx'

const PORTRAIT_HERO_IMAGES = [15, 1, 73, 67, 71].map((n) => galleryImg('portraits', n))
const PORTRAIT_MOBILE_HERO_IMAGES = [15, 1, 73, 67, 34, 71].map((n) => galleryImg('portraits', n))
const PORTRAIT_IMAGES = [7, 1, 10, 47, 60, 65, 21, 52, 68, 3].map((n) => galleryImg('portraits', n))
const PORTRAIT_RECENT_IMAGES = [27, 8, 6].map((n) => galleryImg('portraits', n))

export default function Portraits() {
  useTitle('Portraits')
  return (
    <main>
      <ServiceHero images={PORTRAIT_HERO_IMAGES} mobileImages={PORTRAIT_MOBILE_HERO_IMAGES} eyebrow="Portraits"
        title="Portraits That Feel Like You"
        sub="Confident, polished, and personal images for milestones, branding, graduation, editorial concepts, and the season of life you are in now."
        cta="Start Your Portrait Enquiry"
        to="/contact?service=portrait"
        imagePosition="center" />

      <ServiceGallery images={PORTRAIT_IMAGES} eyebrow="Portrait Highlights" title="Presence, confidence, and clean storytelling." label="Portrait photography highlights" />

      <ServiceStory
        eyebrow="The Portrait Experience"
        title={<>A guided session built around your <em className="text-golddark">presence.</em></>}
        body={[
          "Whether you are updating your professional image, celebrating a milestone, building a personal brand, or creating something editorial, your portrait session should feel considered from start to finish.",
          "We guide expression, posture, styling rhythm, and image selection so the final gallery feels natural, confident, and unmistakably personal.",
        ]}
        points={['Your Story', 'Your Style', 'Your Portrait', 'An Experience']}
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

      <WorkPointer
        bg="white"
        title="Portraits From Recent Work"
        lede="A short look at recent portrait images with clean direction, confidence, and personality."
        cat="portraits"
        btn="View Portrait Portfolio"
        images={PORTRAIT_RECENT_IMAGES}
      />

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
