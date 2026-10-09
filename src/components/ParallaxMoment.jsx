import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxMoment() {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const textWordsRef = useRef([]);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Subtle image movement
      tl.fromTo(
        imageWrapperRef.current,
        { yPercent: -8 },
        { yPercent: 8, ease: 'none' },
        0
      );

      // Subtle text movement in opposite direction
      if (textWordsRef.current.length > 0) {
        tl.fromTo(
          textWordsRef.current,
          { yPercent: 15 },
          { yPercent: -15, stagger: 0.04, ease: 'none' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToWordRefs = (el) => {
    if (el && !textWordsRef.current.includes(el)) {
      textWordsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-boundary min-h-[80vh] flex items-center justify-center bg-cream text-charcoal select-none px-6 sm:px-10 py-24 z-20"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Framed Parallax Food Craft Image */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-3xl border border-charcoal/10 shadow-artisanal aspect-[4/3] bg-paper">
          <div ref={imageWrapperRef} className="w-full h-[120%] -mt-[10%]">
            <img
              src="/assets/wood_oven.jpg"
              alt="Wood-fired oven heat at 900 degrees"
              className="w-full h-full object-cover filter contrast-105 brightness-95"
              loading="lazy"
            />
          </div>
          <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-charcoal/10 text-[10px] font-mono tracking-widest uppercase text-terracotta font-semibold shadow-xs">
            900°F BEECHWOOD FIRE
          </div>
        </div>

        {/* Right Column: Editorial Staccato Typography */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terracotta/20 bg-paper text-xs font-mono tracking-ultra uppercase text-terracotta shadow-xs font-semibold"
          >
            <Flame size={14} className="text-terracotta" />
            <span>60 SECONDS HEAT CONTACT</span>
          </div>

          <div className="space-y-1">
            <div ref={addToWordRefs} className="font-display font-black tracking-tight uppercase leading-[0.9] text-[clamp(2.75rem,6vw,5.5rem)] text-charcoal">
              HOT.
            </div>
            <div ref={addToWordRefs} className="font-display font-black tracking-tight uppercase leading-[0.9] text-[clamp(2.75rem,6vw,5.5rem)] text-terracotta">
              FRESH.
            </div>
            <div ref={addToWordRefs} className="font-display font-black tracking-tight uppercase leading-[0.9] text-[clamp(2.75rem,6vw,5.5rem)] text-charcoal">
              UNAPOLOGETIC.
            </div>
          </div>

          <p className="font-serif italic text-lg sm:text-xl text-charcoal/80 max-w-md pt-2 leading-relaxed">
            “No shortcuts. No concessions. Just pure Neapolitan heat, wild fermentation, and time-tested reverence.”
          </p>
        </div>
      </div>
    </section>
  );
}
