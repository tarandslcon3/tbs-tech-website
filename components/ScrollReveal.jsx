'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    // Delay ensures DOM is fully painted before querying
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal-3d')
      if (!els.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
      )

      els.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
