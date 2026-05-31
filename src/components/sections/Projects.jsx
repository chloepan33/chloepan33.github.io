import DialogueBox from '../ui/DialogueBox';
import SectionTitle from '../ui/SectionTitle';
import SectionNav from '../ui/SectionNav';
import projects from '../../data/projects';

const NAV_CHOICES = [
  { to: 'about',    label: '👋 About me'     },
  { to: 'timeline', label: '📅 My journey'   },
  { to: 'contact',  label: '💌 Hire me!'     },
];

export default function Projects() {
  return (
    <section className="section" style={{ background: '#F0FAF5' }}>
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

        <div className="animate-in animate-in-1">
          <SectionTitle accent="mint">Projects</SectionTitle>
        </div>

        <div className="animate-in animate-in-2">
          <DialogueBox text="Here's what I've built! These were made during my undergrad — each one taught me something new. Click to check them out!" />
        </div>

        <div
          className="animate-in animate-in-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="animate-in animate-in-4">
          <SectionNav prompt="Want to know more about me?" choices={NAV_CHOICES} />
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div
      className="pixel-box-mint"
      style={cardStyle}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--mint-dark)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      {/* Card header */}
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '9px',
        background: 'var(--mint)',
        borderBottom: '3px solid var(--border)',
        padding: '8px 12px',
        letterSpacing: '0.05em',
        lineHeight: 1.6,
      }}>
        {project.title}
      </div>

      <div style={{ padding: '14px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
          {project.description}
        </p>
        <div style={{ marginBottom: '14px', display: 'flex', flexWrap: 'wrap' }}>
          {project.tags.map(tag => <span key={tag} className="pixel-tag">{tag}</span>)}
        </div>
        <a
          href={project.link}
          target={project.link !== '#' ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="pixel-btn"
          style={{ fontSize: '18px' }}
        >
          View →
        </a>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#fff',
  transition: 'transform 0.1s, box-shadow 0.1s',
  display: 'flex',
  flexDirection: 'column',
};
