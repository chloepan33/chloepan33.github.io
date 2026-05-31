export default function PixelButton({ onClick, href, children, accent, style = {} }) {
  const accentBg = {
    pink:     'var(--pink)',
    mint:     'var(--mint)',
    lavender: 'var(--lavender)',
    peach:    'var(--peach)',
  }[accent];

  const hoverStyle = accentBg ? { '--btn-hover-bg': accentBg } : {};

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="pixel-btn"
        style={{ ...hoverStyle, ...style }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="pixel-btn"
      style={{ background: 'var(--white)', ...hoverStyle, ...style }}
    >
      {children}
    </button>
  );
}
