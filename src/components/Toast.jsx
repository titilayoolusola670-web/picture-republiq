import { useEffect, useState } from 'react'

const TOAST_EVENT = 'pr-toast'

export function toast(message, type = 'success') {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message, type } }))
}

export default function ToastHost() {
  const [items, setItems] = useState([])

  useEffect(() => {
    function onToast(e) {
      const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`
      const item = { id, type: e.detail?.type || 'success', message: e.detail?.message || '' }
      setItems((current) => [...current, item].slice(-3))
      setTimeout(() => {
        setItems((current) => current.filter((x) => x.id !== id))
      }, 4600)
    }
    window.addEventListener(TOAST_EVENT, onToast)
    return () => window.removeEventListener(TOAST_EVENT, onToast)
  }, [])

  if (!items.length) return null
  return (
    <div className="fixed top-5 right-5 z-[1200] flex w-[min(380px,calc(100vw-40px))] flex-col gap-3">
      {items.map((item) => (
        <div key={item.id} className="overflow-hidden border border-gold/50 bg-ink text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)] animate-fade-up">
          <div className="px-5 py-4">
            <span className="block text-[10px] font-medium tracking-[0.24em] uppercase text-gold">
              {item.type === 'error' ? 'Could Not Complete' : 'Success'}
            </span>
            <p className="mt-1 text-[14.5px] leading-relaxed text-white/90">{item.message}</p>
          </div>
          <div className="h-[3px] origin-left bg-gold animate-toast-timer" />
        </div>
      ))}
    </div>
  )
}
