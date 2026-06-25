'use client'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const testimonials = [
  {
    name: 'Mike D.',
    role: 'Owner, Summit HVAC',
    quote: 'Before TBS Tech Services, I was getting maybe 5 online leads a month. Now I get 20+ and they come in at all hours. The automated SMS follow-up alone paid for everything in the first month.',
    stars: 5,
    trade: 'HVAC',
  },
  {
    name: 'Sarah T.',
    role: 'Owner, ClearFlow Plumbing',
    quote: "I was skeptical about AI for a plumbing company. But after seeing 11 extra booked jobs in our first month, I'm a complete believer. The chatbot captures leads while I'm on a job site.",
    stars: 5,
    trade: 'Plumbing',
  },
  {
    name: 'James R.',
    role: 'Owner, Apex Roofing',
    quote: "TBS Tech Services built us a website that actually ranks on Google and converts visitors. We went from almost no online presence to 200 Google reviews and a full schedule in three months.",
    stars: 5,
    trade: 'Roofing',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#fbbf24', fontSize: 16 }}>★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }) {
  const { ref, isVisible } = useScrollReveal()
  const isLeft = index % 2 === 0
  const delay = `${index * 0.15}s`

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible
          ? 'perspective(1000px) rotateY(0deg) translateX(0px)'
          : `perspective(1000px) rotateY(${isLeft ? -15 : 15}deg) translateX(${isLeft ? -30 : 30}px)`,
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}, opacity 0.7s ease ${delay}`,
        display: 'flex',
        flexDirection: 'column',
      }}
      className="glass-card rounded-2xl p-8"
    >
      <Stars count={t.stars} />
      <p className="text-gray-300 leading-relaxed mb-8 flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-6 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {t.name[0]}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{t.name}</div>
          <div className="text-gray-500 text-xs">{t.role}</div>
        </div>
        <div className="ml-auto">
          <span className="px-2 py-1 bg-[#1e2a4a] rounded text-xs text-gray-400">{t.trade}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 bg-[#060b18]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#1e2a4a] rounded-full px-4 py-2 text-gray-300 text-sm font-medium mb-6">
            Client Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            What Our Clients{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
              Are Saying
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
