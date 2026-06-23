'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DemoForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    tradeType: '',
    phone: '',
    email: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="demo" className="py-24 px-4 bg-[#060b18]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0f172a] border border-[#3b82f6]/40 rounded-2xl p-12"
          >
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              We will build your free demo and send it to your phone within 24 hours.
            </p>
            <div className="mt-8 p-4 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-xl text-[#3b82f6] text-sm">
              Keep an eye on your phone — your personalized demo is on its way.
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  const inputClass =
    'w-full bg-[#0a0f1e] border border-[#1e2a4a] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#3b82f6] transition-colors'

  return (
    <section id="demo" className="py-24 px-4 bg-[#060b18]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-4 py-2 text-[#3b82f6] text-sm font-medium mb-6">
              No credit card. No commitment.
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              See Your New Website Before You Pay a Dollar
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We build a free personalized demo website for your specific trade business before you
              commit to anything. Fill out the form below and receive your demo within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#0f172a] border border-[#1e2a4a] rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Business Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={update('businessName')}
                className={inputClass}
                placeholder="e.g. Smith HVAC Services"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Trade Type <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={formData.tradeType}
                onChange={update('tradeType')}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled>
                  Select your trade
                </option>
                <option value="HVAC">HVAC</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Roofing">Roofing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={update('phone')}
                className={inputClass}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={update('email')}
                className={inputClass}
                placeholder="you@yourbusiness.com"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-[#3b82f6] text-white font-bold text-lg rounded-xl hover:bg-blue-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              {status === 'loading' ? 'Sending your request...' : 'Request My Free Demo →'}
            </button>

            <p className="text-gray-500 text-xs text-center">
              We will never share your information. Your demo will be sent within 24 hours.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
