import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal } from './ui.jsx'

/* Content from "Frequently Asked Questions — Picture Republiq" */
export const FAQ_ITEMS = [
  ['How do I book a photography session?',
    <>
      <p className="mb-3">To book your session, simply complete our enquiry form or contact us directly. Once we receive your details, we will get back to you to discuss your vision, availability, and the best photography package for your needs.</p>
      <p>A booking is confirmed once the required deposit has been paid and your date has been secured.</p>
    </>],
  ['How far in advance should I book?',
    <p>We recommend booking as early as possible, especially for weddings, large events, and peak seasons. Popular dates can fill quickly, so securing your preferred date early is the best way to avoid disappointment.</p>],
  ['Where are you located, and do you travel?',
    <>
      <p className="mb-3">Picture Republiq is based in Lagos, Nigeria, and is available for photography sessions, weddings, and events across Lagos, as well as other locations within and outside Nigeria. We are happy to discuss travel opportunities and destination photography requests.</p>
      <p>Additional travel fees may apply depending on the location.</p>
    </>],
  ['What types of photography do you offer?',
    <>
      <p className="mb-3">We specialize in:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6 mb-3">
        {['Wedding Photography', 'Engagement Photography', 'Family Photography', 'Portrait Photography', 'Graduation Photography', 'Event Photography', 'Corporate and Branding Photography'].map((s) => (
          <li key={s}><span className="text-gold">— </span>{s}</li>
        ))}
      </ul>
      <p>If you have a specific photography request that is not listed, please reach out and we would be happy to discuss it.</p>
    </>],
  ['How long does a photography session take?',
    <p>Session duration depends on the collection or package selected. Our sessions typically range from one hour to several hours depending on the type of photography, number of outfits, location, and coverage requirements.</p>],
  ['How many photos will I receive?',
    <>
      <p className="mb-3">The number of professionally edited images you receive depends on the photography package selected. Each collection clearly outlines the number of final edited images included.</p>
      <p>Additional images may be purchased if you would like to expand your final gallery.</p>
    </>],
  ['Do you provide edited photos?',
    <p>Yes. Every final image delivered by Picture Republiq is professionally edited to ensure consistency, quality, and a timeless finish while maintaining a natural and authentic look.</p>],
  ['Do you provide raw/unedited images?',
    <p>No. Raw images are not included in our packages. The artistic process, including image selection and professional editing, is an important part of our service and ensures that every delivered photograph meets our quality standards.</p>],
  ['How long does it take to receive my photos?',
    <>
      <p className="mb-3">Our standard turnaround time is typically 5–10 business days after your session or event, depending on the package selected and the volume of images being processed.</p>
      <p>For weddings and larger events, delivery timelines will be communicated during your consultation.</p>
    </>],
  ['Can I choose the location for my session?',
    <>
      <p className="mb-3">Absolutely. We are happy to discuss locations that align with your vision, whether that is a studio setting, outdoor location, your home, or another meaningful place.</p>
      <p className="mb-3">For outdoor sessions, we encourage clients to consider locations that reflect their style and the look they want to achieve. Please note that some outdoor locations, parks, private venues, and creative spaces may require a location fee. Any applicable location charges should be confirmed in advance and factored into your overall session budget.</p>
      <p>We are happy to work with you to select a location that complements your vision while ensuring a smooth and enjoyable photography experience.</p>
    </>],
  ['Do you help with posing?',
    <>
      <p className="mb-3">Yes. You do not need to be experienced in front of the camera. We provide gentle direction throughout your session to help you feel comfortable, confident, and natural.</p>
      <p>Our goal is to capture authentic moments while ensuring you look your best.</p>
    </>],
  ['Can I include additional people in my session?',
    <>
      <p className="mb-3">Yes. Our standard family collections are designed for immediate families of up to seven (7) people. Larger groups and extended family sessions can be customized to suit your needs.</p>
      <p>Please contact us to discuss your requirements.</p>
    </>],
  ['Do you offer videography?',
    <p>Yes, professional videography can be added to selected packages upon request. Please let us know during your enquiry so we can include this in your customized package.</p>],
  ['Do you offer drone photography?',
    <>
      <p className="mb-3">Drone coverage may be available depending on the location, weather conditions, venue requirements, and applicable regulations.</p>
      <p>Please request this service during your enquiry.</p>
    </>],
  ['What happens if it rains or there is bad weather during an outdoor session?',
    <p>We understand that weather can be unpredictable. For outdoor sessions, we will work with you to determine the best option, which may include rescheduling or adjusting the session plan depending on availability and circumstances.</p>],
  ['What payment options are available?',
    <>
      <p className="mb-3">A 70% deposit is required to secure your booking, with the remaining 30% balance due immediately after the photography session or event.</p>
      <p>Payment details will be provided during the booking process. See our <Link to="/policy" className="text-golddark underline underline-offset-2 hover:text-gold">Payment &amp; Cancellation Policy</Link> for full details.</p>
    </>],
  ['Can I customize a photography package?',
    <>
      <p className="mb-3">Absolutely. Every story is unique, and we understand that some clients need something beyond our standard collections.</p>
      <p>Whether you require additional outfits, extended coverage, custom locations, props, additional photographers, or a longer session, we can create a package tailored specifically to your vision.</p>
    </>],
  ['What should I wear for my photography session?',
    <>
      <p className="mb-3">We recommend choosing outfits that reflect your personality while complementing the style and mood you want to create. Neutral tones, classic styles, and coordinated colours often photograph beautifully.</p>
      <p>We are happy to provide guidance during your consultation.</p>
    </>],
  ['Do you photograph weddings and events outside your city?',
    <p>Yes. We welcome wedding and event enquiries beyond our immediate location. Please contact us with your event details, and we will provide information regarding availability and travel arrangements.</p>],
]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-ink/14">
      <button onClick={onToggle} aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-5.5 text-left cursor-pointer group/faq">
        <span className="font-serif text-[19px] sm:text-[21px] text-ink transition-colors duration-300 group-hover/faq:text-golddark">{q}</span>
        <span className={`shrink-0 w-8 h-8 border border-gold rounded-full flex items-center justify-center text-gold text-lg leading-none transition-transform duration-300 ${open ? 'rotate-45 bg-gold text-white' : ''}`}>+</span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-400 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="pb-6 pr-2 sm:pr-14 text-[15.5px] text-muted leading-relaxed">{a}</div>
        </div>
      </div>
    </div>
  )
}

export default function FaqSection({ bg = 'white', limit }) {
  const [open, setOpen] = useState(-1)
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS
  return (
    <Section bg={bg} id="faq">
      <Wrap className="text-center">
        <Reveal>
          <Eyebrow>Good to Know</Eyebrow>
          <h2 className="text-[clamp(29px,3.5vw,42px)]">Frequently Asked Questions</h2>
          <GoldRule />
        </Reveal>
      </Wrap>
      <Wrap narrow>
        <Reveal className="border-t border-ink/14 mt-8">
          {items.map(([q, a], i) => (
            <FaqItem key={q} q={q} a={a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
        <Reveal className="text-center mt-11">
          <p className="font-serif italic text-[20px] text-ink mb-1.5">Still have questions?</p>
          <p className="text-muted text-[15px] mb-6">
            {limit
              ? <>You'll find the full list on our About page — or ask us directly, we'd love to hear from you.</>
              : <>If your question has not been answered here, contact us and our team will be happy to assist you. Let's create something beautiful together.</>}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {limit && <Btn to="/about#faq">See All FAQs</Btn>}
            <Btn variant="gold" to="/contact">Contact Us</Btn>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  )
}
