import { useEffect, useRef, useState } from 'react'

const Token = () => {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  const CA = "9AyLH5Puifc7v9MkTgA36JabS4wiVTEZ3aEPeNoTpump"

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

  const copyCA = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={ref} id="token" className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-terminal-surface)' }}>
      <div className="terminal-container">
        <div 
          className="transition-all duration-700 ease-out mb-10"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="label">// TOKEN</p>
        </div>

        <div className="max-w-xl">
          <div 
            className="transition-all duration-700 ease-out delay-100"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">$CORTISOL</h2>
          </div>

          <div 
            className="transition-all duration-700 ease-out delay-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <div className="p-5 border mb-6" style={{ borderColor: 'rgba(13, 148, 136, 0.2)', backgroundColor: 'rgba(13, 148, 136, 0.05)' }}>
              <p className="label mb-2">Contract Address</p>
              <div className="flex items-center gap-3">
                <p className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>{CA}</p>
                <button 
                  onClick={copyCA}
                  className="text-xs px-2 py-1 transition-colors"
                  style={{ border: '1px solid rgba(13, 148, 136, 0.3)', borderRadius: '2px', color: '#14b8a6' }}
                >
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </div>
          </div>

          <div className="divider my-8" style={{ opacity: visible ? 1 : 0 }} />

          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 ease-out delay-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <div className="p-4 border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="label mb-1">Supply</p>
              <p className="font-medium">1B</p>
            </div>
            <div className="p-4 border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="label mb-1">Network</p>
              <p className="font-medium">Solana</p>
            </div>
            <div className="p-4 border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="label mb-1">Launch</p>
              <p className="font-medium" style={{ color: '#14b8a6' }}>LIVE</p>
            </div>
            <div className="p-4 border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="label mb-1">Tax</p>
              <p className="font-medium">0/0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Token
