import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onOpenLocations, onOpenOrder }) {
  const footerRef = useRef(null);
  const watermarkRef = useRef(null);
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      if (isReducedMotion) {
        tl.from([topBarRef.current, watermarkRef.current, bottomBarRef.current], {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
        return;
      }

      tl.from(topBarRef.current, {
        opacity: 0,
        y: isMobile ? 15 : 25,
        duration: 0.7,
        ease: 'power3.out',
      })
      .from(
        watermarkRef.current,
        {
          opacity: 0,
          y: isMobile ? 25 : 40,
          duration: 0.9,
          ease: 'power4.out',
        },
        '-=0.4'
      )
      .from(
        bottomBarRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.45'
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="footer-section relative bg-cream text-charcoal pt-20 pb-12 px-6 sm:px-12 border-t border-charcoal/10 select-none z-20"
      style={{
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      <div className="max-w-[1500px] mx-auto flex flex-col justify-between min-h-[45vh] relative z-10">
        
        {/* Top Minimal Info Bar */}
        <div
          ref={topBarRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-charcoal/10 pb-8 text-xs font-mono tracking-widest text-muted"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span className="text-charcoal font-semibold">NEAPOLITAN PIZZA LAB • EST. 2026</span>
          </div>

          <div className="flex flex-wrap gap-8 uppercase font-semibold">
            <button onClick={onOpenOrder} className="hover:text-terracotta transition-colors cursor-pointer">
              ORDER ONLINE
            </button>
            <button onClick={onOpenLocations} className="hover:text-terracotta transition-colors cursor-pointer">
              LOCATIONS
            </button>
            <a href="#instagram" className="hover:text-terracotta transition-colors">
              INSTAGRAM
            </a>
            <a href="mailto:ciao@veloce-pizza.com" className="hover:text-terracotta transition-colors">
              CONTACT
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-charcoal/15 bg-paper text-charcoal hover:bg-terracotta hover:border-terracotta hover:text-paper transition-all shadow-xs cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Brand Watermark Typography */}
        <div ref={watermarkRef} className="my-auto py-12 text-center space-y-3 overflow-hidden">
          <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-black leading-[0.85] tracking-tighter text-charcoal/15 uppercase select-none transition-all duration-700 hover:text-charcoal/25">
            VELOCE
          </h2>
          <p className="font-serif italic text-base sm:text-xl md:text-2xl text-charcoal/80 tracking-wide">
            SLOW CRAFTED. FAST OBSESSION.
          </p>
        </div>

        {/* Bottom Legal & Meta */}
        <div
          ref={bottomBarRef}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-charcoal/10 text-xs font-mono tracking-widest text-muted"
        >
          <div>© 2026 VELOCE PIZZA LAB. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-4 sm:gap-6 font-semibold">
            <span>NAPOLI</span>
            <span>•</span>
            <span>MILANO</span>
            <span>•</span>
            <span>LONDON</span>
            <span>•</span>
            <span>TOKYO</span>
            <span>•</span>
            <span>NEW YORK</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
