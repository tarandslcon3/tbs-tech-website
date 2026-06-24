'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  const scrollTo = (id) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <footer className="bg-[#060b18] border-t border-[#1e2a4a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black text-white mb-4">
              Lead<span className="text-[#3b82f6]">Forge</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Digital agency building websites, AI automation and custom tools for any business across USA and Canada.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Small Business', 'SaaS', 'E-Commerce', 'Finance', 'Real Estate', 'Any Industry'].map((t) => (
                <span key={t} className="px-2 py-1 bg-[#1e2a4a] rounded text-xs text-gray-400">{t}</span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                'AI-Powered Websites',
                'Lead Capture Systems',
                'Automation Workflows',
                'AI Chatbots',
                'CRM Integration',
                'Review Generation',
              ].map((s) => (
                <li key={s} className="text-gray-400 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollTo('services')} className="text-gray-400 hover:text-white transition-colors text-sm">Services</button>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors text-sm">Business Leak Calculator</Link>
              </li>
              <li>
                <button onClick={() => scrollTo('portfolio')} className="text-gray-400 hover:text-white transition-colors text-sm">Results</button>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:tbstechservices@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                  tbstechservices@gmail.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">USA &amp; Canada</li>
              <li className="pt-2">
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-5 py-2 bg-[#3b82f6] text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors text-sm"
                >
                  Get Free Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e2a4a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 LeadForge — AI Automation and Websites for Any Business. Serving USA and Canada.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
