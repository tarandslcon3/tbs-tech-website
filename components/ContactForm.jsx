'use client'
import { useState, useEffect } from 'react'

export default function ContactForm() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const container = document.getElementById('jotform-container')
    if (!container) return

    const script = document.createElement('script')
    script.src = 'https://form.jotform.com/jsform/261737577809069'
    script.type = 'text/javascript'
    script.async = true
    script.onload = () => setLoaded(true)
    container.appendChild(script)

    return () => {
      try {
        if (container.contains(script)) container.removeChild(script)
        const injected = document.getElementById('JotFormIFrame-261737577809069')
        if (injected) injected.remove()
      } catch (_) {}
    }
  }, [])

  return (
    <section id="contact" className="py-24 px-4 bg-[#060b18]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-4 py-2 text-[#3b82f6] text-sm font-medium mb-6">
            Free Consultation
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to Get{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
              More Leads?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Fill out the form below and we will reach out within 24 hours with a free personalized demo for your business.
          </p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden relative" style={{ minHeight: 600 }}>
          {!loaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0f1e',
                zIndex: 10,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: '2px solid #3b82f6',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    margin: '0 auto 12px',
                    animation: 'jfspin 1s linear infinite',
                  }}
                />
                <p style={{ color: '#6b7280', fontSize: 14 }}>Loading form...</p>
              </div>
              <style>{`@keyframes jfspin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          <div
            id="jotform-container"
            style={{
              width: '100%',
              minHeight: 600,
              background: 'transparent',
            }}
          />
        </div>
      </div>
    </section>
  )
}
