import { useEffect, useRef, useState } from 'react'

const CTA = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  const CA = "Coming Soon"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="join" className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="terminal-container">
        <div 
          className="transition-all duration-700 ease-out mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(15px)' }}
        >
          <p className="label">// 06 — Join</p>
        </div>

        <div 
          className="max-w-lg transition-all duration-700 ease-out delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <h2 className="text-2xl sm:text-3xl font-medium mb-4">Be Part of the Movement</h2>
          <p className="mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Every holder matters. Every voice counts. Join those who choose to remember.
          </p>
        </div>

        <div 
          className="flex flex-wrap gap-4 mb-12 transition-all duration-700 ease-out delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <a 
            href={`https://pump.fun/coin/${CA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border text-sm transition-all duration-300 hover:bg-white hover:text-black"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Buy $JAWAD
          </a>
          <a 
            href={`https://dexscreener.com/solana/${CA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border text-sm transition-all duration-300 hover:bg-white hover:text-black"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            View Chart
          </a>
          <a 
            href="https://x.com/i/communities/2025543066569056377"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border text-sm transition-all duration-300 hover:bg-white hover:text-black"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            X Community
          </a>
        </div>

        <div 
          className="divider my-8 transition-all duration-700 ease-out delay-300"
          style={{ opacity: visible ? 1 : 0 }}
        />

        <div 
          className="transition-all duration-700 ease-out delay-400"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <p className="label mb-2">Contract Address</p>
          <p className="text-sm font-mono break-all" style={{ color: 'var(--color-text-secondary)' }}>{CA}</p>
        </div>
      </div>
    </section>
  )
}

export default CTA