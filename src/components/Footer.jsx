const Footer = () => {
  return (
    <footer className="py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="terminal-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">$CORTISOL</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Built on Solana</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://pump.fun/coin/9AyLH5Puifc7v9MkTgA36JabS4wiVTEZ3aEPeNoTpump"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-[#14b8a6]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Pump.fun
            </a>
            <a 
              href="https://dexscreener.com/solana/9AyLH5Puifc7v9MkTgA36JabS4wiVTEZ3aEPeNoTpump"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-[#14b8a6]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              DexScreener
            </a>
          </div>
        </div>
        
        <div className="divider my-6" />
        
        <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          DYOR. Not financial advice.
        </p>
      </div>
    </footer>
  )
}

export default Footer
