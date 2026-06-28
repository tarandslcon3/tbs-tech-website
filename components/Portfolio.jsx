'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const cases = [
  {
    trade: 'HVAC',
    company: 'Summit Heating & Cooling',
    result: '+340% more online leads',
    detail: 'Replaced an outdated site with an AI-powered system. Instant SMS lead alerts doubled their response speed.',
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
    detail: 'Automated post-job review requests sent by SMS. Combined with SEO, they now rank #1 in their market.',
    stat1: { value: '200+', label: 'Google reviews' },
    stat2: { value: '#1', label: 'Local ranking' },
    color: '#8b5cf6',
  },
]

function parseStatValue(value) {
  if (value.startsWith('#')) return { prefix: '#', target: parseInt(value.slice(1)), suffix: '' }
  if (value.endsWith('+')) return { prefix: '', target: parseInt(value), suffix: '+' }
  if (value.endsWith('%')) return { prefix: '', target: parseInt(value), suffix: '%' }
  if (value.endsWith('min')) return { prefix: '', target: parseInt(value), suffix: 'min' }
  return { prefix: '', target: parseInt(value) || 0, suffix: '' }
}

function CountUp({ value, isVisible, color }) {
  const { prefix, target, suffix } = parseStatValue(value)
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isVisible || hasRun.current) return
    hasRun.current = true
    const duration = 1200
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target])

  return (
    <div className="text-2xl font-black" style={{ color }}>
      {prefix}{count}{suffix}
    </div>
  )
}

function CaseCard({ item, index }) {
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' })
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -10,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
    })
  }

  const delay = `${index * 0.15}s`

  return (
    <div
      ref={revealRef}
      style={{
        transform: isVisible
          ? 'perspective(1000px) rotateY(0deg) translateX(0px)'
          : `perspective(1000px) rotateY(20deg) translateX(-40px)`,
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}, opacity 0.7s ease ${delay}`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease',
          height: '100%',
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
            <CountUp value={item.stat1.value} isVisible={isVisible} color={item.color} />
            <div className="text-gray-500 text-xs mt-1">{item.stat1.label}</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <CountUp value={item.stat2.value} isVisible={isVisible} color={item.color} />
            <div className="text-gray-500 text-xs mt-1">{item.stat2.label}</div>
          </div>
        </div>
      </div>
    </div>
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
            Real results from real businesses worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <CaseCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
