import { useEffect, useRef } from 'react'

/**
 * Full-viewport fixed canvas starfield with subtle parallax drift and twinkle.
 * Sits behind all content (z-0), separate from the R3F solar system scene.
 */
export default function StarField() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let animationId

    const LAYERS = [
      { count: 120, speed: 0.02, size: [0.4, 1.1], opacity: 0.5 },
      { count: 90, speed: 0.05, size: [0.8, 1.8], opacity: 0.75 },
      { count: 50, speed: 0.09, size: [1.2, 2.6], opacity: 1 },
    ]

    let stars = []

    function initStars() {
      stars = []
      LAYERS.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
            baseOpacity: layer.opacity,
            twinkleSpeed: 0.5 + Math.random() * 1.5,
            twinklePhase: Math.random() * Math.PI * 2,
            layer: layerIndex,
            speed: layer.speed,
          })
        }
      })
    }

    function handleResize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initStars()
    }

    function handleMouseMove(e) {
      mouseRef.current.x = (e.clientX / width - 0.5) * 2
      mouseRef.current.y = (e.clientY / height - 0.5) * 2
    }

    let t = 0
    function draw() {
      t += 0.016
      ctx.clearRect(0, 0, width, height)

      // deep space gradient
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      )
      grad.addColorStop(0, '#0a1128')
      grad.addColorStop(1, '#050816')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      stars.forEach((s) => {
        const parallaxX = mouseRef.current.x * s.layer * 8
        const parallaxY = mouseRef.current.y * s.layer * 8
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinklePhase)
        const opacity = s.baseOpacity * (0.4 + 0.6 * twinkle)

        const x = (s.x + parallaxX + width) % width
        const y = (s.y + parallaxY + height) % height

        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 225, 255, ${opacity})`
        ctx.shadowBlur = s.r * 3
        ctx.shadowColor = 'rgba(0, 229, 255, 0.6)'
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    initStars()
    draw()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
