import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTitle } from '../components/ui.jsx'

export default function Login() {
  useTitle('Admin Login')
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    try { if (sessionStorage.getItem('pr-admin-token')) navigate('/admin', { replace: true }) } catch { /* ok */ }
  }, [navigate])

  async function submit(e) {
    e.preventDefault()
    const pw = e.target.pw.value
    setBusy(true)
    setError(false)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      try { sessionStorage.setItem('pr-admin-token', data.token) } catch { /* ok */ }
      navigate('/admin', { replace: true })
    } catch {
      setError(true)
      e.target.pw.value = ''
      e.target.pw.focus()
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-ink bg-cover bg-center relative" style={{ backgroundImage: 'url(assets/logo1.jpg)' }}>
      <div className="absolute inset-0 bg-[#0a0a0a]/82" />
      <div className="relative w-full max-w-[420px] bg-white border-t-[3px] border-gold px-11 pt-13 pb-11 text-center animate-fade-up">
        <img src="assets/logo-mark-white.png" alt="Picture Republiq" className="w-[120px] mx-auto mb-5 invert" />
        <h1 className="text-3xl mb-2">Admin Access</h1>
        <p className="text-sm text-muted mb-7">Enter the admin password to continue.</p>
        <form onSubmit={submit} noValidate>
          <input type="password" name="pw" required autoFocus placeholder="Password" autoComplete="current-password"
            className="field-input text-center tracking-[0.2em]" />
          <button type="submit" disabled={busy} className="w-full mt-4 inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-9 py-[15px] border border-gold bg-gold text-white cursor-pointer transition-colors duration-300 hover:bg-golddark hover:border-golddark disabled:opacity-60">
            {busy ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        {error && <p className="mt-4 text-[13.5px] text-[#a4392f] animate-fade-up">Incorrect password. Please try again.</p>}
        <Link to="/" className="inline-block mt-6 text-xs tracking-[0.18em] uppercase text-muted transition-colors hover:text-golddark">← Back to website</Link>
      </div>
    </main>
  )
}
