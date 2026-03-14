import { useEffect, useState } from 'react'

const CortisolMeter = () => {
  const [level, setLevel] = useState(15)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(prev => {
        const target = Math.random() * 60 + 10
        return prev + (target - prev) * 0.1
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-64 md:w-80 h-16 rounded-full overflow-hidden" 
      style={{ 
        background: 'linear-gradient(90deg, #0d9488 0%, #14b8a6 50%, #ef4444 100%)',
        boxShadow: '0 0 30px rgba(13, 148, 136, 0.3)'
      }}>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <span className="text-xs font-bold" style={{ color: 'rgba(0,0,0,0.6)' }}>LOW</span>
        <span className="text-xs font-bold" style={{ color: 'rgba(0,0,0,0.6)' }}>HIGH</span>
      </div>
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-3 h-10 bg-white rounded-full transition-all duration-100"
        style={{ 
          left: `calc(${level}% - 6px)`,
          boxShadow: '0 0 10px rgba(255,255,255,0.8)'
        }}
      />
    </div>
  )
}

const Hero = () => {
  const [loaded, setLoaded] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setLoaded(true)
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(13, 148, 136, 0.08) 0%, transparent 50%),
                          radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.05) 0%, transparent 50%)`
        }} />
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              left: `${p.x}%`,
              bottom: '-20px',
              width: '4px',
              height: '4px',
              backgroundColor: '#0d9488',
              opacity: 0.3,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-3xl">
        <div 
          className="mb-6 transition-all duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <p className="label">ON SOLANA</p>
        </div>

        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 transition-all duration-700 ease-out"
          style={{ 
            opacity: loaded ? 1 : 0, 
            color: '#ffffff',
          }}
        >
          $CORTISOL
        </h1>

        <p 
          className="text-lg mb-8 max-w-md mx-auto transition-all duration-700 ease-out"
          style={{ color: 'rgba(255,255,255,0.6)', opacity: loaded ? 1 : 0 }}
        >
          Stay chill. Don't spike.
        </p>

        <div 
          className="flex justify-center mb-12 transition-all duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <CortisolMeter />
        </div>

        <p 
          className="text-sm mb-10 max-w-lg mx-auto transition-all duration-700 ease-out"
          style={{ color: 'rgba(255,255,255,0.4)', opacity: loaded ? 1 : 0 }}
        >
          The meme token for the unbothered. Low cortisol, high gains.
        </p>

        <div 
          className="flex flex-wrap justify-center gap-4 transition-all duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <a 
            href="https://pump.fun/coin/9AyLH5Puifc7v9MkTgA36JabS4wiVTEZ3aEPeNoTpump"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-medium transition-colors duration-300"
            style={{ 
              background: '#0d9488',
              color: '#000',
              borderRadius: '4px',
            }}
          >
            VIEW TOKEN
          </a>
          <a 
            href="https://x.com/i/communities/2031425806140948572"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-medium transition-colors duration-300 border"
            style={{ 
              borderColor: 'rgba(255,255,255,0.2)',
              borderRadius: '4px',
              color: '#ffffff',
            }}
          >
            JOIN COMMUNITY
          </a>
        </div>

        <div 
          className="mt-16 transition-all duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>↓ SCROLL</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
