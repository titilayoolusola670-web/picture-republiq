import { useSearchParams } from 'react-router-dom'
import { Section, Wrap, Eyebrow, GoldRule, Reveal, useTitle } from '../components/ui.jsx'
import { EnquiryShell, Confirmation, Field } from '../components/EnquiryForm.jsx'
import { InstagramIcon, TikTokIcon, WhatsAppIcon, MailIcon } from '../components/icons.jsx'
import { SOCIAL, galleryImg } from '../data.jsx'

const SERVICES = ['portrait', 'family', 'wedding', 'event', 'custom']

const CONNECT = [
  [SOCIAL.whatsapp, WhatsAppIcon, 'WhatsApp', SOCIAL.phone],
  [SOCIAL.instagram, InstagramIcon, 'Instagram', SOCIAL.handle],
  [SOCIAL.tiktok, TikTokIcon, 'TikTok', SOCIAL.handle],
  [SOCIAL.email, MailIcon, 'Email', SOCIAL.emailText],
]

export default function Contact() {
  useTitle('Contact')
  const [params] = useSearchParams()
  const raw = params.get('service') || ''
  const base = raw.split('-')[0]
  const preService = SERVICES.includes(base) ? base : ''
  const preMessage = raw.includes('-')
    ? `I'm interested in: ${raw.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' — ')} Collection.`
    : ''

  return (
    <main>
      {/* Contact split: photo beside the enquiry form */}
      <section className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] mt-16">
        <div className="relative min-h-[72svh] md:min-h-[calc(100svh-4rem)] bg-ink overflow-hidden">
          <img src={galleryImg('portraits', 10)} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-[#080808]/12 to-transparent" />
          <div className="relative z-2 h-full min-h-[72svh] md:min-h-[calc(100svh-4rem)] flex flex-col justify-end px-7 lg:px-16 pt-20 pb-14 md:pb-20">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-white text-[clamp(38px,5.2vw,62px)]">Let's <em className="text-gold">talk.</em></h1>
            <p className="text-white/84 max-w-[420px] mt-4">
              Every great photograph begins with a conversation. Whatever you'd like to discuss, this is the right place to start.
            </p>
          </div>
        </div>

        <div className="bg-warmgrey pt-32 md:pt-40 pb-20 px-7 lg:px-20" id="enquiry">
          <Eyebrow>— Get in Touch</Eyebrow>
          <h2 className="text-[clamp(29px,3.5vw,42px)]">What can we <em className="text-golddark">help with?</em></h2>
          <p className="text-muted text-base max-w-[520px] mt-4 mb-10">
            Tell us about your wedding, portrait session, family shoot, or event — we reply to every message within 24–48 hours.
          </p>

          <EnquiryShell kind="Contact" confirmation={
            <Confirmation>
              <p className="mb-4">Your message has been received successfully. We'll review your details carefully and get in touch with you within 24–48 hours.</p>
              <p>In the meantime, feel free to explore our portfolio and follow our latest work on Instagram.</p>
            </Confirmation>
          }>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-7">
              <Field label="Full Name" required><input type="text" name="fullName" required placeholder="Enter your full name" className="field-input" /></Field>
              <Field label="Email" required><input type="email" name="email" required placeholder="Enter your email address" className="field-input" /></Field>
              <Field label="Phone"><input type="tel" name="phone" placeholder="Enter your phone number" className="field-input" /></Field>
              <Field label="Photography Service" required>
                <select name="service" required defaultValue={preService} className="field-input">
                  <option value="" disabled>Select your package</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Event Date"><input type="date" name="eventDate" className="field-input" /></Field>
              <div className="col-span-full">
                <Field label="Message">
                  <textarea name="message" defaultValue={preMessage} placeholder="Tell us about your session — your vision, location ideas, or any questions you have." className="field-input min-h-[170px] resize-y" />
                </Field>
              </div>
            </div>
            <div className="mt-10">
              <button type="submit" className="inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-9 py-[15px] border border-gold bg-gold text-white cursor-pointer transition-colors duration-300 hover:bg-golddark hover:border-golddark">
                Send Your Enquiry
              </button>
              <p className="text-[13px] text-muted mt-4">We typically respond to all enquiries within 24–48 hours.</p>
            </div>
          </EnquiryShell>
        </div>
      </section>

      {/* Connect */}
      <Section bg="grey" tight id="connect">
        <Wrap className="text-center">
          <Reveal>
            <Eyebrow>Connect With Us</Eyebrow>
            <h2 className="text-[clamp(29px,3.5vw,42px)]">More Ways to Reach Us</h2>
            <GoldRule />
            <p className="max-w-[560px] mx-auto text-muted text-base">
              Prefer a quick chat or a DM? Reach us on whichever feels easiest — we're happy to hear from you.
            </p>
          </Reveal>
        </Wrap>
        <Wrap>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 max-w-[880px] mx-auto mt-13">
            {CONNECT.map(([href, Icon, label, value]) => (
              <Reveal key={label}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-5 bg-ivory border border-line px-7 py-6 transition-all duration-350 hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_22px_44px_rgba(16,16,16,0.08)] group/connect">
                  <span className="w-[50px] h-[50px] shrink-0 border border-gold rounded-full flex items-center justify-center text-gold transition-colors duration-350 group-hover/connect:bg-gold group-hover/connect:text-white">
                    <Icon className="w-[21px] h-[21px]" />
                  </span>
                  <span className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[11px] tracking-[0.3em] uppercase text-muted">{label}</span>
                    <span className="text-[15px] text-ink break-words">{value}</span>
                  </span>
                  <span className="ml-auto text-gold text-lg opacity-0 -translate-x-2 transition-all duration-350 group-hover/connect:opacity-100 group-hover/connect:translate-x-0">→</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Section>
    </main>
  )
}
