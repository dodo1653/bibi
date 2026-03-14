import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [marketCap, setMarketCap] = useState('$0')
  const [isHovering, setIsHovering] = useState(false)

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
    { href: '#about', label: 'About' },
    { href: '#community', label: 'Community' },
  ]

  const handleClick = (e, href) => {
    e.preventDefault()
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-2xl px-5 pt-5">
        <div 
          className="flex items-center justify-between px-5 py-2.5"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
          }}
        >
          <a 
            href="#home" 
            onClick={(e) => handleClick(e, '#home')} 
            className="group relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative h-5 w-24">
              <span 
                className="absolute inset-0 text-sm font-medium block transition-all duration-700"
                style={{ 
                  color: '#fafafa',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.05em',
                  transform: isHovering ? 'translateY(-120%)' : 'translateY(0)',
                  opacity: isHovering ? 0 : 1,
                }}
              >
                CORTISOL
              </span>
              <span 
                className="absolute inset-0 text-sm font-medium block transition-all duration-700"
                style={{ 
                  color: '#14b8a6',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '0.05em',
                  transform: isHovering ? 'translateY(0)' : 'translateY(120%)',
                  opacity: isHovering ? 1 : 0,
                }}
              >
                {marketCap}
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative px-4 py-1.5 text-xs rounded-lg overflow-hidden"
                style={{ 
                  color: activeSection === link.href.slice(1) ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  fontFamily: '"Space Mono", monospace',
                }}
              >
                <span 
                  className="absolute inset-0 rounded-lg transition-all duration-700 ease-out"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    opacity: activeSection === link.href.slice(1) ? 1 : 0,
                  }}
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-1.5 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-4 mt-2 px-4 py-3 md:hidden" style={{ background: 'rgba(10,10,10,0.95)', borderRadius: '12px' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block py-3 text-xs"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Space Mono", monospace' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
