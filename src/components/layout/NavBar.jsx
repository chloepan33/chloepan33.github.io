import { useNav } from '../../context/NavigationContext';

const NAV_LINKS = [
  { label: '★ Home',   id: 'hero'     },
  { label: 'About',    id: 'about'    },
  { label: 'Projects', id: 'projects' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'Contact',  id: 'contact'  },
];

export default function NavBar() {
  const { active, navigate } = useNav();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 16px',
      background: 'rgba(255,245,247,0.92)',
      borderBottom: '3px solid var(--border)',
      backdropFilter: 'blur(4px)',
    }}>
      <ul style={{ display: 'flex', gap: '4px', listStyle: 'none', flexWrap: 'wrap', justifyContent: 'center' }}>
        {NAV_LINKS.map(({ label, id }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                onClick={() => navigate(id)}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  padding: '6px 10px',
                  background: isActive ? 'var(--pink)' : 'var(--white)',
                  color: 'var(--text)',
                  border: '2px solid var(--border)',
                  boxShadow: isActive ? '2px 2px 0 var(--border)' : '3px 3px 0 var(--border)',
                  cursor: isActive ? 'default' : 'pointer',
                  transform: isActive ? 'translate(1px,1px)' : 'none',
                  letterSpacing: '0.04em',
                  transition: 'background 0.1s, box-shadow 0.1s, transform 0.1s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#FFE8F0'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'var(--white)'; }}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
