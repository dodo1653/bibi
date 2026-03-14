import { useEffect, useRef, useState } from 'react'

const About = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = (index) => {
    const card = cardsRef.current[index]
    if (card) {
      card.style.transform = 'translateY(-4px)'
      card.style.borderColor = 'rgba(20, 184, 166, 0.35)'
      card.style.backgroundColor = 'rgba(20, 184, 166, 0.06)'
    }
  }

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index]
    if (card) {
      card.style.transform = 'translateY(0)'
      card.style.borderColor = 'rgba(255, 255, 255, 0.08)'
      card.style.backgroundColor = 'rgba(20, 184, 166, 0.03)'
    }
  }

  const points = [
    { title: 'Meme Culture', desc: 'Born from the viral cortisol spike meme. Built for those who understand the vibe.' },
    { title: 'Fair Launch', desc: 'No presale. No team tokens. Community-owned from day one.' },
    { title: 'Utility', desc: 'Dedicated to raising awareness about stress management and mental health.' },
  ]

  return (
    <section ref={ref} id="about" className="py-24 md:py-32">
      <div className="terminal-container">
        <div 
          className="transition-all duration-700 ease-out mb-10"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="label">// ABOUT</p>
        </div>

        <div 
          className="transition-all duration-700 ease-out delay-100 mb-10"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Built Different</h2>
          <p className="max-w-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
            $CORTISOL is more than a meme. It's a movement. 
            Dedicated to the culture, the vibe, and the future of meme coins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {points.map((point, index) => (
            <div 
              key={point.title}
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="p-5 border"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? 'translateY(0)' : `translateY(${15 + index * 10}px)`,
                transitionDelay: `${100 + index * 80}ms`,
                transition: 'transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, opacity 0.6s ease',
                backgroundColor: 'rgba(20, 184, 166, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
              }}
            >
              <h3 className="font-semibold mb-2" style={{ color: '#14b8a6' }}>{point.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
