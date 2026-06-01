import { useState, useEffect, useRef, useCallback } from 'react';

const IMAGES = {
  walking:    '/baobao/sit.png',
  idle:       '/baobao/loaf.png',
  resting:    '/baobao/rest.png',
  sitting:    '/baobao/sit.png',
  held:       '/baobao/held.png',
  scratching: '/baobao/stratch.png',
};

// native cutout widths (px); one shared SCALE keeps the cat's real size
// constant across poses instead of fitting each crop to a fixed box.
const NATIVE_W = {
  walking:    552,
  idle:       815,
  resting:    972,
  sitting:    552,
  held:       335,
  scratching: 1097,
};
const SCALE = 0.15; // screen px per source px
// per-pose visual correction: some source photos frame the cat closer,
// so nudge those poses to keep the cat's apparent size matching.
const POSE_ADJUST = {
  idle: 0.87, // loaf photo is framed closer; shrink so it doesn't dominate
};

const CAT_WIDTH = 120;
const SPEED = 60;          // px/s
const GROUND_BOTTOM = 16;  // px from bottom of viewport

// procedural animation tuning
const WALK_FREQ = 9;       // hop oscillation speed (rad/s)
const BOB = 7;             // hop height (px)
const BREATHE = 2.2;       // breathing speed (rad/s)
const POP_MS = 320;        // squash-and-stretch duration

const SPEAK_LINES = ['meow', 'purr~', 'mrrp', '✨', 'pet me?'];
const SLEEPY_LINES = ['zzz…', '😴', '…'];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export default function BaobaoPet() {
  const [pose, setPose] = useState('idle');
  const [showTooltip, setShowTooltip] = useState(false);
  const [speech, setSpeech] = useState(null);

  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight - GROUND_BOTTOM - 160 });
  const elRef = useRef(null);     // positioned wrapper (left/top)
  const bodyRef = useRef(null);   // animated transform (bob/flip/squash)
  const shadowRef = useRef(null); // ground contact shadow
  const speechTimer = useRef(null);

  const stateRef = useRef({
    pose: 'idle',
    facingRight: true,
    velX: 0,
    nextStateAt: Date.now() + rand(3000, 6000),
    nextSpeakAt: Date.now() + rand(6000, 12000),
    scratching: false,
    held: false,
    dragging: false,
    lastTime: null,
    animT: 0,        // animation clock (s)
    leanX: 0,        // current lean toward cursor
    popUntil: 0,     // squash-and-stretch end time
    cursorX: window.innerWidth / 2,
  });

  const setPoseSync = useCallback((p) => {
    stateRef.current.pose = p;
    setPose(p);
  }, []);

  const say = useCallback((line, ms = 2600) => {
    setSpeech(line);
    clearTimeout(speechTimer.current);
    speechTimer.current = setTimeout(() => setSpeech(null), ms);
  }, []);

  const pickNextState = useCallback(() => {
    const s = stateRef.current;
    const r = Math.random();
    if (s.pose === 'idle' || s.pose === 'sitting') {
      if (r < 0.5) {
        const goRight = Math.random() < 0.5;
        s.velX = goRight ? SPEED : -SPEED;
        s.facingRight = goRight;
        setPoseSync('walking');
        s.nextStateAt = Date.now() + rand(2000, 5000);
      } else if (r < 0.75) {
        s.velX = 0;
        setPoseSync('resting');
        s.nextStateAt = Date.now() + rand(5000, 10000);
      } else {
        s.velX = 0;
        setPoseSync('sitting');
        s.nextStateAt = Date.now() + rand(2000, 4000);
      }
    } else if (s.pose === 'walking') {
      if (r < 0.6) {
        s.velX = 0;
        setPoseSync('idle');
        s.nextStateAt = Date.now() + rand(3000, 6000);
      } else {
        s.velX = 0;
        setPoseSync('sitting');
        s.nextStateAt = Date.now() + rand(2000, 4000);
      }
    } else if (s.pose === 'resting') {
      s.velX = 0;
      setPoseSync('idle');
      s.nextStateAt = Date.now() + rand(3000, 6000);
    }
  }, [setPoseSync]);

  // track cursor for awareness
  useEffect(() => {
    const onMove = (e) => { stateRef.current.cursorX = e.clientX; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // RAF loop — handles movement AND procedural animation
  useEffect(() => {
    let rafId;
    const tick = (timestamp) => {
      const s = stateRef.current;
      const dt = s.lastTime ? Math.min((timestamp - s.lastTime) / 1000, 0.05) : 0;
      s.lastTime = timestamp;
      s.animT += dt;
      const now = Date.now();

      const h = bodyRef.current?.offsetHeight ?? 160;

      if (!s.held && !s.scratching) {
        if (s.pose === 'walking') {
          posRef.current.x += s.velX * dt;
          const maxX = window.innerWidth - CAT_WIDTH;
          if (posRef.current.x <= 0) {
            posRef.current.x = 0; s.velX = SPEED; s.facingRight = true;
          } else if (posRef.current.x >= maxX) {
            posRef.current.x = maxX; s.velX = -SPEED; s.facingRight = false;
          }
        } else {
          // stationary: face & lean toward cursor (awareness)
          const center = posRef.current.x + CAT_WIDTH / 2;
          const dxc = s.cursorX - center;
          if (Math.abs(dxc) > 40) s.facingRight = dxc > 0;
        }

        posRef.current.y = window.innerHeight - GROUND_BOTTOM - h;

        if (now >= s.nextStateAt) pickNextState();

        // idle chatter
        if (now >= s.nextSpeakAt) {
          const sleepy = s.pose === 'resting';
          const pool = sleepy ? SLEEPY_LINES : SPEAK_LINES;
          say(pool[Math.floor(Math.random() * pool.length)]);
          s.nextSpeakAt = now + rand(9000, 17000);
        }
      }

      // ── compose procedural transform ───────────────────
      const center = posRef.current.x + CAT_WIDTH / 2;
      const dxc = s.cursorX - center;
      const leanTarget = (!s.held && Math.abs(dxc) < 240)
        ? clamp(dxc * 0.04, -10, 10) : 0;
      s.leanX += (leanTarget - s.leanX) * 0.1;

      const facing = s.facingRight ? 1 : -1;
      let tx = s.leanX, ty = 0, rot = 0, sx = 1, sy = 1;
      let shadowK = 1; // 1 = grounded, <1 = airborne/lighter

      if (s.held) {
        rot = Math.sin(s.animT * 6) * 7;
        ty = Math.sin(s.animT * 6) * 2;
        shadowK = 0.45;
      } else if (s.pose === 'walking') {
        const phase = s.animT * WALK_FREQ;
        const lift = Math.abs(Math.sin(phase));
        ty = -lift * BOB;
        rot = Math.sin(phase) * 3;
        shadowK = 1 - lift * 0.4;
      } else if (s.pose !== 'scratching') {
        const b = Math.sin(s.animT * BREATHE);
        sy = 1 + b * 0.02;
        sx = 1 - b * 0.015;
      }

      // squash-and-stretch pop (pet / land)
      if (now < s.popUntil) {
        const k = (s.popUntil - now) / POP_MS; // 1 -> 0
        const pop = Math.sin(k * Math.PI);
        sy += pop * 0.14;
        sx -= pop * 0.08;
      }

      if (elRef.current) {
        elRef.current.style.left = `${posRef.current.x}px`;
        elRef.current.style.top = `${posRef.current.y}px`;
      }
      if (bodyRef.current) {
        bodyRef.current.style.transform =
          `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${facing * sx}, ${sy})`;
      }
      if (shadowRef.current && bodyRef.current) {
        shadowRef.current.style.width = `${bodyRef.current.offsetWidth * 0.72}px`;
        shadowRef.current.style.transform = `translateX(-50%) scale(${shadowK})`;
        shadowRef.current.style.opacity = `${0.28 * shadowK}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [pickNextState, say]);

  useEffect(() => () => clearTimeout(speechTimer.current), []);

  // pet on click
  const handleClick = useCallback((e) => {
    if (stateRef.current.dragging) return;
    e.stopPropagation();
    const s = stateRef.current;
    if (s.scratching || s.held) return;
    const prevPose = s.pose;
    s.scratching = true;
    s.velX = 0;
    s.popUntil = Date.now() + POP_MS;
    say(['purr~', '♥', 'mrrp'][Math.floor(Math.random() * 3)]);
    setPoseSync('scratching');
    setTimeout(() => {
      s.scratching = false;
      setPoseSync(prevPose === 'walking' ? 'idle' : prevPose);
      s.nextStateAt = Date.now() + rand(2000, 4000);
    }, 1400);
  }, [setPoseSync, say]);

  const dropClamp = useCallback(() => {
    const s = stateRef.current;
    const h = bodyRef.current?.offsetHeight ?? 160;
    const maxX = window.innerWidth - CAT_WIDTH;
    posRef.current.x = clamp(posRef.current.x, 0, maxX);
    posRef.current.y = window.innerHeight - GROUND_BOTTOM - h;
    s.popUntil = Date.now() + POP_MS; // land squash
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const s = stateRef.current;
    s.dragging = false;
    const startX = e.clientX, startY = e.clientY;
    const origX = posRef.current.x, origY = posRef.current.y;

    const onMove = (me) => {
      const dx = me.clientX - startX, dy = me.clientY - startY;
      if (!s.held && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        s.held = true; s.dragging = true; s.velX = 0;
        setPoseSync('held');
      }
      if (s.held) {
        posRef.current.x = origX + dx;
        posRef.current.y = origY + dy;
      }
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (s.held) {
        s.held = false;
        setPoseSync('idle');
        s.nextStateAt = Date.now() + rand(2000, 4000);
        dropClamp();
      }
      setTimeout(() => { s.dragging = false; }, 0);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [setPoseSync, dropClamp]);

  const handleTouchStart = useCallback((e) => {
    const s = stateRef.current;
    s.held = true; s.dragging = true; s.velX = 0;
    setPoseSync('held');

    const onTouchMove = (te) => {
      const t = te.touches[0];
      posRef.current.x = t.clientX - CAT_WIDTH / 2;
      posRef.current.y = t.clientY - 80;
    };
    const onTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      s.held = false; s.dragging = false;
      setPoseSync('idle');
      s.nextStateAt = Date.now() + rand(2000, 4000);
      dropClamp();
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  }, [setPoseSync, dropClamp]);

  return (
    <div ref={elRef} className="baobao-pet">
      {(speech || showTooltip) && (
        <div className="baobao-tooltip">
          {speech || 'Baobao 🐱'}
        </div>
      )}
      <div ref={shadowRef} className="baobao-shadow" />
      <div
        ref={bodyRef}
        className="baobao-body"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img
          src={IMAGES[pose]}
          alt="Baobao the cat"
          style={{ width: `${NATIVE_W[pose] * SCALE * (POSE_ADJUST[pose] ?? 1)}px` }}
          draggable={false}
        />
      </div>
    </div>
  );
}
