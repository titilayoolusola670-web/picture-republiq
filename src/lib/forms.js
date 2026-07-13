// Every submission is (1) saved to this browser's localStorage so it
// appears in the admin dashboard, and (2) emailed via FormSubmit as the
// reliable copy that works from every visitor's device.
//
// Deliveries go to BOTH studio inboxes: picturerepubliq2@gmail.com is the
// FormSubmit endpoint and info@picturerepubliq.com is CC'd on every email.
export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/picturerepubliq2@gmail.com'
export const FORM_CC = 'info@picturerepubliq.com'
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalized}`
}

export function collectForm(form) {
  const data = {}
  new FormData(form).forEach((v, k) => {
    if (!String(v).trim()) return
    data[k] = data[k] ? `${data[k]}, ${v}` : v
  })
  return data
}

export function saveRecord(key, rec) {
  try {
    const arr = JSON.parse(localStorage.getItem(key) || '[]')
    arr.unshift(rec)
    localStorage.setItem(key, JSON.stringify(arr.slice(0, 500)))
  } catch { /* storage unavailable — the email copy still goes out */ }
}

export function emailCopy(data, subject) {
  return fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...data, _subject: subject, _cc: FORM_CC, _template: 'table' }),
  })
}

async function apiPost(path, body) {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Request failed')
  }
  return res.json()
}

export function saveBookingToDb(kind, data) {
  return apiPost('/api/bookings', { kind, data })
}

export function saveSubscriberToDb(email) {
  return apiPost('/api/newsletter', { email })
}

export async function submitBooking(form, kind) {
  const data = collectForm(form)
  saveRecord('pr-bookings', { kind, ts: new Date().toISOString(), data })
  const [db] = await Promise.allSettled([
    saveBookingToDb(kind, data),
    emailCopy(data, `New ${kind} booking enquiry — Picture Republiq`),
  ])
  if (db.status === 'rejected') throw db.reason
}
