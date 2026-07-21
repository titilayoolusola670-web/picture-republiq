import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ToastHost from './components/Toast.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Weddings from './pages/Weddings.jsx'
import Portraits from './pages/Portraits.jsx'
import Family from './pages/Family.jsx'
import Events from './pages/Events.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import Policy from './pages/Policy.jsx'

// Fullscreen logo intro: shows logo1 for 4 seconds on arrival at the
// home page, then fades into the site.
let splashShown = false
function Splash() {
  const [phase, setPhase] = useState('show') // show | hide | gone
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => {
      setPhase('hide')
      document.body.style.overflow = ''
    }, 4000)
    const t2 = setTimeout(() => setPhase('gone'), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = '' }
  }, [])
  if (phase === 'gone') return null
  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#0c0c0c] bg-cover bg-center animate-breath transition-[opacity,visibility] duration-900 ${phase === 'hide' ? 'opacity-0 invisible' : 'opacity-100'}`}
      style={{ backgroundImage: 'url(/assets/logo1.jpg)' }}
    />
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // allow the page to render, then jump to the anchored section
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const location = useLocation()
  const bare = location.pathname === '/login' || location.pathname === '/admin'
  const [withSplash] = useState(() => {
    if (splashShown) return false
    splashShown = true
    return location.pathname === '/'
  })

  return (
    <>
      {withSplash && <Splash />}
      <ScrollToTop />
      {!bare && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/weddings" element={<Weddings />} />
        <Route path="/portraits" element={<Portraits />} />
        <Route path="/family" element={<Family />} />
        <Route path="/events" element={<Events />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!bare && <Footer />}
      <ToastHost />
    </>
  )
}
