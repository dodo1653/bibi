import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import Art from './components/Art'
import LiveSection from './components/LiveSection'
import Token from './components/Token'
import About from './components/About'
import Community from './components/Community'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CinematicTransition from './components/CinematicTransition'

function App() {
  const audioRef = useRef(null)
  const audioUrlRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)

    fetch('/tiktok-audio.mp3')
      .then(res => res.blob())
      .then(blob => {
        audioUrlRef.current = URL.createObjectURL(blob)
      })
      .catch(() => {})

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current)
      }
    }
  }, [])

  const playAudio = () => {
    if (!audioRef.current) return
    const src = audioUrlRef.current || '/tiktok-audio.mp3'
    audioRef.current.src = src
    audioRef.current.volume = 0.5
    audioRef.current.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {})
  }

  const pauseAudio = () => {
    if (!audioRef.current) return
    setIsPlaying(false)
    audioRef.current.pause()
    audioRef.current.volume = 0
  }

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} loop />
      
      <CinematicTransition />
      <Navbar isPlaying={isPlaying} onPlay={playAudio} onPause={pauseAudio} />
      <Hero />
      <Art />
      <LiveSection />
      <Token />
      <About />
      <Community />
      <Footer />
      <a 
        href="https://x.com/dazzoxx"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 transition-all duration-300 hover:opacity-70"
        style={{ opacity: 0.4 }}
      >
        <span className="text-[9px] font-light tracking-wide" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          website by <span style={{ color: 'rgba(255,255,255,0.55)' }}>@dazzoxx</span>
        </span>
      </a>
    </div>
  )
}

export default App
