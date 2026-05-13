"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { products } from "./data/products";
import { Droplets, Wind, Sparkles, ShoppingBag, X } from "lucide-react";

export default function PerfumeHome() {
  const containerRef = useRef(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const featuredPerfumes = products.slice(0, 4);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-black font-sans">
      
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#0A0A0A] z-[70] p-10 border-l border-white/10"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-serif text-3xl italic">Your Selection</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="text-[#D4AF37]" /></button>
              </div>
              <p className="text-gray-500 text-sm tracking-widest text-center mt-20">Your bag is currently empty.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000" 
            alt="Hero Fragrance" 
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </div>
        
        <motion.div style={{ y: textY, opacity: opacityHero }} className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#D4AF37] text-[10px] uppercase font-bold mb-8 tracking-[1em]">
            Maison De Fragrance
          </motion.div>
          <motion.h1 className="text-7xl md:text-[160px] font-serif italic leading-none mb-6 tracking-tighter">
            Aura <span className="font-sans not-italic font-thin text-white/20">Noir</span>
          </motion.h1>
          <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center items-center">
            <Link href="/perfume/shop">
              <button className="px-14 py-5 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black hover:bg-[#D4AF37] transition-all duration-500 rounded-full">
                Shop Collection
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative py-32 px-6 border-y border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          {[
            { icon: Wind, title: "Top Notes", desc: "Citrus & Spice" },
            { icon: Droplets, title: "Heart Notes", desc: "Floral Soul" },
            { icon: Sparkles, title: "Base Notes", desc: "Woody Trail" },
          ].map((item, i) => {
            const IconComp = item.icon;
            return (
              <motion.div whileHover={{ y: -10 }} key={i} className="text-center group cursor-default">
                <IconComp className="mx-auto text-[#D4AF37] mb-6 stroke-[1px] group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-serif text-2xl italic mb-3">{item.title}</h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative py-32 px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-5xl font-serif italic">The Atelier</h2>
            <Link href="/perfume/shop" className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase border-b border-[#D4AF37] pb-1">View All</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPerfumes.map((perfume) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={perfume.id} 
                className="group bg-[#0a0a0a] p-8 border border-white/5 rounded-sm text-center relative"
              >
                <div className="aspect-square w-full mb-8 overflow-hidden bg-black flex items-center justify-center relative">
                  <img src={perfume.image} className="w-2/3 object-contain group-hover:scale-110 transition-transform duration-700" alt={perfume.name} />
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(true)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl"
                  >
                    <ShoppingBag size={18} />
                  </motion.button>
                </div>
                <h3 className="font-serif text-2xl italic mb-2">{perfume.name}</h3>
                <p className="text-[#D4AF37] text-sm tracking-widest">${perfume.price}.00</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}