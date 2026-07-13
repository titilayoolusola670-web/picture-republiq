import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTitle } from '../components/ui.jsx'

function fmt(ts) {
  const d = new Date(ts)
  return Number.isNaN(+d) ? '' : `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}
function toCSV(rows) {
  return rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n')
}
function download(name, text) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }))
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href)
}

const th = 'text-left text-[10.5px] tracking-[0.16em] uppercase text-muted font-medium px-4 py-3.5 border-b border-line bg-ivory whitespace-nowrap'
const td = 'px-4 py-3 border-b border-line align-top text-body'

export default function Admin() {
  useTitle('Admin Dashboard')
  const navigate = useNavigate()
  const [tab, setTab] = useState('bookings')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [bookings, setBookings] = useState([])
  const [subs, setSubs] = useState([])

  useEffect(() => {
    let token = ''
    try { token = sessionStorage.getItem('pr-admin-token') || '' } catch { /* ok */ }
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    let cancelled = false
    async function loadAdmin() {
      setLoading(true)
      setError('')
      try {
        const headers = { Authorization: `Bearer ${token}` }
        const [bookingRes, subRes] = await Promise.all([
          fetch('/api/admin/bookings', { headers }),
          fetch('/api/admin/subscribers', { headers }),
        ])
        if (bookingRes.status === 401 || subRes.status === 401) {
          try { sessionStorage.removeItem('pr-admin-token') } catch { /* ok */ }
          navigate('/login', { replace: true })
          return
        }
        if (!bookingRes.ok || !subRes.ok) throw new Error('Could not load admin records.')
        const bookingData = await bookingRes.json()
        const subData = await subRes.json()
        if (!cancelled) {
          setBookings(bookingData.bookings || [])
          setSubs(subData.subscribers || [])
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load admin records.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadAdmin()
    return () => { cancelled = true }
  }, [navigate])

  if (loading) return <main className="min-h-screen bg-ivory flex items-center justify-center text-muted">Loading admin...</main>

  const exportBookings = () => {
    const rows = [['Received', 'Type', 'Name', 'Email', 'Phone', 'City', 'Date', 'Service/Event', 'Coverage', 'Guests', 'Add-ons', 'Message']]
    bookings.forEach((b) => {
      const d = b.data || {}
      rows.push([b.ts, b.kind, d.fullName, d.email, d.phone, d.city, d.eventDate || d.weddingDate, d.service || d.eventType, d.coverage || d.duration, d.guests, d.addons, d.message])
    })
    download('picture-republiq-form-enquiries.csv', toCSV(rows))
  }
  const exportSubs = () => {
    download('picture-republiq-subscribers.csv', toCSV([['Email', 'Subscribed'], ...subs.map((s) => [s.email, s.ts])]))
  }

  const tabBtn = (key) =>
    `font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 border cursor-pointer transition-all duration-300 ${tab === key ? 'bg-ink border-ink text-white' : 'border-line text-muted hover:border-gold hover:text-golddark'}`

  return (
    <main className="min-h-screen bg-ivory">
      <header className="bg-ink2 px-5 md:px-11 py-4 flex items-center justify-between gap-5">
        <Link to="/"><img src="assets/logo-mark-white.png" alt="Picture Republiq" className="h-[34px] w-auto" /></Link>
        <span className="text-[11px] tracking-[0.28em] uppercase text-gold">Admin Dashboard</span>
        <button
          onClick={() => { try { sessionStorage.removeItem('pr-admin-token') } catch { /* ok */ } navigate('/login', { replace: true }) }}
          className="text-[11px] tracking-[0.22em] uppercase border border-white/40 text-white/85 px-5 py-2.5 cursor-pointer transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white">
          Log Out
        </button>
      </header>

      <div className="max-w-[1200px] mx-auto px-5 md:px-11 pt-12 pb-24">
        <h1 className="text-[clamp(28px,3.4vw,38px)] mb-1.5">Welcome back.</h1>
        <p className="text-muted text-[15px] mb-8">Form enquiries and newsletter subscribers saved in MongoDB.</p>
        {error && <p className="mb-8 text-[13px] text-[#a4392f] bg-white border border-[#a4392f]/20 px-4.5 py-3.5">{error}</p>}

        <div className="grid grid-cols-2 gap-4.5 max-w-[560px] mb-10">
          {[[bookings.length, 'Form Enquiries'], [subs.length, 'Newsletter Subscribers']].map(([n, l]) => (
            <div key={l} className="bg-white border border-line border-t-[3px] border-t-gold px-6 py-5">
              <span className="block font-serif text-[40px] leading-none text-ink">{n}</span>
              <span className="block text-[11px] tracking-[0.18em] uppercase text-muted mt-2">{l}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 flex-wrap mb-6">
          <button className={tabBtn('bookings')} onClick={() => setTab('bookings')}>Form Enquiries</button>
          <button className={tabBtn('subs')} onClick={() => setTab('subs')}>Newsletter Subscribers</button>
        </div>

        <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
          <span className="text-[13px] text-muted">Newest first. Every {tab === 'bookings' ? 'form enquiry' : 'subscriber'} is also emailed to you the moment it is submitted.</span>
          <button onClick={tab === 'bookings' ? exportBookings : exportSubs}
            className="text-[11px] tracking-[0.22em] uppercase border border-ink text-ink px-5 py-2.5 cursor-pointer transition-all duration-300 hover:bg-ink hover:text-white">
            Export CSV
          </button>
        </div>

        <div className="bg-white border border-line overflow-x-auto animate-fade-up" key={tab}>
          {tab === 'bookings' ? (
            bookings.length === 0 ? (
              <Empty title="No form enquiries recorded yet">New enquiries submitted through the website forms will appear here — and every enquiry also lands in your email.</Empty>
            ) : (
              <table className="w-full border-collapse text-sm min-w-[760px]">
                <thead><tr>{['Received', 'Type', 'Name', 'Contact', 'Details', 'Message'].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
                <tbody>
                  {bookings.map((b, i) => {
                    const d = b.data || {}
                    const details = [d.city, (d.eventDate || d.weddingDate) && `Date: ${d.eventDate || d.weddingDate}`, d.service, d.eventType, d.coverage || d.duration, d.guests, d.addons && `Add-ons: ${d.addons}`].filter(Boolean)
                    return (
                      <tr key={`${b.ts}-${i}`} className="hover:bg-gold/5">
                        <td className={td}>{fmt(b.ts)}</td>
                        <td className={td}><span className="inline-block text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 border border-gold text-golddark whitespace-nowrap">{b.kind}</span></td>
                        <td className={td}>{d.fullName}</td>
                        <td className={td}>{d.email}{d.phone && <><br />{d.phone}</>}</td>
                        <td className={td}>{details.map((x) => <div key={x}>{x}</div>)}</td>
                        <td className={`${td} max-w-[320px] text-[13px] text-muted`}>{d.message}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )
          ) : subs.length === 0 ? (
            <Empty title="No subscribers recorded in this browser yet">Newsletter signups made on this device will appear here — and every signup from any device lands in your email.</Empty>
          ) : (
            <table className="w-full border-collapse text-sm min-w-[480px]">
              <thead><tr>{['#', 'Email Address', 'Subscribed'].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>
                {subs.map((s, i) => (
                  <tr key={`${s.ts}-${i}`} className="hover:bg-gold/5">
                    <td className={td}>{subs.length - i}</td>
                    <td className={td}>{s.email}</td>
                    <td className={td}>{fmt(s.ts)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-7 text-[13px] text-muted bg-warmgrey border-l-[3px] border-gold px-4.5 py-3.5 leading-relaxed">
          <strong className="font-medium">Heads-up:</strong> submissions are saved in MongoDB and also emailed to the studio inbox.
          If this page cannot load records, check that the local API is running and that <code>MONGODB_URI</code> is set in <code>.env</code>.
        </p>
      </div>
    </main>
  )
}

function Empty({ title, children }) {
  return (
    <div className="py-15 px-6 text-center text-muted text-[15px]">
      <strong className="block font-serif font-normal text-[22px] text-body mb-2">{title}</strong>
      {children}
    </div>
  )
}
