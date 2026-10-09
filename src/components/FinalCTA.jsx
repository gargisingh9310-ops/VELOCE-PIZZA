import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, MapPin, ArrowUpRight } from 'lucide-react';
import { attachMagnetic } from '../utils/animationHelpers';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA({ onOpenOrder, onOpenLocations }) {
  const containerRef = useRef(null);
  const titleLinesRef = useRef([]);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleLinesRef.current, {
        opacity: 0,
        y: 40,
        clipPath: 'inset(100% 0% 0% 0%)',
        stagger: 0.12,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);

    // Attach magnetic hover effects
    const cleanup1 = attachMagnetic(btn1Ref.current, 0.25);
    const cleanup2 = attachMagnetic(btn2Ref.current, 0.25);

    return () => {
      ctx.revert();
      cleanup1();
      cleanup2();
    };
  }, []);

  const addToTitleRefs = (el) => {
    if (el && !titleLinesRef.current.includes(el)) {
      titleLinesRef.current.push(el);
    }
  };

  return (
    <section
      id="order"
      ref={containerRef}
      className="section-boundary min-h-[85vh] md:min-h-screen flex items-center justify-center bg-terracotta text-paper px-6 sm:px-10 py-24 select-none z-20"
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-paper/30 bg-clay/60 backdrop-blur-md text-xs font-mono tracking-ultra uppercase text-paper shadow-md">
          <span className="w-2 h-2 rounded-full bg-paper animate-pulse" />
          <span>FIRE IS HOT • OVENS RUNNING 900°F</span>
        </div>

        {/* Large Editorial Headline: READY FOR A SLICE? */}
        <div className="space-y-1">
          {['READY', 'FOR A', 'SLICE?'].map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <div
                ref={addToTitleRefs}
                className="font-display font-black tracking-tight uppercase leading-[0.9] text-[clamp(3rem,7vw,7rem)] text-paper"
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        <p className="font-serif italic text-lg sm:text-2xl text-paper/90 max-w-md pt-2">
          Order for immediate priority delivery or reserve your table at our global lab outposts.
        </p>

        {/* Magnetic CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto pt-4">
          <button
            ref={btn1Ref}
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-8 md:px-12 py-5 rounded-full bg-paper hover:bg-cream text-charcoal font-mono text-sm md:text-base uppercase tracking-widest font-bold flex items-center justify-center gap-3 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
            data-cursor="cta"
          >
            <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform text-terracotta" />
            <span>ORDER ONLINE</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-terracotta" />
          </button>

          <button
            ref={btn2Ref}
            onClick={onOpenLocations}
            className="w-full sm:w-auto px-8 md:px-12 py-5 rounded-full bg-clay/50 hover:bg-paper hover:text-charcoal text-paper font-mono text-sm md:text-base uppercase tracking-widest font-bold flex items-center justify-center gap-3 border border-paper/30 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group backdrop-blur-sm"
            data-cursor="pointer"
          >
            <MapPin size={18} className="text-paper group-hover:text-charcoal transition-colors" />
            <span>FIND A SLICE</span>
          </button>
        </div>
      </div>
    </section>
  );
}
