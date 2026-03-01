import { useEffect, useRef, useState } from 'react'

const Support = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="disclaimer" className="py-20 md:py-24" style={{ backgroundColor: '#000000' }}>
      <div className="terminal-container">
        <div 
          className="text-center mb-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(15px)' }}
        >
          <p className="label mb-3">Important Notice</p>
          <h2 className="text-2xl sm:text-3xl font-medium mb-3">Disclaimer & IP Notice</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Please read this important information before proceeding.
          </p>
        </div>

        <div 
          className="max-w-2xl mx-auto space-y-4 transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <div className="p-6 border" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start gap-4">
              <div className="p-2 border flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-2">Fan-Created Work</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  This project is a fan-created work and is not affiliated with, endorsed by, or sponsored by 
                  Paramount Global or Nickelodeon. The character "Mr. Krabs," including his name, voice, and 
                  likeness, are the exclusive intellectual property of Paramount.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start gap-4">
              <div className="p-2 border flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-2">Fair Use Assertion</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  A fair-use allowance is asserted for transformative, parody, or educational purposes under 
                  applicable copyright law. This token is intended as a satirical commentary on AI agent 
                  memes and IP rights in the entertainment industry.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start gap-4">
              <div className="p-2 border flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-2">Royalty Allocation</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  A portion of revenue (25% of trading fees) is automatically allocated via Solana program to a 
                  designated claimable wallet, accessible only by authorized representatives of Paramount Global 
                  or Nickelodeon upon verification. Full details and wallet address available upon request.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="mt-10 transition-all duration-700 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <p className="text-xs text-center mb-4" style={{ color: 'var(--color-text-muted)' }}>Join Our Community</p>
          <div className="flex justify-center gap-3">
            <a href="https://x.com/i/communities/2027349547975057746" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border text-xs transition-all hover:bg-white hover:text-black" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              X Community
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Support
