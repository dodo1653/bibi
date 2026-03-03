import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import Story from './components/Story'
import Token from './components/Token'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Story />
      <Token />
      <Footer />
    </div>
  )
}

export default App
