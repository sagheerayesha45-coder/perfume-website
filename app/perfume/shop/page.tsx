"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Star,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  isNew: boolean;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Midnight Oud",
    category: "Oud",
    price: 129,
    image: "/images/pinkper.avif",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 2,
    name: "Rose de Grasse",
    category: "Floral",
    price: 149,
    image: "/images/ba.png",
    rating: 4.9,
    isNew: false,
  },
  {
    id: 3,
    name: "Cedar Wood",
    category: "Woody",
    price: 99,
    image: "/images/wood.jpg",
    rating: 4.6,
    isNew: false,
  },
  {
    id: 4,
    name: "Bergamot Bliss",
    category: "Citrus",
    price: 89,
    image: "/images/4pic.jpg",
    rating: 4.7,
    isNew: true,
  },
];

export default function ShopPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const categories = ["All", "Woody", "Floral", "Citrus", "Oud"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id: number, newQuantity: number) {
    if (newQuantity < 1) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  }

  function removeItem(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} cartItemCount={totalItems} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-serif italic"
        >
          The <span className="text-[#D4AF37]">Atelier</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm mt-4 max-w-md mx-auto"
        >
          Discover our exclusive collection of handcrafted fragrances
        </motion.p>

        {/* Category Filters */}
        <div className="flex justify-center gap-3 md:gap-6 mt-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-black font-semibold shadow-lg shadow-[#D4AF37]/20"
                  : "border border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid with Images */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 group"
            >
              {/* Image Container - FIXED */}
              <div className="h-[280px] overflow-hidden bg-[#0a0a0a] relative">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback image if original fails to load
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594035910388-f0964775c6ac?q=80&w=400";
                  }}
                />
                {perfume.isNew && (
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                <h3 className="text-xl text-center font-serif group-hover:text-[#D4AF37] transition-colors duration-300">
                  {perfume.name}
                </h3>

                <p className="text-center text-gray-500 text-sm mt-1">{perfume.category}</p>

                <p className="text-center text-[#D4AF37] font-semibold mt-2">
                  ${perfume.price}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addToCart(perfume);
                    setIsCartOpen(true);
                  }}
                  className="w-full mt-4 py-3 rounded-full bg-[#D4AF37] text-black font-semibold hover:bg-[#c4a23a] transition-all duration-300"
                >
                  Add To Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] z-50 border-l border-white/10 flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                  <h2 className="text-xl font-serif">Your Cart</h2>
                  <span className="text-gray-400 text-sm">({totalItems})</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="hover:rotate-90 transition-transform duration-300"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">Your cart is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-[#D4AF37] text-sm underline"
                    >
                      Continue Shopping →
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1a1a]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594035910388-f0964775c6ac?q=80&w=100";
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-[#D4AF37] text-sm font-semibold mt-1">${item.price}</p>

                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 border border-white/20 rounded-full flex items-center justify-center hover:border-[#D4AF37] transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-white/20 rounded-full flex items-center justify-center hover:border-[#D4AF37] transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-red-400 text-xs hover:text-red-300 transition"
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
                    <span className="text-[#D4AF37] text-2xl font-serif">${totalPrice}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-full bg-[#D4AF37] text-black font-semibold hover:bg-[#c4a23a] transition-all duration-300"
                  >
                    Checkout →
                  </motion.button>
                  <p className="text-[10px] text-gray-500 text-center">Free shipping on orders over $250</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}