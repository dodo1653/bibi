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
  const [fadeIn, setFadeIn] = useState(false)

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        const fadeInterval = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.5) {
            audioRef.current.volume = Math.min(0.5, audioRef.current.volume + 0.05)
          } else {
            clearInterval(fadeInterval)
            setFadeIn(true)
          }
        }, 100)
      }).catch(() => {})
    }
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0) {
            audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1)
          } else {
            clearInterval(fadeOut)
            audioRef.current.pause()
          }
        }, 100)
        setIsPlaying(false)
      } else {
        audioRef.current.volume = 0
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          const fadeInInterval = setInterval(() => {
            if (audioRef.current && audioRef.current.volume < 0.5) {
              audioRef.current.volume = Math.min(0.5, audioRef.current.volume + 0.1)
            } else {
              clearInterval(fadeInInterval)
            }
          }, 100)
        }).catch(() => {})
      }
    }
  }

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="/realm-audio.mp3" preload="auto" loop />
      
      <button
        onClick={toggleAudio}
        className="fixed z-50 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300"
        style={{
          bottom: '1.5rem',
          right: '1.5rem',
          background: isPlaying ? 'rgba(20, 184, 166, 0.15)' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(20, 184, 166, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <div className="flex gap-[2px] items-end h-4">
              <span className="w-[2px] bg-teal-400 rounded-full animate-equalizer" style={{ height: '40%', animationDelay: '0ms' }} />
              <span className="w-[2px] bg-teal-400 rounded-full animate-equalizer" style={{ height: '70%', animationDelay: '150ms' }} />
              <span className="w-[2px] bg-teal-400 rounded-full animate-equalizer" style={{ height: '50%', animationDelay: '300ms' }} />
              <span className="w-[2px] bg-teal-400 rounded-full animate-equalizer" style={{ height: '80%', animationDelay: '450ms' }} />
            </div>
          ) : (
            <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        <span className="text-xs font-light text-teal-400" style={{ fontFamily: '"Space Mono", monospace' }}>
          {isPlaying ? 'playing' : 'paused'}
        </span>
      </button>

      <CinematicTransition />
      <Navbar />
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
