import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ isReady, progress = 0, onComplete }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (isReady && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.45,
        ease: 'power2.inOut',
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
      });
    }
  }, [isReady, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-cream text-charcoal flex flex-col justify-between p-8 md:p-14 select-none"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs tracking-widest font-mono uppercase text-muted">
        <span className="font-bold text-charcoal">VELOCE</span>
        <span>NAPOLI 2026</span>
      </div>

      {/* Center Minimal Luxury Brand Focus */}
      <div ref={contentRef} className="max-w-xl mx-auto text-center space-y-5">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-charcoal uppercase leading-none">
          VELOCE
        </h1>

        <div className="flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          <p className="text-xs sm:text-sm font-mono tracking-ultra uppercase text-terracotta font-semibold">
            PREPARING THE DOUGH
          </p>
        </div>

        {/* Minimal Progress Bar & Percentage */}
        <div className="w-48 sm:w-64 mx-auto space-y-2 pt-2">
          <div className="h-1 bg-charcoal/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-terracotta rounded-full transition-all duration-150 ease-out"
              style={{ width: `${Math.max(8, progress)}%` }}
            />
          </div>
          <div className="text-[11px] font-mono tracking-widest text-muted">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Bottom Subtle Note */}
      <div className="text-center text-[10px] font-mono tracking-widest text-muted uppercase">
        72-HOUR SOURDOUGH • 900°F VOLCANIC FIRE
      </div>
    </div>
  );
}
