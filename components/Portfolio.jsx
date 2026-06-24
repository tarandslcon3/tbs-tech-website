'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const cases = [
  {
    trade: 'HVAC',
    company: 'Summit Heating & Cooling',
    result: '+340% more online leads',
    detail: 'Replaced an outdated WordPress site with an AI-powered system. Instant SMS lead alerts doubled their response speed.',
    stat1: { value: '340%', label: 'More leads' },
    stat2: { value: '2min', label: 'Avg response time' },
    color: '#3b82f6',
  },
  {
    trade: 'Plumbing',
    company: 'ClearFlow Plumbing',
    result: '11 extra jobs per month',
    detail: 'AI chatbot captures overnight leads. Automated follow-up sequences keep them warm until the morning call.',
    stat1: { value: '11', label: 'Extra jobs/mo' },
    stat2: { value: '51%', label: 'Lead close rate' },
    color: '#06b6d4',
  },
  {
    trade: 'Roofing',
    company: 'Apex Roofing Group',
    result: '200+ Google reviews in 90 days',
    detail: 'Automated post-job review requests sent by SMS. Combined with local SEO, they now rank #1 in their area.',
    stat1: { value: '200+', label: 'Google reviews' },
    stat2: { value: '#1', label: 'Local ranking' },
    color: '#8b5cf6',
  },
]

function CaseCard({ item, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilt({ x: y, y: x })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
      }}
      className="glass-card rounded-2xl p-8 cursor-default"
    >
      <div
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-6"
        style={{ background: `${item.color}20`, color: item.color }}
      >
        {item.trade}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{item.company}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-8">{item.detail}</p>
      <div className="flex gap-6">
        <div>
          <div className="text-2xl font-black" style={{ color: item.color }}>{item.stat1.value}</div>
          <div className="text-gray-500 text-xs mt-1">{item.stat1.label}</div>
        </div>
        <div className="w-px bg-white/10" />
        <div>
          <div className="text-2xl font-black" style={{ color: item.color }}>{item.stat2.value}</div>
          <div className="text-gray-500 text-xs mt-1">{item.stat2.label}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-4 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#1e2a4a] rounded-full px-4 py-2 text-gray-300 text-sm font-medium mb-6">
            Real Results
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
              We Have Grown
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Real results from real businesses across the USA and Canada.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <CaseCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
