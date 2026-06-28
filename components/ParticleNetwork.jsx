'use client'
import { useEffect, useRef } from 'react'

export default function ParticleNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 30 : 60

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }))

    const mouse = { x: -9999, y: -9999 }
    let animId
    let paused = false

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    const draw = () => {
      if (paused) return
      animId = requestAnimationFrame(draw)
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

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / 150) * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = 'rgba(6,182,212,0.5)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    // Pause when tab is hidden to save CPU/GPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        paused = true
        cancelAnimationFrame(animId)
      } else {
        paused = false
        draw()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Pause when hero section scrolls out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!paused) draw()
        } else {
          cancelAnimationFrame(animId)
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
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
