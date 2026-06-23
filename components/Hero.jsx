'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

export default function Hero() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 3.5

    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    scene.add(icosahedron)

    const innerGeo = new THREE.IcosahedronGeometry(0.8, 0)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
    const innerIco = new THREE.Mesh(innerGeo, innerMat)
    scene.add(innerIco)

    const particleCount = 80
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
      velocities[i] = 0.003 + Math.random() * 0.005
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()
    let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      icosahedron.rotation.x = t * 0.25 + mouseRef.current.y * 0.15
      icosahedron.rotation.y = t * 0.4 + mouseRef.current.x * 0.15
      innerIco.rotation.x = -t * 0.35
      innerIco.rotation.y = -t * 0.3

      const pos = particles.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += velocities[i]
        if (pos[i * 3 + 1] > 6) {
          pos[i * 3 + 1] = -6
          pos[i * 3] = (Math.random() - 0.5) * 12
        }
      }
      particles.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1e]/20 to-[#0a0f1e]/60 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-full px-4 py-2 text-[#3b82f6] text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
          AI-Powered Lead Generation for Trades Businesses
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
        >
          More Leads for Trades Businesses —{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
            Powered by AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We build websites, automations and AI tools for HVAC, plumbing, electrical and roofing
          companies across USA and Canada
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('demo')}
            className="px-8 py-4 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-all duration-200 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Get a Free Demo
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:border-white hover:bg-white/5 transition-all duration-200 text-lg backdrop-blur-sm"
          >
            Calculate Your ROI
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
        >
          {['HVAC', 'Plumbing', 'Electrical', 'Roofing'].map((trade) => (
            <span key={trade} className="flex items-center gap-2">
              <span className="text-[#3b82f6]">✓</span> {trade}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
