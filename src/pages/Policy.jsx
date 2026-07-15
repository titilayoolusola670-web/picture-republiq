import { Section, Wrap, Eyebrow, GoldRule, Btn, Reveal, useTitle } from '../components/ui.jsx'

const TIERS = [
  ['More than 14 days before', '20% charge', 'Cancellations made more than 14 days before the scheduled session or event date receive a refund of the amount paid, less a 20% administrative charge covering consultation time, planning, scheduling, communication, and processing costs.'],
  ['4 – 14 days before', '50% charge', 'For cancellations made within 4 and 14 days of the scheduled date, a 50% administrative charge is deducted from the amount paid — reflecting the preparation completed, reserved availability, and the reduced opportunity to accept another booking.'],
  ['1 – 3 days before', 'Non-refundable', 'For cancellations made within 72 hours of the scheduled session or event date, payments made toward the booking are non-refundable. At this stage significant time and resources have been committed to your session.'],
  ['No-show', 'Payments forfeited', 'Clients who do not attend their scheduled session or event without prior notice forfeit all payments made, and the booking is considered cancelled.'],
]

const SUB_SECTIONS = [
  ['Rescheduling', <>
    <p className="mb-3">We understand that unexpected situations may occur. Where possible, Picture Republiq may offer clients the option to reschedule their session or event to a new available date.</p>
    <p className="mb-2">Rescheduling is subject to:</p>
    <ul className="mb-1">
      {['Photographer availability', 'Agreement on a new date', 'Any adjustments required to the selected package or pricing'].map((i) => <li key={i}><span className="text-gold">— </span>{i}</li>)}
    </ul>
  </>],
  ['Weddings and Large Events', <p>Due to the significant planning, preparation, and date commitment involved, wedding and large event cancellations may be subject to different terms as outlined in the signed photography agreement.</p>],
  ['Photographer Cancellation', <>
    <p className="mb-2">In the very unlikely event that Picture Republiq must cancel a confirmed booking due to unforeseen circumstances, we will make every effort to provide an appropriate alternative solution, which may include:</p>
    <ul>
      <li><span className="text-gold">— </span>Arranging a suitable replacement photographer (subject to client approval); or</li>
      <li><span className="text-gold">— </span>Providing a refund of payments made where an alternative arrangement cannot be reached.</li>
    </ul>
  </>],
  ['Force Majeure', <>
    <p className="mb-3">Picture Republiq will not be held responsible for delays, cancellations, or inability to perform services caused by circumstances beyond our reasonable control, including but not limited to natural disasters, severe weather conditions, government restrictions, or other unforeseen events.</p>
    <p>In such circumstances, we will work with the client in good faith to determine the best possible solution, including rescheduling where feasible.</p>
  </>],
  ['Changes to Bookings', <>
    <p className="mb-3">Any changes to the agreed photography package, coverage duration, location, or additional services must be communicated in advance and may result in an adjustment to the final cost.</p>
    <p className="mb-2">Additional services must be agreed upon and paid for separately, such as:</p>
    <ul>
      {['Second photographer coverage', 'Videography', 'Content creation', 'Drone coverage'].map((i) => <li key={i}><span className="text-gold">— </span>{i}</li>)}
    </ul>
  </>],
]

export default function Policy() {
  useTitle('Payment & Cancellation Policy')
  return (
    <main>
      <section className="bg-warmgrey pt-[112px] md:pt-[132px] pb-10 md:pb-12 text-center">
        <Wrap narrow>
          <Eyebrow>Our Policy</Eyebrow>
          <h1 className="text-[clamp(38px,5.2vw,62px)]">Payment &amp;<br />Cancellation Policy</h1>
          <p className="text-muted max-w-[620px] mx-auto mt-5">Clear, fair terms — so we can reserve your date, prepare properly, and deliver the experience you expect.</p>
        </Wrap>
      </section>

      <Section bg="white" tight className="py-10 md:py-12">
        <Wrap narrow className="text-center">
          <Reveal>
            <p>At Picture Republiq, we are committed to providing every client with a professional, seamless, and memorable photography experience. Our payment and cancellation policy ensures that we can reserve your date, prepare adequately for your session or event, and deliver the quality and service our clients expect.</p>
          </Reveal>
        </Wrap>
      </Section>

      {/* Payment policy */}
      <Section bg="grey" tight className="py-12 md:py-16">
        <Wrap>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-11 md:gap-16 items-center">
            <Reveal>
              <Eyebrow>Payment Policy</Eyebrow>
              <h2 className="text-[clamp(29px,3.5vw,42px)]">Securing Your <em className="text-golddark">Date</em></h2>
              <GoldRule left />
              <p className="mb-4">To secure your photography session or event date, a <strong className="font-medium text-ink">70% booking fee</strong> is required at the time of booking. This payment confirms your reservation and allows us to allocate the requested date and time exclusively to you. Until the booking fee has been received, your date remains available for other clients.</p>
              <p>The remaining <strong className="font-medium text-ink">30% balance</strong> is due immediately after the photography session or event.</p>
            </Reveal>
            <Reveal className="bg-ivory border border-line border-t-[3px] border-t-gold px-9 py-10">
              <span className="block text-[11px] tracking-[0.3em] uppercase text-gold mb-4">Please note</span>
              <ul className="grid gap-4 text-[15.5px] text-body">
                <li className="pl-7 relative"><span className="absolute left-0 text-gold">✓</span>Final image selection and delivery will only begin once the outstanding balance has been fully paid.</li>
                <li className="pl-7 relative"><span className="absolute left-0 text-gold">✓</span>Edited photographs, online galleries, and final deliverables will not be released until full payment has been received.</li>
                <li className="pl-7 relative"><span className="absolute left-0 text-gold">✓</span>All payments made toward a booking are subject to the terms outlined in this policy.</li>
              </ul>
            </Reveal>
          </div>
        </Wrap>
      </Section>

      {/* Cancellation tiers */}
      <Section bg="white" tight className="py-12 md:py-16">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Cancellation &amp; Rescheduling</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">If Your Plans Change</h2>
            <GoldRule />
            <p className="max-w-[640px] mx-auto text-muted text-base">
              Once your booking is confirmed, your date is reserved exclusively for you. If you need to cancel, please notify us as soon as possible — refunds are processed based on the timing of the request.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-9 text-left">
            {TIERS.map(([when, charge, text]) => (
              <Reveal key={when} className="bg-ivory border border-line px-8 pt-9 pb-8 transition-all duration-350 hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_22px_44px_rgba(16,16,16,0.08)]">
                <span className="block text-[11px] tracking-[0.24em] uppercase text-muted mb-2">{when}</span>
                <span className="block font-serif text-[clamp(24px,2.4vw,30px)] text-golddark mb-3.5">{charge}</span>
                <p className="text-[14.5px] text-muted m-0">{text}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* Fine print sections */}
      <Section bg="grey" tight className="py-8 md:py-10">
        <Wrap narrow>
          {SUB_SECTIONS.map(([title, body], i) => (
            <Reveal key={title} className={`py-6 md:py-7 ${i > 0 ? 'border-t border-ink/14' : ''}`}>
              <h3 className="text-[clamp(21px,2.2vw,25px)] mb-3.5">{title}</h3>
              <div className="text-[15.5px] text-muted leading-relaxed">{body}</div>
            </Reveal>
          ))}
        </Wrap>
      </Section>

      <Section bg="black" tight className="text-center py-14 md:py-18">
        <Wrap>
          <Reveal>
            <Eyebrow>Thank You for Choosing Picture Republiq</Eyebrow>
            <h2 className="text-white text-[clamp(29px,3.5vw,42px)] max-w-[820px] mx-auto">We Appreciate the Trust You Place in Us</h2>
            <p className="text-white/75 max-w-[620px] mx-auto mt-5">Our goal is to provide a professional, enjoyable experience and create photographs that you will treasure for years to come.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <Btn variant="gold" to="/contact">Book Your Session</Btn>
            </div>
          </Reveal>
        </Wrap>
      </Section>
    </main>
  )
}
