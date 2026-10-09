import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Flame, Sparkles } from 'lucide-react';
import './ScrollExpand.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * React Bits ScrollExpand Component
 * A rounded media frame that smoothly expands to full bleed as the user scrolls.
 */
export default function ScrollExpand({
  src = '/pizza-frames/ezgif-frame-001.jpg',
  alt = 'Veloce Artisanal Pizza',
  title = 'NAPOLI 2026 • THE ART OF DOUGH',
  scrollHint = 'Scroll to Explore',
  mediaZoom = 1.35,
  useWindowScroll = true,
  children,
  className = '',
}) {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);
  const glowRef = useRef(null);

  // Fallback image source in case the provided src doesn't exist
  const resolvedSrc = src === '/pizza-frames/frame_000.jpg' ? '/pizza-frames/ezgif-frame-001.jpg' : src;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    const card = cardRef.current;
    const image = imageRef.current;

    if (!container || !card || !image) return;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        // Static clean presentation for reduced motion
        gsap.set(card, {
          width: '100%',
          height: '100%',
          borderRadius: '0px',
        });
        gsap.set(image, { scale: 1 });
        return;
      }

      // Initial card dimensions calculation helper
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;

      const initialWidth = isMobile ? 'min(90vw, 440px)' : isTablet ? 'min(86vw, 760px)' : 'min(80vw, 920px)';
      const initialHeight = isMobile ? 'min(68vh, 520px)' : isTablet ? 'min(64vh, 560px)' : 'min(60vh, 580px)';
      const initialRadius = isMobile ? '20px' : '28px';

      // Set initial starting styles
      gsap.set(card, {
        width: initialWidth,
        height: initialHeight,
        borderRadius: initialRadius,
      });
      gsap.set(image, {
        scale: 1,
      });

      // Opening entrance animation for the hero
      const entranceTl = gsap.timeline({ delay: 0.15 });
      entranceTl
        .from(card, {
          opacity: 0,
          scale: 0.94,
          duration: 1.0,
          ease: 'power3.out',
        })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: -15,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          contentRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: 'power4.out',
          },
          '-=0.6'
        )
        .from(
          hintRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.5'
        );

      if (useWindowScroll) {
        // Main Scroll-driven expansion timeline
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // 1. Expand Card to Full Viewport Bleed
        scrollTl
          .to(
            card,
            {
              width: '100vw',
              height: '100vh',
              borderRadius: '0px',
              ease: 'none',
            },
            0
          )
          // 2. Smoothly Zoom Media Image
          .to(
            image,
            {
              scale: mediaZoom,
              ease: 'none',
            },
            0
          )
          // 3. Fade out the scroll hint early in scroll
          .to(
            hintRef.current,
            {
              opacity: 0,
              y: 15,
              ease: 'power2.in',
            },
            0
          );
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [mediaZoom, useWindowScroll]);

  return (
    <section
      ref={containerRef}
      id="scroll-expand-hero"
      className={`scroll-expand-section select-none ${className}`}
      aria-label="Hero Showcase"
    >
      {/* Sticky Fullscreen Frame */}
      <div ref={stickyRef} className="scroll-expand-sticky">
        {/* Warm Ambient Glow Backdrop */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-[#B9573F]/8 blur-[160px]" />
        </div>

        {/* Expanding Media Card */}
        <div ref={cardRef} className="scroll-expand-card">
          {/* Background Pizza Media Image */}
          <img
            ref={imageRef}
            src={resolvedSrc}
            alt={alt}
            onError={(e) => {
              // Ensure asset availability
              if (e.currentTarget.src !== '/pizza-frames/ezgif-frame-001.jpg') {
                e.currentTarget.src = '/pizza-frames/ezgif-frame-001.jpg';
              }
            }}
            className="scroll-expand-media"
            loading="eager"
          />

          {/* Cinematic Dark Ambient Gradient Overlay */}
          <div className="scroll-expand-overlay" />

          {/* Top Bar: Title Eyebrow / Origin Badge */}
          <div
            ref={titleRef}
            className="relative z-10 w-full p-6 sm:p-8 md:p-10 flex items-center justify-between pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono tracking-ultra uppercase text-white/90 shadow-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9573F] animate-pulse" />
              <span>{title}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/60">
              <Flame size={12} className="text-[#B9573F]" />
              <span>900°F BEECHWOOD FIRE</span>
            </div>
          </div>

          {/* Center Stage: Hero Typography Content */}
          <div
            ref={contentRef}
            className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-12 py-4 text-center flex flex-col items-center justify-center my-auto"
          >
            {children ? (
              children
            ) : (
              <>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 uppercase tracking-tight leading-[0.95] drop-shadow-md">
                  Every slice crafted to perfection
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl font-serif italic leading-relaxed drop-shadow-sm">
                  Slow cold fermentation, stone baked at 900°F with premium ingredients.
                </p>
              </>
            )}
          </div>

          {/* Bottom Bar: Scroll Hint */}
          <div
            ref={hintRef}
            className="relative z-10 w-full p-6 sm:p-8 md:p-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/80 pointer-events-none"
          >
            <span className="font-semibold text-white/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9573F]" />
              VELOCE ARTISANAL PIZZA
            </span>

            {scrollHint && (
              <div className="flex items-center gap-2 text-white/90">
                <span>{scrollHint}</span>
                <ArrowDown size={13} className="text-[#B9573F] animate-bounce" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
