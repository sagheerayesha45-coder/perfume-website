"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { products } from "./data/products";
import { 
  Droplets, Wind, Sparkles, ShoppingBag, X, 
  Truck, RefreshCw, Award, Heart, Star, 
  Send, ChevronRight, Shield, Clock, Flower2,
  TreePine, Flame, Quote, 
  Gem, Crown, Gift, Lock, Eye, ThumbsUp, 
  Compass, MapPin
} from "lucide-react";

// ========== TYPE DEFINITIONS ==========
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  note: string;
  description: string;
  longDesc: string;
  rating: number;
  reviews: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

interface Category {
  name: string;
  icon: any;
  desc: string;
  count: number;
  image: string;
}

interface Feature {
  icon: any;
  title: string;
  desc: string;
  detailedDesc: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  location: string;
}

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  category: string;
}

export default function PerfumeHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Safe array slicing
  const featuredPerfumes: Product[] = products.slice(0, 4);
  const bestSellers: Product[] = products.slice(4, 8);
  const luxuryCollection: Product[] = products.slice(8, 12);

  // Categories with local images
  const categories: Category[] = [
    { name: "Floral", icon: Flower2, desc: "Rose, Jasmine, Gardenia", count: 12, image: "/images/wh2.jpg" },
    { name: "Woody", icon: TreePine, desc: "Sandalwood, Cedar, Vetiver", count: 8, image: "/images/wood.jpg" },
    { name: "Oud", icon: Flame, desc: "Agarwood, Amber, Musk", count: 6, image: "/images/red.webp" },
    { name: "Fresh", icon: Droplets, desc: "Citrus, Aquatic, Green", count: 10, image: "/images/pinkper.avif" },
  ];

  // Features - First 3 for top row
  const featuresTop: Feature[] = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $50", detailedDesc: "Complimentary express shipping on all orders exceeding $50." },
    { icon: RefreshCw, title: "30 Days Return", desc: "Money back guarantee", detailedDesc: "Not satisfied? Return within 30 days for a full refund." },
    { icon: Award, title: "Premium Quality", desc: "100% authentic", detailedDesc: "Every bottle is crafted with rare ingredients from Grasse, France." },
  ];

  // Features - Last 3 for bottom row
  const featuresBottom: Feature[] = [
    { icon: Heart, title: "Gift Ready", desc: "Luxury packaging", detailedDesc: "Each order comes in a handcrafted wooden box with velvet lining." },
    { icon: Shield, title: "Secure Payment", desc: "SSL encrypted", detailedDesc: "Your transactions are protected with bank-grade security." },
    { icon: Clock, title: "24/7 Support", desc: "Always here to help", detailedDesc: "Our fragrance experts are available round the clock." },
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    { name: "Sarah Johnson", role: "Beauty Influencer", text: "The Oud collection is absolutely divine! Lasts all day and gets so many compliments.", rating: 5, image: "https://randomuser.me/api/portraits/women/1.jpg", location: "New York, USA" },
    { name: "Michael Chen", role: "Verified Buyer", text: "Best fragrance investment I've made. The quality rivals designer brands at half the price.", rating: 5, image: "https://randomuser.me/api/portraits/men/2.jpg", location: "Toronto, Canada" },
    { name: "Priya Sharma", role: "Repeat Customer", text: "I've purchased 5 perfumes from here. Each one is unique and long-lasting.", rating: 5, image: "https://randomuser.me/api/portraits/women/3.jpg", location: "London, UK" },
    { name: "David Kim", role: "Fragrance Collector", text: "Finally found a brand that understands oriental notes perfectly.", rating: 5, image: "https://randomuser.me/api/portraits/men/4.jpg", location: "Seoul, Korea" },
  ];

  // Blog Posts with images
  const blogPosts: BlogPost[] = [
    { title: "The Art of Layering Fragrances", date: "Dec 15, 2024", readTime: "5 min", excerpt: "Learn how to combine different scents to create your unique signature fragrance.", image: "/images/purple.jfif", category: "Tips" },
    { title: "Understanding Oud: The Liquid Gold", date: "Dec 10, 2024", readTime: "6 min", excerpt: "Discover why Oud is called liquid gold and how it became a modern luxury staple.", image: "/images/3pic.webp", category: "Ingredients" },
    { title: "How to Choose Your Signature Scent", date: "Dec 5, 2024", readTime: "4 min", excerpt: "A complete guide to finding the perfect fragrance that matches your personality.", image: "/images/wh2.jpg", category: "Guide" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const addToCart = (): void => {
    setIsCartOpen(true);
  };

  const notesData = [
    { icon: Wind, title: "Top Notes", desc: "Citrus & Spice", detailed: "Bergamot, Lemon, Pink Pepper, Cardamom" },
    { icon: Droplets, title: "Heart Notes", desc: "Floral Soul", detailed: "Rose, Jasmine, Lily of the Valley, Iris" },
    { icon: Sparkles, title: "Base Notes", desc: "Woody Trail", detailed: "Sandalwood, Musk, Vanilla, Amber, Patchouli" },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-black font-sans">
      
      {/* ========== CART SIDEBAR ========== */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/90 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#0A0A0A] z-[70] p-6 border-l border-[#D4AF37]/20"
            >
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/10">
                <h2 className="font-serif text-2xl italic">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-[#D4AF37] hover:text-white transition p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <ShoppingBag size={50} className="text-[#D4AF37]/30 mb-3" />
                <p className="text-gray-500 text-xs tracking-widest text-center">Your cart is currently empty.</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-5 px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition">
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ scale: scaleHero }}
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2070" 
            alt="Hero Fragrance" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent" />
        </div>
        
        <motion.div style={{ y: textY, opacity: opacityHero }} className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="text-[#D4AF37] text-[9px] uppercase font-bold tracking-[1em] border border-[#D4AF37]/30 px-5 py-2 rounded-full backdrop-blur-sm">
              Est. 2024
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-[140px] font-serif italic leading-none mb-6 tracking-tighter"
          >
            Aura <span className="font-sans not-italic font-thin text-white/30">Noir</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.3em] max-w-2xl mx-auto mb-8"
          >
            Where Luxury Meets Identity — Discover The Essence Of True Elegance
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/perfume/shop">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#D4AF37" }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-3 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-black hover:bg-[#D4AF37] transition-all duration-500 rounded-full flex items-center gap-2"
              >
                Shop Collection <ChevronRight size={14} className="group-hover:translate-x-1 transition" />
              </motion.button>
            </Link>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-3 border border-white/30 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all duration-500 rounded-full"
            >
              Discovery Set
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 md:gap-16"
          >
            {[
              { value: "50+", label: "Premium Scents" },
              { value: "10K+", label: "Happy Clients" },
              { value: "30", label: "Days Return" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl md:text-2xl font-serif text-[#D4AF37]">{stat.value}</div>
                <div className="text-[7px] uppercase tracking-wider text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-1.5 bg-[#D4AF37] rounded-full mt-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== SECTION 2: NOTES ========== */}
      <section className="relative py-20 px-4 border-y border-white/5 bg-gradient-to-b from-[#080808] to-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-2 block">The Architecture</span>
            <h2 className="text-3xl md:text-4xl font-serif italic">Fragrance Pyramid</h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">Every perfume tells a story through three distinct chapters</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notesData.map((item, i) => {
              const IconComp = item.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  key={i} 
                  className="text-center group"
                >
                  <div className="relative mb-4 inline-block">
                    <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:blur-2xl transition" />
                    <IconComp className="relative text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" size={36} strokeWidth={1} />
                  </div>
                  <h3 className="font-serif text-2xl italic mb-2">{item.title}</h3>
                  <p className="text-white text-sm tracking-wider mb-1">{item.desc}</p>
                  <p className="text-gray-500 text-[9px] uppercase tracking-widest">{item.detailed}</p>
                  <div className="w-0 group-hover:w-10 h-[1px] bg-[#D4AF37] mx-auto mt-4 transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: CATEGORIES ========== */}
      <section className="relative py-20 px-4 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-2 block">Discover By</span>
            <h2 className="text-3xl md:text-4xl font-serif italic">Fragrance Families</h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">Explore our curated collection of exquisite scents</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer h-56"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <IconComp className="text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform" size={24} strokeWidth={1} />
                    <h3 className="font-serif text-xl italic mb-1 text-white">{cat.name}</h3>
                    <p className="text-gray-300 text-[10px] mb-1">{cat.desc}</p>
                    <p className="text-[#D4AF37] text-[9px] tracking-wider">{cat.count} Fragrances</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: THE ATELIER ========== */}
      <section className="relative py-20 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-10 flex-wrap gap-3"
          >
            <div>
              <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-1 block">Curated Selection</span>
              <h2 className="text-3xl md:text-4xl font-serif italic">The Atelier</h2>
            </div>
            <Link href="/perfume/shop" className="group flex items-center gap-1 text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase border-b border-[#D4AF37] pb-1 hover:tracking-[0.5em] transition-all">
              View All <ChevronRight size={12} className="group-hover:translate-x-1 transition" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredPerfumes.map((perfume, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                key={perfume.id} 
                className="group bg-[#0a0a0a] p-4 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 text-center rounded-sm"
              >
                <div className="aspect-square w-full mb-4 overflow-hidden bg-black flex items-center justify-center relative">
                  <img 
                    src={perfume.image} 
                    className="w-2/3 object-contain group-hover:scale-110 transition-transform duration-700" 
                    alt={perfume.name} 
                  />
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={addToCart}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                  >
                    <ShoppingBag size={14} />
                  </motion.button>
                </div>
                <h3 className="font-serif text-lg italic mb-1">{perfume.name}</h3>
                <p className="text-gray-500 text-[8px] uppercase tracking-widest mb-2">{perfume.note}</p>
                <p className="text-[#D4AF37] text-base tracking-widest">${perfume.price}.00</p>
                <div className="flex justify-center gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-2.5 h-2.5 ${i < perfume.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-700"}`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: BEST SELLERS ========== */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#080808] to-[#030303]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-2 block">🔥 Customer Favorites</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-serif italic">Best Sellers</h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">Most loved by fragrance enthusiasts worldwide</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map((perfume, idx) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                whileHover={{ y: -5 }}
                className="group bg-[#0a0a0a] p-4 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 text-center relative rounded-sm"
              >
                {idx === 0 && (
                  <div className="absolute -top-2 left-3 bg-[#D4AF37] text-black text-[7px] uppercase tracking-wider px-2 py-0.5 rounded-full z-10 font-bold">
                    #1 Best Seller
                  </div>
                )}
                <div className="aspect-square w-full mb-4 overflow-hidden bg-black flex items-center justify-center">
                  <img 
                    src={perfume.image} 
                    className="w-2/3 object-contain group-hover:scale-110 transition-transform duration-700" 
                    alt={perfume.name} 
                  />
                </div>
                <h3 className="font-serif text-base italic mb-1">{perfume.name}</h3>
                <p className="text-gray-500 text-[7px] uppercase tracking-widest mb-2">{perfume.note}</p>
                <p className="text-[#D4AF37] text-base tracking-widest">${perfume.price}.00</p>
                <div className="flex justify-center gap-0.5 mt-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-2 h-2 ${i < perfume.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-700"}`} />
                  ))}
                  <span className="text-gray-600 text-[6px] ml-0.5">({perfume.reviews})</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#D4AF37", color: "black" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="mt-1 w-full py-2 border border-white/20 text-[8px] uppercase tracking-[0.2em] hover:border-[#D4AF37] transition-all"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: LUXURY COLLECTION ========== */}
      <section className="relative py-20 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Gem className="mx-auto text-[#D4AF37] mb-3" size={28} strokeWidth={1} />
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-2 block">Exclusive</span>
            <h2 className="text-3xl md:text-4xl font-serif italic">Luxury Collection</h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">Rare ingredients. Masterful blending. Unforgettable presence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {luxuryCollection.slice(0, 2).map((perfume, idx) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className="relative overflow-hidden rounded-xl group cursor-pointer h-80"
              >
                <img 
                  src={perfume.image} 
                  alt={perfume.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-2xl italic mb-1">{perfume.name}</h3>
                  <p className="text-[#D4AF37] text-xl mb-2">${perfume.price}.00</p>
                  <p className="text-gray-300 text-xs mb-3 max-w-md line-clamp-2">{perfume.longDesc}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToCart}
                    className="px-5 py-1.5 bg-[#D4AF37] text-black text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all rounded-full"
                  >
                    Discover More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: WHY CHOOSE US - 3 UP + 3 DOWN ========== */}
      <section className="relative py-20 px-4 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Crown className="mx-auto text-[#D4AF37] mb-3" size={28} strokeWidth={1} />
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-2 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-serif italic">The Maison Difference</h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">Experience luxury redefined with our commitment to excellence</p>
          </motion.div>

          {/* Top Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {featuresTop.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, backgroundColor: "#0a0a0a" }}
                  className="bg-[#080808] p-6 rounded-xl text-center group cursor-default border border-white/5 hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="inline-flex p-3 bg-[#D4AF37]/10 rounded-full mb-4 group-hover:bg-[#D4AF37]/20 transition">
                    <IconComp className="text-[#D4AF37]" size={24} strokeWidth={1} />
                  </div>
                  <h3 className="font-serif text-xl italic mb-2">{feature.title}</h3>
                  <p className="text-[#D4AF37] text-[9px] uppercase tracking-wider mb-2">{feature.desc}</p>
                  <p className="text-gray-500 text-[10px] leading-relaxed">{feature.detailedDesc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuresBottom.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 3) * 0.1 }}
                  whileHover={{ y: -8, backgroundColor: "#0a0a0a" }}
                  className="bg-[#080808] p-6 rounded-xl text-center group cursor-default border border-white/5 hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="inline-flex p-3 bg-[#D4AF37]/10 rounded-full mb-4 group-hover:bg-[#D4AF37]/20 transition">
                    <IconComp className="text-[#D4AF37]" size={24} strokeWidth={1} />
                  </div>
                  <h3 className="font-serif text-xl italic mb-2">{feature.title}</h3>
                  <p className="text-[#D4AF37] text-[9px] uppercase tracking-wider mb-2">{feature.desc}</p>
                  <p className="text-gray-500 text-[10px] leading-relaxed">{feature.detailedDesc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: Lock, text: "Secure Checkout" },
              { icon: Eye, text: "Verified Reviews" },
              { icon: ThumbsUp, text: "100% Authentic" },
              { icon: Gift, text: "Gift Wrapping" },
            ].map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <BadgeIcon size={14} className="text-[#D4AF37]" />
                  <span className="text-[8px] uppercase tracking-wider text-gray-500">{badge.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 8: TESTIMONIALS ========== */}
      <section className="relative py-20 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-2 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif italic">What They Say</h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">Join thousands of satisfied fragrance lovers</p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#0a0a0a] to-[#080808] rounded-xl p-8 border border-white/5"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-lg" />
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-2 border-[#D4AF37] relative z-10"
                  />
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <Quote className="text-[#D4AF37]/30 mb-4" size={32} strokeWidth={1} />
                <p className="text-gray-200 text-base leading-relaxed mb-5 max-w-2xl">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <h4 className="font-serif text-xl italic">{testimonials[currentTestimonial].name}</h4>
                <p className="text-[#D4AF37] text-xs mt-1">{testimonials[currentTestimonial].role}</p>
                <p className="text-gray-500 text-[8px] uppercase tracking-wider mt-1 flex items-center gap-1">
                  <MapPin size={8} /> {testimonials[currentTestimonial].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`transition-all duration-300 ${
                  currentTestimonial === idx 
                    ? "w-6 h-1 bg-[#D4AF37]" 
                    : "w-3 h-1 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 pt-5 text-center border-t border-white/5"
          >
            <div className="flex justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <p className="text-white text-xs">Rated 4.9/5 based on <span className="text-[#D4AF37]">2,847+ reviews</span></p>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 9: BLOG & NEWSLETTER ========== */}
      <section className="relative py-20 px-4 bg-gradient-to-t from-[#030303] to-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Compass className="mx-auto text-[#D4AF37] mb-3" size={28} strokeWidth={1} />
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.5em] mb-2 block">Fragrance Journal</span>
            <h2 className="text-3xl md:text-4xl font-serif italic">Latest Stories</h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
            <p className="text-gray-500 text-xs max-w-2xl mx-auto">Insights, tips, and inspiration from our perfumers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-[#0a0a0a] overflow-hidden rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer"
              >
                <div className="relative overflow-hidden h-44">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[7px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[7px] text-gray-500 uppercase tracking-wider mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-base italic mb-2 group-hover:text-[#D4AF37] transition line-clamp-1">{post.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <button className="text-[#D4AF37] text-[8px] uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all flex items-center gap-1">
                    Read More <ChevronRight size={10} className="group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-xl p-6 text-center border border-[#D4AF37]/20"
          >
            <h3 className="font-serif text-xl italic mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 text-xs mb-4">Get 15% off your first order + exclusive access to new launches</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-black border border-white/20 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition text-xs"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-white transition-all text-xs flex items-center justify-center gap-2"
              >
                Subscribe <Send size={12} />
              </motion.button>
            </div>
            <p className="text-gray-600 text-[7px] uppercase tracking-wider mt-3">No spam, unsubscribe anytime</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}