import { useEffect, useRef, useState } from 'react'

const Art = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef(null)

  const cardPositions = [
    { left: '5%', top: '22%', rotate: '-3deg' },
    { left: '28%', top: '18%', rotate: '2deg' },
    { left: '51%', top: '22%', rotate: '-1deg' },
    { left: '74%', top: '18%', rotate: '3deg' },
    { left: '17%', top: '52%', rotate: '-2deg' },
    { left: '40%', top: '48%', rotate: '1deg' },
    { left: '63%', top: '52%', rotate: '-2deg' },
  ]

  const tweets = [
    { id: '2032192656491610471', username: 'PathOfMen_' },
    { id: '2028623010156937727', username: 'Clique_MGMT' },
    { id: '2025055485481943244', username: 'lyn49556' },
    { id: '2031465173085728892', username: 'a24bitch' },
    { id: '2031396620231913629', username: 'Tangem' },
    { id: '2027921401420681253', username: 'owroot' },
    { id: '2019822694716633464', username: 'NickJFuentes' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (audioRef.current) {
            audioRef.current.volume = 0
            audioRef.current.play().catch(() => {})
            audioRef.current.volume = 1
          }
          observer.disconnect()
        } else {
          if (audioRef.current) {
            const fadeOut = () => {
              if (audioRef.current && audioRef.current.volume > 0) {
                audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1)
                setTimeout(fadeOut, 100)
              } else if (audioRef.current) {
                audioRef.current.pause()
              }
            }
            fadeOut()
          }
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visible && window.twttr) {
      const checkTweetsLoaded = setInterval(() => {
        let allLoaded = true
        tweets.forEach((tweet, i) => {
          const container = document.getElementById(`tweet-${i}`)
          if (container && container.querySelector('iframe')) {
            container.style.opacity = '1'
            const loading = container.parentElement?.querySelector('.tweet-loading')
            if (loading) {
              loading.style.opacity = '0'
              setTimeout(() => loading.style.display = 'none', 600)
            }
          } else if (!container?.innerHTML) {
            allLoaded = false
            window.twttr.widgets.createTweet(tweet.id, container, {
              theme: 'dark',
              width: 280,
              align: 'center'
            })
          }
        })
        if (allLoaded) clearInterval(checkTweetsLoaded)
      }, 500)
      return () => clearInterval(checkTweetsLoaded)
    }
  }, [visible])

  return (
    <section 
      ref={sectionRef} 
      id="art" 
      className="py-24 relative overflow-hidden min-h-[1400px]"
      style={{ backgroundColor: '#050505' }}
    >
      <audio 
        ref={audioRef} 
        src="/realm-audio.mp3" 
        preload="auto" 
        loop
      />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(ellipse at 70% 80%, rgba(13, 148, 136, 0.1) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4" style={{ paddingTop: '5rem' }}>
        <div 
          className="transition-all duration-1000"
          style={{ 
            opacity: visible ? 1 : 0, 
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            marginBottom: '2rem'
          }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="max-w-full max-h-[480px] rounded-2xl"
            style={{
              boxShadow: '0 0 100px rgba(20, 184, 166, 0.4), 0 0 200px rgba(20, 184, 166, 0.15)',
            }}
          >
            <source src="/bannervid2.mp4" type="video/mp4" />
          </video>
          <div style={{ height: '1.5rem' }} />
        </div>

        <div 
          className="relative"
          style={{ height: '650px', width: '100%', maxWidth: '1100px' }}
        >
          <div 
            className="absolute inset-0 flex items-start justify-center pt-12"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 1.5s ease',
              transitionDelay: '0.3s'
            }}
          >
            <p 
              className="text-sm tracking-[0.3em] uppercase"
              style={{ 
                color: 'rgba(20, 184, 166, 0.6)',
                fontFamily: 'Space Mono, monospace',
              }}
            >
              Viral everywhere
            </p>
          </div>

          {tweets.map((tweet, index) => {
            const pos = cardPositions[index]
            return (
              <div
                key={tweet.id}
                className="absolute transition-all duration-1000"
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: `rotate(${pos.rotate})`,
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${0.1 + index * 0.1}s`,
                  zIndex: index,
                }}
              >
                <div 
                  className="rounded-2xl overflow-hidden relative"
                  style={{ 
                    background: 'rgba(10, 10, 10, 0.85)',
                    border: '1px solid rgba(20, 184, 166, 0.15)',
                    width: '280px',
                    minHeight: '150px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(20,184,166,0.1)',
                  }}
                >
                  <div 
                    className="tweet-loading absolute inset-0 flex items-center justify-center"
                    style={{
                      background: 'rgba(10, 10, 10, 0.9)',
                      transition: 'opacity 0.6s ease',
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border-2 border-teal-500/30 border-t-teal-500 animate-spin mb-2" />
                    </div>
                  </div>
                  <div 
                    id={`tweet-${index}`}
                    className="tweet-container"
                    style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .tweet-container iframe {
          pointer-events: none !important;
        }
        .tweet-container {
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default Art
