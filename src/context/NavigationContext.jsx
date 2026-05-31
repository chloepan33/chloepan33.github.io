import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [active, setActive]   = useState('hero');
  const [fading, setFading]   = useState(false);

  const navigate = (to) => {
    if (to === active || fading) return;
    setFading(true);
    setTimeout(() => {
      setActive(to);
      setFading(false);
    }, 220);
  };

  return (
    <NavigationContext.Provider value={{ active, fading, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNav = () => useContext(NavigationContext);
