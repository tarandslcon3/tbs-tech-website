'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ── Monitor scene (AI Websites) ───────────────────────────────────────────────
function MonitorScene() {
  const groupRef = useRef()
  const screenRef = useRef()

  const screenCanvas = useRef(null)
  const screenTex = useRef(null)

  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = 400; c.height = 260
    const ctx = c.getContext('2d')
    screenCanvas.current = c

    function draw(t) {
      ctx.fillStyle = '#0a0f1e'
      ctx.fillRect(0, 0, 400, 260)
      ctx.fillStyle = '#111827'
      ctx.fillRect(0, 0, 400, 28)
      // pulsing blue elements
      const pulse = 0.5 + 0.5 * Math.sin(t * 3)
      ctx.fillStyle = `rgba(59,130,246,${0.6 + 0.4 * pulse})`
      ctx.fillRect(12, 7, 80, 14)
      ctx.fillStyle = '#1e2a4a'
      ctx.fillRect(12, 48, 200, 12)
      ctx.fillStyle = `rgba(59,130,246,${0.5 + 0.5 * pulse})`
      ctx.fillRect(12, 48, 200 * (0.6 + 0.4 * pulse), 12)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(12, 72, 160, 10)
      ctx.fillStyle = '#6b7280'
      ctx.fillRect(12, 90, 240, 6)
      ctx.fillRect(12, 102, 200, 6)
      ctx.fillStyle = `rgba(59,130,246,${0.7 + 0.3 * pulse})`
      ctx.beginPath()
      ctx.roundRect(12, 118, 90, 22, 5)
      ctx.fill()
      // grid cards
      const cardColors = ['#3b82f620', '#06b6d420', '#8b5cf620']
      cardColors.forEach((col, i) => {
        ctx.fillStyle = col
        ctx.fillRect(12 + i * 126, 152, 116, 72)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(22 + i * 126, 162, 60, 8)
        ctx.fillStyle = '#4b5563'
        ctx.fillRect(22 + i * 126, 176, 90, 4)
        ctx.fillRect(22 + i * 126, 186, 75, 4)
      })
      if (screenTex.current) screenTex.current.needsUpdate = true
    }

    const tex = new THREE.CanvasTexture(c)
    screenTex.current = tex
    if (screenRef.current) screenRef.current.material.map = tex

    let id; let t = 0
    const loop = () => { t += 0.016; draw(t); id = requestAnimationFrame(loop) }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.3
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Monitor body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 0.15]} />
        <meshPhongMaterial color={0x1a1f36} shininess={80} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.09]}>
        <planeGeometry args={[2.7, 1.75]} />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshPhongMaterial color={0x1a1f36} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.5]} />
        <meshPhongMaterial color={0x1a1f36} />
      </mesh>
    </group>
  )
}

// ── Node network scene (Automation) ──────────────────────────────────────────
function NodeNetworkScene() {
  const groupRef = useRef()
  const packetRef = useRef({ t: 0, leg: 0 })
  const packetMeshRef = useRef()

  const nodePositions = [[-1.5, 0, 0], [1.5, 0.5, 0], [0, -1.2, 0]]

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.2

    // Animate packet along edges
    packetRef.current.t += delta * 0.8
    if (packetRef.current.t > 1) {
      packetRef.current.t = 0
      packetRef.current.leg = (packetRef.current.leg + 1) % 3
    }
    const leg = packetRef.current.leg
    const from = nodePositions[leg]
    const to = nodePositions[(leg + 1) % 3]
    const t = packetRef.current.t
    if (packetMeshRef.current) {
      packetMeshRef.current.position.set(
        from[0] + (to[0] - from[0]) * t,
        from[1] + (to[1] - from[1]) * t,
        from[2] + (to[2] - from[2]) * t,
      )
    }
  })

  const LineSegment = ({ from, to }) => {
    const pts = [new THREE.Vector3(...from), new THREE.Vector3(...to)]
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    return (
      <line geometry={geo}>
        <lineBasicMaterial color={0x3b82f6} transparent opacity={0.6} />
      </line>
    )
  }

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshPhongMaterial color={0x3b82f6} emissive={0x1a3a6b} shininess={100} transparent opacity={0.9} />
        </mesh>
      ))}
      <LineSegment from={nodePositions[0]} to={nodePositions[1]} />
      <LineSegment from={nodePositions[1]} to={nodePositions[2]} />
      <LineSegment from={nodePositions[2]} to={nodePositions[0]} />
      <mesh ref={packetMeshRef}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color={0x06b6d4} />
      </mesh>
    </group>
  )
}

// ── Bar chart scene (SEO Rankings) ───────────────────────────────────────────
function BarChartScene() {
  const groupRef = useRef()
  const bars = [
    { h: 0.6, color: 0x374151, x: -1.6 },
    { h: 0.9, color: 0x374151, x: -0.8 },
    { h: 1.3, color: 0x374151, x: 0 },
    { h: 2.0, color: 0x3b82f6, x: 0.8, glow: true },
    { h: 1.5, color: 0x1e40af, x: 1.6 },
  ]

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.25
  })

  return (
    <group ref={groupRef}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 1, 0]}>
          <boxGeometry args={[0.6, b.h, 0.4]} />
          <meshPhongMaterial
            color={b.color}
            emissive={b.glow ? 0x1a3a6b : 0x000000}
            emissiveIntensity={b.glow ? 0.5 : 0}
            shininess={60}
          />
        </mesh>
      ))}
      {/* Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color={0x111827} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// ── Stars scene (Review Generation) ──────────────────────────────────────────
function StarsScene() {
  const groupRef = useRef()
  const starRefs = useRef([])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.2
    starRefs.current.forEach((ref, i) => {
      if (ref) ref.rotation.z += delta * (0.5 + i * 0.1)
    })
  })

  const StarShape = ({ position, index }) => {
    const shape = new THREE.Shape()
    const outerR = 0.4, innerR = 0.18, points = 5
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2
      const r = i % 2 === 0 ? outerR : innerR
      if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
      else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
    }
    shape.closePath()
    const geo = new THREE.ShapeGeometry(shape)

    return (
      <mesh
        ref={(el) => { starRefs.current[index] = el }}
        position={position}
        geometry={geo}
      >
        <meshPhongMaterial color={0xfbbf24} emissive={0x7c5a00} emissiveIntensity={0.6} shininess={100} />
      </mesh>
    )
  }

  const starPositions = [
    [0, 0, 0], [1.3, 0.4, 0], [-1.3, 0.4, 0], [0.8, -1.0, 0], [-0.8, -1.0, 0],
  ]

  return (
    <group ref={groupRef}>
      {starPositions.map((pos, i) => (
        <StarShape key={i} position={pos} index={i} />
      ))}
    </group>
  )
}

// ── Gears scene (Custom Tools) ────────────────────────────────────────────────
function GearsScene() {
  const bigGearRef = useRef()
  const smallGearRefs = useRef([])

  useFrame((_, delta) => {
    if (bigGearRef.current) bigGearRef.current.rotation.z += delta * 0.4
    smallGearRefs.current.forEach((ref, i) => {
      if (ref) ref.rotation.z -= delta * 0.8 * (i % 2 === 0 ? 1 : -1)
    })
  })

  const GearMesh = ({ position, outerR, innerR, forwardRef, color = 0x3b82f6 }) => (
    <mesh ref={forwardRef} position={position}>
      <torusGeometry args={[outerR, outerR * 0.25, 6, 18]} />
      <meshPhongMaterial color={color} shininess={80} />
    </mesh>
  )

  return (
    <group>
      <GearMesh position={[0, 0, 0]} outerR={1.0} innerR={0.5} forwardRef={bigGearRef} color={0x3b82f6} />
      {[[-1.6, 0.8, 0], [1.6, 0.8, 0], [0, -1.6, 0]].map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { smallGearRefs.current[i] = el }}
          position={pos}
        >
          <torusGeometry args={[0.5, 0.13, 6, 12]} />
          <meshPhongMaterial color={0x06b6d4} shininess={80} />
        </mesh>
      ))}
    </group>
  )
}

// ── Phone scene (AI Chatbots) ─────────────────────────────────────────────────
function PhoneScene() {
  const groupRef = useRef()
  const bubbleIndex = useRef(0)
  const lastChange = useRef(Date.now())
  const screenRef = useRef()
  const texRef = useRef(null)

  const messages = [
    'New lead from Mike — $1,200 job',
    'Lead followed up automatically',
    'Booking confirmed — James Roofing',
    'New lead — Sarah\'s Plumbing $800',
  ]

  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = 200; c.height = 360
    const ctx = c.getContext('2d')
    const tex = new THREE.CanvasTexture(c)
    texRef.current = tex
    if (screenRef.current) screenRef.current.material.map = tex

    function draw() {
      ctx.fillStyle = '#0a0f1e'
      ctx.fillRect(0, 0, 200, 360)
      ctx.fillStyle = '#111827'
      ctx.fillRect(0, 0, 200, 22)
      ctx.fillStyle = '#6b7280'
      ctx.font = '8px sans-serif'
      ctx.fillText('9:41 AM', 80, 15)

      // Chat bubbles
      messages.slice(0, bubbleIndex.current + 1).forEach((msg, i) => {
        const y = 40 + i * 72
        ctx.fillStyle = i === bubbleIndex.current ? '#3b82f6' : '#1e2a4a'
        ctx.beginPath()
        ctx.roundRect(10, y, 180, 58, 8)
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = '8.5px sans-serif'
        const words = msg.split(' ')
        let line = ''; let lineY = y + 18
        words.forEach(w => {
          const test = line + w + ' '
          if (ctx.measureText(test).width > 158 && line !== '') {
            ctx.fillText(line, 18, lineY); line = w + ' '; lineY += 14
          } else { line = test }
        })
        ctx.fillText(line, 18, lineY)
      })
      tex.needsUpdate = true
    }

    draw()
    const interval = setInterval(() => {
      if (bubbleIndex.current < messages.length - 1) {
        bubbleIndex.current++
        draw()
      } else {
        bubbleIndex.current = 0
        draw()
      }
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.12
    groupRef.current.rotation.y = Math.sin(Date.now() * 0.0006) * 0.15
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 2.2, 0.1]} />
        <meshPhongMaterial color={0x1a1f36} shininess={100} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[0.95, 1.9]} />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
    </group>
  )
}

// ── Main ServiceScene overlay ─────────────────────────────────────────────────
export default function ServiceScene({ service, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const getScene = () => {
    switch (service.title) {
      case 'AI-Powered Websites': return <MonitorScene />
      case 'Automation Workflows': return <NodeNetworkScene />
      case 'AI Chatbots': return <PhoneScene />
      case 'SEO & Rankings': return <BarChartScene />
      case 'Review Generation': return <StarsScene />
      case 'Custom Tools & Apps': return <GearsScene />
      default: return null
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(6,11,24,0.96)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'sceneScaleIn 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <style>{`
        @keyframes sceneScaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 40,
          height: 40,
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
        aria-label="Close"
      >
        ×
      </button>

      <p style={{ color: '#3b82f6', fontSize: 12, letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>
        {service.title}
      </p>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24 }}>
        {service.description}
      </p>

      <div style={{ width: '100%', maxWidth: 640, height: 440 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[4, 4, 4]} intensity={2} color={0x3b82f6} />
          <pointLight position={[-3, -2, 3]} intensity={1} color={0x06b6d4} />
          {getScene()}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </div>
  )
}
