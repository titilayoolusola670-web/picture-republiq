// Every submission is (1) saved to this browser's localStorage as a fallback
// and (2) emailed via FormSubmit as the reliable studio notification.
//
// Deliveries go to BOTH studio inboxes: info@picturerepubliq.com is the
// activated FormSubmit endpoint and picturerepubliq2@gmail.com is CC'd.
export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@picturerepubliq.com'
export const FORM_CC = 'picturerepubliq2@gmail.com'
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

function studioEmail(data, subject) {
  return fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...data,
      _subject: subject,
      _cc: FORM_CC,
      _template: 'box',
      _captcha: 'false',
    }),
  })
}

export function bookingEmailCopy(data, kind) {
  return studioEmail({
    'Alert Type': 'New Form Enquiry',
    'Website': 'Picture Republiq',
    'Service Type': kind,
    ...data,
    'Brand Note': 'Picture Republiq black, gold, and white alert',
  }, `New ${kind} booking enquiry — Picture Republiq`)
}

export function subscriberAlertEmail(email) {
  return studioEmail({
    'Alert Type': 'New Newsletter Subscriber',
    'Website': 'Picture Republiq',
    'Subscriber Email': email,
    'Submitted At': new Date().toISOString(),
    'Brand Note': 'Picture Republiq black, gold, and white alert',
  }, 'New newsletter subscriber — Picture Republiq')
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
    bookingEmailCopy(data, kind),
  ])
  if (db.status === 'rejected') throw db.reason
}
