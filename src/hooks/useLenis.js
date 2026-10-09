import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      window.lenis = lenis;
    }

    // Synchronize Lenis scroll event with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, []);

  return lenisRef;
}
