'use client'
import { useEffect, useRef } from 'react'

export function useMagnetic(strength = 0.3, range = 80) {
  const ref = useRef(null)
  const rafRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const lerp = (a, b, t) => a + (b - a) * t

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < range) {
        const tx = dx * strength
        const ty = dy * strength
        cancelAnimationFrame(rafRef.current)
        posRef.current = { x: tx, y: ty }
        el.style.transform = `translate(${tx}px, ${ty}px)`
        el.style.transition = 'none'
      }
    }

    const handleMouseLeave = () => {
      const startX = posRef.current.x
      const startY = posRef.current.y
      let startTime = null

      const animateBack = (time) => {
        if (!startTime) startTime = time
        const progress = Math.min((time - startTime) / 300, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        const x = lerp(startX, 0, ease)
        const y = lerp(startY, 0, ease)
        el.style.transform = `translate(${x}px, ${y}px)`
        el.style.transition = 'none'
        posRef.current = { x, y }
        if (progress < 1) rafRef.current = requestAnimationFrame(animateBack)
      }

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(animateBack)
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [strength, range])

  return ref
}
