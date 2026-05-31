import { useEffect, useRef } from 'react';

const STAR_COUNT = 120;

export default function StarBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars = Array.from({ length: STAR_COUNT }, () => {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1.5;
      Object.assign(star.style, {
        position: 'absolute',
        width:  `${size}px`,
        height: `${size}px`,
        background: Math.random() > 0.5 ? '#FFCADD' : '#C7CEEA',
        borderRadius: '0', // pixel squares
        left: `${Math.random() * 100}%`,
        top:  `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.2,
        animation: `twinkle ${2 + Math.random() * 3}s ${Math.random() * 4}s infinite alternate`,
      });
      return star;
    });

    stars.forEach(s => container.appendChild(s));

    // Inject keyframes once
    if (!document.getElementById('twinkle-kf')) {
      const style = document.createElement('style');
      style.id = 'twinkle-kf';
      style.textContent = `
        @keyframes twinkle {
          from { opacity: 0.15; transform: scale(0.8); }
          to   { opacity: 0.85; transform: scale(1.2); }
        }
      `;
      document.head.appendChild(style);
    }

    return () => stars.forEach(s => s.remove());
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    />
  );
}
