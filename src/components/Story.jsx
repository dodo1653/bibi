import { useEffect, useRef, useState } from 'react'
import storyImage from '../assets/HBw_X0WbYAAGbq3.jpg'

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
    <section ref={ref} id="story" className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="terminal-container">
        <div 
          className="transition-all duration-700 ease-out mb-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(15px)' }}
        >
          <p className="label">// 01 — The Story</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div 
            className="transition-all duration-700 ease-out delay-100"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
          >
            <img
              src={storyImage}
              alt=""
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: 'grayscale(60%) brightness(0.8)' }}
            />
          </div>

          <div className="space-y-6">
            <div 
              className="transition-all duration-700 ease-out delay-200"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
            >
              <h2 className="text-xl sm:text-2xl font-medium mb-5">
                Who is Jawad?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Jawad is not just a name. It's a symbol of every child who wakes to uncertainty 
                instead of peace. Every family displaced, every voice drowned out by the noise of 
                the world.
              </p>
            </div>

            <div 
              className="transition-all duration-700 ease-out delay-300"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
            >
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Behind every statistic is a human being. Behind every headline, a story. 
                Behind every number, a name. Jawad represents them all—the ones we scroll past, 
                the ones we sometimes forget to remember.
              </p>
            </div>

            <div 
              className="transition-all duration-700 ease-out delay-400"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(15px)' : 'translateY(15px)' }}
            >
              <p className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
                This is about presence, not politics. Humanity, not headlines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story