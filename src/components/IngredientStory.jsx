import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  {
    number: '01',
    name: 'SAN MARZANO',
    subtitle: 'VOLCANIC SOIL CRUSH',
    description: 'Bright acidity. Natural sweetness. Hand-harvested in the mineral soils of Mount Vesuvius.',
    image: '/assets/san_marzano.jpg',
  },
  {
    number: '02',
    name: 'FIOR DI LATTE',
    subtitle: 'AGEROLA MORNING MILK',
    description: 'Soft texture. Fresh milky finish. Handcrafted daily from raw Monti Lattari milk.',
    image: '/assets/fior_di_latte.jpg',
  },
  {
    number: '03',
    name: 'FRESH BASIL',
    subtitle: 'SWEET GENOVESE DOP',
    description: 'Aromatic. Green. Fresh. Tender leaves laid raw right after 900°F fire.',
    image: '/assets/fresh_basil.jpg',
  },
  {
    number: '04',
    name: 'EXTRA VIRGIN OLIVE OIL',
    subtitle: 'FIRST COLD EXTRACTION',
    description: 'Peppery finish. Balanced richness. Single-estate Coratina olives pressed within hours.',
    image: '/assets/olive_oil.jpg',
  },
];

export default function IngredientStory() {
  const ingredientsSectionRef = useRef(null);
  const ingredientsPinRef = useRef(null);
  const imageRefs = useRef([]);
  const textContainerRef = useRef(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Preload ingredient images
  useEffect(() => {
    INGREDIENTS.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  useEffect(() => {
    if (!ingredientsSectionRef.current || !ingredientsPinRef.current) return;

    let activeIndex = 0;
    const cardProgress = { value: 0 };

    const ctx = gsap.context(() => {
      // Transition helper for cards
      const transitionCards = (nextIndex, prevIndex) => {
        // Image transition
        if (imageRefs.current[prevIndex] && imageRefs.current[nextIndex] && prevIndex !== nextIndex) {
          gsap.to(imageRefs.current[prevIndex], {
            opacity: 0,
            scale: 1.02,
            duration: 0.45,
            ease: 'power2.inOut',
            onComplete: () => {
              if (imageRefs.current[prevIndex]) {
                imageRefs.current[prevIndex].style.visibility = 'hidden';
              }
            },
          });

          imageRefs.current[nextIndex].style.visibility = 'visible';
          gsap.fromTo(
            imageRefs.current[nextIndex],
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' }
          );
        }

        // Text transition
        if (textContainerRef.current) {
          gsap.timeline()
            .to(textContainerRef.current, {
              opacity: 0,
              y: -12,
              duration: 0.2,
              ease: 'power2.in',
            })
            .set(textContainerRef.current, {
              y: 12,
            })
            .to(textContainerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'power3.out',
            });
        }
      };

      // Single ScrollTrigger with pin on the entire 400vh section
      gsap.to(cardProgress, {
        value: INGREDIENTS.length - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ingredientsSectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: ingredientsPinRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const nextIndex = Math.max(0, Math.min(INGREDIENTS.length - 1, Math.round(cardProgress.value)));
          if (nextIndex !== activeIndex) {
            const prevIndex = activeIndex;
            activeIndex = nextIndex;
            setActiveCardIndex(nextIndex);
            transitionCards(nextIndex, prevIndex);
          }
        },
      });
    }, ingredientsSectionRef);

    return () => ctx.revert();
  }, []);

  const addToImageRefs = (el, idx) => {
    imageRefs.current[idx] = el;
  };

  const currentIngredient = INGREDIENTS[activeCardIndex] || INGREDIENTS[0];

  return (
    <section
      id="ingredients"
      ref={ingredientsSectionRef}
      className="ingredients-scroll relative bg-[#F7F4EF] text-[#171717] select-none z-10"
      style={{
        position: 'relative',
        height: '400vh',
        backgroundColor: '#F7F4EF',
        isolation: 'isolate',
      }}
    >
      {/* Pinned Stage Viewport Container */}
      <div
        ref={ingredientsPinRef}
        className="ingredients-pin h-screen h-[100svh] w-full flex items-center justify-center p-6 sm:p-12 overflow-hidden"
        style={{ backgroundColor: '#F7F4EF' }}
      >
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[clamp(40px,7vw,120px)]">
          
          {/* Left Column: Bounded Ingredient Image Container */}
          <div className="relative w-full h-[min(65vh,640px)] overflow-hidden rounded-3xl bg-[#FFFDF9] border border-[#171717]/10 shadow-sm">
            {INGREDIENTS.map((item, index) => (
              <img
                key={item.number}
                ref={(el) => addToImageRefs(el, index)}
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  visibility: index === 0 ? 'visible' : 'hidden',
                }}
              />
            ))}

            {/* Minimal Step Badge */}
            <div className="absolute top-4 left-4 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#171717]/10 font-mono text-xs tracking-wider text-[#171717] shadow-xs">
              {currentIngredient.number} / 04
            </div>
          </div>

          {/* Right Column: Dedicated Ingredient Content */}
          <div className="w-full max-w-[500px] flex flex-col justify-center space-y-6">
            
            {/* Section Eyebrow & Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#171717]/10 pb-4">
              <span className="font-mono text-xs tracking-widest text-[#B9573F] uppercase font-semibold">
                PURE INGREDIENTS
              </span>

              <div className="flex items-center gap-3">
                {INGREDIENTS.map((item, idx) => (
                  <span
                    key={item.number}
                    className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                      activeCardIndex === idx ? 'text-[#B9573F] font-bold' : 'text-[#6B675F]'
                    }`}
                  >
                    {item.number}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated Text Content Box */}
            <div ref={textContainerRef} className="space-y-4">
              <div className="font-mono text-xs tracking-widest text-[#6B675F] uppercase font-semibold">
                {currentIngredient.subtitle}
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#171717] uppercase tracking-tight leading-[0.95] break-words">
                {currentIngredient.name}
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#171717]/80 leading-relaxed max-w-[460px]">
                {currentIngredient.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
