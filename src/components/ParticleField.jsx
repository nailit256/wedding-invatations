import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/ParticleField.module.css'

// SVG paths for gold geometric shapes
const SHAPES = {
  diamond: 'M12 2 L22 12 L12 22 L2 12 Z',
  star4: 'M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z',
  hexagon: 'M12 2 L20.66 7 L20.66 17 L12 22 L3.34 17 L3.34 7 Z',
  crescent: 'M17 12 A5 5 0 1 1 7 12 A5 5 0 0 0 17 12 Z',
  cross: 'M10 2 L14 2 L14 10 L22 10 L22 14 L14 14 L14 22 L10 22 L10 14 L2 14 L2 10 L10 10 Z',
}

const SHAPE_KEYS = Object.keys(SHAPES)

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export default function ParticleField({ count = 35 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      shape: SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)],
      x: randomBetween(0, 100),       // vw %
      y: randomBetween(-10, 110),     // vh %
      size: randomBetween(8, 22),
      opacity: randomBetween(0.08, 0.35),
      duration: randomBetween(12, 28),
      delay: randomBetween(0, 15),
      driftX: randomBetween(-40, 40),
      driftY: randomBetween(-60, -120),
      rotate: randomBetween(0, 360),
      rotateEnd: randomBetween(120, 480),
    }))
  }, [count])

  return (
    <div className={styles.field} aria-hidden="true">
      {particles.map(p => (
        <motion.svg
          key={p.id}
          className={styles.particle}
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.driftX, p.driftX * 0.5],
            y: [0, p.driftY, p.driftY * 1.3],
            rotate: [p.rotate, p.rotateEnd],
            opacity: [0, p.opacity, p.opacity * 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path d={SHAPES[p.shape]} fill="var(--color-gold)" />
        </motion.svg>
      ))}
    </div>
  )
}
