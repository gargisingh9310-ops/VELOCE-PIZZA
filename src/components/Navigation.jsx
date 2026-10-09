import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, ShoppingBag } from 'lucide-react';

export default function Navigation({ activeSection, totalSections = 7, onOpenOrder, isAudioMuted, toggleAudio }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const navLinks = [
    { number: '01', title: 'THE RITUAL', href: '#hero', subtitle: 'Artisanal Prologue' },
    { number: '02', title: 'PIZZA SEQUENCE', href: '#sequence', subtitle: 'Frame-by-Frame Canvas' },
    { number: '03', title: 'THE PROCESS', href: '#process', subtitle: 'From Dough to Slice' },
    { number: '04', title: 'CHOOSE MOOD', href: '#flavors', subtitle: 'Signature Flavor Showcase' },
    { number: '05', title: 'INGREDIENTS', href: '#ingredients', subtitle: 'San Marzano & Fior di Latte' },
    { number: '06', title: 'CRAFTSMANSHIP', href: '#details', subtitle: 'Micro Ingredient Anatomy' },
    { number: '07', title: 'ORDER A SLICE', href: '#order', subtitle: 'Fresh Delivery & Outposts' },
  ];

  const handleLinkClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating HUD Interface */}
      <header className="fixed inset-0 pointer-events-none z-[100] flex flex-col justify-between p-6 md:p-8 select-none">
        {/* Top Row */}
        <div className="flex justify-between items-center w-full">
          {/* Top-Left: Brand Logo */}
          <a
            href="#hero"
            className="pointer-events-auto group flex items-baseline gap-2 text-charcoal hover:text-terracotta transition-colors duration-300"
            data-cursor="pointer"
          >
            <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter">
              VELOCE
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-muted uppercase">
              • NAPOLI 2026
            </span>
          </a>

          {/* Top-Right: Quick Actions & Menu Button */}
          <div className="pointer-events-auto flex items-center gap-3 md:gap-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2.5 rounded-full border border-charcoal/10 bg-paper/85 backdrop-blur-md text-charcoal/80 hover:text-charcoal hover:border-terracotta transition-all duration-300 shadow-sm"
              title={isAudioMuted ? 'Unmute Ambient Oven Sound' : 'Mute Sound'}
              data-cursor="pointer"
              aria-label="Toggle ambient sound"
            >
              {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-terracotta animate-pulse" />}
            </button>

            {/* Quick Order Button */}
            <button
              onClick={onOpenOrder}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-terracotta/20 bg-terracotta text-paper text-xs font-mono tracking-widest uppercase hover:bg-clay hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-terracotta/20 font-bold"
              data-cursor="cta"
            >
              <ShoppingBag size={13} />
              <span>ORDER</span>
            </button>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal/10 bg-paper/85 backdrop-blur-md text-charcoal text-xs font-mono tracking-widest uppercase hover:border-terracotta hover:text-terracotta transition-all duration-300 shadow-sm"
              data-cursor="pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={15} />
              <span className="hidden xs:inline">MENU</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Minimal Corner Scroll Indicator */}
        <div className="flex justify-end w-full">
          <a
            href="#sequence"
            className="pointer-events-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-charcoal/50 hover:text-terracotta transition-colors duration-300"
            data-cursor="pointer"
          >
            <span>SCROLL</span>
            <span className="animate-bounce text-terracotta font-bold">↓</span>
          </a>
        </div>
      </header>

      {/* Full-Screen Luxury Drawer Menu */}
      <div
        className={`fixed inset-0 z-[200] bg-ivory/98 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative h-full flex flex-col justify-between p-6 md:p-14 max-w-7xl mx-auto text-charcoal">
          {/* Drawer Header */}
          <div className="flex justify-between items-center border-b border-charcoal/10 pb-6">
            <div className="flex items-center gap-4">
              <span className="font-display font-bold text-2xl tracking-tighter text-charcoal">
                VELOCE
              </span>
              <span className="text-xs font-mono tracking-widest text-terracotta border border-terracotta/30 px-2.5 py-0.5 rounded-full bg-terracotta/5 font-semibold">
                EXPERIENCE SITEMAP
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 rounded-full border border-charcoal/15 bg-paper text-charcoal hover:bg-terracotta hover:border-terracotta hover:text-paper transition-all duration-300 shadow-sm"
              data-cursor="pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links Grid */}
          <nav className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Links */}
            <div className="lg:col-span-8 space-y-1">
              {navLinks.map((item) => (
                <div key={item.number} className="overflow-hidden">
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className="group w-full flex items-center justify-between text-left py-2.5 md:py-3.5 border-b border-charcoal/5 hover:border-terracotta/40 transition-colors duration-300"
                    data-cursor="pointer"
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-xs md:text-sm text-terracotta font-semibold">
                        {item.number}
                      </span>
                      <span className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-charcoal group-hover:text-terracotta group-hover:translate-x-3 transition-all duration-300">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted group-hover:text-charcoal transition-colors">
                      <span className="hidden md:inline text-xs font-mono tracking-widest">
                        {item.subtitle}
                      </span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 text-terracotta transition-transform" />
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Editorial Sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:pl-10 lg:border-l border-charcoal/10 text-charcoal/80 text-xs md:text-sm">
              <div className="card-artisanal p-6 rounded-2xl bg-paper">
                <h4 className="font-mono text-xs uppercase tracking-widest text-terracotta mb-2 font-semibold">
                  THE MANIFESTO
                </h4>
                <p className="font-serif italic text-charcoal/85 leading-relaxed text-sm md:text-base">
                  “We do not rush the fermentation. 72 hours of patience, 60 seconds of 900°F fire. The result is pure, unapologetic obsession.”
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-paper/60 border border-charcoal/5">
                <div>
                  <div className="text-muted uppercase mb-1">OUTPOSTS</div>
                  <div className="text-charcoal font-semibold">Napoli • Milano</div>
                  <div className="text-charcoal font-semibold">London • Tokyo</div>
                </div>
                <div>
                  <div className="text-muted uppercase mb-1">HOURS</div>
                  <div className="text-charcoal font-semibold">TUE – SUN</div>
                  <div className="text-charcoal font-semibold">17:00 — 23:30</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenOrder();
                  }}
                  className="w-full py-4 bg-terracotta hover:bg-clay text-paper font-mono text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-terracotta/20 transition-all duration-300 font-bold"
                  data-cursor="cta"
                >
                  <ShoppingBag size={16} />
                  <span>START INSTANT ORDER</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Drawer Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono tracking-widest text-muted pt-4 border-t border-charcoal/10">
            <span>© 2026 VELOCE PIZZA LAB</span>
            <div className="flex gap-6">
              <a href="#instagram" className="hover:text-charcoal transition-colors">INSTAGRAM</a>
              <a href="#press" className="hover:text-charcoal transition-colors">PRESS</a>
              <a href="#manifesto" className="hover:text-charcoal transition-colors">MANIFESTO</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
