import { Section, Wrap, Eyebrow, GoldRule, Reveal, IncludeGrid, ServiceHero, ServiceGallery, ServiceStory, WorkPointer, useTitle } from '../components/ui.jsx'
import { EnquiryShell, Confirmation, Field, AddonChecks, HOURS, GUESTS } from '../components/EnquiryForm.jsx'
import { INCLUDES, galleryImg } from '../data.jsx'

const WEDDING_HERO_IMAGES = [52, 28, 108, 18, 72].map((n) => galleryImg('weddings', n))
const WEDDING_IMAGES = [20, 17, 37, 14, 3, 79, 77, 27, 39, 99].map((n) => galleryImg('weddings', n))

export default function Weddings() {
  useTitle('Weddings')
  return (
    <main>
      <ServiceHero images={WEDDING_HERO_IMAGES} eyebrow="Weddings"
        title={<>From &ldquo;Yes&rdquo; to &ldquo;I Do,&rdquo;<br />Every Beautiful Detail Captured</>}
        sub="A wedding day moves quickly. We photograph the emotion, the people, the atmosphere, and the quiet details with the kind of care your story deserves."
        cta="Start Your Wedding Enquiry"
        to="/contact?service=wedding" />

      <ServiceGallery images={WEDDING_IMAGES} eyebrow="Wedding Highlights" title="Ten moments, one complete feeling." label="Wedding photography highlights" />

      <ServiceStory
        eyebrow="The Wedding Experience"
        title={<>Photography that remembers how the day <em className="text-golddark">felt.</em></>}
        body={[
          "Your wedding is not just a schedule of events. It is anticipation, vows, joyful tears, laughter, movement, family, beauty, and celebration happening all at once.",
          "We document every chapter with authenticity, elegance, and attention to detail, so years from now the photographs still bring you back to the room, the people, and the feeling.",
        ]}
        points={['Emotion-led coverage', 'True-to-colour editing', 'Detail storytelling', 'Gallery delivery']}
      />

      <Section bg="grey">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Services Include</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Wedding Photography Services</h2>
            <GoldRule />
          </Reveal>
          <IncludeGrid items={INCLUDES.weddings} />
        </Wrap>
      </Section>

      <WorkPointer
        bg="white"
        title="Wedding Stories From Recent Work"
        lede="A short look at recent wedding frames, from quiet details to celebration moments."
        cat="weddings"
        btn="View Wedding Portfolio"
        images={WEDDING_IMAGES.slice(0, 2)}
      />

      <Section bg="grey" id="enquiry">
        <Wrap>
          <div className="vintage-panel relative overflow-hidden border border-ink/18 border-t-[4px] border-t-gold shadow-[0_28px_70px_rgba(16,16,16,0.16)]">
            <div className="pointer-events-none absolute -top-12 -right-10 font-serif text-[160px] leading-none text-gold/10">W</div>
            <EnquiryShell kind="Wedding" confirmation={
              <Confirmation>
                <p className="mb-4">We are honoured that you're considering Picture Republiq to capture your wedding day. Your enquiry has been received successfully, and we will review your details carefully before getting in touch with you within 24–48 hours.</p>
                <p>In the meantime, feel free to explore our portfolio and follow our latest work on Instagram.</p>
              </Confirmation>
            }>
              <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr]">
                <aside className="relative bg-ink px-7 py-10 text-white sm:px-10 lg:px-12 lg:py-14">
                  <Eyebrow>Wedding Coverage Enquiry</Eyebrow>
                  <h2 className="text-white text-[clamp(28px,3.2vw,42px)]">Let's shape the story before the day begins.</h2>
                  <GoldRule left />
                  <p className="text-white/76 text-[15px] leading-[1.85]">
                    Share the date, location, guest count, and the feeling you want preserved. We use this to recommend the right coverage and prepare a thoughtful quote.
                  </p>
                  <div className="mt-8 grid gap-3 text-[12px] tracking-[0.18em] uppercase text-white/70">
                    <span className="border-t border-white/12 pt-3">Careful planning</span>
                    <span className="border-t border-white/12 pt-3">Emotion-led coverage</span>
                    <span className="border-t border-white/12 pt-3">Response within 24-48 hours</span>
                  </div>
                </aside>
                <div className="px-6 py-9 sm:px-10 lg:px-12 lg:py-13">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-7">
                    <Field label="Full Name" required><input type="text" name="fullName" required placeholder="Enter your full name" className="field-input" /></Field>
                    <Field label="Email Address" required><input type="email" name="email" required placeholder="Enter your email address" className="field-input" /></Field>
                    <Field label="City (Wedding Location)" required><input type="text" name="city" required placeholder="Where will your wedding take place?" className="field-input" /></Field>
                    <Field label="Wedding Date" required><input type="date" name="weddingDate" required className="field-input" /></Field>
                    <Field label="How long would you like photography coverage?" required>
                      <select name="coverage" required defaultValue="" className="field-input">
                        <option value="" disabled>Select coverage duration</option>
                        {HOURS.map((h) => <option key={h}>{h}</option>)}
                      </select>
                    </Field>
                    <Field label="Approximately how many guests are you expecting?" required
                      hint="This helps us determine whether a second photographer is recommended.">
                      <select name="guests" required defaultValue="" className="field-input">
                        <option value="" disabled>Select guest count</option>
                        {GUESTS.map((g) => <option key={g}>{g}</option>)}
                      </select>
                    </Field>
                    <AddonChecks />
                    <div className="col-span-full">
                      <Field label="Tell Us More About Your Wedding">
                        <textarea name="message" placeholder="Tell us about your venue, wedding style, traditions, photography preferences, and anything important to you." className="field-input min-h-[170px] resize-y" />
                      </Field>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button type="submit" className="inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-10 py-[16px] border border-ink bg-ink text-white cursor-pointer transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white hover:-translate-y-0.5">
                      Request My Wedding Photography Quote
                    </button>
                    <p className="text-[13px] text-muted mt-4">We typically respond to all enquiries within 24–48 hours.</p>
                  </div>
                </div>
              </div>
            </EnquiryShell>
          </div>
        </Wrap>
      </Section>
    </main>
  )
}
