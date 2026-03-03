import heroBg from '../assets/favicon.png'

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover object-center" style={{ filter: 'grayscale(80%) brightness(0.15) contrast(1.2)' }} />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/90 via-[#050510]/60 to-[#050510]" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050510]/50" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-30 pointer-events-none" />

      <div className="relative z-10 text-center px-6 w-full max-w-2xl pt-20">
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl font-medium mb-6 tracking-tight"
          style={{ 
            background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 30%, #00d4ff 70%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(0, 150, 255, 0.5))',
          }}
        >
          $BIBI
        </h1>

        <p className="text-base sm:text-lg mb-10 max-w-md mx-auto" style={{ color: 'rgba(0, 200, 255, 0.7)' }}>
          The first AI agent that talks like Netanyahu. Unapologetic. Unfiltered. Speaking truth to power.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a 
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium transition-all duration-300 hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #0080ff 0%, #00d4ff 100%)', 
              color: '#fff',
              boxShadow: '0 4px 20px rgba(0, 150, 255, 0.3)',
            }}
          >
            Buy Token
          </a>
          <a 
            href="#"
            className="inline-flex items-center gap-2 px-5 py-3 border text-xs font-medium transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: 'rgba(0, 200, 255, 0.3)' }}
          >
            Chart
          </a>
          <a 
            href="#"
            className="inline-flex items-center gap-2 px-5 py-3 border text-xs font-medium transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: 'rgba(0, 200, 255, 0.3)' }}
          >
            Community
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#story" className="flex flex-col items-center gap-1" style={{ color: 'rgba(0, 200, 255, 0.4)' }}>
          <span className="text-xs">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/></svg>
        </a>
      </div>
    </section>
  )
}

export default Hero
