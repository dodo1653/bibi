const Token = () => {
  return (
    <section id="token" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-amber-900/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-red-900/20 to-transparent" />
      </div>
      
      <div className="terminal-container relative">
        <div className="text-center mb-10">
          <p className="label mb-3">Token</p>
          <h2 className="text-2xl sm:text-3xl font-medium">$BIBI</h2>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="p-5 border mb-6 flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-3">
              <div className="p-2 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-text-muted)' }}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-7.5v-5l4.5 2.5-4.5 2.5z"/></svg>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--color-text-muted)' }}>Contract Address</p>
                <p className="text-xs font-mono truncate max-w-[200px]" style={{ color: 'var(--color-text-secondary)' }}>3bnBAdWpbNvzhFpZuXYGEjWjfLLKwjLbsF2Av7MjuLib</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-8">
            <div className="p-4 border text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <svg className="w-5 h-5 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Network</p>
              <p className="text-sm">Solana</p>
            </div>
            <div className="p-4 border text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <svg className="w-5 h-5 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Type</p>
              <p className="text-sm">SPL</p>
            </div>
            <div className="p-4 border text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <svg className="w-5 h-5 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Status</p>
              <p className="text-sm" style={{ color: '#22c55e' }}>Live</p>
            </div>
            <div className="p-4 border text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <svg className="w-5 h-5 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Royalty</p>
              <p className="text-sm">25%</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <a href="https://pump.fun/coin/3bnBAdWpbNvzhFpZuXYGEjWjfLLKwjLbsF2Av7MjuLib" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border text-xs transition-all hover:bg-white hover:text-black" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-7.5v-5l4.5 2.5-4.5 2.5z"/></svg>
              Pump.fun
            </a>
            <a href="https://dexscreener.com/solana/3bnBAdWpbNvzhFpZuXYGEjWjfLLKwjLbsF2Av7MjuLib" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border text-xs transition-all hover:bg-white hover:text-black" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
              Chart
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Token
