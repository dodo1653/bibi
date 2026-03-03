const Token = () => {
  return (
    <section id="token" className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-terminal-surface)' }}>
      <div className="terminal-container">
        <div className="text-center mb-10">
          <p className="label mb-3">Token</p>
          <h2 className="text-2xl sm:text-3xl font-medium">$BIBI</h2>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="p-5 border mb-6" style={{ borderColor: 'rgba(0, 200, 255, 0.1)', backgroundColor: 'rgba(0, 200, 255, 0.02)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>Contract Address</p>
            <p className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>Coming Soon</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-4 border text-center" style={{ borderColor: 'rgba(0, 200, 255, 0.1)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Network</p>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>Solana</p>
            </div>
            <div className="p-4 border text-center" style={{ borderColor: 'rgba(0, 200, 255, 0.1)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Type</p>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>SPL</p>
            </div>
            <div className="p-4 border text-center" style={{ borderColor: 'rgba(0, 200, 255, 0.1)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Status</p>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Token
