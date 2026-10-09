import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { usePizzaFrames } from './hooks/usePizzaFrames';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// The Exactly 4 Core Editorial Scene Components
import PizzaHero from './components/PizzaHero';
import FromDoughToSlice from './components/FromDoughToSlice';
import FlavorShowcase from './components/FlavorShowcase';
import FirstHomeView from './components/firsthomeview';

// Global Shell Components (Header, Preloader, Modals, Audio, Cursor)
import Header from './components/Header';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import AudioAmbience from './components/AudioAmbience';
import GrainOverlay from './components/GrainOverlay';
import OrderDrawer from './components/OrderDrawer';
import LocationsModal from './components/LocationsModal';

export default function App() {
  // Single Global Lenis Smooth Scroll Instance synchronized with GSAP
  useLenis();

  // Preload and Cache all 240 Hero Pizza Frames for the preloader and canvas
  const { frames: loadedFrames, loadProgress, isLoaded: isFramesLoaded } = usePizzaFrames({ frameCount: 240 });

  // Preloader State
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  // Modals & Navigation State
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [selectedPizzaForOrder, setSelectedPizzaForOrder] = useState(null);

  // Refresh GSAP ScrollTrigger after preloader completes
  useEffect(() => {
    if (isPreloaderDone) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isPreloaderDone]);

  const handleSelectPizza = (pizza) => {
    setSelectedPizzaForOrder(pizza);
    setIsOrderOpen(true);
  };

  const handleScrollToMenu = () => {
    const menuElement = document.getElementById('flavors') || document.getElementById('process');
    if (menuElement) {
      if (window.lenis) {
        window.lenis.scrollTo(menuElement, { duration: 1.2 });
      } else {
        menuElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F4EF] text-[#171717] selection:bg-[#B9573F] selection:text-[#FFFDF9] overflow-x-clip">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Subtle Cinematic Film Grain Overlay */}
      <GrainOverlay />

      {/* Ambient Wood-Oven Audio Synth */}
      <AudioAmbience isMuted={isAudioMuted} />

      {/* Luxury Minimal Preloader */}
      {!isPreloaderDone && (
        <Preloader
          isReady={isFramesLoaded}
          progress={loadProgress}
          onComplete={() => setIsPreloaderDone(true)}
        />
      )}

      {/* Non-Fixed Minimal Header (positioned at top, scrolls away naturally) */}
      <Header
        onOpenOrder={() => {
          setSelectedPizzaForOrder(null);
          setIsOrderOpen(true);
        }}
        onOpenLocations={() => setIsLocationsOpen(true)}
        onScrollToMenu={handleScrollToMenu}
        isAudioMuted={isAudioMuted}
        toggleAudio={() => setIsAudioMuted((prev) => !prev)}
      />

      {/* Main Continuous Editorial Experience — Exactly 4 Core Sections */}
      <main className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* SECTION 1: FULLSCREEN CINEMATIC CANVAS HERO (240 FRAMES)  */}
        {/* ========================================================= */}
        <PizzaHero loadedFrames={loadedFrames} />

        {/* ========================================================= */}
        {/* SECTION 2: FROM DOUGH TO SLICE (3-STAGE CRAFT CHRONOLOGY) */}
        {/* ========================================================= */}
        <FromDoughToSlice />

        {/* ========================================================= */}
        {/* SECTION 3: SIGNATURE FLAVORS (PINNED 4-FLAVOR GALLERY)    */}
        {/* ========================================================= */}
        <FlavorShowcase onSelectFlavor={handleSelectPizza} />

        {/* ========================================================= */}
        {/* SECTION 4: FIRST HOME VIEW CANVAS ANIMATION (NO FOOTER)   */}
        {/* ========================================================= */}
        <FirstHomeView
          onOpenOrder={() => {
            setSelectedPizzaForOrder(null);
            setIsOrderOpen(true);
          }}
          onOpenLocations={() => setIsLocationsOpen(true)}
        />
      </main>

      {/* Interactive Order Drawer */}
      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        initialItem={selectedPizzaForOrder}
      />

      {/* Global Outposts Modal */}
      <LocationsModal
        isOpen={isLocationsOpen}
        onClose={() => setIsLocationsOpen(false)}
      />
    </div>
  );
}
