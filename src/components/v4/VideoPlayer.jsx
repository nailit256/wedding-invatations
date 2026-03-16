import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import coupleVideo from '../../assets/v4/wedding-intro.mp4'
import styles from '../../styles/v4/VideoPlayer.module.css'

const BAR_HEIGHT = 'clamp(18px, 5vh, 48px)'

export default function VideoPlayer({ onVideoEnd }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  return (
    <motion.div
      className={styles.overlay}
      initial={{ y: '-110vh' }}
      animate={{ y: ready ? 0 : '-110vh' }}
      exit={{ y: '110vh' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Vertical video card */}
      <div className={styles.videoCard}>
        <video
          ref={videoRef}
          className={styles.video}
          src={coupleVideo}
          autoPlay
          playsInline
          muted
          onCanPlay={() => setReady(true)}
          onEnded={onVideoEnd}
        />

        {/* Vignette */}
        <div className={styles.vignette} />

      </div>
    </motion.div>
  )
}
