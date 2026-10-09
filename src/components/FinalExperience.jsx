import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, MapPin, ArrowUpRight, Flame, Sparkles } from 'lucide-react';
import { attachMagnetic } from '../utils/animationHelpers';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section Four: Final Interactive Experience
 * Immersive closing section that completes the website with interactive craft aura and CTAs, without any footer.
 */
export default function FinalExperience({ onOpenOrder, onOpenLocations }) {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);
  const headlineLinesRef = useRef([]);
  const badgeRef = useRef(null);
  const subtextRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Interactive subtle pointer spotlight
    const handleMouseMove = (e) => {
      if (isReducedMotion || !spotlightRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(spotlightRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    const ctx = gsap.context(() => {
      if (isReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      })
      .from(
        headlineLinesRef.current,
        {
          opacity: 0,
          y: 40,
          clipPath: 'inset(100% 0% 0% 0%)',
          stagger: 0.1,
          duration: 0.9,
          ease: 'power4.out',
        },
        '-=0.35'
      )
      .from(
        subtextRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.45'
      )
      .from(
        [btn1Ref.current, btn2Ref.current],
        {
          opacity: 0,
          y: 25,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }, container);

    // Attach magnetic hover response to primary buttons
    const cleanup1 = attachMagnetic(btn1Ref.current, 0.2);
    const cleanup2 = attachMagnetic(btn2Ref.current, 0.2);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, []);

  const addToHeadlineRefs = (el) => {
    if (el && !headlineLinesRef.current.includes(el)) {
      headlineLinesRef.current.push(el);
    }
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="final-experience-section relative min-h-[90vh] md:min-h-screen w-full flex flex-col justify-between bg-[#171717] text-[#FFFDF9] px-6 sm:px-10 lg:px-16 py-16 sm:py-24 select-none overflow-hidden z-20"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#171717',
      }}
    >
      {/* Background Interactive Fire Spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={spotlightRef}
          className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-[#B9573F]/20 blur-[150px] pointer-events-none"
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7A523A]/25 blur-[160px] pointer-events-none" />
      </div>

      {/* Top Ambient Craft Status Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-widest text-[#FFFDF9]/60 uppercase border-b border-[#FFFDF9]/10 pb-6 pointer-events-none">
        <div className="flex items-center gap-2 font-bold text-[#FFFDF9]">
          <span className="w-2 h-2 rounded-full bg-[#B9573F] animate-pulse" />
          <span>VELOCE CRAFT LAB</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Flame size={12} className="text-[#B9573F]" />
          <span>900°F BEECHWOOD FIRE • 60S FLASH BAKE</span>
        </div>
      </div>

      {/* Central Hero Experience Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto py-12 space-y-6 sm:space-y-8">
        {/* Sub-Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFFDF9]/15 bg-[#FFFDF9]/5 backdrop-blur-md text-[11px] font-mono tracking-ultra uppercase text-[#B9573F] shadow-sm font-semibold"
        >
          <Sparkles size={13} className="text-[#B9573F]" />
          <span>THE ULTIMATE SLICE</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="space-y-1 sm:space-y-2">
          {['CRAFTED FOR', 'THE OBSESSED.'].map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <h2
                ref={addToHeadlineRefs}
                className={`font-display font-black tracking-tight uppercase leading-[0.9] text-[clamp(2.75rem,6.5vw,6.5rem)] ${
                  idx === 1 ? 'text-[#B9573F]' : 'text-[#FFFDF9]'
                }`}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* Supporting Craft Copy */}
        <p
          ref={subtextRef}
          className="font-serif italic text-base sm:text-xl text-[#FFFDF9]/85 max-w-xl leading-relaxed"
        >
          72-hour sourdough cold fermentation. Hand-crushed San Marzano D.O.P. dawn-pulled Fior di Latte. Baked at 900°F into pure memory.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 w-full sm:w-auto">
          <button
            ref={btn1Ref}
            onClick={onOpenOrder}
            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#B9573F] hover:bg-[#FFFDF9] text-[#FFFDF9] hover:text-[#171717] font-mono text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
            data-cursor="cta"
          >
            <ShoppingBag size={16} className="text-[#FFFDF9] group-hover:text-[#171717] transition-colors" />
            <span>ORDER YOUR SLICE</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#FFFDF9] group-hover:text-[#171717]" />
          </button>

          <button
            ref={btn2Ref}
            onClick={onOpenLocations}
            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-transparent hover:bg-[#FFFDF9]/10 text-[#FFFDF9] font-mono text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 border border-[#FFFDF9]/20 transition-all duration-300 cursor-pointer active:scale-95 backdrop-blur-xs"
            data-cursor="pointer"
          >
            <MapPin size={16} className="text-[#B9573F]" />
            <span>VIEW OUTPOSTS</span>
          </button>
        </div>
      </div>

      {/* Bottom Ambient Closing Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FFFDF9]/50 uppercase border-t border-[#FFFDF9]/10 pt-6 gap-2 pointer-events-none">
        <div>
          <span>VELOCE ARTISANAL PIZZA • NAPOLI 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span>ALL RIGHTS RESERVED</span>
          <span>•</span>
          <span className="text-[#B9573F] font-semibold">SLOW CRAFT • FAST OBSESSION</span>
        </div>
      </div>
    </section>
  );
}
