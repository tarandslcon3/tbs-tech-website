'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: '🤖',
    title: 'AI-Powered Websites',
    description: 'Websites built from the ground up to generate leads — not just look good.',
    features: ['Lead capture forms that convert', 'Instant SMS & email alerts', 'Mobile-first, lightning fast', 'Google Maps & SEO optimized', 'Trust signals & reviews built in'],
    color: '#3b82f6',
  },
  {
    icon: '⚡',
    title: 'Automation Workflows',
    description: 'Set up once. Work for your business around the clock.',
    features: ['Automated quote follow-ups', 'Online scheduling integration', 'CRM sync (HubSpot, GoHighLevel)', 'Review request automation', 'Lead nurture email sequences'],
    color: '#06b6d4',
  },
  {
    icon: '🤖',
    title: 'AI Chatbots',
    description: 'Capture leads while you sleep — 24/7 visitor engagement.',
    features: ['Captures leads after hours', 'Qualifies visitors automatically', 'Instant SMS to your phone', 'Custom conversation flows', 'Handoff to booking system'],
    color: '#8b5cf6',
  },
  {
    icon: '📈',
    title: 'Local SEO & Rankings',
    description: 'Rank on Google in your service area and get found first.',
    features: ['On-page local SEO structure', 'Google Business Profile setup', 'Service area pages', 'Citation building', 'Monthly ranking reports'],
    color: '#10b981',
  },
  {
    icon: '⭐',
    title: 'Review Generation',
    description: 'Build a 5-star reputation on autopilot.',
    features: ['Post-job SMS review requests', '30–35% review rate average', 'Google & Facebook focus', 'Negative review interception', 'Automated thank-you messages'],
    color: '#f59e0b',
  },
  {
    icon: '🛠️',
    title: 'Custom Tools & Apps',
    description: 'Calculators, client portals, job trackers — built for your trade.',
    features: ['ROI & quote calculators', 'Client portal dashboards', 'Custom booking systems', 'Job tracking applications', 'API integrations & webhooks'],
    color: '#ec4899',
  },
]

function ServiceCard({ service, index }) {
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
      }}
      className="glass-card rounded-2xl p-8 cursor-default"
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-6"
        style={{ background: `${service.color}15` }}
      >
        {service.icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>

      <ul className="space-y-2.5">
        {service.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
            <span style={{ color: service.color }} className="mt-0.5 flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 bg-[#060b18]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#1e2a4a] rounded-full px-4 py-2 text-gray-300 text-sm font-medium mb-6">
            Serving HVAC, Plumbing, Electrical and Roofing across USA and Canada
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything Your Trades Business Needs to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
              Dominate Online
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We handle your entire digital presence — from your website to automation — so you can focus on the work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
