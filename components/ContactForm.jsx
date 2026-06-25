'use client'
import { useState } from 'react'

const BUSINESS_TYPES = [
  'Small Business',
  'E-Commerce Store',
  'Restaurant or Food Service',
  'Real Estate',
  'Finance or Accounting',
  'Law Firm',
  'HVAC or Trades',
  'SaaS or Tech Startup',
  'Consultant or Coach',
  'Agency',
  'Other',
]

const SERVICES = [
  'Website Design',
  'AI Automation',
  'SaaS or App Development',
  'Lead Generation',
  'SEO and Content',
  'Business Consulting',
  'Not Sure Just Exploring',
]

const HOW_HEARD = ['Google Search', 'LinkedIn', 'Facebook', 'Referral', 'Other']

const base = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '12px 14px',
  color: 'white',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
}

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    businessName: '', businessType: '', services: [], projectDesc: '', howHeard: '',
  })
  const [focused, setFocused] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleService = (s) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
    }))
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.businessName.trim()) e.businessName = 'Business name is required'
    if (!form.businessType) e.businessType = 'Please select a business type'
    if (form.services.length === 0) e.services = 'Please select at least one option'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')

    try {
      const apiKey = process.env.NEXT_PUBLIC_JOTFORM_API_KEY || ''
      const params = new URLSearchParams()
      params.set('apiKey', apiKey)
      params.set('submission[3][first]', form.firstName)
      params.set('submission[3][last]', form.lastName)
      params.set('submission[4]', form.email)
      params.set('submission[5]', form.phone)
      params.set('submission[6]', form.businessName)
      params.set('submission[7]', form.businessType)
      params.set('submission[8]', form.services.join(', '))
      params.set('submission[9]', form.projectDesc)
      params.set('submission[10]', form.howHeard)

      const res = await fetch('https://api.jotform.com/form/261737577809069/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })

      const data = await res.json()
      if (data.responseCode !== 200) throw new Error('Jotform error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const field = (name) => ({
    style: {
      ...base,
      ...(focused === name ? { border: '1px solid #3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.15)' } : {}),
      ...(errors[name] ? { border: '1px solid #ef4444' } : {}),
    },
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(''),
  })

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 px-4 bg-[#060b18]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-16 text-center">
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-white mb-4">We Got Your Request!</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Check your email and phone — we will reach out within 2 hours with your free demo or consultation.
            </p>
            <a
              href="/"
              className="inline-flex px-8 py-3 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 px-4 bg-[#060b18]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-4 py-2 text-[#3b82f6] text-sm font-medium mb-6">
            Free Consultation
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get Your Free{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
              TBS Tech Services Demo
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Fill out the form below and we will reach out within 24 hours with a free personalized demo for your business.
          </p>
        </div>

        <div
          className="glass-card rounded-2xl p-8 md:p-12"
          style={{ background: '#0d1627' }}
        >
          {status === 'error' && (
            <div style={{ marginBottom: 24, padding: '14px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: 14 }}>
              Something went wrong. Please email us directly at{' '}
              <a href="mailto:tbstechservices@gmail.com" style={{ color: '#f87171', textDecoration: 'underline' }}>tbstechservices@gmail.com</a>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-gray-300 text-sm mb-1.5">First Name *</label>
                <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" {...field('firstName')} />
                {errors.firstName && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1.5">Last Name</label>
                <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith" {...field('lastName')} />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-300 text-sm mb-1.5">Email Address *</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@company.com" {...field('email')} />
              {errors.email && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="block text-gray-300 text-sm mb-1.5">
                Phone Number <span className="text-gray-500">(optional)</span>
              </label>
              <input type="text" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="555-555-5555" {...field('phone')} />
            </div>

            {/* Business Name */}
            <div className="mb-5">
              <label className="block text-gray-300 text-sm mb-1.5">Business Name *</label>
              <input type="text" value={form.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Acme Corp" {...field('businessName')} />
              {errors.businessName && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.businessName}</p>}
            </div>

            {/* Business Type */}
            <div className="mb-5">
              <label className="block text-gray-300 text-sm mb-1.5">Business Type *</label>
              <select
                value={form.businessType}
                onChange={e => set('businessType', e.target.value)}
                style={{ ...field('businessType').style, appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
                onFocus={() => setFocused('businessType')}
                onBlur={() => setFocused('')}
              >
                <option value="" style={{ background: '#0d1627' }}>Select your business type...</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t} style={{ background: '#0d1627' }}>{t}</option>)}
              </select>
              {errors.businessType && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.businessType}</p>}
            </div>

            {/* Services checkboxes */}
            <div className="mb-5">
              <label className="block text-gray-300 text-sm mb-3">What do you need help with? *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map(s => (
                  <label
                    key={s}
                    onClick={() => toggleService(s)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                      border: form.services.includes(s) ? '2px solid #3b82f6' : '2px solid rgba(255,255,255,0.2)',
                      background: form.services.includes(s) ? '#3b82f6' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}>
                      {form.services.includes(s) && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{ color: '#d1d5db', fontSize: 14 }}>{s}</span>
                  </label>
                ))}
              </div>
              {errors.services && <p style={{ color: '#f87171', fontSize: 12, marginTop: 8 }}>{errors.services}</p>}
            </div>

            {/* Project description */}
            <div className="mb-5">
              <label className="block text-gray-300 text-sm mb-1.5">
                Tell us about your project <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                value={form.projectDesc}
                onChange={e => set('projectDesc', e.target.value)}
                placeholder="Tell us about your business and what you're looking to achieve..."
                rows={4}
                style={{ ...base, resize: 'vertical', ...(focused === 'projectDesc' ? { border: '1px solid #3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.15)' } : {}) }}
                onFocus={() => setFocused('projectDesc')}
                onBlur={() => setFocused('')}
              />
            </div>

            {/* How heard */}
            <div className="mb-8">
              <label className="block text-gray-300 text-sm mb-1.5">How did you hear about us?</label>
              <select
                value={form.howHeard}
                onChange={e => set('howHeard', e.target.value)}
                style={{ ...base, ...(focused === 'howHeard' ? { border: '1px solid #3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.15)' } : {}), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
                onFocus={() => setFocused('howHeard')}
                onBlur={() => setFocused('')}
              >
                <option value="" style={{ background: '#0d1627' }}>Select an option...</option>
                {HOW_HEARD.map(h => <option key={h} value={h} style={{ background: '#0d1627' }}>{h}</option>)}
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-colors text-lg"
              style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'default' : 'pointer' }}
            >
              {status === 'loading' ? 'Submitting...' : 'Request My Free Demo'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
