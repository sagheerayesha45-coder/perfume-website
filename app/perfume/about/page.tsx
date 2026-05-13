"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import {
  Sparkles,
  Wind,
  Droplets,
  Award,
  X,
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  Gem,
  Flower2,
} from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type GalleryImage = {
  id: number;
  src: string;
  title: string;
  category: string;
};

export default function AboutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Midnight Oud",
      price: 129,
      quantity: 1,
      image: "/images/5pic.webp",
    },
    {
      id: 2,
      name: "Rose de Grasse",
      price: 149,
      quantity: 1,
      image: "/images/6pic.avif",
    },
  ]);

  // Gallery Images - Fixed with working paths
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "/images/5pic.webp",
      title: "Midnight Oud",
      category: "Oud Collection",
    },
    {
      id: 2,
      src: "/images/6pic.avif",
      title: "Rose de Grasse",
      category: "Floral Collection",
    },
    {
      id: 3,
      src: "/images/wh.webp",
      title: "Cedar Wood",
      category: "Woody Collection",
    },
    {
      id: 4,
      src: "/images/apple.webp",
      title: "Bergamot Bliss",
      category: "Citrus Collection",
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0.3, 1], [0, -100]);

  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  function updateQuantity(id: number, newQuantity: number) {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function removeItem(id: number) {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
        setSelectedImage(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar onCartClick={() => setIsCartOpen(true)} cartItemCount={totalItems} />

      {/* Hero Section with Image */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0f0a05]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold">
                Since 1965
              </span>
            </div>

            <h1 className="text-7xl md:text-9xl font-serif leading-[0.9] mb-8">
              Our
              <br />
              <span className="text-[#D4AF37] italic">Legacy</span>
              <br />
              of Scent
            </h1>

            <div className="w-20 h-[2px] bg-[#D4AF37] my-8" />

            <p className="text-gray-400 text-xl leading-relaxed font-light max-w-lg">
              "A fragrance is like a signature, it speaks of your character,
              your mood, and your deepest desires without saying a single word."
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-10 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center gap-2 group"
            >
              Discover Our Story
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </motion.button>
          </motion.div>

          {/* Hero Image with Animation */}
          <motion.div
            style={{ y: y1, opacity: opacityHero }}
            className="relative h-[600px] lg:h-[700px] rounded-t-full overflow-hidden shadow-2xl group"
          >
            <img
              src="/images/nem2.webp"
              alt="Luxury Perfume"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1594035910388-f0964775c6ac?q=80&w=1000";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-[#D4AF37]/80 text-sm tracking-wider uppercase">
                Art of Perfumery
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Our Legacy</span>
            <h3 className="text-4xl md:text-5xl font-serif mt-3">By The Numbers</h3>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wind, value: "120+", label: "Unique Scents", desc: "Exclusive blends" },
              { icon: Droplets, value: "100%", label: "Natural Essences", desc: "Pure ingredients" },
              { icon: Sparkles, value: "12", label: "Master Perfumers", desc: "World-class artists" },
              { icon: Award, value: "45", label: "Global Awards", desc: "International recognition" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-[#D4AF37]/30"
              >
                <stat.icon className="text-[#D4AF37] w-8 h-8 mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm font-semibold text-[#D4AF37] mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section with Image */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-t from-[#080808] to-transparent">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div style={{ y: y2 }} className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="/images/5pic.avif"
              alt="Handcrafted Perfume"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1585747860716-2ba9fbfa5294?q=80&w=1000";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[#D4AF37] text-xs tracking-wider uppercase mb-2">Artisan Process</p>
              <h4 className="text-2xl font-serif italic">Handcrafted with Passion</h4>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Artisan Process</span>
              <h3 className="text-4xl md:text-5xl font-serif italic text-white mt-3 mb-6">
                The Raw <span className="text-[#D4AF37]">Ingredients</span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                From the rose valleys of Bulgaria to the jasmine fields of Grasse,
                our journey begins where nature thrives. Each ingredient is hand-picked
                at the peak of its potency, ensuring nothing but the finest essence
                makes it into our bottles.
              </p>
              <div className="space-y-4">
                {["Bulgarian Rose", "Grasse Jasmine", "Sandalwood Mysore", "Madagascar Vanilla"].map((ing, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-gray-400 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>{ing}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Fixed with working images */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Visual Journey</span>
            <h3 className="text-4xl md:text-5xl font-serif mt-3">Our Signature Collection</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer relative overflow-hidden rounded-2xl"
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1594035910388-f0964775c6ac?q=80&w=400";
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6">
                  <div className="text-center">
                    <p className="text-[#D4AF37] text-xs tracking-wider mb-1">{img.category}</p>
                    <h4 className="text-white font-serif text-lg">{img.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for Images */}
      {selectedImage && (
        <>
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50"
            onClick={() => setSelectedImage(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full"
            >
              <img
                src={selectedImage}
                alt="Full size"
                className="w-full h-auto rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1594035910388-f0964775c6ac?q=80&w=1000";
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </div>
        </>
      )}

      {/* Cart Sidebar with Images */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={() => setIsCartOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] z-50 flex flex-col border-l border-white/10"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-xl font-serif">Your Cart</h2>
                <span className="text-xs text-gray-400">({totalItems})</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition">
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#0a0a0a]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1594035910388-f0964775c6ac?q=80&w=100";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-[#D4AF37] text-sm font-semibold mt-1">${item.price}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-xs text-red-400 hover:text-red-300 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-serif text-[#D4AF37] text-2xl">${totalPrice}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-[#c4a23a] transition"
                >
                  Checkout →
                </motion.button>
                <p className="text-[10px] text-gray-500 text-center">Free shipping on orders over $250</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </main>
  );
}