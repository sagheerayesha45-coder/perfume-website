"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar"; 
import { products } from "../../data/products"; 
import { Star, ShoppingBag, Heart, Share2 } from "lucide-react";

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
  notes: { top: string[]; heart: string[]; base: string[]; };
}

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = products.find(p => p.id === parseInt(id as string));
      setProduct(found);
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-black">
        {/* FIX 1: Prop pass kar diya taake error na aaye */}
        <Navbar onCartClick={() => {}} /> 
        <div className="flex items-center justify-center h-screen text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* FIX 1: Yahan bhi prop pass kar diya */}
      <Navbar onCartClick={() => {}} />
      
      <div className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-2xl overflow-hidden bg-white/5"
            >
              {/* FIX 2: Layout shift rokne ke liye aspect ratio class */}
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full aspect-square object-cover" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-serif text-white">{product.name}</h1>
              <p className="text-[#D4AF37] text-3xl font-bold">${product.price}</p>
              <p className="text-gray-300 leading-relaxed">{product.longDesc}</p>

              <div className="flex gap-4 items-center">
                <div className="flex items-center border border-white/20 rounded-full">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-white">-</button>
                  <span className="px-4 text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-white">+</button>
                </div>
                <button 
                  onClick={addToCart}
                  className="flex-1 px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-white transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}