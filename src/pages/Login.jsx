import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTitle } from '../components/ui.jsx'

// SHA-256 of the admin password (kept as a hash so the password is not
// written in plain text in the source).
const HASH = 'd149f575651ad5cbf647353f662b263666d1218568287d311ac18dbf4f78c3d3'

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function Login() {
  useTitle('Admin Login')
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  useEffect(() => {
    try { if (sessionStorage.getItem('pr-admin') === '1') navigate('/admin', { replace: true }) } catch { /* ok */ }
  }, [navigate])

  async function submit(e) {
    e.preventDefault()
    const pw = e.target.pw.value
    if (pw && (await sha256(pw)) === HASH) {
      try { sessionStorage.setItem('pr-admin', '1') } catch { /* ok */ }
      navigate('/admin', { replace: true })
    } else {
      setError(true)
      e.target.pw.value = ''
      e.target.pw.focus()
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
          <button type="submit" className="w-full mt-4 inline-block font-sans text-[13px] font-medium tracking-[0.22em] uppercase px-9 py-[15px] border border-gold bg-gold text-white cursor-pointer transition-colors duration-300 hover:bg-golddark hover:border-golddark">
            Log In
          </button>
        </form>
        {error && <p className="mt-4 text-[13.5px] text-[#a4392f] animate-fade-up">Incorrect password. Please try again.</p>}
        <Link to="/" className="inline-block mt-6 text-xs tracking-[0.18em] uppercase text-muted transition-colors hover:text-golddark">← Back to website</Link>
      </div>
    </main>
  )
}
