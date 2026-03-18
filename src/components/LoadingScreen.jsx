import { motion } from 'framer-motion'

const LoadingScreen = ({ progress }) => {
  // Needle rotation calculation (from -90deg to +90deg)
  const rotation = (progress / 100) * 180 - 90
  
  // High-frequency jitter for "High Cortisol" feel
  const jitter = progress > 80 ? (progress - 80) / 20 : 0

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: 'blur(40px)',
        scale: 1.05,
        transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
      }}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Iconic Minimalist Cortisol Gauge */}
        <div className="relative w-64 h-32 flex items-end justify-center">
          <svg className="absolute bottom-0 w-full overflow-visible" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="1" />
              </linearGradient>
            </defs>
            
            {/* Main Track */}
            <path
              d="M20,100 A80,80 0 0,1 180,100"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Active Progress Line (Thin & Sharp) */}
            <motion.path
              d="M20,100 A80,80 0 0,1 180,100"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="251.32"
              animate={{ 
                strokeDashoffset: 251.32 - (progress / 100) * 251.32 
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 50 }}
            />

            {/* Scale Markers (Minimal) */}
            {[0, 25, 50, 75, 100].map((mark) => {
              const ang = (mark / 100) * 180 - 180
              const x1 = 100 + Math.cos((ang * Math.PI) / 180) * 85
              const y1 = 100 + Math.sin((ang * Math.PI) / 180) * 85
              const x2 = 100 + Math.cos((ang * Math.PI) / 180) * 92
              const y2 = 100 + Math.sin((ang * Math.PI) / 180) * 92
              return (
                <line
                  key={mark}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              )
            })}
          </svg>

          {/* Precision Sharp Needle */}
          <motion.div
            className="absolute bottom-[-2px] w-[1px] h-32 bg-white origin-bottom z-20"
            style={{ 
              boxShadow: '0 0 10px rgba(255,255,255,0.3)'
            }}
            animate={{ 
              rotate: rotation,
              x: [0, -jitter, jitter, 0],
            }}
            transition={{ 
              rotate: { type: 'spring', damping: 20, stiffness: 40 },
              x: { duration: 0.05, repeat: Infinity }
            }}
          >
            {/* Sharp Tip */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] bg-white rounded-full" />
          </motion.div>

          {/* Pivot Base (Tiny & Sharp) */}
          <div className="absolute bottom-[-4px] w-3 h-3 bg-[#050505] border border-white/20 rounded-full z-30" />
        </div>

        {/* Ambient Underglow (Very Subtle) */}
        <motion.div 
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/5 blur-[80px] -z-10 rounded-full" 
        />
      </div>

      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </motion.div>
  )
}

export default LoadingScreen
