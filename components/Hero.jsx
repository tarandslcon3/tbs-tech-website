'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const TRUST_ITEMS = [
  '⚡ AI-Powered Lead Capture',
  '🏆 Trusted by Growing Businesses',
  '📱 Mobile-First Design',
  '🔔 Instant SMS Alerts',
  '🤖 24/7 AI Chatbot',
  '🌎 USA & Canada',
  '📈 Proven ROI',
  '⭐ 5-Star Results',
]

export default function Hero() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 3.5

    const pointLight = new THREE.PointLight(0x3b82f6, 2, 8)
    scene.add(pointLight)

    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1)
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.7 })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    scene.add(icosahedron)

    const innerGeo = new THREE.IcosahedronGeometry(0.8, 0)
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.4 })
    const innerIco = new THREE.Mesh(innerGeo, innerMat)
    scene.add(innerIco)

    const particleCount = 150
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    const phases = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
      velocities[i] = 0.003 + Math.random() * 0.005
      phases[i] = Math.random() * Math.PI * 2
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.6 })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleScroll = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', handleScroll)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()
    let animId
    const origPositions = new Float32Array(icoGeo.attributes.position.array)

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const scrollFactor = scrollRef.current * 0.001

      icosahedron.rotation.x = t * 0.2 + mouseRef.current.y * 0.12
      icosahedron.rotation.y = t * 0.35 + mouseRef.current.x * 0.12
      icosahedron.rotation.z = t * 0.1
      innerIco.rotation.x = -t * 0.3
      innerIco.rotation.y = -t * 0.25
      innerIco.rotation.z = t * 0.15

      const verts = icoGeo.attributes.position.array
      for (let i = 0; i < verts.length; i += 3) {
        const ox = origPositions[i], oy = origPositions[i + 1], oz = origPositions[i + 2]
        const noise = Math.sin(t * 2 + ox * 3 + oy * 2) * scrollFactor * 0.3
        verts[i] = ox + noise; verts[i + 1] = oy + noise; verts[i + 2] = oz + noise
      }
      icoGeo.attributes.position.needsUpdate = true

      pointLight.position.x = Math.cos(t * 0.8) * 3
      pointLight.position.y = Math.sin(t * 0.6) * 2
      pointLight.position.z = Math.sin(t * 0.8) * 2

      camera.position.x += (mouseRef.current.x * 0.2 - camera.position.x) * 0.05
      camera.position.y += (-mouseRef.current.y * 0.1 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      const pos = particles.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += velocities[i]
        pos[i * 3] += Math.sin(t + phases[i]) * 0.002
        if (pos[i * 3 + 1] > 7) { pos[i * 3 + 1] = -7; pos[i * 3] = (Math.random() - 0.5) * 14 }
      }
      particles.geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      icoGeo.dispose(); icoMat.dispose()
      innerGeo.dispose(); innerMat.dispose()
      particleGeo.dispose(); particleMat.dispose()
    }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const trustItems = [...TRUST_ITEMS, ...TRUST_ITEMS]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1e]/20 to-[#0a0f1e]/70 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-full px-4 py-2 text-[#3b82f6] text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
          AI Websites & Automation for Any Business
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
        >
          Your Phone Should Be{' '}
          <span className="gradient-text">Ringing Non-Stop</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We build AI-powered websites, automation and custom tools for any business across USA and Canada. Get a free demo in 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-4 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-all duration-200 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Get a Free Demo
          </button>
          <a
            href="/calculator"
            className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:border-white hover:bg-white/5 transition-all duration-200 text-lg backdrop-blur-sm"
          >
            Calculate Your Leaks
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 w-full mt-16 overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="marquee-track py-4">
          {trustItems.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-8 text-gray-400 text-sm whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
