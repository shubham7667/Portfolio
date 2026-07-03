import { useEffect, useState } from 'react'

/**
 * Tracks normalized mouse position (-1 to 1) relative to viewport center.
 * Used to drive parallax / holographic tilt effects.
 */
export default function useParallax(strength = 1) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setPos({ x: x * strength, y: y * strength })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [strength])

  return pos
}
