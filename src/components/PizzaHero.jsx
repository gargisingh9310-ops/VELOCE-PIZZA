import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PIZZA_CHAPTERS } from '../data/pizzaStory';
import { TOTAL_FRAMES, getFrameFilename, drawFrameToCanvas } from '../utils/frameLoader';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section One: Fullscreen Cinematic Canvas Hero
 * 100% width x 100vh frame sequence driven by 240 pizza frames with dynamic ScrollTrigger end calculation,
 * bulletproof 100% zoom support, and top-right pure white editorial typography.
 */
export default function PizzaHero({ loadedFrames }) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const storyContentRef = useRef(null);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const currentFrameIndexRef = useRef(0);
  const scrollTriggerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    let isMounted = true;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Direct render helper without triggering React re-renders during scroll
    const renderFrame = (index) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const context = cvs.getContext('2d');
      if (!context) return;

      const total = imagesRef.current.length || TOTAL_FRAMES;
      const clampedIndex = Math.max(0, Math.min(total - 1, index));
      const images = imagesRef.current;
      const img = images[clampedIndex] || images[0];

      if (img && img.complete && img.naturalWidth > 0) {
        drawFrameToCanvas(cvs, context, img, cvs.clientWidth < 768 ? 'hero-mobile' : 'cover');
      }
    };

    // Transition helper for story rail
    const transitionStory = (nextIdx) => {
      if (storyContentRef.current) {
        gsap.timeline()
          .to(storyContentRef.current, {
            opacity: 0,
            y: -8,
            duration: 0.16,
            ease: 'power2.in',
          })
          .set(storyContentRef.current, {
            y: 8,
          })
          .to(storyContentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power3.out',
          });
      }
    };

    // Initialize & preload frames if not already provided
    if (loadedFrames && loadedFrames.length === TOTAL_FRAMES && loadedFrames[0]?.complete) {
      imagesRef.current = loadedFrames;
      renderFrame(0);
    } else {
      const images = new Array(TOTAL_FRAMES);
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.onload = () => {
          if (!isMounted) return;
          images[i] = img;
          if (i === 0) {
            renderFrame(0);
          }
        };
        img.onerror = () => {
          if (!isMounted) return;
          images[i] = null;
        };
        img.src = getFrameFilename(i);
        images[i] = img;
      }
      imagesRef.current = images;

      if (images[0]?.complete) {
        renderFrame(0);
      }
    }

    // Set up GSAP ScrollTrigger pinning for the fullscreen hero with dynamic 100% zoom scroll distance
    const ctxGsap = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: () => `+=${Math.max(
          window.innerHeight * (window.innerWidth < 768 ? 2.5 : 3.5),
          (imagesRef.current.length || TOTAL_FRAMES) * (window.innerWidth < 768 ? 12 : 15)
        )}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!isMounted) return;
          const progress = Math.max(0, Math.min(1, self.progress));
          const currentTotal = imagesRef.current.length || TOTAL_FRAMES;
          const frameIndex = progress >= 1
            ? currentTotal - 1
            : Math.min(currentTotal - 1, Math.floor(progress * currentTotal));

          currentFrameIndexRef.current = frameIndex;
          renderFrame(frameIndex);

          // Match progress against chapters
          let currentIdx = PIZZA_CHAPTERS.findIndex(
            (ch) => progress >= ch.start && progress <= ch.end
          );
          if (currentIdx === -1) {
            currentIdx = progress >= 0.85 ? PIZZA_CHAPTERS.length - 1 : 0;
          }

          if (currentIdx !== activeIndexRef.current) {
            activeIndexRef.current = currentIdx;
            setActiveChapterIndex(currentIdx);
            transitionStory(currentIdx);
          }
        },
      });

      // Initial redraw & refresh
      renderFrame(currentFrameIndexRef.current);
      ScrollTrigger.refresh();
    }, hero);

    // ResizeObserver to keep canvas razor-sharp on resize / DPR / zoom changes
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (!isMounted) return;
        renderFrame(currentFrameIndexRef.current);
      });
      resizeObserver.observe(hero);
    }

    const handleResize = () => {
      if (!isMounted) return;
      renderFrame(currentFrameIndexRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      ctxGsap.revert();
    };
  }, [loadedFrames]);

  const activeChapter = PIZZA_CHAPTERS[activeChapterIndex] || PIZZA_CHAPTERS[0];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="pizza-hero relative w-full h-screen h-[100svh] overflow-hidden bg-[#F7F4EF] text-white select-none z-10"
      style={{
        position: 'relative',
        isolation: 'isolate',
        width: '100%',
        height: '100vh',
        backgroundColor: '#F7F4EF',
      }}
    >
      {/* Fullscreen Edge-to-Edge Cinematic Canvas */}
      <canvas
        ref={canvasRef}
        className="pizza-hero__canvas absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        aria-label="Cinematic pizza preparation animation"
      />

      {/* Top-Right Origin Eyebrow */}
      <div className="absolute top-[clamp(20px,3.5vh,28px)] right-[clamp(20px,5vw,80px)] z-20 pointer-events-none text-right">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/80 font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
          NAPOLI 2026 · THE ART OF DOUGH
        </span>
      </div>

      {/* Responsive Top-Right Storytelling Text Overlay */}
      <div className="pizza-story-copy absolute right-[clamp(20px,5vw,80px)] top-[clamp(68px,11vh,100px)] w-[clamp(240px,28vw,380px)] max-w-sm z-20 pointer-events-none text-right flex flex-col items-end">
        <div ref={storyContentRef} className="space-y-2 sm:space-y-3 flex flex-col items-end text-right w-full">
          {/* Chapter Number & Subtitle */}
          <div className="flex items-center justify-end gap-2.5">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-ultra text-white/90 uppercase font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {activeChapter.subtitle}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9573F] shadow-xs" />
            <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {activeChapter.number}
            </span>
          </div>

          {/* Main Chapter Title */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[0.95] text-right drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {activeChapter.title}
          </h1>

          {/* Chapter Description */}
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-white/90 leading-relaxed max-w-[280px] sm:max-w-[340px] text-right drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
            {activeChapter.description}
          </p>
        </div>
      </div>

      {/* Bottom-Right Quiet Editorial Scroll Indicator */}
      <div className="absolute bottom-[clamp(20px,4.5vh,36px)] right-[clamp(20px,5vw,80px)] z-20 flex items-center justify-end gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-white/80 uppercase pointer-events-none text-right drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
        <span>SCROLL TO EXPLORE</span>
        <span className="text-[#B9573F] font-bold text-xs animate-bounce">↓</span>
      </div>
    </section>
  );
}
