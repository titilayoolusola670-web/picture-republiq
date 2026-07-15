import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]
const SERVICE_LINKS = [
  { to: '/weddings', label: 'Weddings' },
  { to: '/portraits', label: 'Portraits' },
  { to: '/family', label: 'Family' },
  { to: '/events', label: 'Events' },
]

const navCls = ({ isActive }) =>
  `inline-flex items-center leading-none text-xs font-normal tracking-[0.2em] uppercase py-2.5 relative transition-colors duration-300
   after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-gold after:transition-all after:duration-300
   ${isActive ? 'text-gold after:w-full' : 'text-white/85 hover:text-gold after:w-0 hover:after:w-full'}`

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return undefined
    }
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  const servicesActive = ['/services', ...SERVICE_LINKS.map((l) => l.to)].includes(location.pathname)

  return (
    <header className="fixed inset-x-0 top-0 z-100 h-16 bg-ink shadow-[0_2px_24px_rgba(0,0,0,0.25)]">
      <div className="h-full max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-8">
        <Link to="/" aria-label="Picture Republiq — Home" className="shrink-0">
          <img src="assets/logo-mark-white.png" alt="Picture Republiq" className="w-auto h-8" />
        </Link>

        <button
          className="lg:hidden relative z-110 w-9 h-9 flex flex-col justify-center gap-[7px] cursor-pointer"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-px bg-warmgrey transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-px bg-warmgrey transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px bg-warmgrey transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        <nav className={`
          lg:flex lg:items-center lg:gap-8 lg:static lg:bg-transparent lg:opacity-100 lg:visible lg:flex-row
          fixed inset-0 bg-[#0c0c0c] flex flex-col items-center justify-center gap-6
          ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none lg:pointer-events-auto lg:opacity-100 lg:visible'}
        `}>
          {LINKS.map((l) => <NavLink key={l.to} to={l.to} className={navCls} end={l.to === '/'}>{l.label}</NavLink>)}

          <div className="relative group text-center">
            <NavLink to="/services" className={() => navCls({ isActive: servicesActive })}>Services</NavLink>
            <div className="
              lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:bg-ink2 lg:border lg:border-white/8 lg:min-w-[190px] lg:py-2.5
              lg:opacity-0 lg:invisible lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0
              lg:transition-all lg:duration-300 static pt-1.5
            ">
              {SERVICE_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} className="block lg:px-6 py-2 text-xs tracking-[0.18em] uppercase text-white/55 lg:text-white/80 hover:text-gold lg:hover:pl-7.5 transition-all duration-250">
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/portfolio" className={navCls}>Portfolio</NavLink>
          <Link to="/contact" className="inline-block border border-gold text-gold text-xs tracking-[0.2em] uppercase px-6 py-[11px] hover:bg-gold hover:text-white transition-colors duration-300">
            Book Your Session
          </Link>
        </nav>
      </div>
    </header>
  )
}
