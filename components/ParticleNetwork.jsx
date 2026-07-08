'use client'
import { useEffect, useRef } from 'react'

const COUNT = 40
const FPS_INTERVAL = 1000 / 30  // cap at 30fps

export default function ParticleNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    let animId
    let paused = false
    let lastTime = 0

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize, { passive: true })

    const draw = (timestamp) => {
      animId = requestAnimationFrame(draw)
      if (paused) return
      if (timestamp - lastTime < FPS_INTERVAL) return
      lastTime = timestamp

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.fill()
      }

      // Blue network lines only — no mouse interaction lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / 140) * 0.35})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    // Pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        paused = true
      } else {
        paused = false
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Pause when hero scrolls out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => { paused = !entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(canvas)

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
