export default function PixelPanel({ title, accent = 'pink', children, style = {} }) {
  const boxClass = {
    pink:     'pixel-box',
    mint:     'pixel-box-mint',
    lavender: 'pixel-box-lavender',
    peach:    'pixel-box-peach',
  }[accent] ?? 'pixel-box';

  const headerBg = {
    pink:     'var(--pink)',
    mint:     'var(--mint)',
    lavender: 'var(--lavender)',
    peach:    'var(--peach)',
  }[accent] ?? 'var(--pink)';

  return (
    <div className={boxClass} style={{ background: '#fff', ...style }}>
      {title && (
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '10px',
          background: headerBg,
          borderBottom: '3px solid #2D2D2D',
          padding: '8px 12px',
          letterSpacing: '0.05em',
        }}>
          {title}
        </div>
      )}
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  );
}
