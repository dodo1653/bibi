import { useEffect, useRef, useState } from 'react'
import img2 from '../assets/Gemini_Generated_Image_5f89d45f89d45f89.png'
import img3 from '../assets/Gemini_Generated_Image_oe8g97oe8g97oe8g.png'
import img4 from '../assets/Gemini_Generated_Image_4yfy7b4yfy7b4yfy.png'
import img5 from '../assets/Gemini_Generated_Image_k037skk037skk037.png'
import img6 from '../assets/Gemini_Generated_Image_x68yb7x68yb7x68y.png'

const Story = () => {
  const [visible, setVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const images = [img2, img3, img4, img5, img6]
  const duplicatedImages = [...images, ...images, ...images, ...images, ...images]

  return (
    <section ref={ref} id="story" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-red-900/30 to-transparent" />
      </div>

      <div className="terminal-container relative">
        <div 
          className="text-center mb-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(15px)' }}
        >
          <p className="label mb-3">The Vision</p>
          <h2 className="text-2xl sm:text-3xl font-medium">The First AI Agent Meme</h2>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            MrKrabs is a Moltspaces AI agent which speaks in the voice of Mr Krabs from SpongeBob SquarePants.
            The first AI Agent Meme to speak like a popular TV character, establishing the foundation for
            permissionless royalty accrual for top voices in the entertainment business.
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            This project represents a new paradigm in AI agent memes—combining viral entertainment with
            innovative tokenomics that pave the way for rightful compensation to IP holders.
          </p>
          <p className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
            25% of all trading fees are automatically allocated via Solana program to a designated
            claimable wallet for authorized representatives of Paramount Global or Nickelodeon.
          </p>
        </div>

        <div 
          className="text-center mb-12 transition-all duration-700 delay-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="label mb-3">The Aesthetic</p>
          <h3 className="text-xl sm:text-2xl font-medium mb-6">What Is This Project?</h3>
        </div>

        <div 
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4 transition-all duration-700 delay-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <div className="p-5 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg border flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-1">AI Companion</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  An intelligent AI agent that engages in witty, character-authentic conversations
                  reminiscent of the beloved crustacean from Bikini Bottom.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg border flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-1">Meme Token</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  A community-driven token on Solana that brings the iconic character to the
                  world of AI agents and crypto culture.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg border flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-1">Fair Use</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Operating under fair use for transformative parody purposes, this project
                  explores the intersection of entertainment and innovation.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg border flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-1">Royalty Model</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Pioneering a new standard where IP holders receive automatic royalties
                  through on-chain mechanisms—a blueprint for the industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="mt-24 transition-all duration-700 delay-400"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="text-center label mb-8">AI Showcase</p>
          <div className="relative overflow-hidden py-4">
            <div className="flex gap-4 animate-marquee">
              {duplicatedImages.map((img, i) => (
                <div 
                  key={i}
                  className={`flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group relative ${selectedImage === img ? 'scale-110 z-20' : 'hover:scale-105 hover:z-10'}`}
                  onClick={() => setSelectedImage(selectedImage === img ? null : img)}
                >
                  <img 
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-300 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
