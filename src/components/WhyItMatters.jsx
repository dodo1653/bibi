import { useEffect, useRef, useState } from 'react'

const WhyItMatters = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const lines = [
    "Children don't choose where they're born.",
    "Borders are drawn by adults. Innocence has none.",
    "The sound of a child crying is the same in every language.",
    "History will ask what we did. What will you say?",
    "Empathy costs nothing. Indifference costs everything."
  ]

  return (
    <section ref={ref} id="why" className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="terminal-container">
        <div 
          className="transition-all duration-700 ease-out mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <p className="label">// 03 — Why It Matters</p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          {lines.map((line, index) => (
            <p 
              key={index}
              className="text-lg sm:text-xl mb-6 transition-all duration-700 ease-out"
              style={{ 
                color: 'var(--color-text-secondary)',
                opacity: visible ? 1 : 0, 
                transform: visible ? 'translateY(10px)' : 'translateY(10px)',
                transitionDelay: `${150 + index * 80}ms`
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div 
          className="divider my-12 transition-all duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '600ms' }}
        />

        <div 
          className="max-w-2xl mx-auto transition-all duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)', transitionDelay: '700ms' }}
        >
          <h3 className="text-lg font-medium mb-6">A Confrontation</h3>
          <div className="space-y-5" style={{ color: 'var(--color-text-secondary)' }}>
            <p>
              Right now, there are children who don't know if they'll see tomorrow. 
              Families gathered in the dark, waiting for sounds that signal danger. 
              Parents holding their children tight—not just out of love, but out of fear.
            </p>
            <p>
              We scroll past headlines. We change channels. We tell ourselves it's too much to bear. 
              But for them, there is no scrolling away. This is their reality. Every single day.
            </p>
            <p className="text-white">
              $BIBI isn't asking for your sympathy. It's asking for your acknowledgment—that 
              these lives exist. That they matter. That we see them, even when the world looks away.
            </p>
          </div>
        </div>

        <div 
          className="text-center mt-12 transition-all duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '800ms' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Not a charity. Not a political statement. A human one.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhyItMatters