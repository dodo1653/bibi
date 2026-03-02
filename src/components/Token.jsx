import { useEffect, useRef, useState } from 'react'

const Token = () => {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  const CA = "Coming Soon"

  const copyCA = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <h2 className="text-2xl sm:text-3xl font-medium mb-8">$JAWAD</h2>
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

          <div 
            className="divider my-6 transition-all duration-700 ease-out delay-300"
            style={{ opacity: visible ? 1 : 0 }}
          />

          <div 
            className="flex flex-wrap gap-6 transition-all duration-700 ease-out delay-400"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
          >
            <div className="w-full mb-4">
              <p className="label mb-3">Proof of Aid Transfer</p>
            </div>
            <a 
              href="https://tronscan.org/#/transaction/927f2c2546757018916dc6a2c755cbad9cef0b01706d440fdcde3c2781bec8d3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Transaction 1 →
            </a>
            <a 
              href="https://tronscan.org/#/transaction/3e8d1f3b74dd96b4e557cf57afbfc534575cf69996c4ccc80cd3fab5b9baa9e6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Transaction 2 →
            </a>
            <a 
              href="https://tronscan.org/#/transaction/e041d9461053bfa5c9ed5cd3e32b9a8517d7e6d569751eb5f1ad61bff7b4d46a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Transaction 3 →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Token