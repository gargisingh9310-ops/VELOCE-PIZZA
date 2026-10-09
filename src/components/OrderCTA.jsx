import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, MapPin, ArrowUpRight, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OrderCTA({ onOpenOrder, onOpenLocations }) {
  const containerRef = useRef(null);
  const titleLinesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleLinesRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1.0,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
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
      id="order"
      ref={containerRef}
      className="order-cta-section relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-[#B9573F] text-[#FFFDF9] px-6 sm:px-12 py-24 select-none z-20"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#B9573F',
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
        
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFFDF9]/30 bg-[#9A432E]/60 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-[#FFFDF9] shadow-md">
          <Flame size={13} className="text-[#FFFDF9] animate-pulse" />
          <span>OVENS FIRED AT 900°F • NAPOLI & WORLDWIDE</span>
        </div>

        {/* Editorial Headline */}
        <div className="space-y-1">
          {['TASTE THE', 'OBSESSION.'].map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <div
                ref={addToTitleRefs}
                className="font-display font-black tracking-tight uppercase leading-[0.92] text-[clamp(2.75rem,7vw,7rem)] text-[#FFFDF9]"
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        <p className="font-sans text-base sm:text-xl text-[#FFFDF9]/90 max-w-lg pt-2 leading-relaxed">
          Order for immediate priority delivery or reserve your table at our artisanal outposts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto pt-4">
          <button
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-8 md:px-10 py-4 sm:py-5 rounded-full bg-[#FFFDF9] hover:bg-[#F7F4EF] text-[#171717] font-mono text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag size={16} className="text-[#B9573F]" />
            <span>ORDER ONLINE</span>
            <ArrowUpRight size={16} className="text-[#B9573F]" />
          </button>

          <button
            onClick={onOpenLocations}
            className="w-full sm:w-auto px-8 md:px-10 py-4 sm:py-5 rounded-full bg-[#9A432E]/50 hover:bg-[#FFFDF9] hover:text-[#171717] text-[#FFFDF9] font-mono text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 border border-[#FFFDF9]/30 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm group"
          >
            <MapPin size={16} className="group-hover:text-[#171717] transition-colors" />
            <span>FIND AN OUTPOST</span>
          </button>
        </div>

      </div>
    </section>
  );
}
