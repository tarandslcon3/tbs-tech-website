'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [loaded, setLoaded] = useState(false)

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

        <div className="glass-card rounded-2xl overflow-hidden relative">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1e]/80 z-10">
              <div className="text-center">
                <div
                  className="w-10 h-10 border-2 border-[#3b82f6] border-t-transparent rounded-full mx-auto mb-3"
                  style={{ animation: 'spin 1s linear infinite' }}
                />
                <p className="text-gray-400 text-sm">Loading form...</p>
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          <iframe
            src="https://form.jotform.com/261737577809069"
            title="LeadForge Contact Form"
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%',
              minHeight: 600,
              border: 'none',
              display: 'block',
            }}
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
