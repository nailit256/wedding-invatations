import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ParticleField from './components/ParticleField'
import EnvelopeScene from './components/EnvelopeScene'
import InvitationCard from './components/InvitationCard'
import './styles/global.css'

// App state: 'envelope' → 'card'
export default function App() {
  const [stage, setStage] = useState('envelope')

  return (
    <>
      {/* Particle field always visible in background */}
      <ParticleField count={38} />

      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <EnvelopeScene key="envelope" onOpen={() => setStage('card')} />
        )}
        {stage === 'card' && (
          <InvitationCard key="card" />
        )}
      </AnimatePresence>
    </>
  )
}
