'use client'

import { useEffect, useRef } from 'react'

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Matrix rain configuration
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()'
    const fontSize = 15
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)

    // Animation function
    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px monospace`

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        ctx.fillText(text, x, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0
        }
        drops[i]++
      })
    }

    // Start animation
    const intervalId = setInterval(drawMatrix, 50)

    // Cleanup
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1.5]"
    />

  )
}
