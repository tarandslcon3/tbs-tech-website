'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function buildScreenTexture() {
  const tex = document.createElement('canvas')
  tex.width = 512
  tex.height = 320
  const c = tex.getContext('2d')

  // Background
  c.fillStyle = '#0a0f1e'
  c.fillRect(0, 0, 512, 320)

  // Nav bar
  c.fillStyle = '#0f172a'
  c.fillRect(0, 0, 512, 30)
  c.fillStyle = '#3b82f6'
  c.fillRect(12, 9, 56, 12)
  c.fillStyle = '#1e293b'
  c.fillRect(360, 9, 36, 12)
  c.fillRect(402, 9, 36, 12)
  c.fillStyle = '#3b82f6'
  c.fillRect(448, 7, 52, 16)
  c.fillStyle = '#ffffff'
  c.font = 'bold 8px sans-serif'
  c.fillText('Demo', 456, 19)

  // Hero headline
  c.fillStyle = '#ffffff'
  c.fillRect(20, 50, 220, 11)
  c.fillRect(20, 67, 160, 9)
  c.fillStyle = 'rgba(59,130,246,0.25)'
  c.fillRect(20, 82, 190, 8)

  // CTA button
  c.fillStyle = '#3b82f6'
  c.beginPath()
  c.roundRect(20, 100, 96, 22, 5)
  c.fill()
  c.fillStyle = '#ffffff'
  c.font = '7.5px sans-serif'
  c.fillText('Get Free Demo', 27, 115)

  // Divider
  c.fillStyle = '#1e2a4a'
  c.fillRect(0, 132, 512, 1)

  // Section label
  c.fillStyle = '#6b7280'
  c.font = '7px sans-serif'
  c.fillText('SERVICES', 20, 148)

  // Service cards
  const colors = ['#3b82f6', '#06b6d4', '#8b5cf6']
  colors.forEach((color, i) => {
    const x = 12 + i * 162
    c.fillStyle = 'rgba(255,255,255,0.04)'
    c.beginPath()
    c.roundRect(x, 156, 152, 96, 7)
    c.fill()
    c.strokeStyle = 'rgba(255,255,255,0.07)'
    c.lineWidth = 0.5
    c.stroke()

    // Icon bg
    c.fillStyle = color + '25'
    c.beginPath()
    c.roundRect(x + 10, 164, 22, 22, 4)
    c.fill()
    c.fillStyle = color
    c.fillRect(x + 15, 171, 12, 8)

    // Title
    c.fillStyle = '#ffffff'
    c.fillRect(x + 10, 194, 88, 7)
    // Body text lines
    c.fillStyle = '#4b5563'
    c.fillRect(x + 10, 207, 120, 4)
    c.fillRect(x + 10, 216, 100, 4)
    c.fillRect(x + 10, 225, 112, 4)
    c.fillRect(x + 10, 234, 80, 4)
  })

  // Glow overlay
  const grad = c.createRadialGradient(256, 160, 0, 256, 160, 280)
  grad.addColorStop(0, 'rgba(59,130,246,0.06)')
  grad.addColorStop(1, 'transparent')
  c.fillStyle = grad
  c.fillRect(0, 0, 512, 320)

  return tex
}

export default function DeviceMockup() {
  const mountRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 420
    const H = mount.clientHeight || 320

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.set(0, 0.6, 5)
    camera.lookAt(0, 0.3, 0)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const blueLight = new THREE.PointLight(0x3b82f6, 3, 12)
    blueLight.position.set(3, 3, 3)
    scene.add(blueLight)
    const cyanLight = new THREE.PointLight(0x06b6d4, 1.5, 10)
    cyanLight.position.set(-3, -1, 2)
    scene.add(cyanLight)

    const laptop = new THREE.Group()
    scene.add(laptop)

    // Base body
    const baseMat = new THREE.MeshPhongMaterial({ color: 0x1a1f36, shininess: 100 })
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.18, 2.1), baseMat)
    base.position.set(0, 0, 0)
    laptop.add(base)

    // Keyboard detail strip
    const keyMat = new THREE.MeshPhongMaterial({ color: 0x111827, shininess: 40 })
    const keys = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.02, 1.4), keyMat)
    keys.position.set(0, 0.1, 0.1)
    laptop.add(keys)

    // Screen frame
    const frameMat = new THREE.MeshPhongMaterial({ color: 0x1a1f36, shininess: 100 })
    const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.1, 0.1), frameMat)
    screenFrame.position.set(0, 1.22, -1.0)
    screenFrame.rotation.x = -0.18
    laptop.add(screenFrame)

    // Screen display with canvas texture
    const texCanvas = buildScreenTexture()
    const screenTex = new THREE.CanvasTexture(texCanvas)
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex })
    const screen = new THREE.Mesh(new THREE.BoxGeometry(2.85, 1.85, 0.01), screenMat)
    screen.position.set(0, 1.22, -0.94)
    screen.rotation.x = -0.18
    laptop.add(screen)

    // Subtle screen glow plane
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.05,
    })
    const glowPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.85, 1.85), glowMat)
    glowPlane.position.set(0, 1.22, -0.87)
    glowPlane.rotation.x = -0.18
    laptop.add(glowPlane)

    laptop.rotation.y = 0.28

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = Date.now() * 0.001
      laptop.position.y = Math.sin(t * 0.9) * 0.1
      laptop.rotation.y = 0.28 + Math.sin(t * 0.25) * 0.08 + mouseRef.current.x * 0.07
      laptop.rotation.x = mouseRef.current.y * 0.04
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '420px', height: '320px' }}
      className="hidden lg:block"
    />
  )
}
