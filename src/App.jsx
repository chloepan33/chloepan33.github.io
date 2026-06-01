import { NavigationProvider, useNav } from './context/NavigationContext';
import StarBackground from './components/layout/StarBackground';
import NavBar from './components/layout/NavBar';
import BaobaoPet from './components/ui/BaobaoPet';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Contact from './components/sections/Contact';

const SECTIONS = {
  hero:     <Hero />,
  about:    <About />,
  projects: <Projects />,
  timeline: <Timeline />,
  contact:  <Contact />,
};

function SiteContent() {
  const { active, fading } = useNav();

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <StarBackground />
      <NavBar />
      <BaobaoPet />

      {/* Fade wrapper — opacity controlled by fading state */}
      <div style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.22s ease',
        height: '100vh',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* key forces remount on section change, restarting CSS animations */}
        <div key={active} style={{ animation: 'sectionFadeIn 0.35s ease both' }}>
          {SECTIONS[active]}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <SiteContent />
    </NavigationProvider>
  );
}
