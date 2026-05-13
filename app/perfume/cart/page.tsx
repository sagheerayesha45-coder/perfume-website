"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { products } from "../data/products";
import { Grid3x3, List, ShoppingBag, X, Plus, Minus } from "lucide-react";

const categories = ["All", "Woody", "Floral", "Citrus", "Fresh"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter products logic
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    // FIX: Added 'relative' to main tag for Framer Motion positioning
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30">
      
      {/* FIX: Passed the prop to Navbar to fix the TypeScript error */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Floating Cart Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-[#D4AF37] text-black p-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center justify-center"
      >
        <ShoppingBag size={24} />
        <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#D4AF37]">
          2
        </span>
      </motion.button>

      {/* Modern Slide-over Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            {/* Cart Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-serif italic">Your Bag</h2>
                  <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase mt-1">Ready for distinction</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                  <X size={24} className="text-white/50 hover:text-white" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-grow overflow-y-auto space-y-6 no-scrollbar">
                {products.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg">{item.name}</h4>
                      <p className="text-white/40 text-xs mb-3">{item.note}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          <Minus size={12} className="cursor-pointer hover:text-[#D4AF37]" />
                          <span className="text-sm font-bold">1</span>
                          <Plus size={12} className="cursor-pointer hover:text-[#D4AF37]" />
                        </div>
                        <span className="text-[#D4AF37] font-bold">${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Footer */}
              <div className="mt-10 pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-white/60 text-sm italic">
                  <span>Subtotal</span>
                  <span>$450.00</span>
                </div>
                <div className="flex justify-between text-xl font-serif">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">$450.00</span>
                </div>
                <button className="w-full bg-[#D4AF37] text-black py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-500 shadow-lg shadow-[#D4AF37]/10">
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Rest of your page content... */}
      <div className="pt-32 pb-20 px-6 md:px-12">
        {/* ... */}
      </div>
    </main>
  );
}