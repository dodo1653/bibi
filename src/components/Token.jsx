import { useEffect, useRef, useState } from 'react'

const Token = () => {
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
    <section ref={ref} id="token" className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-terminal-surface)' }}>
      <div className="terminal-container">
        <div 
          className="transition-all duration-700 ease-out mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <p className="label">// 02 — Token Info</p>
        </div>

        <div className="max-w-2xl">
          <div 
            className="transition-all duration-700 ease-out delay-100"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-medium mb-8">$BIBI</h2>
          </div>

          <div 
            className="transition-all duration-700 ease-out delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
          >
            <div className="mb-4">
              <p className="label mb-2">Contract Address</p>
              <div className="flex items-center gap-4">
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Coming Soon</p>
              </div>
            </div>
          </div>

          <div 
            className="divider my-6 transition-all duration-700 ease-out delay-200"
            style={{ opacity: visible ? 1 : 0 }}
          />

          <div 
            className="transition-all duration-700 ease-out delay-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="label mb-1">Network</p>
                <p className="text-sm">Solana</p>
              </div>
              <div>
                <p className="label mb-1">Type</p>
                <p className="text-sm">SPL Token</p>
              </div>
              <div>
                <p className="label mb-1">Status</p>
                <p className="text-sm">Coming Soon</p>
              </div>
              <div>
                <p className="label mb-1">Purpose</p>
                <p className="text-sm">Awareness</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Token