'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAR_COUNT = 200

export default function SpaceTravel() {
  const mountRef = useRef(null)

  useEffect(() => {
    // Disable on mobile — too heavy for phone GPUs
    if (window.innerWidth < 1024) return

    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 5

    // Stars in a tunnel shape — concentrated along Z axis
    const positions = new Float32Array(STAR_COUNT * 3)
    const shimmerPhases = new Float32Array(STAR_COUNT)
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 1 + Math.random() * 4
      positions[i * 3] = Math.cos(theta) * radius
      positions[i * 3 + 1] = Math.sin(theta) * radius
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      shimmerPhases[i] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    })
    const stars = new THREE.Points(geo, mat)
    scene.add(stars)

    // Camera z driven by scroll — GSAP ScrollTrigger
    const camZ = { z: 5 }
    const scrollTrigger = ScrollTrigger.create({
      start: '500 top',
      end: '1500 top',
      scrub: 1.5,
      onUpdate: (self) => {
        camera.position.z = 5 - 25 * self.progress
      },
    })

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = Date.now() * 0.001

      // Shimmer — small position offsets
      const pos = stars.geometry.attributes.position.array
      for (let i = 0; i < STAR_COUNT; i++) {
        pos[i * 3] += Math.sin(t + shimmerPhases[i]) * 0.0015
        pos[i * 3 + 1] += Math.cos(t * 0.8 + shimmerPhases[i]) * 0.0015
      }
      stars.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      scrollTrigger.kill()
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  )
}
