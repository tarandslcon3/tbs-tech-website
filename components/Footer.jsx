'use client'
import Link from 'next/link'

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-[#060b18] border-t border-[#1e2a4a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="text-2xl font-black text-white mb-4">
              Lead<span className="text-[#3b82f6]">Forge</span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              AI Automation and Websites for Trades Businesses. Serving USA and Canada. Based in
              Brantford, Ontario.
            </p>
            <div className="flex gap-4 mt-6">
              <span className="px-3 py-1 bg-[#1e2a4a] rounded-full text-xs text-gray-400">HVAC</span>
              <span className="px-3 py-1 bg-[#1e2a4a] rounded-full text-xs text-gray-400">Plumbing</span>
              <span className="px-3 py-1 bg-[#1e2a4a] rounded-full text-xs text-gray-400">Electrical</span>
              <span className="px-3 py-1 bg-[#1e2a4a] rounded-full text-xs text-gray-400">Roofing</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  ROI Calculator
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('demo')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Free Demo
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Our Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">AI-Powered Websites</li>
              <li className="text-gray-400 text-sm">Automation Workflows</li>
              <li className="text-gray-400 text-sm">SaaS & Custom Tools</li>
              <li className="text-gray-400 text-sm">Lead Generation Systems</li>
              <li className="text-gray-400 text-sm">CRM Integration</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e2a4a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 LeadForge — AI Automation and Websites for Trades Businesses. Serving USA and
            Canada. Based in Brantford, Ontario.
          </p>
          <p className="text-gray-600 text-xs">Built with AI. Powered by results.</p>
        </div>
      </div>
    </footer>
  )
}
