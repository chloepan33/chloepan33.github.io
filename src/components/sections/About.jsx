import DialogueBox from '../ui/DialogueBox';
import SectionTitle from '../ui/SectionTitle';
import SectionNav from '../ui/SectionNav';

const FUN_FACTS = [
  { icon: '🍵', label: 'Matcha enthusiast' },
  { icon: '🐱', label: 'Cat mom (Baobao!)' },
  { icon: '🌾', label: 'Stardew Valley addict' },
  { icon: '🔍', label: 'Detective novel reader' },
];

const NAV_CHOICES = [
  { to: 'projects', label: '🔨 See my projects' },
  { to: 'timeline', label: '📅 My journey'      },
  { to: 'contact',  label: '✉️ Get in touch'    },
];

export default function About() {
  return (
    <section className="section" style={{ background: '#FFF0F4' }}>
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

        <div className="animate-in animate-in-1">
          <SectionTitle accent="pink">About Me</SectionTitle>
        </div>

        <div className="animate-in animate-in-2">
          <DialogueBox text="Nice to meet you! I'm Chloe — software developer, cat person, and professional overthinker. I love building things and breaking them to see how they work." />
        </div>

        <div
          className="animate-in animate-in-3"
          style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}
        >
          {/* Profile image */}
          <div style={{ flexShrink: 0 }}>
            <div className="pixel-img-frame">
              <img
                src="/images/me.png"
                alt="Chloe"
                style={{ width: '160px', height: '160px', objectFit: 'cover', imageRendering: 'pixelated' }}
              />
            </div>
          </div>

          {/* Bio + fun facts */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.7, marginBottom: '24px' }}>
              I studied Computer Science and love building tools that are both useful and fun.
              When I'm not coding you'll find me sipping matcha, farming in Stardew Valley,
              or cuddling with my cat Baobao.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {FUN_FACTS.map(({ icon, label }) => (
                <div key={label} className="pixel-box" style={itemStyle}>
                  <span style={{ fontSize: '20px' }}>{icon}</span>
                  <span style={{ fontFamily: 'var(--font-retro)', fontSize: '18px' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-in animate-in-4">
          <SectionNav prompt="What would you like to explore?" choices={NAV_CHOICES} />
        </div>

      </div>
    </section>
  );
}

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  background: '#fff',
};
