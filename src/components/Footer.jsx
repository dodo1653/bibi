const Footer = () => {
  const CA = "Coming Soon"

  return (
    <footer className="py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="terminal-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-medium mb-1">$BIBI</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>A symbol of remembrance</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href={`https://pump.fun/coin/${CA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Pump.fun
            </a>
            <a 
              href={`https://dexscreener.com/solana/${CA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--color-text-muted)' }}
            >
              DexScreener
            </a>
            <a 
              href={`https://solscan.io/token/${CA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Solscan
            </a>
          </div>
        </div>
        
        <div className="divider my-6" />
        
        <p className="text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Not financial advice. DYOR.
        </p>
      </div>
    </footer>
  )
}

export default Footer