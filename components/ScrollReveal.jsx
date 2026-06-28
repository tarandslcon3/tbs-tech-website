'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-3d')

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })

      elements.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return null
}
