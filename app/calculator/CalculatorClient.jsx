'use client'
import { useState } from 'react'

const SECTIONS = [
  {
    id: 'time',
    title: '⏱ Time Leaks',
    description: 'How much time are you losing to manual tasks each week?',
    color: '#3b82f6',
    fields: [
      { key: 'adminHours', label: 'Hours spent on admin tasks per week', min: 1, max: 40, default: 10, suffix: 'hrs/wk' },
      { key: 'followUpCalls', label: 'Hours spent on manual follow-up calls', min: 0, max: 20, default: 5, suffix: 'hrs/wk' },
      { key: 'hourlyRate', label: 'Your billable hourly rate', min: 50, max: 500, step: 10, default: 100, prefix: '$', suffix: '/hr' },
    ],
    calc: (v) => {
      const adminCost = v.adminHours * v.hourlyRate * 4
      const followUpCost = v.followUpCalls * v.hourlyRate * 4
      return adminCost + followUpCost
    },
    resultLabel: 'Lost per month to time leaks',
  },
  {
    id: 'leads',
    title: '📉 Lead Leaks',
    description: 'How many leads are slipping through the cracks?',
    color: '#06b6d4',
    fields: [
      { key: 'leadsPerMonth', label: 'Online leads per month', min: 1, max: 200, default: 20, suffix: 'leads' },
      { key: 'lostLeadPct', label: 'Leads lost due to slow follow-up', min: 0, max: 80, default: 40, suffix: '%' },
      { key: 'avgJobValue', label: 'Average job value', min: 200, max: 10000, step: 100, default: 1500, prefix: '$' },
      { key: 'closeRate', label: 'Your close rate', min: 10, max: 90, default: 30, suffix: '%' },
    ],
    calc: (v) => {
      const lostLeads = v.leadsPerMonth * (v.lostLeadPct / 100)
      return lostLeads * (v.closeRate / 100) * v.avgJobValue
    },
    resultLabel: 'Lost per month to lead leaks',
  },
  {
    id: 'cashflow',
    title: '💸 Cash Flow Leaks',
    description: 'Revenue lost to slow invoicing and no-shows.',
    color: '#8b5cf6',
    fields: [
      { key: 'invoiceDelay', label: 'Average days to send invoice after job', min: 0, max: 30, default: 5, suffix: 'days' },
      { key: 'jobsPerMonth', label: 'Jobs completed per month', min: 1, max: 200, default: 25, suffix: 'jobs' },
      { key: 'noShowPct', label: 'Appointment no-show rate', min: 0, max: 30, default: 10, suffix: '%' },
      { key: 'avgJob', label: 'Average job value', min: 200, max: 10000, step: 100, default: 1500, prefix: '$' },
    ],
    calc: (v) => {
      const invoiceLoss = v.invoiceDelay * 0.5 * v.jobsPerMonth
      const noShowLoss = v.jobsPerMonth * (v.noShowPct / 100) * v.avgJob
      return invoiceLoss + noShowLoss
    },
    resultLabel: 'Lost per month to cash flow leaks',
  },
  {
    id: 'automation',
    title: '🤖 Automation Opportunity',
    description: 'Revenue you could gain with AI automation in place.',
    color: '#10b981',
    fields: [
      { key: 'reviewCount', label: 'Current Google reviews', min: 0, max: 1000, default: 25, suffix: 'reviews' },
      { key: 'afterHoursLeads', label: 'Estimated leads after business hours', min: 0, max: 50, default: 8, suffix: '/mo' },
      { key: 'automationJobValue', label: 'Average job value', min: 200, max: 10000, step: 100, default: 1500, prefix: '$' },
      { key: 'autoCloseRate', label: 'Expected close rate with fast follow-up', min: 20, max: 80, default: 45, suffix: '%' },
    ],
    calc: (v) => {
      const afterHoursRevenue = v.afterHoursLeads * (v.autoCloseRate / 100) * v.automationJobValue
      const reviewBoost = v.reviewCount < 50 ? 800 : v.reviewCount < 100 ? 400 : 200
      return afterHoursRevenue + reviewBoost
    },
    resultLabel: 'Monthly gain from automation',
  },
]

function SliderField({ field, value, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-300 text-sm">{field.label}</label>
        <span className="text-white font-bold text-sm">
          {field.prefix || ''}{value.toLocaleString()}{field.suffix ? ` ${field.suffix}` : ''}
        </span>
      </div>
      <input
        type="range"
        min={field.min}
        max={field.max}
        step={field.step || 1}
        value={value}
        onChange={(e) => onChange(field.key, Number(e.target.value))}
      />
      <div className="flex justify-between text-gray-600 text-xs mt-1">
        <span>{field.prefix || ''}{field.min}{field.suffix ? ` ${field.suffix}` : ''}</span>
        <span>{field.prefix || ''}{field.max.toLocaleString()}{field.suffix ? ` ${field.suffix}` : ''}</span>
      </div>
    </div>
  )
}

function SectionCalc({ section }) {
  const initial = {}
  section.fields.forEach((f) => { initial[f.key] = f.default })

  const [values, setValues] = useState(initial)

  const handleChange = (key, val) => setValues((v) => ({ ...v, [key]: val }))
  const result = section.calc(values)

  return (
    <div className="glass-card rounded-2xl p-8 mb-6">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-2xl font-black text-white">{section.title}</h2>
        <div
          className="text-right"
          style={{ color: section.color }}
        >
          <div className="text-3xl font-black">${Math.round(result).toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-0.5">{section.resultLabel}</div>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-8">{section.description}</p>

      {section.fields.map((field) => (
        <SliderField
          key={field.key}
          field={field}
          value={values[field.key]}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}

export default function CalculatorClient() {
  return (
    <div>
      {SECTIONS.map((section) => (
        <SectionCalc key={section.id} section={section} />
      ))}

      <div className="mt-8 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.15))', border: '1px solid rgba(59,130,246,0.3)' }}>
        <h3 className="text-2xl font-bold text-white mb-3">Ready to stop the leaks?</h3>
        <p className="text-gray-400 mb-6">
          Get a free personalized demo website and automation plan — built specifically for your trades business.
        </p>
        <a
          href="/#contact"
          className="inline-flex px-8 py-3 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
        >
          Get My Free Demo
        </a>
      </div>
    </div>
  )
}
