import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'

const Studio = () => {
  const [step, setStep] = useState(1)
  const [image, setImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  
  // Customization State
  const [gaugeOpacity, setGaugeOpacity] = useState(0.8)
  const [gaugeSize, setGaugeSize] = useState(150)
  const [gaugePos, setGaugePos] = useState({ x: 50, y: 50 })
  const [isExporting, setIsExporting] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target.result)
        setStep(2)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target.result)
        setStep(2)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (step === 2 && image && canvasRef.current) {
      drawCanvas()
    }
  }, [step, image, gaugeOpacity, gaugeSize, gaugePos])

  const drawCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = image
    img.onload = () => {
      const maxWidth = 800
      const scale = maxWidth / img.width
      canvas.width = maxWidth
      canvas.height = img.height * scale
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      const gaugeX = (gaugePos.x / 100) * canvas.width
      const gaugeY = (gaugePos.y / 100) * canvas.height
      
      ctx.save()
      ctx.globalAlpha = gaugeOpacity
      ctx.translate(gaugeX, gaugeY)
      
      ctx.beginPath()
      ctx.arc(0, 0, gaugeSize / 2, Math.PI, 0)
      ctx.strokeStyle = '#14b8a6'
      ctx.lineWidth = 8
      ctx.stroke()
      
      ctx.rotate(-Math.PI / 4)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -gaugeSize / 2 + 10)
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.restore()
      
      ctx.font = '10px "Space Mono"'
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.fillText('CORTISOL_PROTOCOL_STUDIO_V1', 20, canvas.height - 20)
    }
  }

  const exportImage = () => {
    setIsExporting(true)
    setTimeout(() => {
      const link = document.createElement('a')
      link.download = 'cortisol-branded-asset.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
      setIsExporting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-['Space_Mono']">
      <Navbar />
      
      <main className="flex-1 flex flex-col md:flex-row pt-24 px-6 pb-12 gap-8 max-w-7xl mx-auto w-full">
        
        <div className="w-full md:w-80 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-8">Workspace</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-500/60">Step {step} of 3</span>
                <h3 className="text-xl font-bold tracking-tight">
                  {step === 1 ? 'Intake Asset' : step === 2 ? 'Brand Configuration' : 'Ready for Export'}
                </h3>
              </div>

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] uppercase tracking-widest text-white/30">Gauge Size</label>
                      <span className="text-[9px] font-mono text-teal-500">{gaugeSize}px</span>
                    </div>
                    <input 
                      type="range" min="50" max="300" value={gaugeSize}
                      onChange={(e) => setGaugeSize(parseInt(e.target.value))}
                      className="w-full accent-teal-500 bg-white/5 h-1 rounded-full appearance-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 block">Opacity</label>
                    <input 
                      type="range" min="0" max="1" step="0.1" value={gaugeOpacity}
                      onChange={(e) => setGaugeOpacity(parseFloat(e.target.value))}
                      className="w-full accent-teal-500 bg-white/5 h-1 rounded-full appearance-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <button 
                      onClick={() => setStep(3)}
                      className="w-full py-4 rounded-xl bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-teal-500 transition-all duration-500"
                    >
                      Process Asset
                    </button>
                    <button 
                      onClick={() => {setStep(1); setImage(null)}}
                      className="w-full py-4 rounded-xl bg-white/5 text-white/40 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <button 
                    onClick={exportImage}
                    disabled={isExporting}
                    className="w-full py-4 rounded-xl bg-teal-500 text-black font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(20,184,166,0.3)]"
                  >
                    {isExporting ? 'Generating...' : 'Download PNG'}
                  </button>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-4 rounded-xl bg-white/5 text-white/40 font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
                  >
                    Back to Edit
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-teal-500/[0.02] border border-teal-500/10 hidden md:block">
            <p className="text-[9px] leading-relaxed text-white/20 uppercase tracking-widest font-mono">
              Privacy Notice: All assets are processed locally. No data is transmitted to servers.
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-h-[500px]">
          <div 
            className={`flex-1 rounded-[32px] border border-dashed transition-all duration-500 flex items-center justify-center overflow-hidden relative ${
              step === 1 && isDragging ? 'border-teal-500 bg-teal-500/5' : 'border-white/10 bg-white/[0.01]'
            }`}
            onDragOver={(e) => {e.preventDefault(); setIsDragging(true)}}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10" onClick={() => fileInputRef.current.click()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-bold tracking-widest uppercase">Drop your asset</p>
                    <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">Supports PNG, JPG, WEBP</p>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="px-8 py-3 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Select File
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div key="canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative group cursor-crosshair">
                  <canvas 
                    ref={canvasRef} 
                    className="max-w-full rounded-xl shadow-2xl"
                    onMouseMove={(e) => {
                      if (e.buttons === 1) {
                        const rect = canvasRef.current.getBoundingClientRect()
                        setGaugePos({
                          x: ((e.clientX - rect.left) / rect.width) * 100,
                          y: ((e.clientY - rect.top) / rect.height) * 100
                        })
                      }
                    }}
                  />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[8px] uppercase tracking-[0.3em] font-bold text-white/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    Click and drag to position branding
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between items-center px-4">
            <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">Studio Instance // Active</span>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center border-t border-white/5 mt-auto">
        <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
          Studio V1.0 // Aesthetic Distribution Module
        </p>
      </footer>
    </div>
  )
}

export default Studio
