'use client'

import { useEffect, useRef } from 'react'

export default function SidebarVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      draw()
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const rootStyle = getComputedStyle(document.documentElement)
      const getColor = (name: string) => rootStyle.getPropertyValue(name).trim()

      // Background
      ctx.fillStyle = getColor('--color-bg-invert')
      ctx.fillRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = getColor('--color-grid')
      ctx.lineWidth = 1

      const gridSize = 40
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Accent cross lines
      ctx.strokeStyle = getColor('--color-subtle')
      ctx.lineWidth = 1
      const crossOffset = 60

      // Top-left corner marks
      ctx.beginPath()
      ctx.moveTo(0, crossOffset)
      ctx.lineTo(crossOffset, crossOffset)
      ctx.lineTo(crossOffset, 0)
      ctx.stroke()

      // Bottom-left corner marks
      ctx.beginPath()
      ctx.moveTo(0, h - crossOffset)
      ctx.lineTo(crossOffset, h - crossOffset)
      ctx.lineTo(crossOffset, h)
      ctx.stroke()

      // Random accent dots
      ctx.fillStyle = getColor('--color-accent')
      const dotPositions = [
        { x: w * 0.3, y: h * 0.2 },
        { x: w * 0.7, y: h * 0.4 },
        { x: w * 0.5, y: h * 0.7 },
        { x: w * 0.2, y: h * 0.85 },
        { x: w * 0.8, y: h * 0.15 },
      ]
      dotPositions.forEach(pos => {
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Coordinate text
      ctx.fillStyle = getColor('--color-text-secondary')
      ctx.font = '10px monospace'
      ctx.fillText('x:0', 8, h - 8)
      ctx.fillText(`y:${Math.round(h)}`, 8, h - 20)

      // Vertical label
      ctx.save()
      ctx.translate(w - 12, h / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.textAlign = 'center'
      ctx.fillStyle = getColor('--color-subtle')
      ctx.font = '10px monospace'
      ctx.fillText('REI_UTSUHO_SYS // VISUAL_MODULE', 0, 0)
      ctx.restore()
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div className="relative w-full h-full bg-bg-invert">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
