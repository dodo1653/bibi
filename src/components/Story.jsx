import { useEffect, useRef, useState } from 'react'

const Story = () => {
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

  return (
    <section ref={ref} id="story" className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="terminal-container">
        <div className="text-center mb-12">
          <p className="label mb-3">The Vision</p>
          <h2 className="text-2xl sm:text-3xl font-medium">The First AI Agent That Talks Like Netanyahu</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Bibi is the first Moltspaces AI agent which speaks in the voice of Benjamin Netanyahu. 
            Unapologetic. Unfiltered. Saying what everyone thinks but won't say out loud.
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Built on Solana. Powered by AI. The next evolution in agent memes.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Story
