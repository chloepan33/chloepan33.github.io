import { useNav } from '../../context/NavigationContext';

export default function SectionNav({ prompt = 'What would you like to do next?', choices }) {
  const { navigate } = useNav();

  return (
    <div style={{
      marginTop: '48px',
      borderTop: '3px dashed #ccc',
      paddingTop: '28px',
    }}>
      <p style={{
        fontFamily: "'VT323', monospace",
        fontSize: '22px',
        color: 'var(--text-muted)',
        marginBottom: '14px',
      }}>
        {prompt}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {choices.map(c => (
          <button
            key={c.to}
            onClick={() => navigate(c.to)}
            className="pixel-btn"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
