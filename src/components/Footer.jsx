import { Link } from 'react-router-dom'
import { SOCIAL } from '../data.jsx'
import { InstagramIcon, TikTokIcon, WhatsAppIcon, MailIcon } from './icons.jsx'

const SOCIALS = [
  [SOCIAL.instagram, 'Instagram', InstagramIcon],
  [SOCIAL.tiktok, 'TikTok', TikTokIcon],
  [SOCIAL.whatsapp, 'WhatsApp', WhatsAppIcon],
  [SOCIAL.email, 'Email', MailIcon],
]

const H4 = ({ children }) => (
  <h4 className="font-sans text-white text-xs font-medium tracking-[0.3em] uppercase mb-6 pb-3.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-7 after:h-px after:bg-gold">
    {children}
  </h4>
)
const FLink = ({ to, children }) => (
  <li className="mb-3"><Link to={to} className="transition-colors duration-300 hover:text-gold">{children}</Link></li>
)

export default function Footer() {
  return (
    <footer className="footer-pattern text-white/60 pt-22 text-sm">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-11 lg:gap-14 pb-16">
          <div>
            <img src="assets/logo-mark-white.png" alt="Picture Republiq logo" className="w-[150px] mb-5" />
            <div className="flex gap-3 mt-2">
              {SOCIALS.map(([href, label, Icon]) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label}
                  className="w-[42px] h-[42px] border border-white/20 rounded-full flex items-center justify-center text-white/75 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white">
                  <Icon className="w-[17px] h-[17px]" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <H4>Explore</H4>
            <ul>
              <FLink to="/">Home</FLink>
              <FLink to="/about">About</FLink>
              <FLink to="/portfolio">Portfolio</FLink>
              <FLink to="/contact">Book Your Session</FLink>
            </ul>
          </div>
          <div>
            <H4>Services</H4>
            <ul>
              <FLink to="/weddings">Weddings</FLink>
              <FLink to="/portraits">Portraits</FLink>
              <FLink to="/family">Family</FLink>
              <FLink to="/events">Events</FLink>
            </ul>
          </div>
          <div>
            <H4>Get in Touch</H4>
            <ul>
              <li className="mb-3 flex items-center gap-3">
                <WhatsAppIcon className="w-[15px] h-[15px] shrink-0 text-gold" />
                <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300">{SOCIAL.phone}</a>
              </li>
              <li className="mb-3 flex items-center gap-3">
                <InstagramIcon className="w-[15px] h-[15px] shrink-0 text-gold" />
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300">{SOCIAL.handle}</a>
              </li>
              <li className="mb-3 flex items-center gap-3">
                <MailIcon className="w-[15px] h-[15px] shrink-0 text-gold" />
                <a href={SOCIAL.email} className="hover:text-gold transition-colors duration-300">{SOCIAL.emailText}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 flex flex-wrap justify-between gap-2.5 text-xs tracking-[0.08em] text-white/45">
          <span>© {new Date().getFullYear()} Picture Republiq. All rights reserved.</span>
          <span>Luxury Wedding, Portrait &amp; Event Photography</span>
        </div>
      </div>
    </footer>
  )
}
