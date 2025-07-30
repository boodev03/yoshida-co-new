"use client";

import Lenis from "lenis";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ScrollProviderProps {
  children: ReactNode;
}

// Add context for scroll position
const ScrollContext = createContext({ scrollY: 0 });
export const useScroll = () => useContext(ScrollContext);

const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add scroll listener
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
