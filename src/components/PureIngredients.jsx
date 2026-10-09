import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PURE_INGREDIENTS } from '../data/pizzaStory';
import { MapPin, ShieldCheck, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PureIngredients() {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const imageRefs = useRef([]);
  const progressBarRef = useRef(null);
  const stepRefs = useRef([]);

  const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Preload ingredient images
  useEffect(() => {
    PURE_INGREDIENTS.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Transition helper for synchronized crossfade
      const transitionToIngredient = (nextIdx, prevIdx) => {
        // Left Column: Image crossfade
        if (imageRefs.current[prevIdx] && imageRefs.current[nextIdx] && prevIdx !== nextIdx) {
          gsap.to(imageRefs.current[prevIdx], {
            opacity: 0,
            scale: 1.02,
            duration: 0.35,
            ease: 'power2.inOut',
            onComplete: () => {
              if (imageRefs.current[prevIdx]) {
                imageRefs.current[prevIdx].style.visibility = 'hidden';
              }
            },
          });

          imageRefs.current[nextIdx].style.visibility = 'visible';
          gsap.fromTo(
            imageRefs.current[nextIdx],
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
          );
        }

        // Right Column: Text crossfade in place
        if (infoRef.current) {
          gsap.timeline()
            .to(infoRef.current, {
              opacity: 0,
              y: -10,
              duration: 0.2,
              ease: 'power2.in',
            })
            .set(infoRef.current, {
              y: 10,
            })
            .to(infoRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power3.out',
            });
        }

        // Step pills indicator update
        stepRefs.current.forEach((el, idx) => {
          if (!el) return;
          if (idx === nextIdx) {
            el.className =
              'flex items-center gap-1.5 text-xs font-mono text-[#B9573F] font-bold transition-all duration-300';
          } else {
            el.className =
              'flex items-center gap-1.5 text-xs font-mono text-[#6B675F] transition-all duration-300';
          }
        });
      };

      // Top Bar & Heading Entrance Reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      headerTl
        .from('.pure-ingredients-label', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        })
        .from(
          '.pure-ingredients-heading',
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .from(
          stepRefs.current.filter(Boolean),
          {
            opacity: 0,
            y: 15,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power3.out',
          },
          '-=0.45'
        );

      // Master ScrollTrigger pinning the section directly
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => (window.innerWidth < 768 ? '+=2400' : '+=2800'),
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(1, self.progress));

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress * 100}%`;
          }

          // Compute active ingredient
          const nextIndex = Math.min(
            PURE_INGREDIENTS.length - 1,
            Math.floor(progress * PURE_INGREDIENTS.length)
          );

          if (nextIndex !== activeIndexRef.current) {
            const prevIndex = activeIndexRef.current;
            activeIndexRef.current = nextIndex;
            setActiveIngredientIndex(nextIndex);
            transitionToIngredient(nextIndex, prevIndex);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToImageRefs = (el, idx) => {
    imageRefs.current[idx] = el;
  };

  const currentIngredient = PURE_INGREDIENTS[activeIngredientIndex] || PURE_INGREDIENTS[0];

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="pure-ingredients-section relative h-screen w-full bg-[#F7F4EF] text-[#171717] overflow-hidden select-none z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#F7F4EF',
      }}
    >
      {/* Top Fixed Heading & Minimal Step Indicator */}
      <div className="w-full flex items-center justify-between z-20">
        <div>
          <div className="pure-ingredients-label flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#B9573F] mb-1 font-semibold">
            <Droplets size={13} className="text-[#B9573F]" />
            <span>FOUR SACRED ELEMENTS</span>
          </div>
          <h2 className="pure-ingredients-heading font-display font-black tracking-tight text-[#171717] uppercase leading-[0.95] text-[clamp(1.75rem,3.5vw,3rem)]">
            PURE <span className="text-[#B9573F]">INGREDIENTS.</span>
          </h2>
        </div>

        {/* Minimal Step Indicator */}
        <div className="hidden sm:flex items-center gap-3 bg-[#FFFDF9]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#171717]/10 shadow-xs">
          {PURE_INGREDIENTS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (stepRefs.current[idx] = el)}
              className={`flex items-center gap-1.5 text-xs font-mono transition-all duration-300 ${
                activeIngredientIndex === idx
                  ? 'text-[#B9573F] font-bold'
                  : 'text-[#6B675F]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIngredientIndex === idx ? 'bg-[#B9573F] scale-125' : 'bg-[#171717]/20'
                }`}
              />
              <span>{item.number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Grid Area */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center flex-1 my-auto z-10">
        {/* Left Column: Layered Ingredient Images */}
        <div className="relative w-full h-[min(48vh,520px)] overflow-hidden rounded-3xl bg-[#FFFDF9] border border-[#171717]/10 shadow-editorial">
          {PURE_INGREDIENTS.map((item, index) => (
            <img
              key={item.id}
              ref={(el) => addToImageRefs(el, index)}
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              style={{
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? 'visible' : 'hidden',
              }}
            />
          ))}

          {/* Floating Origin Chip */}
          <div className="absolute top-4 left-4 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#171717]/10 flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#171717] shadow-xs z-10">
            <MapPin size={12} className="text-[#B9573F]" />
            <span>{currentIngredient.origin}</span>
          </div>

          {/* Elevation Badge */}
          <div className="absolute bottom-4 right-4 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#171717]/10 text-[10px] font-mono tracking-widest text-[#6B675F] uppercase shadow-xs z-10">
            {currentIngredient.elevation}
          </div>
        </div>

        {/* Right Column: Editorial Text Information */}
        <div
          ref={infoRef}
          className="flex flex-col justify-center max-w-[560px] space-y-4 sm:space-y-5"
        >
          {/* Number and Subtitle Row */}
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-[#B9573F]">
              {currentIngredient.number}
            </span>
            <div className="h-px flex-1 bg-[#171717]/10" />
            <span className="text-xs font-mono tracking-widest text-[#6B675F] uppercase font-semibold">
              {currentIngredient.subtitle}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-[#171717] uppercase leading-[0.95] break-words">
            {currentIngredient.name}
          </h3>

          {/* Characteristic Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {currentIngredient.tastingNotes.map((note, nIdx) => (
              <span
                key={nIdx}
                className="px-3.5 py-1 rounded-full border border-[#171717]/10 bg-[#FFFDF9] text-xs font-mono tracking-wider uppercase text-[#171717] font-semibold shadow-2xs"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-[#171717]/80 leading-relaxed max-w-[500px]">
            {currentIngredient.description}
          </p>

          {/* DOP & Quality Certification Row */}
          <div className="pt-3 flex items-center gap-6 border-t border-[#171717]/10 text-xs font-mono text-[#6B675F]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#B9573F]" />
              <span>DOP CERTIFIED</span>
            </div>
            <div>100% TRACEABLE ORIGIN</div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Progress Indicator */}
      <div className="w-full flex items-center justify-between gap-4 pt-2 z-20 text-[10px] font-mono tracking-widest text-[#6B675F] uppercase border-t border-[#171717]/10">
        <span>01 SAN MARZANO</span>
        <div className="flex-1 h-0.5 bg-[#171717]/10 rounded-full overflow-hidden mx-4">
          <div
            ref={progressBarRef}
            className="h-full bg-[#B9573F] transition-all duration-75 ease-out rounded-full"
            style={{ width: '0%' }}
          />
        </div>
        <span>04 EXTRA VIRGIN</span>
      </div>
    </section>
  );
}
