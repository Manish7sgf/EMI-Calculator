const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header-logo">
        <div className="header-logo-icon" aria-hidden="true">₹</div>
        <span className="header-logo-text">
          EMI<span>Calc</span>
        </span>
      </div>

      <div className="header-badge">
        <span className="header-badge-dot" aria-hidden="true" />
        Live Calculator
      </div>

      <a
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        className="dh-btn"
        id="built-for-digital-heroes-btn"
        aria-label="Visit Digital Heroes website"
      >
        <span className="dh-btn-icon" aria-hidden="true">🦸</span>
        Built for Digital Heroes
      </a>
    </header>
  )
}

export default Header
