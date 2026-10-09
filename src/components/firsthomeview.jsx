import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, MapPin, ArrowUpRight, Flame, Sparkles, Clock } from 'lucide-react';
import {
  TOTAL_FIRSTHOMEVIEW_FRAMES,
  getFirstHomeViewFrameFilename,
  drawFrameToCanvas,
} from '../utils/frameLoader';
import { attachMagnetic } from '../utils/animationHelpers';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section Four: First Home View Canvas Animation & Closing Experience
 * Dedicated 240-frame sequence driven by public/firsthomeview/ with dynamic ScrollTrigger end calculation,
 * 100% zoom support, responsive canvas composition, editorial craft copy, and functional CTAs (No footer).
 */
export default function FirstHomeView({ onOpenOrder, onOpenLocations }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  const currentFrameIndexRef = useRef(0);
  const scrollTriggerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    let isMounted = true;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Direct render helper without triggering React state updates on scroll
    const renderFrame = (index) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const context = cvs.getContext('2d');
      if (!context) return;

      const total = imagesRef.current.length || TOTAL_FIRSTHOMEVIEW_FRAMES;
      const clampedIndex = Math.max(0, Math.min(total - 1, index));
      const images = imagesRef.current;
      const img = images[clampedIndex] || images[0];

      if (img && img.complete && img.naturalWidth > 0) {
        drawFrameToCanvas(cvs, context, img, 'cover');
      }
    };

    // Preload all 240 frames from /firsthomeview/
    const images = new Array(TOTAL_FIRSTHOMEVIEW_FRAMES);
    for (let i = 0; i < TOTAL_FIRSTHOMEVIEW_FRAMES; i++) {
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
      img.src = getFirstHomeViewFrameFilename(i);
      images[i] = img;
    }
    imagesRef.current = images;

    // Render initial frame immediately if already cached
    if (images[0]?.complete) {
      renderFrame(0);
    }

    // Set up dedicated GSAP ScrollTrigger with dynamic 100% zoom scroll distance
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctxGsap = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(
          window.innerHeight * (window.innerWidth < 768 ? 2.5 : 3.2),
          (imagesRef.current.length || TOTAL_FIRSTHOMEVIEW_FRAMES) * (window.innerWidth < 768 ? 10 : 13)
        )}`,
        pin: true,
        pinSpacing: true,
        scrub: isReducedMotion ? false : 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!isMounted) return;
          const progress = Math.max(0, Math.min(1, self.progress));
          const currentTotal = imagesRef.current.length || TOTAL_FIRSTHOMEVIEW_FRAMES;
          const frameIndex = progress >= 1
            ? currentTotal - 1
            : Math.min(currentTotal - 1, Math.floor(progress * currentTotal));

          currentFrameIndexRef.current = frameIndex;
          renderFrame(frameIndex);

          // Dynamic smooth opacity for text overlay
          if (contentRef.current && !isReducedMotion) {
            if (progress > 0.85) {
              gsap.to(contentRef.current, { opacity: 1, scale: 1, duration: 0.2, overwrite: 'auto' });
            }
          }
        },
      });

      // Initial redraw
      renderFrame(currentFrameIndexRef.current);
      ScrollTrigger.refresh();
    }, section);

    // Subtle pointer spotlight glow
    const handleMouseMove = (e) => {
      if (isReducedMotion || !spotlightRef.current) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(spotlightRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    // ResizeObserver to ensure canvas stays razor-sharp across all zoom levels and viewports
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (!isMounted) return;
        renderFrame(currentFrameIndexRef.current);
      });
      resizeObserver.observe(section);
    }

    const handleResize = () => {
      if (!isMounted) return;
      renderFrame(currentFrameIndexRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Attach magnetic hover response to primary buttons
    const cleanup1 = attachMagnetic(btn1Ref.current, 0.2);
    const cleanup2 = attachMagnetic(btn2Ref.current, 0.2);

    return () => {
      isMounted = false;
      section.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      ctxGsap.revert();
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, []);

  return (
    <section
      id="firsthomeview"
      ref={sectionRef}
      className="firsthomeview-section relative w-full h-screen h-[100svh] overflow-hidden bg-[#171717] text-[#FFFDF9] select-none z-20"
      style={{
        position: 'relative',
        isolation: 'isolate',
        width: '100%',
        height: '100vh',
        backgroundColor: '#171717',
      }}
    >
      {/* Fullscreen Dedicated FirstHomeView Canvas */}
      <canvas
        ref={canvasRef}
        className="firsthomeview__canvas absolute inset-0 w-full h-full block"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        aria-label="First home view artisanal pizza frame sequence"
      />

      {/* Atmospheric Cinematic Dark Overlay Gradient for maximum typography contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/50 to-[#171717]/70 pointer-events-none z-10" />

      {/* Interactive Pointer Fire Spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div
          ref={spotlightRef}
          className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full bg-[#B9573F]/25 blur-[140px] pointer-events-none"
        />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[#7A523A]/20 blur-[150px] pointer-events-none" />
      </div>

      {/* Main Structural Layout Wrapper: Top Bar, Central Content, Bottom Closing Bar */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between py-6 sm:py-10">
        
        {/* ========================================================= */}
        {/* TOP STATUS BAR                                            */}
        {/* ========================================================= */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-[#FFFDF9]/60 uppercase border-b border-[#FFFDF9]/10 pb-4 sm:pb-6 pointer-events-none">
          <div className="flex items-center gap-2 font-bold text-[#FFFDF9]">
            <span className="w-2 h-2 rounded-full bg-[#B9573F] animate-pulse" />
            <span>VELOCE CRAFT LAB</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Flame size={12} className="text-[#B9573F]" />
            <span>900°F BEECHWOOD FIRE • 60S FLASH BAKE</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTRAL EDITORIAL CRAFT CONTENT & CTAs                   */}
        {/* ========================================================= */}
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto py-6 sm:py-10 space-y-5 sm:space-y-7"
        >
          {/* Sub-Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFFDF9]/15 bg-[#FFFDF9]/5 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-ultra uppercase text-[#B9573F] shadow-sm font-semibold">
            <Sparkles size={13} className="text-[#B9573F]" />
            <span>THE ULTIMATE SLICE</span>
          </div>

          {/* Big Editorial Headline */}
          <div className="space-y-1 sm:space-y-2">
            <h2 className="font-display font-black tracking-tight uppercase leading-[0.9] text-[clamp(2.5rem,6.5vw,6rem)] text-[#FFFDF9]">
              MADE FOR <span className="text-[#B9573F]">THE SLICE.</span>
            </h2>
          </div>

          {/* Supporting Editorial Story Copy */}
          <p className="font-serif italic text-sm sm:text-lg md:text-xl text-[#FFFDF9]/85 max-w-xl leading-relaxed">
            72-hour sourdough cold fermentation. Hand-crushed San Marzano D.O.P. dawn-pulled Fior di Latte. Baked at 900°F into pure memory.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-2 sm:pt-4 w-full sm:w-auto">
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

        {/* ========================================================= */}
        {/* BOTTOM AMBIENT CLOSING STATUS (ZERO FOOTER)               */}
        {/* ========================================================= */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FFFDF9]/50 uppercase border-t border-[#FFFDF9]/10 pt-4 sm:pt-6 gap-2 pointer-events-none">
          <div>
            <span>VELOCE ARTISANAL PIZZA • NAPOLI 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span>ALL RIGHTS RESERVED</span>
            <span>•</span>
            <span className="text-[#B9573F] font-semibold">SLOW CRAFT • FAST OBSESSION</span>
          </div>
        </div>

      </div>
    </section>
  );
}
