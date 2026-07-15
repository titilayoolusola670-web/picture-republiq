import { useEffect, useRef, useState } from 'react'
import { Btn, GoldRule } from './ui.jsx'
import { submitBooking } from '../lib/forms.js'
import { SOCIAL } from '../data.jsx'
import { toast } from './Toast.jsx'

export function Field({ label, required, hint, children }) {
  return (
    <div className="group/field">
      <label className="field-label">{label} {required && <span className="text-gold">*</span>}</label>
      {hint && <p className="text-[13px] text-muted -mt-1 mb-2.5 leading-normal">{hint}</p>}
      {children}
    </div>
  )
}

export function Confirmation({ children }) {
  const ref = useRef(null)
  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, [])
  return (
    <div ref={ref} className="text-center py-10 px-2.5 animate-fade-up">
      <div className="w-[68px] h-[68px] border border-gold rounded-full flex items-center justify-center mx-auto mb-7 text-gold text-[26px]">✓</div>
      <h3 className="text-[clamp(22px,2.3vw,27px)]">Thank You for Your Enquiry!</h3>
      <GoldRule />
      {children}
      <div className="flex flex-wrap gap-4 justify-center mt-9">
        <Btn to="/portfolio">View Portfolio</Btn>
        <Btn variant="gold" href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Follow on Instagram</Btn>
      </div>
    </div>
  )
}

/* Wraps any enquiry form: validates, records + emails the submission,
   then swaps in the confirmation message. */
export function EnquiryShell({ kind, confirmation, children }) {
  const [done, setDone] = useState(false)
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  if (done) return confirmation
  return (
    <form
      noValidate
      aria-busy={state === 'busy'}
      className="service-form relative"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!e.target.checkValidity()) { e.target.reportValidity(); return }
        setState('busy')
        setError('')
        try {
          await submitBooking(e.target, kind)
          toast('Your enquiry has been submitted successfully. We will get back to you within 24-48 hours.')
          setDone(true)
        } catch (err) {
          setState('idle')
          const message = err.message || 'Could not save your enquiry. Please try again.'
          setError(message)
          toast(message, 'error')
        }
      }}
    >
      {children}
      {state === 'busy' && (
        <div className="form-status form-status-info">
          <span className="form-status-dot" />
          <span>Saving your enquiry and sending it to the studio...</span>
        </div>
      )}
      {error && (
        <div className="form-status form-status-error">
          <span className="form-status-dot" />
          <span>{error}</span>
        </div>
      )}
    </form>
  )
}

export const CHECKBOX_ADDONS = ['Second Photographer', 'Professional Videography', 'Content Creation', 'Drone Coverage (where permitted)']

export function AddonChecks() {
  return (
    <div className="col-span-full">
      <label className="field-label">Additional Services</label>
      <p className="text-[13px] text-muted -mt-1 mb-2.5">Select all that apply.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        {CHECKBOX_ADDONS.map((a) => (
          <label key={a} className="addon-option group/addon">
            <input type="checkbox" name="addons" value={a} className="peer sr-only" />
            <span className="w-[18px] h-[18px] border border-gold/70 flex items-center justify-center text-[12px] text-transparent transition-all duration-300 peer-checked:bg-gold peer-checked:text-white">✓</span>
            <span className="transition-colors duration-300 peer-checked:text-golddark">{a}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export const HOURS = ['1 Hour', '2 Hours', '3 Hours', '4 Hours', '5+ Hours']
export const GUESTS = ['50 guests or fewer', '51–100 guests', '101–150 guests', '151–200 guests', '201–300 guests', 'More than 300 guests']
