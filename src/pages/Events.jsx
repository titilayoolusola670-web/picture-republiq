import { Section, Wrap, Eyebrow, GoldRule, Reveal, IncludeGrid, ServiceHero, ServiceGallery, ServiceStory, WorkPointer, useTitle } from '../components/ui.jsx'
import { EnquiryShell, Confirmation, Field, AddonChecks, HOURS, GUESTS } from '../components/EnquiryForm.jsx'
import { INCLUDES, galleryImg } from '../data.jsx'

const EVENT_TYPES = ['Birthday Celebration', 'Corporate Event', 'Anniversary', 'Engagement Party', 'Baby Shower', 'Bridal Shower', 'Graduation Celebration', 'Conference', 'Church Programme', 'Award Ceremony', 'Gala Dinner', 'Product Launch', 'Networking Event', 'Private Party', 'Other (Please specify)']
const EVENT_HERO_IMAGES = [10, 8, 9, 1].map((n) => galleryImg('events', n))
const EVENT_IMAGES = [10, 9, 11, 3, 1, 5, 17, 24, 29, 34].map((n) => galleryImg('events', n))
const EVENT_RECENT_IMAGES = [galleryImg('events', 32), galleryImg('events', 33), galleryImg('events', 19)]

export default function Events() {
  useTitle('Events')
  return (
    <main>
      <ServiceHero images={EVENT_HERO_IMAGES} eyebrow="Events"
        title={<>Professional Photography<br />for Meaningful Events</>}
        sub="From intimate celebrations to corporate conferences, we document atmosphere, guests, details, key moments, and the energy of the day."
        cta="Start Your Event Enquiry"
        to="/contact?service=event"
        imageFit="contain" />

      <ServiceGallery images={EVENT_IMAGES} eyebrow="Event Highlights" title="Atmosphere, people, details, and the energy of the room." label="Event photography highlights" />

      <ServiceStory
        eyebrow="The Event Experience"
        title={<>Coverage that keeps the room, the rhythm, and the <em className="text-golddark">moments.</em></>}
        body={[
          "Every event has a pace of its own. We work discreetly and intentionally, capturing the people, details, programme flow, and candid interactions that make the occasion matter.",
          "The result is a polished gallery that feels useful, memorable, and complete whether the event is personal, corporate, faith-based, or community-led.",
        ]}
        points={['Celebration', 'Energy', 'Storytelling', 'Authenticity', 'Moments', 'Memories']}
      />

      <Section bg="grey">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Services Include</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">Event Photography Services</h2>
            <GoldRule />
          </Reveal>
          <IncludeGrid items={INCLUDES.events} />
        </Wrap>
      </Section>

      <WorkPointer
        bg="white"
        title="Event Moments From Recent Work"
        lede="A short look at recent event coverage, from atmosphere and guests to key moments."
        cat="events"
        btn="View Event Portfolio"
        images={EVENT_RECENT_IMAGES}
        wide
      />

      <Section bg="white" id="enquiry">
        <Wrap>
          <div className="vintage-panel relative overflow-hidden border border-ink/18 border-t-[4px] border-t-gold shadow-[0_28px_70px_rgba(16,16,16,0.16)]">
            <div className="pointer-events-none absolute -top-12 -right-8 font-serif text-[160px] leading-none text-gold/10">E</div>
            <EnquiryShell kind="Event" confirmation={
              <Confirmation>
                <p className="mb-4">We've successfully received your event enquiry. Thank you for considering Picture Republiq to capture your special occasion.</p>
                <p>Our team will carefully review your event details and contact you within 24–48 hours with the next steps and a personalized quotation.</p>
              </Confirmation>
            }>
              <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr]">
                <aside className="relative bg-ink px-7 py-10 text-white sm:px-10 lg:px-12 lg:py-14">
                  <Eyebrow>Event Coverage Enquiry</Eyebrow>
                  <h2 className="text-white text-[clamp(28px,3.2vw,42px)]">Tell us the room, the rhythm, and the moments that matter.</h2>
                  <GoldRule left />
                  <p className="text-white/76 text-[15px] leading-[1.85]">
                    Give us the key details, expected guest count, and programme flow. We will use that to plan coverage that feels complete and polished.
                  </p>
                  <div className="mt-8 grid gap-3 text-[12px] tracking-[0.18em] uppercase text-white/70">
                    <span className="border-t border-white/12 pt-3">Personal and corporate events</span>
                    <span className="border-t border-white/12 pt-3">Details, guests, and candid moments</span>
                    <span className="border-t border-white/12 pt-3">Response within 24-48 hours</span>
                  </div>
                </aside>
                <div className="px-6 py-9 sm:px-10 lg:px-12 lg:py-13">
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
                        hint="This helps us determine whether additional photography coverage is recommended.">
                        <select name="guests" required defaultValue="" className="field-input">
                          <option value="" disabled>Select guest count</option>
                          {GUESTS.map((g) => <option key={g}>{g}</option>)}
                        </select>
                      </Field>
                    </div>
                    <AddonChecks />
                    <div className="col-span-full">
                      <Field label="Tell Us More About Your Event">
                        <textarea name="message" placeholder="Share your venue, schedule, important people, must-capture moments, and the kind of coverage you want." className="field-input min-h-[170px] resize-y" />
                      </Field>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button type="submit" className="inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-10 py-[16px] border border-ink bg-ink text-white cursor-pointer transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white hover:-translate-y-0.5">
                      Request My Event Photography Quote
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
