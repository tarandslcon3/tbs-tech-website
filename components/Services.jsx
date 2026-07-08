'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Bot, Zap, MessageSquare, TrendingUp, Star, Wrench, Check } from 'lucide-react'

const ServiceScene = dynamic(() => import('@/components/ServiceScene'), { ssr: false })

const services = [
  {
    Icon: Bot,
    title: 'AI-Powered Websites',
    description: 'Websites built from the ground up to generate leads — not just look good.',
    features: ['Lead capture forms that convert', 'Instant SMS & email alerts', 'Mobile-first, lightning fast', 'Google-optimized structure', 'Trust signals built in'],
    color: '#3b82f6',
  },
  {
    Icon: Zap,
    title: 'Automation Workflows',
    description: 'Set up once. Work for your business around the clock.',
    features: ['Automated quote follow-ups', 'Online scheduling integration', 'CRM sync (HubSpot, GoHighLevel)', 'Review request automation', 'Lead nurture email sequences'],
    color: '#06b6d4',
  },
  {
    Icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Capture leads while you sleep — 24/7 visitor engagement.',
    features: ['Captures leads after hours', 'Qualifies visitors automatically', 'Instant SMS to your phone', 'Custom conversation flows', 'Handoff to booking system'],
    color: '#8b5cf6',
  },
  {
    Icon: TrendingUp,
    title: 'SEO & Rankings',
    description: 'Rank on Google and get found first.',
    features: ['On-page SEO structure', 'Google Business Profile setup', 'Service area pages', 'Citation building', 'Monthly ranking reports'],
    color: '#10b981',
  },
  {
    Icon: Star,
    title: 'Review Generation',
    description: 'Build a 5-star reputation on autopilot.',
    features: ['Post-job SMS review requests', '30–35% review rate average', 'Google & Facebook focus', 'Negative review interception', 'Automated thank-you messages'],
    color: '#f59e0b',
  },
  {
    Icon: Wrench,
    title: 'Custom Tools & Apps',
    description: 'Calculators, client portals, job trackers — built for your business.',
    features: ['ROI & quote calculators', 'Client portal dashboards', 'Custom booking systems', 'Job tracking applications', 'API integrations & webhooks'],
    color: '#ec4899',
  },
]

function ServiceCard({ service, index, onClick }) {
  const { ref: revealRef, isVisible } = useScrollReveal()
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [shine, setShine] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    setTilt({ x: y, y: x })
    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const delay = `${(index % 3) * 0.12}s`
  const { Icon } = service

  return (
    <div
      ref={revealRef}
      style={{
        transform: isVisible
          ? 'perspective(1000px) rotateX(0deg) translateY(0px)'
          : 'perspective(1000px) rotateX(15deg) translateY(60px)',
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}, opacity 0.7s ease ${delay}`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false) }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease, box-shadow 0.2s ease',
          boxShadow: isHovered
            ? `0 0 0 1px ${service.color}40, 0 0 28px ${service.color}18`
            : 'none',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        className="glass-card rounded-2xl p-8"
      >
        {/* Glass shine overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none',
            borderRadius: 'inherit',
          }}
        />

        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
          style={{ background: `${service.color}15` }}
        >
          <Icon size={24} color={service.color} strokeWidth={1.75} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
        <ul className="space-y-2.5">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
              <Check size={14} color={service.color} className="mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <>
    {selectedService && (
      <ServiceScene service={selectedService} onClose={() => setSelectedService(null)} />
    )}
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
            Serving small businesses, SaaS, e-commerce, and any industry worldwide
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything Your Business Needs to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
              Dominate Online
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We handle your entire digital presence — from your website to automation — so you can focus on what you do best.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} onClick={() => setSelectedService(service)} />
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
