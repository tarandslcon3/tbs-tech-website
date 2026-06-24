'use client'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), 1200)
    const remove = setTimeout(() => setVisible(false), 1700)
    return () => {
      clearTimeout(timer)
      clearTimeout(remove)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0f1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 16 }}>
          <rect width="32" height="32" rx="8" fill="#0a0f1e" />
          <polygon points="18,3 10,18 15,18 14,29 22,14 17,14" fill="#3b82f6" />
        </svg>
        <div style={{ color: 'white', fontSize: 24, fontWeight: 900, letterSpacing: '-0.5px' }}>
          Lead<span style={{ color: '#3b82f6' }}>Forge</span>
        </div>
        <div
          style={{
            marginTop: 16,
            width: 40,
            height: 3,
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
            borderRadius: 2,
            margin: '16px auto 0',
            animation: 'lfpulse 1s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes lfpulse {
          0%, 100% { opacity: 1; transform: scaleX(1); }
          50% { opacity: 0.5; transform: scaleX(0.6); }
        }
      `}</style>
    </div>
  )
}
