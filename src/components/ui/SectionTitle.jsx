export default function SectionTitle({ children, accent = 'pink' }) {
  const underlineBg = {
    pink:     'var(--pink)',
    mint:     'var(--mint)',
    lavender: 'var(--lavender)',
    peach:    'var(--peach)',
  }[accent] ?? 'var(--pink)';

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 'clamp(14px, 2vw, 20px)',
        color: 'var(--text)',
        display: 'inline-block',
        lineHeight: 1.4,
        letterSpacing: '0.05em',
      }}>
        {children}
        <span className="cursor-blink" style={{ marginLeft: '4px', color: 'var(--pink-dark)' }}>▌</span>
      </h2>
      <div style={{
        marginTop: '8px',
        height: '6px',
        width: '80px',
        background: underlineBg,
        border: '2px solid var(--border)',
      }} />
    </div>
  );
}
