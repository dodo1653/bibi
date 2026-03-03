import { useEffect, useRef, useState } from 'react'

const Community = () => {
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

  const pillars = [
    { title: "Unity", desc: "Individuals from every corner of the world, united by belief in human dignity." },
    { title: "Awareness", desc: "Every holder becomes a beacon of attention, spreading the message." },
    { title: "Solidarity", desc: "Together, an unbroken chain of support that cannot be ignored." },
    { title: "Remembrance", desc: "On the blockchain, nothing is forgotten. Every transaction preserves memory." }
  ]

  return (
    <section ref={ref} id="community" className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-terminal-surface)' }}>
      <div className="terminal-container">
        <div 
          className="transition-all duration-700 ease-out mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(15px)' }}
        >
          <p className="label">// 04 — Community</p>
        </div>

        <div 
          className="mb-16 transition-all duration-700 ease-out delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
        >
          <h2 className="text-2xl sm:text-3xl font-medium mb-4">Together, We Remember</h2>
          <p className="max-w-lg mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            This is not about hype. Not about speculation. This is about people—real people—and 
            the belief that standing together creates something that cannot be ignored.
          </p>
          <a 
            href="https://x.com/i/communities/2028186557698752563"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs transition-colors hover:text-white"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Join our X Community →</span>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={pillar.title}
              className="transition-all duration-700 ease-out"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? 'translateY(15px)' : 'translateY(15px)',
                transitionDelay: `${200 + index * 80}ms`
              }}
            >
              <p className="label mb-2">{pillar.title}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div 
          className="divider my-12 transition-all duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '500ms' }}
        />

        <div 
          className="text-center transition-all duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)', transitionDelay: '600ms' }}
        >
          <p className="text-sm">One community. One purpose. One $BIBI.</p>
        </div>
      </div>
    </section>
  )
}

export default Community