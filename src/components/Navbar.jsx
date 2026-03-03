import { useEffect, useState } from 'react'

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#story' },
    { label: 'Token', href: '#token' },
  ]

  return (
    <nav 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      style={{ 
        opacity: visible ? 1 : 0,
      }}
    >
      <div 
        className="flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-xl"
        style={{ 
          backgroundColor: 'rgba(5, 5, 16, 0.8)', 
        }}
      >
        <a 
          href="#hero" 
          className="px-4 py-1.5 text-sm font-semibold tracking-wide rounded-full transition-all duration-300"
          style={{ 
            background: 'linear-gradient(135deg, #00d4ff, #0080ff)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}
        >
          $BIBI
        </a>
        
        <div className="w-px h-4 mx-1" style={{ backgroundColor: 'rgba(0, 200, 255, 0.1)' }} />
        
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="px-4 py-1.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300 hover:text-cyan-400"
            style={{ color: 'rgba(0, 200, 255, 0.6)' }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
