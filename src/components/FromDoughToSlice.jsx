import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Flame, Scissors, ChefHat } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_CARDS = [
  {
    number: '01',
    step: 'STAGE 01',
    title: 'TOPPING',
    subtitle: 'MICRO-DAIRY HARMONY',
    badge: 'RAW FRESHNESS',
    image: '/assets/dough_craft.jpg',
    description:
      'Hand-stretched 72h cold fermented sourdough topped with hand-crushed San Marzano D.O.P. tomatoes, dawn-pulled Fior di Latte, and sweet Genovese basil.',
    icon: ChefHat,
  },
  {
    number: '02',
    step: 'STAGE 02',
    title: 'FIRE',
    subtitle: '900°F BEECHWOOD BLISTER',
    badge: '60s FLASH BAKE',
    image: '/assets/wood_oven.jpg',
    description:
      'Slid onto volcanic Biscotto stone in an oak-fueled oven at 900°F. Blistered in sixty seconds into airy, cloud-like leopard spots with smoky Maillard finish.',
    icon: Flame,
  },
  {
    number: '03',
    step: 'STAGE 03',
    title: 'SLICE',
    subtitle: 'SERVED INSTANTLY',
    badge: 'ZERO DELAY',
    image: '/assets/flavor_classic.jpg',
    description:
      'Portioned with precision culinary shears to protect the fragile alveoli honeycomb structure. Paper-thin crispy shell with molten, aromatic core.',
    icon: Scissors,
  },
];

export default function FromDoughToSlice() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (isReducedMotion) {
        tl.from([labelRef.current, headingRef.current, descRef.current, ...cardsRef.current], {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
        return;
      }

      // 1. Section label reveal
      tl.from(labelRef.current, {
        opacity: 0,
        y: isMobile ? 15 : 25,
        duration: 0.6,
        ease: 'power3.out',
      })
      // 2. Main heading line reveal
      .from(
        headingRef.current,
        {
          opacity: 0,
          y: isMobile ? 20 : 35,
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 0.8,
          ease: 'power4.out',
        },
        '-=0.35'
      )
      // 3. Supporting description reveal
      .from(
        descRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.65,
          ease: 'power3.out',
        },
        '-=0.45'
      )
      // 4. Cards progressive stagger reveal (01 -> 02 -> 03)
      .from(
        cardsRef.current,
        {
          opacity: 0,
          y: isMobile ? 25 : 50,
          stagger: 0.16,
          duration: 0.85,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      // 5. Card images subtle scale reveal
      .from(
        imagesRef.current,
        {
          scale: 0.94,
          opacity: 0.7,
          stagger: 0.16,
          duration: 0.95,
          ease: 'power3.out',
        },
        '<'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToImagesRef = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="from-dough-to-slice-section relative bg-[#F7F4EF] text-[#171717] py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-12 select-none z-10"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#F7F4EF',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#171717]/10 gap-6">
          <div>
            <div
              ref={labelRef}
              className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#B9573F] mb-2 font-bold"
            >
              <Clock size={13} className="text-[#B9573F]" />
              <span>72-HOUR CRAFT CHRONOLOGY</span>
            </div>
            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#171717] leading-none"
              >
                FROM DOUGH <span className="text-[#B9573F]">TO SLICE.</span>
              </h2>
            </div>
          </div>
          <p
            ref={descRef}
            className="font-serif italic text-sm sm:text-base text-[#6B675F] max-w-md leading-relaxed"
          >
            A relentless ritual of slow natural fermentation, intense radiant volcanic heat, and instant table delivery.
          </p>
        </div>

        {/* 3 Balanced Cards Grid: Desktop 3 columns, Tablet 2-3 cols, Mobile 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PROCESS_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.number}
                ref={addToCardsRef}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#FFFDF9] border border-[#171717]/10 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#B9573F]/30 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#B9573F] px-2.5 py-1 rounded-full bg-[#B9573F]/10 border border-[#B9573F]/20 transition-transform duration-300 group-hover:scale-105">
                      {card.number}
                    </span>
                    <span className="text-[11px] font-mono tracking-widest text-[#6B675F] uppercase font-semibold">
                      {card.step}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-[#6B675F] px-2.5 py-0.5 rounded-full border border-[#171717]/10 uppercase bg-[#F7F4EF]/60">
                    {card.badge}
                  </span>
                </div>

                {/* Card Featured Image */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#F7F4EF] border border-[#171717]/5">
                  <img
                    ref={addToImagesRef}
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Floating Action Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#FFFDF9]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#171717]/10 flex items-center gap-1.5 shadow-xs transition-transform duration-300 group-hover:translate-x-0.5">
                    <IconComponent size={12} className="text-[#B9573F] transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#171717]">
                      {card.title}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-3">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight group-hover:text-[#B9573F] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <div className="text-xs font-mono tracking-widest text-[#6B675F] uppercase font-semibold mt-0.5">
                    {card.subtitle}
                  </div>
                </div>

                {/* Description Body */}
                <p className="font-sans text-xs sm:text-sm text-[#171717]/80 leading-relaxed border-t border-[#171717]/10 pt-3 mt-auto">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
