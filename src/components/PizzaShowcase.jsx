import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PIZZAS = [
  {
    id: 'margherita-classica',
    name: 'THE CLASSIC',
    desc: 'San Marzano D.O.P. · Fior di Latte · Fresh Basil · EVOO',
    price: '$22',
    rawPrice: 22,
    badge: 'SIGNATURE',
    image: '/assets/flavor_classic.jpg',
  },
  {
    id: 'diavola-nduja',
    name: 'THE FIRE',
    desc: 'Calabrian ‘Nduja · Spianata Piccante · Smoked Mozzarella · Hot Honey',
    price: '$26',
    rawPrice: 26,
    badge: 'SPICY',
    image: '/assets/flavor_fire.jpg',
  },
  {
    id: 'burrata-pistachio',
    name: 'THE GARDEN',
    desc: 'Charred Zucchini · Roasted Asparagus · Stracciatella · Basil Pesto',
    price: '$24',
    rawPrice: 24,
    badge: 'FRESH',
    image: '/assets/flavor_garden.jpg',
  },
  {
    id: 'tartufo-funghi',
    name: 'THE TRUFFLE',
    desc: 'Wild Chanterelles · White Truffle Crema · 24M Taleggio · Thyme',
    price: '$32',
    rawPrice: 32,
    badge: 'LUXURY',
    image: '/assets/flavor_truffle.jpg',
  },
];

export default function PizzaShowcase({ onSelectPizza }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      if (isReducedMotion) {
        tl.from(['.showcase-header-elem', ...cardsRef.current], {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
        return;
      }

      // 1. Header elements
      tl.from('.showcase-header-elem', {
        opacity: 0,
        y: isMobile ? 15 : 25,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })
      // 2. Product cards stagger
      .from(
        cardsRef.current,
        {
          opacity: 0,
          y: isMobile ? 25 : 40,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.35'
      )
      // 3. Card images scale in
      .from(
        '.showcase-card-img',
        {
          scale: 0.94,
          opacity: 0.8,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '<'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="menu"
      ref={containerRef}
      className="pizza-showcase-section relative bg-[#F7F4EF] text-[#171717] py-24 sm:py-32 px-6 sm:px-12 select-none z-10"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#F7F4EF',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#171717]/10 gap-6">
          <div>
            <div className="showcase-header-elem font-mono text-xs tracking-ultra uppercase text-[#B9573F] mb-2 flex items-center gap-2 font-bold">
              <Sparkles size={13} className="text-[#B9573F]" />
              <span>ARTISANAL ARCHETYPES</span>
            </div>
            <h2 className="showcase-header-elem font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#171717] leading-none">
              PIZZA <span className="text-[#B9573F]">COLLECTION.</span>
            </h2>
          </div>
          <p className="showcase-header-elem font-serif italic text-sm sm:text-base text-[#6B675F] max-w-md leading-relaxed">
            Hand-stretched from 72-hour cold fermented sourdough, fired for 60 seconds at 900°F over volcanic oak coals.
          </p>
        </div>

        {/* 4-Column Clean Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PIZZAS.map((pizza) => (
            <div
              key={pizza.id}
              ref={addToCardsRef}
              className="group flex flex-col justify-between bg-[#FFFDF9] rounded-3xl p-5 border border-[#171717]/10 hover:border-[#B9573F]/40 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Micro-Zoom */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-[#F7F4EF] relative">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="showcase-card-img w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Badge */}
                  <div className="absolute top-3 left-3 bg-[#FFFDF9]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#171717]/10 text-[10px] font-mono tracking-wider font-bold text-[#B9573F] shadow-xs">
                    {pizza.badge}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <h3 className="font-display font-black text-xl text-[#171717] uppercase tracking-tight group-hover:text-[#B9573F] transition-colors duration-300">
                    {pizza.name}
                  </h3>
                  <p className="font-sans text-xs text-[#6B675F] leading-relaxed line-clamp-2">
                    {pizza.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Order CTA */}
              <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between mt-auto">
                <span className="font-display font-black text-2xl text-[#171717]">
                  {pizza.price}
                </span>

                <button
                  onClick={() =>
                    onSelectPizza &&
                    onSelectPizza({
                      id: pizza.id,
                      name: pizza.name,
                      price: pizza.rawPrice,
                    })
                  }
                  className="group/btn flex items-center gap-1.5 bg-[#171717] hover:bg-[#B9573F] text-[#FFFDF9] px-4 py-2 rounded-xl font-mono text-[11px] tracking-wider uppercase font-bold transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
                >
                  <Plus size={13} className="transition-transform duration-300 group-hover/btn:rotate-90" />
                  <span>ADD TO ORDER</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
