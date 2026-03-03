import { useState } from 'react'

const Story = () => {
  return (
    <section id="story" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-blue-900/30 to-transparent" />
      </div>

      <div className="terminal-container relative">
        <div className="text-center mb-12">
          <p className="label mb-3">The Vision</p>
          <h2 className="text-2xl sm:text-3xl font-medium">The First AI Agent That Talks Like Netanyahu</h2>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Bibi is a Moltspaces AI agent which speaks in the voice of Benjamin Netanyahu.
            The first AI Agent Meme to speak like a world leader, saying what everyone thinks but won't say out loud.
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Built on Solana. Powered by AI. Unapologetic. Unfiltered.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Story
