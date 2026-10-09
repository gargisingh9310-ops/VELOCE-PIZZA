import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const containerRef = useRef(null);
  const headlineLinesRef = useRef([]);
  const subtextRef = useRef(null);
  const borderLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(headlineLinesRef.current, {
        opacity: 0,
        y: 40,
        clipPath: 'inset(100% 0% 0% 0%)',
        stagger: 0.12,
        duration: 1.1,
        ease: 'power4.out',
      })
      .from(borderLineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      }, '-=0.4')
      .from(subtextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToLineRefs = (el) => {
    if (el && !headlineLinesRef.current.includes(el)) {
      headlineLinesRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="section-boundary min-h-[75vh] flex items-center justify-center bg-paper text-charcoal px-6 py-24 select-none z-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="text-xs font-mono tracking-ultra uppercase text-terracotta font-semibold">
          THE VELOCE PHILOSOPHY
        </div>

        {/* Headline */}
        <div className="space-y-1">
          {["GOOD PIZZA", "DOESN'T NEED", "AN INTRODUCTION."].map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <div
                ref={addToLineRefs}
                className={`font-display font-black tracking-tight uppercase leading-[0.95] text-[clamp(2.5rem,5.5vw,5.5rem)] ${
                  idx === 1 ? 'text-terracotta' : 'text-charcoal'
                }`}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* Divider Line */}
        <div
          ref={borderLineRef}
          className="h-px w-24 md:w-32 bg-terracotta/40 mx-auto"
        />

        {/* Supporting Copy */}
        <div ref={subtextRef} className="space-y-4 max-w-lg mx-auto">
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-charcoal/85 leading-relaxed">
            Just good ingredients.<br />
            Good heat.<br />
            Good people.
          </p>
          <p className="text-xs font-mono tracking-widest text-muted uppercase pt-2">
            NAPOLI • MILANO • LONDON • TOKYO • NEW YORK
          </p>
        </div>
      </div>
    </section>
  );
}
