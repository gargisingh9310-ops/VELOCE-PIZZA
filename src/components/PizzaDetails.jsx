import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crosshair, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS = [
  {
    id: 'edge',
    label: 'CRISP CORNICIONE',
    subtitle: 'Honeycomb Air Pockets',
    description: 'High-hydration alveoli structure creates an airy, paper-thin crispy exterior with zero heaviness.',
    x: '22%',
    y: '28%',
    spec: '80% Hydration • 0.3mm Shell',
  },
  {
    id: 'cheese',
    label: 'MELTED FIOR DI LATTE',
    subtitle: 'Raw Monti Lattari Milk',
    description: 'Fresh cow milk curds hand-pulled at dawn. Melts into rich, velvety pools with clean dairy sweetness.',
    x: '62%',
    y: '42%',
    spec: '160°F Core Melt • Zero Whey Drip',
  },
  {
    id: 'basil',
    label: 'FRESH GENOVESE BASIL',
    subtitle: 'Baby Leaves DOP',
    description: 'Hand-plucked leaves laid raw on hot cheese, releasing volatile aromatic essential oils.',
    x: '48%',
    y: '58%',
    spec: 'Post-Oven Placed • Pure Aromatics',
  },
  {
    id: 'crust',
    label: 'LEOPARD SPOTS',
    subtitle: 'Volcanic Oak Char',
    description: 'Micro-blisters created by intense 900°F radiant heat on oak wood coals with smoky Maillard finish.',
    x: '76%',
    y: '68%',
    spec: '900°F Contact • Smoky Maillard',
  },
];

export default function PizzaDetails() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const previewRef = useRef(null);
  const detailCardRef = useRef(null);
  const [selectedHotspot, setSelectedHotspot] = useState(HOTSPOTS[0]);
  const hotspotElementsRef = useRef([]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (isReducedMotion) {
        tl.from([headerRef.current, previewRef.current, detailCardRef.current], {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
        return;
      }

      // 1. Header reveal
      tl.from('.details-header-elem', {
        opacity: 0,
        y: isMobile ? 15 : 30,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out',
      })
      // 2. Inspection platter frame reveal
      .from(
        previewRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.85,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      // 3. Hotspot markers pop in
      .from(
        hotspotElementsRef.current.filter(Boolean),
        {
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'back.out(1.8)',
        },
        '-=0.3'
      )
      // 4. Detail card reveal
      .from(
        detailCardRef.current,
        {
          opacity: 0,
          x: isMobile ? 0 : 30,
          y: isMobile ? 20 : 0,
          duration: 0.75,
          ease: 'power3.out',
        },
        '-=0.45'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToHotspotRefs = (el) => {
    if (el && !hotspotElementsRef.current.includes(el)) {
      hotspotElementsRef.current.push(el);
    }
  };

  return (
    <section
      id="details"
      ref={containerRef}
      className="pizza-details-section relative bg-[#F7F4EF] text-[#171717] py-24 sm:py-32 px-6 sm:px-12 z-20"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#F7F4EF',
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16 pb-6 border-b border-[#171717]/10">
          <div>
            <div className="details-header-elem text-xs font-mono tracking-widest uppercase text-[#B9573F] mb-2 flex items-center gap-2 font-semibold">
              <Crosshair size={13} className="text-[#B9573F]" />
              <span>MICROSCOPIC ANATOMY</span>
            </div>
            <h2 className="details-header-elem font-display font-black tracking-tight text-[#171717] uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
              CRAFTED <span className="text-[#B9573F]">PRECISION.</span>
            </h2>
          </div>

          <p className="details-header-elem font-sans text-sm sm:text-base text-[#6B675F] max-w-md leading-relaxed">
            Every blister, herb leaf, and milk droplet exists by deliberate design. Explore the anatomy of perfection.
          </p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Pizza Inspection Visual with Radar Hotspots */}
          <div
            ref={previewRef}
            className="lg:col-span-8 relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-[#FFFDF9] border border-[#171717]/10 p-4 flex items-center justify-center shadow-sm"
          >
            <img
              src="/assets/flavor_classic.jpg"
              alt="Artisanal Margherita pizza detail"
              className="w-full h-full object-cover rounded-2xl filter brightness-95"
              loading="lazy"
            />

            {/* Radar Hotspot Pins */}
            {HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot.id === spot.id;

              return (
                <div
                  key={spot.id}
                  ref={addToHotspotRefs}
                  style={{ top: spot.y, left: spot.x }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => setSelectedHotspot(spot)}
                    className="relative flex items-center justify-center p-2 focus:outline-none cursor-pointer"
                    aria-label={`Inspect ${spot.label}`}
                  >
                    {/* Pulsing Outer Rings */}
                    <span className="absolute w-10 h-10 rounded-full bg-[#B9573F]/25 animate-ping" />
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#B9573F] border-[#FFFDF9] text-[#FFFDF9] scale-125 shadow-md'
                        : 'bg-[#FFFDF9]/90 border-[#171717]/20 text-[#171717] hover:bg-[#B9573F] hover:text-[#FFFDF9]'
                    }`}>
                      <Crosshair size={12} />
                    </span>
                  </button>

                  {/* Desktop Label Tag */}
                  <div className={`hidden sm:block absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase backdrop-blur-md transition-all duration-300 pointer-events-none ${
                    isSelected
                      ? 'bg-[#171717] text-[#FFFDF9] font-bold scale-105 shadow-sm'
                      : 'bg-[#FFFDF9]/90 text-[#171717]/80 border border-[#171717]/10 group-hover:text-[#171717]'
                  }`}>
                    {spot.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Detail Breakdown Card */}
          <div ref={detailCardRef} className="lg:col-span-4 space-y-6">
            <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#171717]/10 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#171717]/10 pb-4">
                <span className="text-xs font-mono tracking-widest text-[#B9573F] uppercase font-bold">
                  ANATOMY SPECIFICATION
                </span>
                <span className="text-[11px] font-mono text-[#171717] px-2.5 py-0.5 rounded bg-[#F7F4EF] border border-[#171717]/10 font-semibold">
                  {selectedHotspot.spec}
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-[#171717] uppercase tracking-tight">
                  {selectedHotspot.label}
                </h3>
                <div className="text-xs font-mono tracking-widest text-[#6B675F] uppercase mt-1 font-semibold">
                  {selectedHotspot.subtitle}
                </div>
              </div>

              <p className="font-sans text-sm text-[#171717]/80 leading-relaxed">
                {selectedHotspot.description}
              </p>

              {/* Selector List */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-mono tracking-widest text-[#6B675F] uppercase mb-2">
                  SELECT COMPONENT TO ANALYZE:
                </div>
                {HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHotspot(h)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                      selectedHotspot.id === h.id
                        ? 'bg-[#B9573F] text-[#FFFDF9] font-bold shadow-xs'
                        : 'bg-[#F7F4EF] text-[#171717]/80 hover:text-[#171717] hover:bg-[#F7F4EF]/80'
                    }`}
                  >
                    <span>{h.label}</span>
                    <ChevronRight size={14} className={selectedHotspot.id === h.id ? 'translate-x-1' : ''} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
