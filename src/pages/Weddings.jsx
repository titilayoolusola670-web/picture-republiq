import { Section, Wrap, Eyebrow, GoldRule, Reveal, IncludeGrid, WorkPointer, ServiceHero, ImageRail, ServiceStory, useTitle } from '../components/ui.jsx'
import { EnquiryShell, Confirmation, Field, AddonChecks, HOURS, GUESTS } from '../components/EnquiryForm.jsx'
import { INCLUDES, galleryImg } from '../data.jsx'

const WEDDING_SLIDES = [52, 13, 27, 45].map((n) => galleryImg('weddings', n))
const WEDDING_RAIL = [5, 13, 27, 45, 52, 99, 108, 1].map((n) => galleryImg('weddings', n))

export default function Weddings() {
  useTitle('Weddings')
  return (
    <main>
      <ServiceHero images={WEDDING_SLIDES} eyebrow="Weddings"
        title={<>From &ldquo;Yes&rdquo; to &ldquo;I Do,&rdquo;<br />Every Beautiful Detail Captured</>}
        sub="A wedding day moves quickly. We photograph the emotion, the people, the atmosphere, and the quiet details with the kind of care your story deserves."
        cta="Start Your Wedding Enquiry"
        to="/contact?service=wedding" />

      <ImageRail images={WEDDING_RAIL} label="Wedding photography highlights" />

      <ServiceStory
        eyebrow="The Wedding Experience"
        title={<>Photography that remembers how the day <em className="text-golddark">felt.</em></>}
        image={galleryImg('weddings', 99)}
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

      <WorkPointer bg="white" title="See the Weddings We've Captured"
        lede="Our full body of work lives in the portfolio — browse real weddings we've photographed, filtered just for you."
        cat="weddings" btn="View Wedding Portfolio" />

      <Section bg="grey" id="enquiry">
        <Wrap narrow>
          <div className="bg-ivory border border-line border-t-[3px] border-t-gold px-7 py-11 sm:px-14 sm:py-16">
            <EnquiryShell kind="Wedding" confirmation={
              <Confirmation>
                <p className="mb-4">We are honoured that you're considering Picture Republiq to capture your wedding day. Your enquiry has been received successfully, and we will review your details carefully before getting in touch with you within 24–48 hours.</p>
                <p>In the meantime, feel free to explore our portfolio and follow our latest work on Instagram.</p>
              </Confirmation>
            }>
              <div className="text-center mb-10">
                <Eyebrow>Wedding Coverage Enquiry</Eyebrow>
                <h2 className="text-[clamp(26px,3vw,36px)]">Let's Start Planning Your Wedding Photography Experience</h2>
                <GoldRule />
                <p className="mb-2">Your wedding is unlike any other, and we'd love to learn more about your special day. Please complete the enquiry form below with as much detail as possible. The information you provide will help us understand your vision.</p>
                <p className="text-sm text-muted">We typically respond to all enquiries within 24–48 hours.</p>
              </div>
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
                  hint="This helps us determine whether a second photographer is recommended to ensure every important moment is beautifully captured.">
                  <select name="guests" required defaultValue="" className="field-input">
                    <option value="" disabled>Select guest count</option>
                    {GUESTS.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </Field>
                <AddonChecks />
                <div className="col-span-full">
                  <Field label="Tell Us More About Your Wedding">
                    <textarea name="message" placeholder="We'd love to hear more about your celebration. Tell us about your venue, wedding style, special traditions, photography preferences, or anything else you'd like us to know." className="field-input min-h-[170px] resize-y" />
                  </Field>
                </div>
              </div>
              <div className="text-center mt-10">
                <button type="submit" className="inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-9 py-[15px] border border-gold bg-gold text-white cursor-pointer transition-colors duration-300 hover:bg-golddark hover:border-golddark">
                  Request My Wedding Photography Quote
                </button>
                <p className="text-[13px] text-muted mt-4">We typically respond to all enquiries within 24–48 hours.</p>
              </div>
            </EnquiryShell>
          </div>
        </Wrap>
      </Section>
    </main>
  )
}
