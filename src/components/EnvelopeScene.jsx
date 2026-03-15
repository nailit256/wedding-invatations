import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaxSeal from './WaxSeal'
import styles from '../styles/EnvelopeScene.module.css'

// Arabesque SVG border for the envelope face
function ArabesqueLine() {
  return (
    <svg width="100%" height="12" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6 Q90 0 100 6 Q110 12 120 6 Q130 0 140 6 Q150 12 160 6 Q170 0 180 6 Q190 12 200 6"
        stroke="var(--color-gold)" strokeWidth="1.2" fill="none" opacity="0.6"
      />
    </svg>
  )
}

// Geometric corner ornament
function CornerOrnament({ flip }) {
  return (
    <svg
      width="32" height="32" viewBox="0 0 32 32"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path d="M2 2 L16 2 L2 16 Z" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.7" />
      <path d="M2 2 L8 2 L2 8 Z" fill="var(--color-gold)" opacity="0.4" />
      <circle cx="20" cy="20" r="2" fill="var(--color-gold)" opacity="0.5" />
      <circle cx="26" cy="14" r="1.2" fill="var(--color-gold)" opacity="0.35" />
    </svg>
  )
}

// phases: idle → peeling → opening → done
export default function EnvelopeScene({ onOpen }) {
  const [phase, setPhase] = useState('idle')

  function handleSealClick() {
    if (phase !== 'idle') return
    setPhase('peeling')
    // After seal peels off, lift the flap
    setTimeout(() => setPhase('opening'), 520)
    // After flap lifts + card slides, hand off to parent
    setTimeout(() => {
      setPhase('done')
      onOpen()
    }, 520 + 1100)
  }

  const isOpening = phase === 'opening' || phase === 'done'
  const sealGone  = phase !== 'idle'

  return (
    <motion.div
      className={styles.scene}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.5 } }}
    >
      {/* Floating envelope wrapper — bobbing animation */}
      <motion.div
        className={styles.envelopeWrapper}
        animate={
          isOpening
            ? { y: [0, -8, 0], scale: [1, 1.02, 1] }
            : { y: [0, -12, 0, -8, 0] }
        }
        transition={
          isOpening
            ? { duration: 0.4 }
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Envelope body — not clickable, seal is the only target */}
        <div className={styles.envelope}>

          {/* Back layer */}
          <div className={styles.flapBack} />

          {/* Card sliding out of envelope */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                className={styles.cardSliver}
                initial={{ y: 0, opacity: 0.8 }}
                animate={{ y: -110, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Envelope face with arabesque decoration (no seal here) */}
          <div className={styles.envelopeFace}>
            <div className={styles.faceCorners}>
              <CornerOrnament />
              <CornerOrnament flip />
            </div>
            <ArabesqueLine />
            <div className={styles.faceCenter} />
            <ArabesqueLine />
            <div className={styles.faceCornersBtm}>
              <CornerOrnament />
              <CornerOrnament flip />
            </div>
          </div>

          {/* Top flap */}
          <motion.div
            className={styles.flap}
            animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.flapInner} />
          </motion.div>

          {/* ── Wax seal — sits on the flap fold, is the click target ── */}
          {/* Outer div handles absolute positioning; motion handles scale separately */}
          <div className={styles.sealWrapper}>
            <AnimatePresence>
              {!sealGone && (
                <motion.button
                  className={styles.sealBtn}
                  onClick={handleSealClick}
                  aria-label="Break the wax seal to open your invitation"
                  exit={{
                    rotate: [0, -18, -42],
                    x: [0, 18, 60],
                    y: [0, -28, -90],
                    scale: [1, 1.08, 0.45],
                    opacity: [1, 1, 0],
                    transition: { duration: 0.52, ease: 'easeIn' },
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <WaxSeal size={88} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>

      {/* "Tap seal to open" prompt */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.p
            className={styles.prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Tap the seal to open your invitation
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
