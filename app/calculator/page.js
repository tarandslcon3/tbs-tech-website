import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CalculatorClient from './CalculatorClient'

export const metadata = {
  title: 'Business Leak Calculator | LeadForge',
  description: 'Find out exactly how much money your trades business is leaking every month in time, leads, cash flow, and missed automation opportunities.',
}

export default function CalculatorPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0a0f1e] pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-4 py-2 text-[#3b82f6] text-sm font-medium mb-6">
              Free Business Audit Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Business Leak{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
                Calculator
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Find out exactly how much money your trades business is leaking every month — and what it would take to fix it.
            </p>
          </div>
          <CalculatorClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
