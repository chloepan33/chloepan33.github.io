import { useState } from 'react';
import DialogueBox from '../ui/DialogueBox';
import { useNav } from '../../context/NavigationContext';
import story from '../../data/story';

export default function Hero() {
  const { navigate } = useNav();
  const [passageKey, setPassageKey] = useState(story.start);
  const passage = story.passages[passageKey];

  const handleChoice = (choice) => {
    if (choice.target) {
      setPassageKey(choice.target);
    } else if (choice.navigateTo) {
      navigate(choice.navigateTo);
    }
  };

  return (
    <section className="section" style={{ background: 'transparent', justifyContent: 'center' }}>
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

        {/* Title */}
        <div className="animate-in animate-in-1" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(18px, 4vw, 40px)',
            color: 'var(--text)',
            lineHeight: 1.4,
            letterSpacing: '0.04em',
            marginBottom: '8px',
          }}>
            Hi, I'm Chloe
            <span style={{ color: 'var(--pink-dark)' }}> ✦</span>
          </h1>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '22px', color: 'var(--text-muted)' }}>
            software developer · matcha lover · cat person
          </p>
        </div>

        {/* Dialogue box with choices */}
        <div className="animate-in animate-in-2" style={{ width: '100%', maxWidth: '680px' }}>
          <DialogueBox key={passageKey} text={passage.text}>
            {passage.choices.map((choice, i) => (
              <button key={i} className="pixel-btn" onClick={() => handleChoice(choice)}>
                {choice.label}
              </button>
            ))}
          </DialogueBox>
        </div>

        <p className="animate-in animate-in-3" style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          color: 'var(--text-muted)',
          animation: 'blink 2s step-end infinite',
        }}>
          ▼ or pick from the menu above ▼
        </p>

      </div>
    </section>
  );
}
