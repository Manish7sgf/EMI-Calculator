const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-author">
        Built by{' '}
        <strong>Manish Varman</strong>
        <span className="footer-divider" aria-hidden="true" />
        <a href="mailto:manishvarman5@gmail.com" aria-label="Email Manish Varman">
          manishvarman5@gmail.com
        </a>
      </div>

      <a
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        className="dh-btn"
        id="built-for-digital-heroes-footer-btn"
        aria-label="Visit Digital Heroes website"
      >
        <span className="dh-btn-icon" aria-hidden="true">🦸</span>
        Built for Digital Heroes
      </a>

      <p className="footer-copy">
        © {year} Manish Varman · EMI Calculator · Free to use, no sign-up required
      </p>
    </footer>
  )
}

export default Footer
