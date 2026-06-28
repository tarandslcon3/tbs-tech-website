'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

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
              TBS Tech<span className="text-[#3b82f6]"> Services</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              TBS Tech Services — Digital agency building websites, AI automation and custom tools for businesses worldwide.
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
                <li key={s}>
                  <button
                    onClick={() => scrollTo('services')}
                    className="text-gray-400 hover:text-white transition-colors text-sm text-left cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
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
            <h4 className="text-white font-semibold mb-5">Get In Touch</h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://www.linkedin.com/company/133394575/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#3b82f6] transition-colors text-sm"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2 bg-[#3b82f6] text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors text-sm w-fit"
              >
                Get Free Demo
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e2a4a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TBS Tech Services. All rights reserved.
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
