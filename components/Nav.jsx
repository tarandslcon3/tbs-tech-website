'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? 'bg-[#0a0f1e]/95 backdrop-blur-sm border-b border-[#1e2a4a] shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-black text-white tracking-tight">
            Lead<span className="text-[#3b82f6]">Forge</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('services')}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollTo('calculator')}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Calculator
            </button>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Blog
            </Link>
            <button
              onClick={() => scrollTo('demo')}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Free Demo
            </button>
            <button
              onClick={() => scrollTo('demo')}
              className="px-5 py-2 bg-[#3b82f6] text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors text-sm"
            >
              Get Free Demo
            </button>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#0a0f1e] border-t border-[#1e2a4a] py-6">
            <div className="flex flex-col gap-5 px-2">
              <button
                onClick={() => scrollTo('services')}
                className="text-gray-300 hover:text-white text-left text-base"
              >
                Services
              </button>
              <button
                onClick={() => scrollTo('calculator')}
                className="text-gray-300 hover:text-white text-left text-base"
              >
                Calculator
              </button>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white text-base"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <button
                onClick={() => scrollTo('demo')}
                className="text-gray-300 hover:text-white text-left text-base"
              >
                Free Demo
              </button>
              <button
                onClick={() => scrollTo('demo')}
                className="w-full py-3 bg-[#3b82f6] text-white font-semibold rounded-lg text-base"
              >
                Get Free Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
