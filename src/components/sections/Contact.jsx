import DialogueBox from '../ui/DialogueBox';
import SectionTitle from '../ui/SectionTitle';
import { useNav } from '../../context/NavigationContext';

const CONTACTS = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'zypan03@gmail.com',
    href: 'mailto:zypan03@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: '/in/zhiyu-pan-chloe333',
    href: 'https://www.linkedin.com/in/zhiyu-pan-chloe333',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'chloepan33',
    href: 'https://github.com/chloepan33',
  },
];

export default function Contact() {
  const { navigate } = useNav();

  return (
    <section className="section" style={{ background: '#FFF8F0' }}>
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

        <div className="animate-in animate-in-1">
          <SectionTitle accent="peach">Contact</SectionTitle>
        </div>

        <div className="animate-in animate-in-2">
          <DialogueBox text="You made it to the end! 🎉 I'd love to hear from you — whether it's about work, a project idea, or just to say hi!" />
        </div>

        <div
          className="animate-in animate-in-3"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}
        >
          {CONTACTS.map(c => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="pixel-box-peach"
              style={cardStyle}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--peach)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = ''; }}
            >
              <span style={{ fontSize: '28px' }}>{c.icon}</span>
              <div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', marginBottom: '4px' }}>{c.label}</div>
                <div style={{ fontFamily: 'var(--font-retro)', fontSize: '18px', color: 'var(--text-muted)' }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Outro */}
        <div className="animate-in animate-in-4" style={{ marginTop: '16px' }}>
          <div style={{
            borderTop: '3px dashed #ccc',
            paddingTop: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
          }}>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', color: 'var(--text-muted)', lineHeight: 2 }}>
              Thanks for playing.
            </p>
            <button className="pixel-btn" onClick={() => navigate('hero')}>
              [ ↺ PLAY AGAIN ]
            </button>
            <p style={{ fontFamily: 'var(--font-retro)', fontSize: '17px', color: 'var(--text-muted)', marginTop: '8px' }}>
              © 2026 Zhiyu Pan (Chloe)
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 20px',
  background: '#fff',
  cursor: 'pointer',
  transition: 'background 0.1s, transform 0.1s',
  minWidth: '240px',
};
