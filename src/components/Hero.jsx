import heroBg from '../assets/Gemini_Generated_Image_ovf6v4ovf6v4ovf6.png'

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/50 to-[#050505]" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050505]/50" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/8 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSIvPgo8L3N2Zz4=')] opacity-30 pointer-events-none" />

      <div className="relative z-10 text-center px-6 w-full max-w-2xl pt-20">
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl font-medium mb-6 tracking-tight animate-fade-in-up"
          style={{ 
            background: 'linear-gradient(135deg, #fefefe 0%, #fbbf24 30%, #d97706 70%, #fefefe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(217, 119, 6, 0.4))',
          }}
        >
          $BIBI
        </h1>

        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(251, 191, 36, 0.7)' }}>
            Created by
          </span>
          <a 
            href="https://eve.army/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:text-amber-300 hover:scale-110"
            style={{ color: 'rgba(251, 191, 36, 1)', textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
          >
            eve.army
          </a>
        </div>

        <p className="text-base sm:text-lg mb-10 max-w-md mx-auto animate-fade-in" style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.2s' }}>
          The first AI Agent Meme to speak like a popular TV character.
        </p>

        <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a 
            href="https://pump.fun/coin/3bnBAdWpbNvzhFpZuXYGEjWjfLLKwjLbsF2Av7MjuLib" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 px-6 py-3 text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(251,191,36,0.6)]"
            style={{ 
              background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', 
              color: '#000',
              boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)',
            }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">🎯</span>
            Buy Token
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-7.5v-5l4.5 2.5-4.5 2.5z"/></svg>
          </a>
          <a 
            href="https://dexscreener.com/solana/3bnBAdWpbNvzhFpZuXYGEjWjfLLKwjLbsF2Av7MjuLib" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 px-5 py-3 border text-xs font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:scale-105 hover:shadow-lg"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
            Chart
          </a>
          <a 
            href="https://x.com/i/communities/2027349547975057746" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 px-5 py-3 border text-xs font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:scale-105 hover:shadow-lg"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Community
          </a>
          <a 
            href="https://discord.gg/NqnAVUVz" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 px-5 py-3 border text-xs font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:scale-105 hover:shadow-lg"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            Discord
          </a>
          <a 
            href="#disclaimer" 
            className="group inline-flex items-center gap-2 px-5 py-3 border text-xs font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:scale-105 hover:shadow-lg"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
            Disclaimer
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#story" className="group flex flex-col items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span className="text-xs transition-colors duration-300 group-hover:text-white">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/></svg>
        </a>
      </div>
    </section>
  )
}

export default Hero
