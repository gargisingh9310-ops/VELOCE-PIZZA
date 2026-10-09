import React from 'react';
import { X, MapPin, Clock, Flame, Phone } from 'lucide-react';

const OUTPOSTS = [
  {
    city: 'NAPOLI LAB',
    type: 'Global Mothership & Fermentation Vault',
    address: 'Via dei Tribunali 48, 80138 Napoli, Italy',
    hours: '12:00 – 23:30 Daily',
    oven: 'Volcanic Vesuvius Biscotto Oven #01',
    phone: '+39 081 554 9912',
  },
  {
    city: 'MILANO DUOMO',
    type: 'Artisanal Tasting Room',
    address: 'Via Santa Radegonda 12, 20121 Milano, Italy',
    hours: '17:00 – 00:00 Tue–Sun',
    oven: 'Custom Beechwood 900°F Brick Dome',
    phone: '+39 02 8909 6734',
  },
  {
    city: 'LONDON SOHO',
    type: 'Wood-Fired Dining Lab',
    address: '74 Dean Street, Soho, London W1D 3SL, UK',
    hours: '16:30 – 23:30 Wed–Mon',
    oven: 'Double-Decker Neapolitan Clay Oven',
    phone: '+44 20 7439 8810',
  },
  {
    city: 'NEW YORK NOLITA',
    type: 'Micro-Outpost & Counter Bar',
    address: '218 Mulberry St, New York, NY 10012, USA',
    hours: '12:00 – 00:00 Daily',
    oven: 'Heritage Oak-Fueled Valoriani',
    phone: '+1 212 966 8400',
  },
  {
    city: 'TOKYO SHIBUYA',
    type: 'Subterranean Pizza Sanctuary',
    address: 'Udagawacho 15-1, Shibuya-ku, Tokyo 150-0042',
    hours: '17:30 – 01:00 Daily',
    oven: 'Custom Japanese Cedar & Oak Hybrid',
    phone: '+81 3 5456 7790',
  },
];

export default function LocationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-[#171717]/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[#F7F4EF] border border-[#171717]/10 text-[#171717] rounded-3xl p-6 md:p-10 shadow-2xl overflow-y-auto flex flex-col justify-between space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#171717]/10 pb-6">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#B9573F] mb-2 font-semibold">
              GLOBAL OUTPOST DIRECTORY
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#171717] uppercase tracking-tight">
              FIND AN OUTPOST.
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-[#171717]/15 bg-[#FFFDF9] text-[#171717] hover:bg-[#B9573F] hover:border-[#B9573F] hover:text-[#FFFDF9] transition-colors shadow-xs cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Outposts Grid */}
        <div className="space-y-4 overflow-y-auto pr-1">
          {OUTPOSTS.map((outpost, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#171717]/10 hover:border-[#B9573F]/40 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-[#171717] uppercase">
                    {outpost.city}
                  </h3>
                  <span className="text-[10px] font-mono text-[#B9573F] px-2.5 py-0.5 rounded-full bg-[#B9573F]/10 border border-[#B9573F]/20 font-bold">
                    OPEN
                  </span>
                </div>
                <p className="text-xs text-[#6B675F] font-mono font-semibold">{outpost.type}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#171717]/80 font-sans">
                  <MapPin size={12} className="text-[#B9573F]" />
                  <span>{outpost.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B675F] pt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {outpost.hours}
                  </span>
                  <span className="flex items-center gap-1 text-[#B9573F] font-semibold">
                    <Flame size={11} /> {outpost.oven}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2">
                <a
                  href={`tel:${outpost.phone}`}
                  className="px-4 py-2.5 rounded-xl border border-[#171717]/15 bg-[#F7F4EF] text-xs font-mono font-semibold text-[#171717] hover:bg-[#B9573F] hover:border-[#B9573F] hover:text-[#FFFDF9] transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Phone size={12} />
                  <span>RESERVE TABLE</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono tracking-widest text-[#6B675F] pt-4 border-t border-[#171717]/10">
          ALL OUTPOSTS OPERATE ON STRICT 72H DOUGH RESERVATIONS. WALK-INS WELCOME SUBJECT TO OVEN CAPACITY.
        </div>
      </div>
    </div>
  );
}
