import { useEffect, useRef, useState } from 'react'

const Art = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

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
          setTimeout(() => setFadeIn(true), 100)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visible) {
      const loadTweets = async () => {
        if (!window.twttr) {
          const script = document.createElement('script')
          script.src = 'https://platform.twitter.com/widgets.js'
          script.async = true
          document.body.appendChild(script)
          await new Promise(resolve => {
            script.onload = resolve
          })
        }

        for (let i = 0; i < tweets.length; i++) {
          const container = document.getElementById(`tweet-${i}`)
          if (container && !container.innerHTML) {
            try {
              await window.twttr.widgets.createTweet(
                tweets[i].id,
                container,
                {
                  theme: 'dark',
                  width: 280,
                  align: 'center'
                }
              )
            } catch (e) {
              console.error('Failed to load tweet', tweets[i].id, e)
            }
          }
        }
      }
      loadTweets()
    }
  }, [visible])

  const getRandomPosition = (index) => {
    const positions = [
      { left: '5%', top: '10%', scale: 0.4 },
      { left: '75%', top: '5%', scale: 0.35 },
      { left: '15%', top: '60%', scale: 0.3 },
      { left: '70%', top: '55%', scale: 0.38 },
      { left: '40%', top: '25%', scale: 0.32 },
      { left: '25%', top: '80%', scale: 0.28 },
      { left: '80%', top: '85%', scale: 0.33 },
    ]
    return positions[index % positions.length]
  }

  return (
    <section 
      ref={sectionRef} 
      id="art" 
      className="py-20 relative overflow-hidden min-h-[600px]"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(20, 184, 166, 0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-[600px]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="max-w-full max-h-[500px] rounded-xl"
          style={{
            boxShadow: '0 0 60px rgba(20, 184, 166, 0.3)',
          }}
        >
          <source src="/bannervid2.mp4" type="video/mp4" />
        </video>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 1.5s ease' }}
      >
        {tweets.map((tweet, index) => {
          const pos = getRandomPosition(index)
          return (
            <div
              key={tweet.id}
              className="absolute transition-all duration-1000"
              style={{
                left: pos.left,
                top: pos.top,
                transform: `scale(${pos.scale})`,
                opacity: 0.15,
                animation: `float${index} ${15 + (index * 2)}s ease-in-out infinite`,
              }}
            >
              <div 
                className="rounded-xl overflow-hidden"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                  width: '280px',
                }}
              >
                <div id={`tweet-${index}`} />
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: scale(0.4) translateY(0px); }
          50% { transform: scale(0.4) translateY(-20px); }
        }
        @keyframes float1 {
          0%, 100% { transform: scale(0.35) translateY(0px); }
          50% { transform: scale(0.35) translateY(15px); }
        }
        @keyframes float2 {
          0%, 100% { transform: scale(0.3) translateY(0px); }
          50% { transform: scale(0.3) translateY(-25px); }
        }
        @keyframes float3 {
          0%, 100% { transform: scale(0.38) translateY(0px); }
          50% { transform: scale(0.38) translateY(18px); }
        }
        @keyframes float4 {
          0%, 100% { transform: scale(0.32) translateY(0px); }
          50% { transform: scale(0.32) translateY(-15px); }
        }
        @keyframes float5 {
          0%, 100% { transform: scale(0.28) translateY(0px); }
          50% { transform: scale(0.28) translateY(22px); }
        }
        @keyframes float6 {
          0%, 100% { transform: scale(0.33) translateY(0px); }
          50% { transform: scale(0.33) translateY(-18px); }
        }
      `}</style>
    </section>
  )
}

export default Art
