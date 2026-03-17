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
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)

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
    }
  }, [])

  const playAudio = () => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.3
    audioRef.current.play().then(() => {
      setIsPlaying(true)
      let vol = 0.3
      const fadeIn = () => {
        vol += 0.04
        if (audioRef.current && vol < 0.5) {
          audioRef.current.volume = vol
          requestAnimationFrame(fadeIn)
        }
      }
      fadeIn()
    }).catch(() => {})
  }

  const pauseAudio = () => {
    if (!audioRef.current) return
    setIsPlaying(false)
    let vol = audioRef.current.volume
    const fadeOut = () => {
      vol -= 0.06
      if (audioRef.current && vol > 0) {
        audioRef.current.volume = vol
        requestAnimationFrame(fadeOut)
      } else if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.volume = 0
      }
    }
    fadeOut()
  }

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="/tiktok-audio.mp3" preload="auto" loop />
      
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
