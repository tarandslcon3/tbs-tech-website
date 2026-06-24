'use client'
import { useState, useRef, useEffect } from 'react'

const FLOW = [
  { id: 'start', message: 'Hi! 👋 I\'m the LeadForge assistant. What trade are you in?', options: ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Other'] },
  { id: 'goal', message: 'Great! What\'s your main goal right now?', options: ['Get more leads online', 'Replace my old website', 'Add automation', 'Learn about AI tools'] },
  { id: 'size', message: 'How many jobs do you typically complete per month?', options: ['Under 20', '20–50', '50–100', '100+'] },
  { id: 'capture', message: 'Perfect. To send you a free demo, what\'s your name and email?', type: 'input', placeholder: 'Your name and email...' },
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const data = useRef({})

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: 'bot', text: FLOW[0].message }])
    }
  }, [open, messages.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleOption = (option) => {
    const current = FLOW[step]
    data.current[current.id] = option
    setMessages((m) => [...m, { from: 'user', text: option }])

    const next = step + 1
    if (next < FLOW.length) {
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'bot', text: FLOW[next].message }])
        setStep(next)
      }, 400)
    }
  }

  const handleSubmit = async () => {
    if (!input.trim()) return
    data.current['contact'] = input
    setMessages((m) => [...m, { from: 'user', text: input }])
    setInput('')
    setSending(true)

    try {
      await fetch('/api/chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.current),
      })
    } catch (_) {}

    setSending(false)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: 'bot', text: "Thanks! We'll build your free demo and be in touch within 24 hours. 🚀" },
      ])
      setDone(true)
    }, 500)
  }

  const current = FLOW[step]

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with us"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
          fontSize: 22,
        }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 92,
            right: 24,
            width: 340,
            maxHeight: 480,
            background: '#0f172a',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: 16,
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>LeadForge AI</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>Typically replies instantly</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.from === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: msg.from === 'bot' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                  background: msg.from === 'bot' ? '#1e2a4a' : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  color: 'white',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          {!done && (
            <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {current.type === 'input' ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder={current.placeholder}
                    disabled={sending}
                    style={{
                      flex: 1,
                      background: '#1e2a4a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: 13,
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    style={{
                      background: '#3b82f6',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 14px',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: sending ? 'default' : 'pointer',
                    }}
                  >
                    {sending ? '...' : '→'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {current.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOption(opt)}
                      style={{
                        background: '#1e2a4a',
                        border: '1px solid rgba(59,130,246,0.3)',
                        borderRadius: 8,
                        padding: '6px 12px',
                        color: 'white',
                        fontSize: 12,
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
