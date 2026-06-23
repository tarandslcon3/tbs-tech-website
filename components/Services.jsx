'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: '🤖',
    title: 'AI-Powered Websites',
    description: 'Premium sites with lead capture and instant SMS alerts',
    features: [
      'Lead capture forms that convert',
      'Instant SMS & email alerts',
      'AI chat for 24/7 visitor support',
      'Mobile-first, lightning fast',
      'Google Maps & SEO optimized',
    ],
    gradient: 'from-[#3b82f6]/20 to-[#3b82f6]/5',
    border: 'border-[#3b82f6]/30',
    iconBg: 'bg-[#3b82f6]/10',
  },
  {
    icon: '⚡',
    title: 'Automation Workflows',
    description: 'Quote follow-ups, scheduling, CRM sync',
    features: [
      'Automated quote follow-ups',
      'Online scheduling integration',
      'CRM sync (HubSpot, GoHighLevel)',
      'Review request automation',
      'Lead nurture email sequences',
    ],
    gradient: 'from-[#06b6d4]/20 to-[#06b6d4]/5',
    border: 'border-[#06b6d4]/30',
    iconBg: 'bg-[#06b6d4]/10',
  },
  {
    icon: '🛠️',
    title: 'SaaS & Custom Tools',
    description: 'Calculators, client portals, custom apps',
    features: [
      'ROI & quote calculators',
      'Client portal dashboards',
      'Custom booking systems',
      'Job tracking applications',
      'API integrations & webhooks',
    ],
    gradient: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/30',
    iconBg: 'bg-purple-500/10',
  },
]

function TiltCard({ service, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    setTilt({ x: y, y: x })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
      }}
      className={`relative bg-gradient-to-b ${service.gradient} border ${service.border} rounded-2xl p-8 cursor-default overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-[#0f172a] -z-10 rounded-2xl" />

      <div className={`inline-flex items-center justify-center w-14 h-14 ${service.iconBg} rounded-xl text-3xl mb-6`}>
        {service.icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-gray-400 mb-6 text-sm leading-relaxed">{service.description}</p>

      <ul className="space-y-3">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-[#3b82f6] mt-0.5 flex-shrink-0">✓</span>
            {feature}
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
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#1e2a4a] rounded-full px-4 py-2 text-gray-300 text-sm font-medium mb-6">
            Serving HVAC, Plumbing, Electrical and Roofing businesses across USA and Canada
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything Your Trades Business Needs to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
              Dominate Online
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We handle your entire digital presence — from your website to automation — so you can
            focus on the work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {services.map((service, i) => (
            <TiltCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
