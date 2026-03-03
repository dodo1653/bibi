import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['home', 'story', 'token', 'why', 'support', 'community', 'join']
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

  const navLinks = [
    { href: '#story', label: 'Story' },
    { href: '#token', label: 'Token' },
    { href: '#why', label: 'Why' },
    { href: '#support', label: 'Support' },
    { href: '#join', label: 'Join' },
  ]

  const handleClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: 'none',
      }}
    >
      <div className="terminal-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="#home" 
            onClick={(e) => handleClick(e, '#home')}
            className="text-base font-medium tracking-tight transition-all duration-300 hover:opacity-80"
            style={{ color: 'var(--color-text-primary)' }}
          >
            $BIBI
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative px-4 py-2 text-sm transition-all duration-300 group"
                style={{ color: activeSection === link.href.slice(1) ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
              >
                {link.label}
                <span 
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--color-text-primary)',
                    opacity: activeSection === link.href.slice(1) ? 1 : 0,
                    transform: activeSection === link.href.slice(1) ? 'scale(1)' : 'scale(0)'
                  }}
                />
                <span 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                />
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div 
            className="md:hidden py-4 border-t animate-fade-in"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.06)',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block py-3 text-sm transition-colors duration-300"
                style={{ 
                  color: activeSection === link.href.slice(1) ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
