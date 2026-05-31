import { useState, useEffect, useRef } from 'react';

const SPEED_MS = 30; // ms per character

export default function DialogueBox({ speaker = 'Chloe', text = '', children, instant = false }) {
  const [displayed, setDisplayed] = useState(instant ? text : '');
  const [done, setDone] = useState(instant);
  const idx = useRef(0);

  useEffect(() => {
    if (instant) { setDisplayed(text); setDone(true); return; }
    setDisplayed('');
    setDone(false);
    idx.current = 0;

    const id = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, SPEED_MS);

    return () => clearInterval(id);
  }, [text, instant]);

  return (
    <div className="pixel-box" style={styles.wrapper}>
      {/* Speaker label */}
      <div style={styles.label}>{speaker}</div>

      <div style={styles.body}>
        {/* Avatar */}
        <div style={styles.avatar}>
          <img
            src="/images/me.png"
            alt="Chloe avatar"
            style={styles.avatarImg}
          />
        </div>

        {/* Text area */}
        <div style={styles.textArea}>
          <span className="typewriter-text">
            {displayed}
            {!done && <span className="cursor-blink">▌</span>}
          </span>
          {/* Optional action buttons rendered after text finishes */}
          {done && children && (
            <div style={styles.actions}>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: '#fff',
    padding: '0',
    position: 'relative',
    maxWidth: '680px',
    width: '100%',
  },
  label: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '10px',
    background: '#FFCADD',
    border: '3px solid #2D2D2D',
    borderBottom: 'none',
    padding: '4px 12px',
    display: 'inline-block',
    position: 'relative',
    top: '0',
    left: '0',
    letterSpacing: '0.05em',
  },
  body: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    alignItems: 'flex-start',
    borderTop: '3px solid #2D2D2D',
  },
  avatar: {
    flexShrink: 0,
    width: '64px',
    height: '64px',
    border: '3px solid #2D2D2D',
    overflow: 'hidden',
    background: '#FFF5F7',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    imageRendering: 'pixelated',
  },
  textArea: {
    flex: 1,
    minHeight: '64px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
};
