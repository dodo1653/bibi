const Footer = () => {
  return (
    <footer className="py-8 border-t" style={{ borderColor: 'rgba(0, 200, 255, 0.1)', backgroundColor: 'var(--color-terminal-bg)' }}>
      <div className="terminal-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <p className="text-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>$BIBI</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--color-text-muted)' }}>
              X
            </a>
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--color-text-muted)' }}>
              Telegram
            </a>
          </div>
        </div>
        <p className="text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>Not financial advice. DYOR.</p>
      </div>
    </footer>
  )
}

export default Footer
