import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Flame, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

const MENU_ITEMS = [
  { id: 'margherita-classica', name: 'CLASSICA DOP', desc: 'San Marzano • Fior di Latte • Basil • EVOO', price: 18, image: '/assets/flavor_classic.jpg' },
  { id: 'diavola-nduja', name: 'DIAVOLA & ‘NDUJA', desc: 'Calabrian ‘Nduja • Spianata • Hot Honey', price: 21, image: '/assets/flavor_fire.jpg' },
  { id: 'tartufo-funghi', name: 'TARTUFO & FUNGHI', desc: 'Wild Chanterelles • Truffle Crema • Taleggio', price: 24, image: '/assets/flavor_truffle.jpg' },
  { id: 'burrata-pistachio', name: 'BURRATA & PISTACHIO', desc: 'Whole Burrata • Bronte Pistachio • Parma Ham', price: 22, image: '/assets/flavor_garden.jpg' },
];

const DIPS = [
  { id: 'hot-honey', name: 'Hot Honey Wildflower Dip', price: 3 },
  { id: 'truffle-aioli', name: 'Black Truffle Garlic Aioli', price: 4 },
  { id: 'chili-oil', name: 'Aged Calabrian Chili Oil', price: 3 },
];

export default function OrderDrawer({ isOpen, onClose, initialItem }) {
  const [cart, setCart] = useState([
    { id: 'margherita-classica', name: 'CLASSICA DOP', price: 18, qty: 1, crust: '72H Fermented' }
  ]);
  const [selectedDips, setSelectedDips] = useState([]);
  const [orderType, setOrderType] = useState('delivery');
  const [isOrdered, setIsOrdered] = useState(false);

  React.useEffect(() => {
    if (initialItem) {
      setCart((prev) => {
        const exists = prev.find((item) => item.id === initialItem.id);
        if (exists) {
          return prev.map((item) =>
            item.id === initialItem.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { id: initialItem.id, name: initialItem.name, price: initialItem.price, qty: 1, crust: '72H Fermented' }];
      });
    }
  }, [initialItem]);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const addItem = (menuItem) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === menuItem.id);
      if (exists) {
        return prev.map((item) =>
          item.id === menuItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: menuItem.id, name: menuItem.name, price: menuItem.price, qty: 1, crust: '72H Fermented' }];
    });
  };

  const toggleDip = (dip) => {
    setSelectedDips((prev) =>
      prev.find((d) => d.id === dip.id)
        ? prev.filter((d) => d.id !== dip.id)
        : [...prev, dip]
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0) +
    selectedDips.reduce((acc, dip) => acc + dip.price, 0);
  const tax = Math.round(subtotal * 0.08875 * 100) / 100;
  const total = (subtotal + tax).toFixed(2);

  const handleCheckout = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B9573F', '#9A432E', '#6B675F', '#171717', '#F7F4EF'],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-[#171717]/40 backdrop-blur-md flex justify-end">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Content */}
      <div className="relative z-10 w-full max-w-xl h-full bg-[#F7F4EF] border-l border-[#171717]/10 text-[#171717] flex flex-col justify-between shadow-2xl p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-[#171717]/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-full bg-[#B9573F]/10 text-[#B9573F]">
              <ShoppingBag size={18} />
            </span>
            <div>
              <h3 className="font-display font-black text-xl text-[#171717] uppercase tracking-tight">
                ARTISANAL PIZZA BOX
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-[#6B675F] uppercase font-semibold">
                FRESH FROM 900°F WOOD EMBERS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[#171717]/15 bg-[#FFFDF9] text-[#171717] hover:bg-[#B9573F] hover:border-[#B9573F] hover:text-[#FFFDF9] transition-colors shadow-xs cursor-pointer"
            aria-label="Close order drawer"
          >
            <X size={18} />
          </button>
        </div>

        {isOrdered ? (
          /* Order Confirmed Screen */
          <div className="my-auto py-12 text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-[#B9573F]/10 border border-[#B9573F]/30 text-[#B9573F] flex items-center justify-center mx-auto shadow-lg">
              <Check size={40} className="animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#B9573F] uppercase font-bold">
                ORDER #VEL-8942 CONFIRMED
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-[#171717] uppercase tracking-tight">
                YOUR PIZZA IS IN THE OVEN.
              </h2>
              <p className="font-sans text-[#171717]/80 max-w-sm mx-auto text-sm leading-relaxed">
                Our pizzaiolo is hand-stretching your 72-hour fermented sourdough. Firing at 900°F for 60 seconds.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#171717]/10 flex items-center justify-center gap-3 text-xs font-mono text-[#171717] font-semibold max-w-xs mx-auto shadow-xs">
              <Clock size={16} className="text-[#B9573F]" />
              <span>ESTIMATED READY TIME: 14 MINS</span>
            </div>

            <button
              onClick={() => {
                setIsOrdered(false);
                onClose();
              }}
              className="px-8 py-3.5 rounded-full bg-[#171717] text-[#FFFDF9] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#B9573F] transition-colors shadow-md cursor-pointer"
            >
              CLOSE & RETURN TO STORY
            </button>
          </div>
        ) : (
          /* Cart & Menu Builder */
          <div className="flex-1 py-6 space-y-6 overflow-y-auto pr-1">
            {/* Delivery / Pickup Toggle */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#FFFDF9] border border-[#171717]/10 text-xs font-mono">
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-2 rounded-lg uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  orderType === 'delivery' ? 'bg-[#B9573F] text-[#FFFDF9] shadow-sm' : 'text-[#171717]/70 hover:text-[#171717]'
                }`}
              >
                PRIORITY DELIVERY
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`py-2 rounded-lg uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  orderType === 'pickup' ? 'bg-[#B9573F] text-[#FFFDF9] shadow-sm' : 'text-[#171717]/70 hover:text-[#171717]'
                }`}
              >
                OUTPOST PICKUP
              </button>
            </div>

            {/* Current Cart Items */}
            <div className="space-y-3">
              <div className="text-xs font-mono tracking-widest text-[#6B675F] uppercase font-semibold">
                SELECTED PIZZAS ({cart.reduce((a, c) => a + c.qty, 0)})
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 bg-[#FFFDF9] rounded-2xl border border-[#171717]/10 text-xs font-mono text-[#6B675F]">
                  YOUR BOX IS EMPTY. CHOOSE A PIZZA BELOW.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#171717]/10 shadow-xs"
                  >
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#171717] uppercase">
                        {item.name}
                      </h4>
                      <div className="text-[11px] font-mono text-[#6B675F] font-semibold">
                        €{item.price} each • {item.crust}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border border-[#171717]/15 rounded-full px-2 py-1 bg-[#F7F4EF]">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="text-[#171717]/60 hover:text-[#B9573F] transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs font-bold text-[#171717] px-1">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="text-[#171717]/60 hover:text-[#171717] transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#171717] w-12 text-right">
                        €{item.price * item.qty}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Add Flavors Menu */}
            <div className="space-y-3">
              <div className="text-xs font-mono tracking-widest text-[#6B675F] uppercase font-semibold">
                ADD MORE FROM THE MENU
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {MENU_ITEMS.map((menuItem) => (
                  <button
                    key={menuItem.id}
                    onClick={() => addItem(menuItem)}
                    className="p-3 rounded-xl border border-[#171717]/10 bg-[#FFFDF9] hover:border-[#B9573F]/50 text-left transition-all group flex flex-col justify-between shadow-xs cursor-pointer"
                  >
                    <div>
                      <div className="font-display font-bold text-xs text-[#171717] uppercase group-hover:text-[#B9573F]">
                        {menuItem.name}
                      </div>
                      <div className="text-[10px] text-[#6B675F] truncate mt-0.5">
                        {menuItem.desc}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#171717]/5">
                      <span className="font-mono text-xs text-[#171717] font-bold">€{menuItem.price}</span>
                      <span className="text-[10px] font-mono text-[#B9573F] font-semibold flex items-center gap-0.5">
                        <Plus size={10} /> ADD
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* House Dips & Oils */}
            <div className="space-y-2">
              <div className="text-xs font-mono tracking-widest text-[#6B675F] uppercase font-semibold">
                HOUSE DIPS & INFUSED OILS
              </div>
              <div className="space-y-1.5">
                {DIPS.map((dip) => {
                  const isSelected = selectedDips.some((d) => d.id === dip.id);
                  return (
                    <button
                      key={dip.id}
                      onClick={() => toggleDip(dip)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#B9573F] bg-[#B9573F]/10 text-[#B9573F] font-semibold'
                          : 'border-[#171717]/10 bg-[#FFFDF9] text-[#171717]/80 hover:text-[#171717]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-[#B9573F] border-[#B9573F] text-[#FFFDF9]' : 'border-[#171717]/30'
                        }`}>
                          {isSelected && <Check size={10} />}
                        </span>
                        <span>{dip.name}</span>
                      </div>
                      <span>+€{dip.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout Summary */}
        {!isOrdered && (
          <div className="pt-4 border-t border-[#171717]/10 space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#171717]/70">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#171717]/70">
                <span>Estimated Tax (8.875%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#171717] pt-2 border-t border-[#171717]/10">
                <span>TOTAL</span>
                <span className="text-[#B9573F] font-display text-lg">€{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 cursor-pointer ${
                cart.length > 0
                  ? 'bg-[#B9573F] hover:bg-[#9A432E] text-[#FFFDF9] shadow-[#B9573F]/30 active:scale-95'
                  : 'bg-[#171717]/10 text-[#171717]/30 cursor-not-allowed'
              }`}
            >
              <Flame size={16} />
              <span>SEND TO 900°F WOOD OVEN • €{total}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
