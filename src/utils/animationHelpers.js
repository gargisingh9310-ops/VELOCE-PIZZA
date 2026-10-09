import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates an elegant fade-up animation triggered on scroll
 */
export function fadeUp(element, options = {}) {
  if (!element) return null;
  const {
    delay = 0,
    duration = 1.0,
    distance = 40,
    ease = 'power3.out',
    start = 'top 85%',
    toggleActions = 'play none none reverse',
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions,
      },
    }
  );
}

/**
 * Split text line/word reveal animation
 */
export function revealLines(elements, options = {}) {
  if (!elements || elements.length === 0) return null;
  const {
    stagger = 0.12,
    duration = 1.2,
    y = 60,
    ease = 'power4.out',
    trigger = elements[0],
    start = 'top 80%',
  } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y, clipPath: 'inset(100% 0% 0% 0%)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      stagger,
      duration,
      ease,
      scrollTrigger: {
        trigger,
        start,
      },
    }
  );
}

/**
 * Parallax scroll effect
 */
export function parallax(element, options = {}) {
  if (!element) return null;
  const {
    distance = -100,
    trigger = element,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
  } = options;

  return gsap.to(element, {
    y: distance,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  });
}

/**
 * Subtle magnetic attraction on hover for buttons
 */
export function attachMagnetic(element, strength = 0.3) {
  if (!element || window.matchMedia('(pointer: coarse)').matches) return () => {};

  const onMouseMove = (e) => {
    const bounds = element.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
}
