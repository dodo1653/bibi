import { useEffect, useState } from 'react'
import heroImage from '../assets/favicon.png'

const Hero = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'grayscale(80%) brightness(0.25) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-bg/80 via-terminal-bg/60 to-terminal-bg" />
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-3xl">
        <div 
          className="transition-all duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(10px)' }}
        >
          <p className="label mb-10">Solana Network</p>
        </div>

        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-medium mb-6 transition-all duration-700 ease-out delay-100"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(10px)' }}
        >
          $BIBI
        </h1>

        <p 
          className="text-base sm:text-lg mb-16 max-w-md mx-auto transition-all duration-700 ease-out delay-200"
          style={{ color: 'var(--color-text-secondary)', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(10px)' : 'translateY(10px)' }}
        >
          A symbol of remembrance. A voice for the voiceless.
        </p>

        <div 
          className="transition-all duration-700 ease-out delay-300"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <a 
            href="#story"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-white"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span>Scroll</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero