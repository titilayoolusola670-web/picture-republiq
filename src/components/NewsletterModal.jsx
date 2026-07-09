import { useEffect, useState } from 'react'
import { Eyebrow } from './ui.jsx'
import { saveRecord, emailCopy } from '../lib/forms.js'

const DONE_KEY = 'pr-news-done'
const SNOOZE_KEY = 'pr-news-snooze'

export default function NewsletterModal() {
  const [show, setShow] = useState(false)
  const [state, setState] = useState('idle') // idle | busy | done

  useEffect(() => {
    try {
      if (localStorage.getItem(DONE_KEY)) return
      if (Date.now() < +(localStorage.getItem(SNOOZE_KEY) || 0)) return
    } catch { /* private mode — just show it */ }
    const t = setTimeout(() => setShow(true), 10000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!show) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [show])

  function close() {
    try { localStorage.setItem(SNOOZE_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000)) } catch { /* ok */ }
    setShow(false)
  }

  async function subscribe(e) {
    e.preventDefault()
    const form = e.target
    if (!form.checkValidity()) { form.reportValidity(); return }
    const email = form.email.value
    saveRecord('pr-subscribers', { email, ts: new Date().toISOString() })
    setState('busy')
    try {
      const res = await emailCopy({ email }, 'New newsletter subscriber — Picture Republiq')
      if (!res.ok) throw new Error()
      setState('done')
      try { localStorage.setItem(DONE_KEY, '1') } catch { /* ok */ }
      setTimeout(() => setShow(false), 2200)
    } catch {
      setState('idle')
      alert('Sorry — something went wrong. Please try again, or email us at hello@picturerepubliq.com.')
    }
  }

  if (!show) return null
  return (
    <div
      className="fixed inset-0 z-[700] flex items-center justify-center p-6 bg-[#0a0a0a]/62 backdrop-blur-[4px]"
      role="dialog" aria-modal="true" aria-label="Join our newsletter"
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div className="relative w-full max-w-[540px] bg-white border-t-[3px] border-gold px-7 sm:px-13 pt-14 pb-12 text-center shadow-[0_40px_90px_rgba(0,0,0,0.35)] animate-fade-up">
        <button
          onClick={close} aria-label="Close"
          className="absolute top-3.5 right-3.5 w-[38px] h-[38px] border border-line text-muted text-[15px] leading-none cursor-pointer transition-all duration-300 hover:border-gold hover:text-golddark"
        >✕</button>
        <Eyebrow className="!mb-1.5">Stay Inspired</Eyebrow>
        <h2 className="text-[clamp(29px,3.5vw,42px)]">Join Our Newsletter</h2>
        {state === 'done' ? (
          <p className="font-serif italic text-[22px] text-ink mt-7">Thank you — you're on the list.</p>
        ) : (
          <>
            <p className="max-w-[400px] mx-auto mt-4 text-muted text-[15.5px]">
              Be the first to see our newest work, session availability, and seasonal offers — delivered occasionally, straight to your inbox.
            </p>
            <form onSubmit={subscribe} noValidate className="flex flex-col sm:flex-row gap-3 sm:gap-0 mt-7">
              <input type="email" name="email" required placeholder="Enter your email address" aria-label="Email address"
                className="field-input flex-1 sm:border-r-0 text-center sm:text-left" />
              <button type="submit" disabled={state === 'busy'}
                className="border border-gold bg-gold text-white text-[13px] font-medium tracking-[0.22em] uppercase px-6 py-[14px] whitespace-nowrap cursor-pointer transition-colors duration-300 hover:bg-golddark hover:border-golddark disabled:opacity-60">
                {state === 'busy' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
            <p className="flex items-center justify-center gap-2 text-xs text-muted mt-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="w-[13px] h-[13px] stroke-gold shrink-0"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
              We respect your inbox. No spam — unsubscribe at any time.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
