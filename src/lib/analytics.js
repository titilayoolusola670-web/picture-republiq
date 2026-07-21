const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-DPF56WPNYR'

export function installAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
}

export function trackPageView(title) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.hash}`,
  })
}
