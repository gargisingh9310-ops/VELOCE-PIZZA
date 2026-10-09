import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, ShoppingBag, MapPin } from 'lucide-react';

export default function Header({ onOpenOrder, onOpenLocations, isAudioMuted, toggleAudio, onScrollToMenu }) {
  const headerRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.from(headerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
        return;
      }

      gsap.from(headerRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="absolute top-0 left-0 w-full z-40 pointer-events-none">
      <div className="w-full px-[clamp(24px,4vw,64px)] py-6 flex items-center justify-between">
        
        {/* Left: Minimal Wordmark with Origin */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <a
            href="#"
            className="font-display font-black text-2xl sm:text-3xl tracking-tight text-charcoal hover:text-terracotta transition-colors uppercase leading-none"
          >
            VELOCE
          </a>
          <span className="text-muted text-xs font-mono">·</span>
          <span className="font-mono text-[10px] tracking-ultra text-muted uppercase font-semibold">
            NAPOLI 2026
          </span>
        </div>

        {/* Right: Minimal Actions */}
        <div className="pointer-events-auto flex items-center gap-4 sm:gap-6">
          {/* Sound Ambience Toggle */}
          <button
            onClick={toggleAudio}
            className="group flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-muted hover:text-charcoal transition-colors py-1 cursor-pointer"
            aria-label="Toggle sound ambience"
          >
            {isAudioMuted ? (
              <VolumeX size={13} className="text-muted group-hover:text-terracotta transition-colors" />
            ) : (
              <Volume2 size={13} className="text-terracotta group-hover:scale-110 transition-transform" />
            )}
            <span className="hidden sm:inline-block">{isAudioMuted ? 'SOUND' : 'SOUND ON'}</span>
          </button>

          {/* Locations Link */}
          <button
            onClick={onOpenLocations}
            className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-muted hover:text-charcoal transition-colors py-1 cursor-pointer"
          >
            <MapPin size={12} className="text-muted" />
            <span>OUTPOSTS</span>
          </button>

          {/* Menu Link */}
          <button
            onClick={onScrollToMenu}
            className="hidden sm:inline-block font-mono text-[11px] tracking-widest text-muted hover:text-charcoal transition-colors py-1 cursor-pointer"
          >
            MENU
          </button>

          {/* Order Action Button */}
          <button
            onClick={onOpenOrder}
            className="flex items-center gap-2 bg-charcoal hover:bg-terracotta text-paper px-4 sm:px-5 py-2 rounded-full font-mono text-[11px] tracking-widest uppercase font-semibold transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
          >
            <ShoppingBag size={12} />
            <span>ORDER</span>
          </button>
        </div>

      </div>
    </header>
  );
}
