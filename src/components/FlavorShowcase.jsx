import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FLAVORS = [
  {
    id: 'margherita-classica',
    number: '01',
    name: 'CLASSICA DOP',
    title: 'THE CLASSIC',
    eyebrow: '01 / ARCHETYPE',
    mood: 'TIMELESS PURITY',
    image: '/pizza1.jpg',
    fallbackImage: '/pizza1.png',
    description: 'San Marzano D.O.P. crushed tomatoes, fresh fior di latte di Agerola, sweet Genovese basil, and cold-pressed single-estate olive oil.',
    ingredients: ['San Marzano D.O.P.', 'Fior di Latte', 'Genovese Basil', 'Cold-Pressed EVOO'],
    price: '$22',
    priceNumber: 22,
    accentColor: '#B9573F',
    profile: '80% Hydration · 900°F Oak Wood Char · 60s Bake',
  },
  {
    id: 'diavola-nduja',
    number: '02',
    name: 'DIAVOLA & ‘NDUJA',
    title: 'THE FIRE',
    eyebrow: '02 / CALABRIA',
    mood: 'VOLCANIC HEAT',
    image: '/pizza2.jpg',
    fallbackImage: '/pizza2.png',
    description: 'Spicy Calabrian ‘Nduja paste, hand-cut crispy pepperoni cups, smoked mozzarella, and raw hot wildflower honey drizzle.',
    ingredients: ['Spicy San Marzano', 'Smoked Mozzarella', 'Crisp Pepperoni Cups', 'Hot Honey Drizzle'],
    price: '$26',
    priceNumber: 26,
    accentColor: '#C84B31',
    profile: 'Smoky Maillard · Crushed Peperoncino · Sweet Heat',
  },
  {
    id: 'burrata-pistachio',
    number: '03',
    name: 'BURRATA & PISTACHIO',
    title: 'THE GARDEN',
    eyebrow: '03 / HARVEST',
    mood: 'EARTH HARVEST',
    image: '/pizza3.jpg',
    fallbackImage: '/pizza3.png',
    description: 'Charred baby zucchini, roasted asparagus spears, whipped stracciatella, Bronte pistachio pesto, and vibrant wild herb oil.',
    ingredients: ['Charred Zucchini', 'Roasted Asparagus', 'Whipped Stracciatella', 'Bronte Pistachio'],
    price: '$24',
    priceNumber: 24,
    accentColor: '#4A6B48',
    profile: 'Raw Whole Burrata · Bronte Pistachio · Green Herb Essence',
  },
  {
    id: 'tartufo-funghi',
    number: '04',
    name: 'TARTUFO & FUNGHI',
    title: 'THE TRUFFLE',
    eyebrow: '04 / PIEDMONT',
    mood: 'UNAPOLOGETIC LUXURY',
    image: '/pizza4.jpg',
    fallbackImage: '/pizza4.png',
    description: 'Creamy white truffle emulsion, wild roasted forest chanterelles, 24-month aged Parmigiano-Reggiano, and delicate white truffle oil.',
    ingredients: ['Truffle Crema', 'Wild Chanterelles', 'Aged Parmigiano', 'White Truffle Oil'],
    price: '$32',
    priceNumber: 32,
    accentColor: '#8C6D4F',
    profile: 'Piedmont White Truffle · Forest Aromas · 24M Taleggio',
  },
];

export default function FlavorShowcase({ onSelectFlavor }) {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const sectionRef = useRef(null);
  const pizzaSlideRefs = useRef([]);
  const textSlideRefs = useRef([]);
  const indicatorRefs = useRef([]);
  const progressBarRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const activeIndexRef = useRef(0);

  // Preload all four pizza images into memory on mount
  useEffect(() => {
    FLAVORS.forEach((flavor) => {
      const img1 = new Image();
      img1.src = flavor.image;
      const img2 = new Image();
      img2.src = flavor.fallbackImage;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? 2600 : 3200;

    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      // Clean up any existing ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // Initial positions setup
      pizzaSlideRefs.current.forEach((pizza, idx) => {
        if (!pizza) return;
        if (idx === 0) {
          gsap.set(pizza, { yPercent: 0, opacity: 1 });
        } else {
          gsap.set(pizza, { yPercent: 100, opacity: 1 });
        }
      });

      textSlideRefs.current.forEach((text, idx) => {
        if (!text) return;
        if (idx === 0) {
          gsap.set(text, { opacity: 1, y: 0 });
          text.style.pointerEvents = 'auto';
        } else {
          gsap.set(text, { opacity: 0, y: 20 });
          text.style.pointerEvents = 'none';
        }
      });

      // Top Bar & Heading Entrance Reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      headerTl
        .from('.find-slice-label', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        })
        .from(
          '.find-slice-heading',
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .from(
          indicatorRefs.current.filter(Boolean),
          {
            opacity: 0,
            y: 15,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power3.out',
          },
          '-=0.45'
        );

      // Master synchronized Timeline for vertical slide & content transitions
      const tl = gsap.timeline({ paused: true });

      // TRANSITION 01 -> 02 (THE CLASSIC -> THE FIRE)
      tl.to(pizzaSlideRefs.current[0], { yPercent: -100, ease: 'none', duration: 1.0 }, 0.3)
        .to(pizzaSlideRefs.current[1], { yPercent: 0, ease: 'none', duration: 1.0 }, 0.3)
        .to(textSlideRefs.current[0], { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }, 0.3)
        .to(textSlideRefs.current[1], { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.75);

      // TRANSITION 02 -> 03 (THE FIRE -> THE GARDEN)
      tl.to(pizzaSlideRefs.current[1], { yPercent: -100, ease: 'none', duration: 1.0 }, 2.0)
        .to(pizzaSlideRefs.current[2], { yPercent: 0, ease: 'none', duration: 1.0 }, 2.0)
        .to(textSlideRefs.current[1], { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }, 2.0)
        .to(textSlideRefs.current[2], { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 2.45);

      // TRANSITION 03 -> 04 (THE GARDEN -> THE TRUFFLE)
      tl.to(pizzaSlideRefs.current[2], { yPercent: -100, ease: 'none', duration: 1.0 }, 3.7)
        .to(pizzaSlideRefs.current[3], { yPercent: 0, ease: 'none', duration: 1.0 }, 3.7)
        .to(textSlideRefs.current[2], { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }, 3.7)
        .to(textSlideRefs.current[3], { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 4.15);

      // Total timeline duration: 5.2 units with settle window
      tl.set({}, {}, 5.2);

      // Update active indicator styling & pointer events
      const updateActiveNav = (nextIdx) => {
        if (activeIndexRef.current === nextIdx) return;
        activeIndexRef.current = nextIdx;
        setActiveFlavor(nextIdx);

        textSlideRefs.current.forEach((card, idx) => {
          if (card) {
            card.style.pointerEvents = idx === nextIdx ? 'auto' : 'none';
          }
        });

        indicatorRefs.current.forEach((ind, idx) => {
          if (!ind) return;
          if (idx === nextIdx) {
            ind.className =
              'group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono font-bold bg-[#171717] text-[#FFFDF9] shadow-xs border border-[#171717] transition-all duration-300 cursor-pointer';
            ind.setAttribute('aria-current', 'true');
          } else {
            ind.className =
              'group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono bg-[#FFFDF9] text-[#6B675F] hover:text-[#171717] hover:border-[#171717]/30 border border-[#171717]/10 transition-all duration-300 cursor-pointer';
            ind.setAttribute('aria-current', 'false');
          }
        });
      };

      // Single authoritative ScrollTrigger pinned sequence
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: () => `+=${window.innerWidth < 768 ? Math.max(window.innerHeight * 2.5, 2400) : Math.max(window.innerHeight * 3.2, 3000)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: (self) => {
          if (!isMounted) return;
          const p = Math.max(0, Math.min(1, self.progress));

          // Determine current active flavor index based on progress thresholds
          let currentIdx = 0;
          if (p < 0.18) {
            currentIdx = 0;
          } else if (p < 0.52) {
            currentIdx = 1;
          } else if (p < 0.84) {
            currentIdx = 2;
          } else {
            currentIdx = 3;
          }

          updateActiveNav(currentIdx);

          // Update subtle top continuous progress bar
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: p });
          }
        },
      });
    }, sectionRef);

    return () => {
      isMounted = false;
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      ctx.revert();
    };
  }, []);

  // Clickable Navigation smooth scroll integration
  const handleNavClick = (targetIdx) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    
    // Normalized target progress positions for each flavor hold stage
    const progressMap = [0.03, 0.35, 0.67, 0.97];
    const targetProgress = progressMap[targetIdx];
    const targetScroll = st.start + targetProgress * (st.end - st.start);

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="flavors"
      ref={sectionRef}
      className="find-slice-section relative w-full h-screen bg-[#F7F4EF] text-[#171717] overflow-hidden select-none z-20"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#F7F4EF',
      }}
    >
      {/* Top Subtle Continuous Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#171717]/10 z-30 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-[#B9573F] origin-left scale-x-0 transition-transform duration-75"
        />
      </div>

      <div className="find-slice-inner w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between py-5 sm:py-7 lg:py-8">
        
        {/* ========================================================= */}
        {/* TOP BAR: SECTION LABEL & STEP NAVIGATION                 */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 z-20">
          <div>
            <div className="find-slice-label text-[11px] sm:text-xs font-mono tracking-ultra uppercase text-[#B9573F] flex items-center gap-1.5 font-bold mb-0.5">
              <Sparkles size={13} className="text-[#B9573F]" />
              <span>FIND YOUR SLICE</span>
            </div>
            <h2 className="find-slice-heading font-display font-black tracking-tight text-[#171717] uppercase text-xl sm:text-2xl lg:text-3xl leading-none">
              SIGNATURE <span className="text-[#B9573F]">COMPOSITIONS.</span>
            </h2>
          </div>

          {/* Minimal 01 - 04 Clickable Step Indicators */}
          <nav aria-label="Flavor selection" className="flex items-center gap-2 sm:gap-2.5">
            {FLAVORS.map((flavor, idx) => (
              <button
                key={flavor.id}
                ref={(el) => (indicatorRefs.current[idx] = el)}
                onClick={() => handleNavClick(idx)}
                className={`group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  idx === activeFlavor
                    ? 'bg-[#171717] text-[#FFFDF9] font-bold shadow-xs border border-[#171717]'
                    : 'bg-[#FFFDF9] text-[#6B675F] hover:text-[#171717] hover:border-[#171717]/30 border border-[#171717]/10'
                }`}
                aria-current={idx === activeFlavor ? 'true' : 'false'}
              >
                <span className="font-bold transition-transform duration-300 group-hover:scale-105">{flavor.number}</span>
                <span className="hidden md:inline text-[10px] tracking-wider uppercase opacity-85 font-semibold">
                  {flavor.title.replace('THE ', '')}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* ========================================================= */}
        {/* MAIN STAGE: CLEAN TWO-COLUMN LAYOUT                       */}
        {/* LEFT = FULL CIRCLE PIZZA | RIGHT = FLAVOR CONTENT         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto w-full h-full relative z-10 min-h-0">
          
          {/* ------------------------------------------------------- */}
          {/* LEFT SIDE: COMPLETE PERFECT CIRCULAR PIZZA VIEWPORT     */}
          {/* ------------------------------------------------------- */}
          <div className="order-1 lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-center relative h-full min-h-0 pointer-events-none">
            
            {/* Subtle soft ambient warmth glow backdrop */}
            <div className="absolute w-[80%] aspect-square rounded-full bg-radial from-[#E8DAC9]/60 via-[#E8DAC9]/20 to-transparent blur-3xl pointer-events-none" />

            {/* Dedicated Visual Window: perfectly square, perfectly proportioned */}
            <div
              className="pizza-animation-window relative aspect-square overflow-hidden flex items-center justify-center"
              style={{
                width: 'clamp(280px, 36vw, 560px)',
                height: 'clamp(280px, 36vw, 560px)',
              }}
            >
              {/* Stack of 4 complete circular pizzas with vertical slide transforms */}
              {FLAVORS.map((flavor, idx) => (
                <div
                  key={flavor.id}
                  ref={(el) => (pizzaSlideRefs.current[idx] = el)}
                  className="pizza-slide absolute inset-0 w-full h-full flex items-center justify-center"
                  style={{
                    transform: idx === 0 ? 'translateY(0%)' : 'translateY(100%)',
                    willChange: 'transform',
                  }}
                >
                  <img
                    src={flavor.image}
                    alt={flavor.title}
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = 'true';
                        e.currentTarget.src = flavor.fallbackImage;
                      }
                    }}
                    className="w-full h-full aspect-square rounded-full object-cover filter drop-shadow-[0_20px_45px_rgba(60,42,30,0.22)] select-none pointer-events-none block"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT SIDE: FLAVOR EDITORIAL CONTENT                    */}
          {/* ------------------------------------------------------- */}
          <div className="order-2 lg:col-span-6 xl:col-span-6 flex flex-col justify-center relative z-10">
            {/* Stable fixed/min-height wrapper preventing any layout shift */}
            <div className="flavor-content-viewport relative w-full min-h-[290px] sm:min-h-[340px] lg:min-h-[420px] flex items-center">
              {FLAVORS.map((flavor, idx) => (
                <div
                  key={flavor.id}
                  ref={(el) => (textSlideRefs.current[idx] = el)}
                  className="flavor-card absolute inset-0 flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-5"
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                    transform: idx === 0 ? 'translateY(0px)' : 'translateY(20px)',
                    pointerEvents: idx === 0 ? 'auto' : 'none',
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Flavor Eyebrow with colored accent dot */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-2xs"
                      style={{ backgroundColor: flavor.accentColor }}
                    />
                    <span
                      className="text-xs font-mono tracking-ultra uppercase font-bold"
                      style={{ color: flavor.accentColor }}
                    >
                      {flavor.eyebrow}
                    </span>
                    <span className="text-[#171717]/20 text-xs">•</span>
                    <span className="text-[11px] font-mono tracking-widest text-[#6B675F] uppercase font-semibold">
                      {flavor.mood}
                    </span>
                  </div>

                  {/* Big Editorial Flavor Title */}
                  <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#171717] tracking-tight uppercase leading-[0.95]">
                    {flavor.title}
                  </h3>

                  {/* Description */}
                  <p className="font-serif italic text-sm sm:text-base lg:text-lg text-[#171717]/85 max-w-lg leading-relaxed">
                    {flavor.description}
                  </p>

                  {/* Ingredient Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                    {flavor.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2.5 sm:px-3 py-1 rounded-full bg-[#FFFDF9] border border-[#171717]/10 text-[10px] sm:text-xs font-mono text-[#171717]/90 font-medium shadow-2xs"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  {/* Order CTA & Specs Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                    <button
                      onClick={() => {
                        if (onSelectFlavor) {
                          onSelectFlavor({
                            id: flavor.id,
                            name: flavor.name,
                            price: flavor.priceNumber,
                          });
                        }
                      }}
                      className="group px-5 sm:px-6 py-3 sm:py-3.5 bg-[#171717] hover:bg-[#B9573F] text-[#FFFDF9] rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-fit"
                      data-cursor="cta"
                    >
                      <Plus size={15} className="transition-transform duration-300 group-hover:rotate-90" />
                      <span>ORDER YOUR SLICE • {flavor.price}</span>
                    </button>

                    <span className="hidden sm:inline text-[10px] lg:text-[11px] font-mono text-[#6B675F] truncate">
                      {flavor.profile}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM BAR: CONTEXTUAL FOOTER                             */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-[#6B675F] uppercase pt-2 border-t border-[#171717]/10 z-20 pointer-events-none">
          <span className="font-semibold text-[#171717] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9573F]" />
            VELOCE • 4 SIGNATURE FLAVORS
          </span>
          <span className="flex items-center gap-2">
            <span className="hidden sm:inline">SCROLL OR SELECT TO EXPLORE</span>
            <span className="text-[#B9573F] font-bold animate-bounce">↓</span>
          </span>
        </div>

      </div>
    </section>
  );
}
