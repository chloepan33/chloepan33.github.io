import DialogueBox from '../ui/DialogueBox';
import SectionTitle from '../ui/SectionTitle';
import SectionNav from '../ui/SectionNav';
import useScrollReveal from '../../hooks/useScrollReveal';
import timeline from '../../data/timeline';

const ACCENT_BG = {
  pink:     '#FFCADD',
  mint:     '#B5EAD7',
  lavender: '#C7CEEA',
  peach:    '#FFDAC1',
};

const NAV_CHOICES = [
  { to: 'projects', label: '🔨 See my projects'  },
  { to: 'contact',  label: '✉️ Let\'s connect'  },
  { to: 'about',    label: '👋 Back to About'    },
];

export default function Timeline() {
  return (
    <section className="section" style={{ background: '#F5F0FF' }}>
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

        <div className="animate-in animate-in-1">
          <SectionTitle accent="lavender">Timeline</SectionTitle>
        </div>

        <div className="animate-in animate-in-2">
          <DialogueBox text="Let me walk you through how I got here — a mix of school, work, and a few important life moments! 🗓️" />
        </div>

        {/* Timeline track */}
        <div className="animate-in animate-in-3" style={{ position: 'relative' }}>
          {/* Center dashed line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'repeating-linear-gradient(to bottom, #2D2D2D 0, #2D2D2D 6px, transparent 6px, transparent 12px)',
            transform: 'translateX(-50%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {timeline.map((event, i) => (
              <TimelineEntry key={event.id} event={event} side={i % 2 === 0 ? 'left' : 'right'} />
            ))}
          </div>
        </div>

        <div className="animate-in animate-in-4">
          <SectionNav prompt="Where would you like to go?" choices={NAV_CHOICES} />
        </div>

      </div>
    </section>
  );
}

function TimelineEntry({ event, side }) {
  const ref = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        display: 'flex',
        justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
        position: 'relative',
        paddingLeft:  side === 'left'  ? '0'                   : 'calc(50% + 24px)',
        paddingRight: side === 'right' ? '0'                   : 'calc(50% + 24px)',
      }}
    >
      {/* Dot on center line */}
      <div style={{
        position: 'absolute',
        left: 'calc(50% - 8px)',
        top: '16px',
        width: '16px',
        height: '16px',
        background: ACCENT_BG[event.accent] ?? '#FFCADD',
        border: '3px solid #2D2D2D',
        zIndex: 1,
      }} />

      <div
        className="pixel-box-lavender"
        style={{ background: '#fff', maxWidth: '340px', width: '100%' }}
      >
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          background: ACCENT_BG[event.accent] ?? '#C7CEEA',
          padding: '6px 12px',
          borderBottom: '3px solid #2D2D2D',
        }}>
          {event.year}
        </div>
        <div style={{ padding: '12px' }}>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', marginBottom: '8px', lineHeight: 1.6 }}>
            {event.title}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}
