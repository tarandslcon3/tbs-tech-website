'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    const startTime = Date.now()
    const startVal = 0

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(startVal + (target - startVal) * eased))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return value
}

function Slider({ label, min, max, value, onChange, suffix = '' }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-gray-300 text-sm font-medium">{label}</label>
        <span className="text-[#3b82f6] font-bold text-sm">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

function DollarInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="w-full bg-[#0a0f1e] border border-[#1e2a4a] rounded-xl pl-7 pr-4 py-3 text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
        />
      </div>
    </div>
  )
}

function ResultCard({ label, value, prefix = '', suffix = '', color = 'text-green-400' }) {
  const animated = useCountUp(value)
  return (
    <div className="bg-[#0a0f1e] border border-[#1e2a4a] rounded-xl p-5 text-center">
      <div className={`text-2xl font-black mb-1.5 ${color}`}>
        {prefix}
        {animated.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-500 text-xs leading-snug">{label}</div>
    </div>
  )
}

export default function ROICalculator() {
  const [employees, setEmployees] = useState(5)
  const [adminHours, setAdminHours] = useState(10)
  const [hourlyWage, setHourlyWage] = useState(28)
  const [leadsPerMonth, setLeadsPerMonth] = useState(20)
  const [avgJobValue, setAvgJobValue] = useState(1800)
  const [closeRate, setCloseRate] = useState(30)
  const [copied, setCopied] = useState(false)

  const hoursSaved = Math.round(employees * adminHours * 0.25 * 52)
  const adminSavings = Math.round(hoursSaved * hourlyWage)
  const extraRevenue = Math.round(leadsPerMonth * 12 * avgJobValue * 0.15)
  const totalImpact = adminSavings + extraRevenue

  const siteUrl =
    typeof window !== 'undefined'
      ? window.location.origin + '/#calculator'
      : 'https://tbstechservices.vercel.app/#calculator'

  const shareText = `My trades business could gain $${totalImpact.toLocaleString()}/year with AI automation. See the calculator:`

  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareLinkedIn = () =>
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(siteUrl)}&title=${encodeURIComponent('AI ROI Calculator for Trades Businesses')}&summary=${encodeURIComponent(shareText)}`,
      '_blank'
    )

  const shareFacebook = () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(shareText)}`,
      '_blank'
    )

  return (
    <section id="calculator" className="py-24 px-4 bg-[#0a0f1e]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              How Much Is a Slow Website{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Costing You?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Adjust the sliders to calculate your potential savings and extra revenue with TBS Tech Services.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[#0f172a] border border-[#1e2a4a] rounded-2xl p-8 space-y-7">
              <h3 className="text-white font-bold text-lg">Your Business Details</h3>
              <Slider
                label="Number of Employees"
                min={1}
                max={50}
                value={employees}
                onChange={setEmployees}
              />
              <Slider
                label="Admin Hours Per Week (per employee)"
                min={1}
                max={40}
                value={adminHours}
                onChange={setAdminHours}
              />
              <DollarInput
                label="Average Hourly Wage"
                value={hourlyWage}
                onChange={setHourlyWage}
              />
              <Slider
                label="New Leads Per Month"
                min={1}
                max={100}
                value={leadsPerMonth}
                onChange={setLeadsPerMonth}
              />
              <DollarInput
                label="Average Job Value"
                value={avgJobValue}
                onChange={setAvgJobValue}
              />
              <Slider
                label="Current Close Rate"
                min={1}
                max={100}
                value={closeRate}
                onChange={setCloseRate}
                suffix="%"
              />
            </div>

            <div className="space-y-5">
              <div className="bg-[#0f172a] border border-[#1e2a4a] rounded-2xl p-8">
                <h3 className="text-white font-bold text-lg mb-6">Your Estimated Results</h3>
                <div className="space-y-4">
                  <ResultCard
                    label="Admin Hours Saved Per Year (25% reduction)"
                    value={hoursSaved}
                    suffix=" hrs"
                    color="text-[#06b6d4]"
                  />
                  <ResultCard
                    label="Annual Admin Cost Savings"
                    value={adminSavings}
                    prefix="$"
                    color="text-[#3b82f6]"
                  />
                  <ResultCard
                    label="Extra Revenue From Faster Lead Response (+15% close rate)"
                    value={extraRevenue}
                    prefix="$"
                    color="text-purple-400"
                  />
                </div>

                <div className="mt-6 p-5 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                  <div className="text-xs text-green-400/70 mb-1 uppercase tracking-wider">
                    Total Annual Impact
                  </div>
                  <div className="text-4xl font-black text-green-400">
                    ${totalImpact.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">per year</div>
                </div>
              </div>

              <div className="bg-[#0f172a] border border-[#1e2a4a] rounded-2xl p-6">
                <h4 className="text-white font-semibold mb-4 text-sm">Share Your Results</h4>
                <div className="flex gap-3">
                  <button
                    onClick={copyLink}
                    className="flex-1 py-2.5 bg-[#1e2a4a] text-gray-300 rounded-lg hover:bg-[#263352] transition-colors text-sm font-medium"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy Link'}
                  </button>
                  <button
                    onClick={shareLinkedIn}
                    className="flex-1 py-2.5 bg-[#0077b5] text-white rounded-lg hover:bg-[#005e8f] transition-colors text-sm font-medium"
                  >
                    in Share
                  </button>
                  <button
                    onClick={shareFacebook}
                    className="flex-1 py-2.5 bg-[#1877f2] text-white rounded-lg hover:bg-[#1464d3] transition-colors text-sm font-medium"
                  >
                    f Share
                  </button>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-[#3b82f6]/20 to-[#06b6d4]/20 border border-[#3b82f6]/30 rounded-2xl p-6 text-center cursor-pointer"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <p className="text-white font-semibold mb-1">Ready to capture these savings?</p>
                <p className="text-[#3b82f6] text-sm">Get your free demo → no cost, no commitment</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
