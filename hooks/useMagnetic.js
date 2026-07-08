'use client'
import { useEffect, useRef } from 'react'

export function useMagnetic(strength = 0.3, range = 80) {
  const ref = useRef(null)
  const rafRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const pendingRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Pre-composite layer so transforms don't trigger repaints
    el.style.willChange = 'transform'

    const lerp = (a, b, t) => a + (b - a) * t

    // Write target to ref, apply only inside rAF — prevents scroll jank
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < range) {
        targetRef.current = { x: dx * strength, y: dy * strength }
        if (!pendingRef.current) {
          pendingRef.current = true
          requestAnimationFrame(() => {
            el.style.transform = `translate(${targetRef.current.x}px, ${targetRef.current.y}px)`
            el.style.transition = 'none'
            posRef.current = { ...targetRef.current }
            pendingRef.current = false
          })
        }
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

    // passive: true lets browser skip preventDefault check → no scroll jank
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.style.willChange = ''
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [strength, range])

  return ref
}
