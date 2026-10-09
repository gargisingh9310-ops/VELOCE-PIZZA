import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorState, setCursorState] = useState({
    type: 'default', // 'default', 'pointer', 'flavor', 'cta', 'drag'
    text: '',
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('has-custom-cursor');

    const mouse = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Global listener for data-cursor attributes
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        const cursorText = target.getAttribute('data-cursor-text') || '';
        setCursorState({ type: cursorType, text: cursorText });
      } else if (e.target.closest('button, a, input, select, [role="button"]')) {
        setCursorState({ type: 'pointer', text: '' });
      } else {
        setCursorState({ type: 'default', text: '' });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Smooth lerp loop
    const ticker = gsap.ticker.add(() => {
      dotPos.x += (mouse.x - dotPos.x) * 0.7;
      dotPos.y += (mouse.y - dotPos.y) * 0.7;

      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }
    });

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -mt-1 -ml-1 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${cursorState.type === 'flavor' || cursorState.type === 'cta' ? 'bg-terracotta' : 'bg-charcoal'}`}
      />

      {/* Trailing Interactive Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorState.type === 'flavor'
            ? '-mt-8 -ml-8 w-16 h-16 bg-terracotta text-paper shadow-md scale-100'
            : cursorState.type === 'cta'
            ? '-mt-7 -ml-7 w-14 h-14 bg-charcoal text-paper shadow-md scale-100'
            : cursorState.type === 'drag'
            ? '-mt-6 -ml-6 w-12 h-12 border border-terracotta bg-paper/90 text-terracotta backdrop-blur-xs scale-100'
            : cursorState.type === 'pointer'
            ? '-mt-5 -ml-5 w-10 h-10 border border-charcoal/30 bg-paper/40 backdrop-blur-[2px] scale-100'
            : '-mt-3 -ml-3 w-6 h-6 border border-charcoal/20 scale-100'
        }`}
      >
        {cursorState.text}
      </div>
    </>
  );
}
