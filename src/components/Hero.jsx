import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleLinesRef = useRef([]);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Opening entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from(titleLinesRef.current, {
        opacity: 0,
        y: 60,
        clipPath: 'inset(100% 0% 0% 0%)',
        stagger: 0.12,
        duration: 1.1,
        ease: 'power4.out',
      }, '-=0.5')
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from(visualRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.8');

      // Scroll departure parallax
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      scrollTl
        .to(titleLinesRef.current, { y: -50, opacity: 0.2, stagger: 0.05, ease: 'none' }, 0)
        .to(visualRef.current, { y: 60, scale: 1.05, ease: 'none' }, 0)
        .to(subtitleRef.current, { opacity: 0, ease: 'none' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToTitleRefs = (el) => {
    if (el && !titleLinesRef.current.includes(el)) {
      titleLinesRef.current.push(el);
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="section-boundary min-h-screen flex items-center justify-center bg-cream px-6 sm:px-10 py-24 md:py-32 text-charcoal select-none"
    >
      {/* Subtle Warm Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-wood/5 rounded-full blur-[120px]" />
      </div>

      {/* Balanced 2-Column Editorial Composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Headline & Story */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-8">
          {/* Sub-Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-charcoal/10 bg-paper/90 backdrop-blur-md text-[11px] font-mono tracking-ultra uppercase text-terracotta shadow-sm font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span>72H SOURDOUGH • 900°F BEECHWOOD</span>
          </div>

          {/* Headline: MADE FOR THE SLICE */}
          <div className="space-y-1 sm:space-y-2">
            {['MADE', 'FOR THE', 'SLICE.'].map((line, idx) => (
              <div key={idx} className="overflow-hidden">
                <div
                  ref={addToTitleRefs}
                  className={`font-display font-black tracking-tight uppercase leading-[0.9] text-[clamp(3rem,7vw,7rem)] ${
                    line === 'SLICE.' ? 'text-terracotta' : 'text-charcoal'
                  }`}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>

          {/* Supporting Copy */}
          <div ref={subtitleRef} className="space-y-4 max-w-md pt-2">
            <p className="font-serif italic text-xl sm:text-2xl text-charcoal/85 leading-snug">
              Slow fermented dough.<br />
              Fire-finished perfection.
            </p>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              Scroll to explore the sequence ↓
            </p>
          </div>
        </div>

        {/* Right Column: Hero Pizza Showcase with Generous Whitespace */}
        <div
          ref={visualRef}
          className="lg:col-span-6 relative flex items-center justify-center p-4 sm:p-8"
        >
          {/* Soft circular aura */}
          <div className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full bg-paper border border-charcoal/5 shadow-artisanal -z-0" />

          {/* Pizza Preview Platter Image */}
          <div className="relative z-10 w-full max-w-[440px] aspect-square rounded-full overflow-hidden p-3 group">
            <img
              src="/assets/flavor_classic.jpg"
              alt="Artisanal Neapolitan Pizza fresh from 900F oven"
              className="w-full h-full object-cover rounded-full shadow-2xl transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Origin Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-paper/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-charcoal/10 text-[10px] font-mono tracking-widest uppercase text-charcoal shadow-sm">
              SAN MARZANO DOP • FIOR DI LATTE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
