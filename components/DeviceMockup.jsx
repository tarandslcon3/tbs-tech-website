'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NOTIFICATIONS = [
  { emoji: '📱', title: 'New Lead', body: "Mike's HVAC — Quote request $2,400" },
  { emoji: '📱', title: 'New Lead', body: "Sarah's Plumbing — Emergency repair $800" },
  { emoji: '✅', title: 'Booking Confirmed', body: 'James Roofing — $3,200 job booked' },
  { emoji: '📱', title: 'New Lead', body: 'Downtown Restaurant — Website redesign' },
]

function drawPhone(ctx, W, H, notifIndex, slideProgress) {
  ctx.clearRect(0, 0, W, H)

  // Background
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, W, H)

  // Status bar
  ctx.fillStyle = '#161b22'
  ctx.fillRect(0, 0, W, 32)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.font = '10px sans-serif'
  ctx.fillText('9:41', 14, 22)
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(W - 18, 11, 12, 10)

  // App header
  ctx.fillStyle = '#161b22'
  ctx.fillRect(0, 32, W, 44)
  ctx.fillStyle = '#3b82f6'
  ctx.font = 'bold 13px sans-serif'
  ctx.fillText('TBS Leads', 14, 58)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.font = '9px sans-serif'
  ctx.fillText('Live notifications', 14, 72)

  const NOTIF_H = 76
  const GAP = 8
  const startY = 84

  // Previous notifications (static)
  for (let i = 0; i < notifIndex; i++) {
    const y = startY + i * (NOTIF_H + GAP)
    if (y + NOTIF_H > H - 10) break
    drawNotifCard(ctx, W, y, NOTIFICATIONS[i % NOTIFICATIONS.length], 1)
  }

  // Current notification — slides in from below
  const eased = 1 - Math.pow(1 - slideProgress, 3)
  const currentY = startY + notifIndex * (NOTIF_H + GAP) + (1 - eased) * 80
  if (currentY < H - 10) {
    drawNotifCard(ctx, W, currentY, NOTIFICATIONS[notifIndex % NOTIFICATIONS.length], Math.min(1, slideProgress * 2))
  }
}

function drawNotifCard(ctx, W, y, notif, alpha) {
  const NOTIF_H = 76
  ctx.globalAlpha = alpha

  ctx.fillStyle = '#1a1f36'
  ctx.beginPath()
  if (ctx.roundRect) {
    ctx.roundRect(10, y, W - 20, NOTIF_H, 8)
  } else {
    ctx.rect(10, y, W - 20, NOTIF_H)
  }
  ctx.fill()

  // Blue left accent bar
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(10, y, 4, NOTIF_H)

  // Emoji
  ctx.font = '16px sans-serif'
  ctx.fillText(notif.emoji, 24, y + 28)

  // Title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 11px sans-serif'
  ctx.fillText(notif.title, 48, y + 26)

  // Body text
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '9.5px sans-serif'
  const words = notif.body.split(' ')
  let line = ''; let lineY = y + 42
  for (const w of words) {
    const test = line + w + ' '
    if (ctx.measureText(test).width > W - 68 && line !== '') {
      ctx.fillText(line, 48, lineY); line = w + ' '; lineY += 13
    } else { line = test }
  }
  ctx.fillText(line, 48, lineY)

  ctx.globalAlpha = 1
}

export default function DeviceMockup() {
  const mountRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 200
    const H = mount.clientHeight || 380

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const blueLight = new THREE.PointLight(0x3b82f6, 2, 10)
    blueLight.position.set(2, 2, 3)
    scene.add(blueLight)

    // Phone body
    const phoneMat = new THREE.MeshPhongMaterial({ color: 0x0d1117, shininess: 120 })
    const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.8, 0.12), phoneMat)
    scene.add(phoneBody)

    // Screen canvas texture
    const CANVAS_W = 220, CANVAS_H = 440
    const texCanvas = document.createElement('canvas')
    texCanvas.width = CANVAS_W
    texCanvas.height = CANVAS_H
    const texCtx = texCanvas.getContext('2d')
    const phoneTex = new THREE.CanvasTexture(texCanvas)

    const screenMat = new THREE.MeshBasicMaterial({ map: phoneTex })
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.22, 2.56), screenMat)
    screenMesh.position.z = 0.065
    scene.add(screenMesh)

    // Notch
    const notchMat = new THREE.MeshBasicMaterial({ color: 0x0d1117 })
    const notch = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.07, 0.01), notchMat)
    notch.position.set(0, 1.3, 0.07)
    scene.add(notch)

    // Notification animation state
    let notifIndex = 0
    let slideProgress = 0
    let lastChange = Date.now()
    const SLIDE_DURATION = 600
    const HOLD_DURATION = 2800

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const now = Date.now()
      const elapsed = now - lastChange

      if (elapsed < SLIDE_DURATION) {
        slideProgress = elapsed / SLIDE_DURATION
      } else {
        slideProgress = 1
        if (elapsed > SLIDE_DURATION + HOLD_DURATION) {
          notifIndex = (notifIndex + 1) % NOTIFICATIONS.length
          slideProgress = 0
          lastChange = now
        }
      }

      drawPhone(texCtx, CANVAS_W, CANVAS_H, notifIndex, slideProgress)
      phoneTex.needsUpdate = true

      const t = Date.now() * 0.001
      const floatY = Math.sin(t * 0.8) * 0.08

      phoneBody.position.y = floatY
      screenMesh.position.y = floatY
      notch.position.y = 1.3 + floatY

      const rotY = 0.18 + mouseRef.current.x * 0.06
      const rotX = -0.05 + mouseRef.current.y * -0.04

      phoneBody.rotation.y = rotY
      phoneBody.rotation.x = rotX
      screenMesh.rotation.y = rotY
      screenMesh.rotation.x = rotX
      notch.rotation.y = rotY
      notch.rotation.x = rotX

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      phoneTex.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '200px', height: '380px' }}
      className="hidden lg:block"
    />
  )
}
