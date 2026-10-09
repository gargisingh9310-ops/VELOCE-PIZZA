import React, { useState } from 'react';
import { SIGNATURE_PIZZAS } from '../data/menuData';
import { Plus, Flame, Sparkles } from 'lucide-react';

export default function MenuExperience({ onSelectFlavor }) {
  const [activePizzaId, setActivePizzaId] = useState(SIGNATURE_PIZZAS[0].id);

  return (
    <section
      id="menu"
      className="menu-experience-section relative bg-[#F7F4EF] text-[#171717] py-24 sm:py-32 px-6 sm:px-12 z-[1]"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: '#F7F4EF',
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#171717]/10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#B9573F] mb-2 font-semibold">
              <Sparkles size={13} className="text-[#B9573F]" />
              <span>THE ARCHETYPES • FOUR SIGNATURES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#171717] uppercase leading-[0.95]">
              FIND YOUR <span className="text-[#B9573F]">SLICE.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#6B675F] max-w-[420px] leading-relaxed">
            Every pie is fermented 72 hours, hand-stretched, and fired at 900°F on volcanic stone in sixty seconds.
          </p>
        </div>

        {/* 4-Column Editorial Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SIGNATURE_PIZZAS.map((pizza) => (
            <div
              key={pizza.id}
              className="group flex flex-col justify-between bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 border border-[#171717]/10 hover:border-[#B9573F]/40 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
            >
              <div>
                {/* Top Number & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#B9573F] tracking-widest">
                    {pizza.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F7F4EF] text-[10px] font-mono tracking-wider font-semibold text-[#6B675F] uppercase border border-[#171717]/5">
                    {pizza.badge}
                  </span>
                </div>

                {/* Pizza Image Frame */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-[#F7F4EF]">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Pizza Title & Tagline */}
                <div className="space-y-1 mb-3">
                  <h3 className="font-display font-black text-xl sm:text-2xl text-[#171717] tracking-tight uppercase leading-none">
                    {pizza.name}
                  </h3>
                  <p className="font-mono text-[11px] text-[#B9573F] tracking-wide uppercase font-semibold">
                    {pizza.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-[#6B675F] leading-relaxed mb-6">
                  {pizza.description}
                </p>

                {/* Key Ingredient Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {pizza.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#F7F4EF] text-[10px] font-mono text-[#171717] tracking-wide"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Order Action */}
              <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between mt-auto">
                <span className="font-display font-extrabold text-2xl text-[#171717]">
                  €{pizza.price}
                </span>
                <button
                  onClick={() => onSelectFlavor(pizza)}
                  className="flex items-center gap-1.5 bg-[#171717] group-hover:bg-[#B9573F] text-[#FFFDF9] px-4 py-2 rounded-full font-mono text-[11px] tracking-widest uppercase font-semibold transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
                >
                  <Plus size={13} />
                  <span>ORDER</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
