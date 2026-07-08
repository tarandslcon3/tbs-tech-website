'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMagnetic } from '@/hooks/useMagnetic'

export default function Nav() {
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    if (pathname === '/') {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  const magNavRef = useMagnetic()
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

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
            TBS Tech<span className="text-[#3b82f6]"> Services</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('services')}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Services
            </button>
            <Link
              href="/calculator"
              className={`transition-colors text-sm font-medium pb-0.5 ${
                isActive('/calculator')
                  ? 'text-white border-b-2 border-[#3b82f6]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Calculator
            </Link>
            <button
              onClick={() => scrollTo('portfolio')}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Results
            </button>
            <Link
              href="/blog"
              className={`transition-colors text-sm font-medium pb-0.5 ${
                isActive('/blog')
                  ? 'text-white border-b-2 border-[#3b82f6]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <div ref={magNavRef} className="inline-block">
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2 bg-[#3b82f6] text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors text-sm"
              >
                Get Free Demo
              </button>
            </div>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#0a0f1e] border-t border-[#1e2a4a] py-6">
            <div className="flex flex-col gap-5 px-2">
              <button onClick={() => scrollTo('services')} className="text-gray-300 hover:text-white text-left text-base">Services</button>
              <Link
                href="/calculator"
                className={`text-base ${isActive('/calculator') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileOpen(false)}
              >
                Calculator
              </Link>
              <button onClick={() => scrollTo('portfolio')} className="text-gray-300 hover:text-white text-left text-base">Results</button>
              <Link
                href="/blog"
                className={`text-base ${isActive('/blog') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <button
                onClick={() => scrollTo('contact')}
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
