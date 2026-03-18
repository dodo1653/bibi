import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ isPlaying, onPlay, onPause }) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [marketCap, setMarketCap] = useState('$0')
  const [isHovering, setIsHovering] = useState(false)
  const [musicHover, setMusicHover] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      const sections = ['home', 'token', 'about', 'community']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchMarketCap = async () => {
      try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/9AyLH5Puifc7v9MkTgA36JabS4wiVTEZ3aEPeNoTpump')
        const data = await response.json()
        if (data?.pairs && data.pairs.length > 0) {
          const mc = data.pairs[0].fdv
          if (mc >= 1000000) {
            setMarketCap('$' + (mc / 1000000).toFixed(2) + 'M')
          } else if (mc >= 1000) {
            setMarketCap('$' + (mc / 1000).toFixed(1) + 'K')
          } else {
            setMarketCap('$' + mc.toFixed(0))
          }
        }
      } catch (e) {
        setMarketCap('$0')
      }
    }
    fetchMarketCap()
    const interval = setInterval(fetchMarketCap, 15000)
    return () => clearInterval(interval)
  }, [])

  const navLinks = [
    { href: '#token', label: 'Token' },
    { href: '/studio', label: 'Studio', external: true },
    { href: '/swap', label: 'Swap', external: true },
    { href: '#community', label: 'Community' },
  ]

  const handleClick = (e, href) => {
    if (href.startsWith('/')) return
    e.preventDefault()
    
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = 1800
      let start = null

      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const progressRatio = Math.min(progress / duration, 1)
        const bounce = Math.sin(progressRatio * Math.PI * 2) * (1 - progressRatio) * 0.15
        const easeOut = 1 - Math.pow(1 - progressRatio, 3)
        
        window.scrollTo(0, startPosition + distance * easeOut + distance * bounce)
        
        if (progress < duration) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
    setMenuOpen(false)
  }

  const handleMusicEnter = () => {
    setMusicHover(true)
    if (!isPlaying) {
      onPlay()
    }
  }

  const handleMusicLeave = () => {
    setMusicHover(false)
    if (isPlaying) {
      onPause()
    }
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-xl px-4 pt-6">
        <div 
          className="flex items-center justify-between px-6 h-12 backdrop-blur-md border border-white/5 shadow-2xl transition-all duration-500"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
          }}
        >
          {/* Left: Logo */}
          <a 
            href="/" 
            onClick={handleLogoClick} 
            className="group relative flex items-center h-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative h-4 w-20 flex items-center">
              <span 
                className="absolute left-0 text-[11px] font-bold transition-all duration-700 uppercase"
                style={{ 
                  color: '#fafafa',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.2em',
                  transform: isHovering ? 'translateY(-100%)' : 'translateY(0)',
                  opacity: isHovering ? 0 : 1,
                }}
              >
                CORTISOL
              </span>
              <span 
                className="absolute left-0 text-[11px] font-bold transition-all duration-700"
                style={{ 
                  color: '#14b8a6',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.1em',
                  transform: isHovering ? 'translateY(0)' : 'translateY(100%)',
                  opacity: isHovering ? 1 : 0,
                }}
              >
                {marketCap}
              </span>
            </div>
          </a>

          {/* Center: Links */}
          <div className="hidden md:flex items-center gap-1 h-full">
            {navLinks.map((link) => {
              const isExternal = link.external
              const content = (
                <div
                  key={link.href}
                  onClick={(e) => !isExternal && handleClick(e, link.href)}
                  className="relative px-3 flex items-center h-8 text-[9px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all duration-300 hover:text-white cursor-pointer"
                  style={{ 
                    color: activeSection === link.href.slice(1) ? '#ffffff' : 'rgba(255,255,255,0.3)',
                    fontFamily: '"Space Mono", monospace',
                  }}
                >
                  <span 
                    className="absolute inset-0 rounded-lg transition-all duration-700 ease-out"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      opacity: activeSection === link.href.slice(1) ? 1 : 0,
                    }}
                  />
                  <span className="relative z-10">{link.label}</span>
                </div>
              )
              
              return isExternal ? (
                <Link key={link.href} to={link.href} className="no-underline flex items-center">
                  {content}
                </Link>
              ) : content
            })}
          </div>

          {/* Right: Vibe Toggle */}
          <div className="flex items-center h-full">
            <div 
              className="relative flex items-center gap-2 px-3 h-8 rounded-full cursor-pointer transition-all duration-500 group"
              onMouseEnter={handleMusicEnter}
              onMouseLeave={handleMusicLeave}
              style={{
                background: isPlaying ? 'rgba(20, 184, 166, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isPlaying ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
              }}
            >
              {isPlaying ? (
                <div className="flex gap-[2px] items-end h-2.5">
                  <span className="w-[1.5px] bg-teal-400 rounded-full" style={{ height: '40%', animation: 'equalizer 0.6s ease-in-out infinite', animationDelay: '0ms' }} />
                  <span className="w-[1.5px] bg-teal-400 rounded-full" style={{ height: '70%', animation: 'equalizer 0.6s ease-in-out infinite', animationDelay: '100ms' }} />
                  <span className="w-[1.5px] bg-teal-400 rounded-full" style={{ height: '50%', animation: 'equalizer 0.6s ease-in-out infinite', animationDelay: '200ms' }} />
                </div>
              ) : (
                <svg 
                  className="w-3 h-3 transition-all duration-300 opacity-30 group-hover:opacity-100" 
                  style={{ color: 'white' }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              )}
              <span 
                className="text-[9px] font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500"
                style={{ 
                  fontFamily: '"Space Mono", monospace',
                  color: isPlaying ? '#2dd4bf' : 'rgba(255,255,255,0.3)',
                  width: musicHover || isPlaying ? '36px' : '0',
                  opacity: musicHover || isPlaying ? 1 : 0,
                }}
              >
                VIBE
              </span>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-4 mt-2 px-4 py-3 md:hidden" style={{ background: 'rgba(10,10,10,0.95)', borderRadius: '12px' }}>
          {navLinks.map((link) => {
            const isExternal = link.external
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => !isExternal && handleClick(e, link.href)}
                className="block py-3 text-xs"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Space Mono", monospace' }}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      )}
    </nav>
  )
}

export default Navbar
