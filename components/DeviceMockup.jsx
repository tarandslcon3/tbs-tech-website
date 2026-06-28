'use client'
import { useEffect, useState, useRef } from 'react'

const NOTIFICATIONS = [
  { emoji: '📱', title: 'New Lead', body: "Mike's HVAC — Quote request $2,400", color: '#3b82f6' },
  { emoji: '📱', title: 'New Lead', body: "Sarah's Plumbing — Emergency repair $800", color: '#3b82f6' },
  { emoji: '✅', title: 'Booking Confirmed', body: 'James Roofing — $3,200 job booked', color: '#10b981' },
  { emoji: '📱', title: 'New Lead', body: 'Downtown Restaurant — Website redesign', color: '#3b82f6' },
]

function NotifCard({ id, notif, isNew }) {
  return (
    <div
      style={{
        background: '#1a1f36',
        borderRadius: '10px',
        padding: '10px 12px',
        borderLeft: `3px solid ${notif.color}`,
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
        animation: isNew ? 'notifSlideIn 0.45s ease forwards' : 'none',
      }}
    >
      <span style={{ fontSize: '14px', lineHeight: 1.2 }}>{notif.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontSize: '10px', fontWeight: '700', fontFamily: 'system-ui', marginBottom: '2px' }}>
          {notif.title}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '9px', fontFamily: 'system-ui', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {notif.body}
        </div>
      </div>
    </div>
  )
}

export default function DeviceMockup() {
  const [cards, setCards] = useState([{ id: 0, notif: NOTIFICATIONS[0], isNew: true }])
  const idRef = useRef(1)
  const notifIdxRef = useRef(1)

  useEffect(() => {
    const interval = setInterval(() => {
      const notifIdx = notifIdxRef.current % NOTIFICATIONS.length
      notifIdxRef.current += 1
      const newCard = { id: idRef.current, notif: NOTIFICATIONS[notifIdx], isNew: true }
      idRef.current += 1
      setCards((prev) => {
        const updated = [...prev.map((c) => ({ ...c, isNew: false })), newCard]
        return updated.slice(-3)
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="hidden lg:block flex-shrink-0"
      style={{
        width: '280px',
        height: '560px',
        borderRadius: '40px',
        border: '8px solid rgba(255,255,255,0.15)',
        background: '#0a0f1e',
        boxShadow: '0 0 60px rgba(59,130,246,0.3), inset 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'phoneFloat 3s ease-in-out infinite',
      }}
    >
      {/* Notch */}
      <div style={{
        position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
        width: '72px', height: '18px', background: '#0a0f1e',
        borderRadius: '9px', border: '1.5px solid rgba(255,255,255,0.08)', zIndex: 2,
      }} />

      {/* Screen */}
      <div style={{ position: 'absolute', inset: '6px', borderRadius: '35px', background: '#111827', overflow: 'hidden' }}>
        {/* Status bar */}
        <div style={{ background: '#161b22', padding: '26px 16px 7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontFamily: 'system-ui' }}>9:41</span>
          <div style={{ width: '14px', height: '7px', background: '#3b82f6', borderRadius: '2px' }} />
        </div>

        {/* App header */}
        <div style={{ background: '#161b22', padding: '6px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '700', fontFamily: 'system-ui' }}>TBS Leads</div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px', fontFamily: 'system-ui', marginTop: '2px' }}>Live notifications</div>
        </div>

        {/* Notification stack */}
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {cards.map(({ id, notif, isNew }) => (
            <NotifCard key={id} id={id} notif={notif} isNew={isNew} />
          ))}
        </div>
      </div>
    </div>
  )
}
