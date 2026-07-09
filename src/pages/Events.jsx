import { Section, Wrap, Eyebrow, GoldRule, Reveal, IncludeGrid, WorkPointer, PageHero, useTitle } from '../components/ui.jsx'
import { EnquiryShell, Confirmation, Field, AddonChecks, HOURS, GUESTS } from '../components/EnquiryForm.jsx'
import { INCLUDES, galleryImg } from '../data.jsx'

const EVENT_TYPES = ['Birthday Celebration', 'Corporate Event', 'Anniversary', 'Engagement Party', 'Baby Shower', 'Bridal Shower', 'Graduation Celebration', 'Conference', 'Church Programme', 'Award Ceremony', 'Gala Dinner', 'Product Launch', 'Networking Event', 'Private Party', 'Other (Please specify)']

export default function Events() {
  useTitle('Events')
  return (
    <main>
      <PageHero image={galleryImg('events', 10)} eyebrow="Events"
        title={<>Professional Photography<br />for Meaningful Events</>}
        sub="From intimate celebrations to corporate conferences, we document every event with professionalism and creativity." />

      <Section bg="white">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Services Include</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Event Photography Services</h2>
            <GoldRule />
          </Reveal>
          <IncludeGrid items={INCLUDES.events} />
        </Wrap>
      </Section>

      <WorkPointer bg="grey" title="See the Events We've Covered"
        lede="Our full body of work lives in the portfolio — browse the events we've photographed, filtered just for you."
        cat="events" btn="View Event Portfolio" />

      <Section bg="white" id="enquiry">
        <Wrap narrow>
          <div className="bg-white border border-line border-t-[3px] border-t-gold px-7 py-11 sm:px-14 sm:py-16">
            <EnquiryShell kind="Event" confirmation={
              <Confirmation>
                <p className="mb-4">We've successfully received your event enquiry. Thank you for considering Picture Republiq to capture your special occasion.</p>
                <p>Our team will carefully review your event details and contact you within 24–48 hours with the next steps and a personalized quotation.</p>
              </Confirmation>
            }>
              <div className="text-center mb-10">
                <Eyebrow>Event Coverage Enquiry</Eyebrow>
                <h2 className="text-[clamp(26px,3vw,36px)]">Tell Us About Your Event</h2>
                <GoldRule />
                <p className="text-sm text-muted">We typically respond to all enquiries within 24–48 hours.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-7">
                <Field label="Full Name" required><input type="text" name="fullName" required placeholder="Enter your full name" className="field-input" /></Field>
                <Field label="Email Address" required><input type="email" name="email" required placeholder="Enter your email address" className="field-input" /></Field>
                <Field label="City (Event Location)" required><input type="text" name="city" required placeholder="Where will your event take place?" className="field-input" /></Field>
                <Field label="Event Type" required>
                  <select name="eventType" required defaultValue="" className="field-input">
                    <option value="" disabled>Select event type</option>
                    {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Event Date" required><input type="date" name="eventDate" required className="field-input" /></Field>
                <Field label="How long will your event run?" required>
                  <select name="duration" required defaultValue="" className="field-input">
                    <option value="" disabled>Select event duration</option>
                    {HOURS.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </Field>
                <div className="col-span-full">
                  <Field label="Approximately how many guests are you expecting?" required
                    hint="This helps us determine whether additional photography coverage is recommended to ensure every important moment is captured.">
                    <select name="guests" required defaultValue="" className="field-input">
                      <option value="" disabled>Select guest count</option>
                      {GUESTS.map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </Field>
                </div>
                <AddonChecks />
                <div className="col-span-full">
                  <Field label="Tell Us More About Your Event">
                    <textarea name="message" placeholder="We'd love to hear more about your event. Share any important details such as the venue, event schedule, photography style preferences, or any other information that will help us create the perfect photography experience." className="field-input min-h-[170px] resize-y" />
                  </Field>
                </div>
              </div>
              <div className="text-center mt-10">
                <button type="submit" className="inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-9 py-[15px] border border-gold bg-gold text-white cursor-pointer transition-colors duration-300 hover:bg-golddark hover:border-golddark">
                  Request My Event Photography Quote
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
