"use client";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
// React Icons se sahi imports
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-1">
            <Link href="/perfume" className="inline-block mb-6">
              <span className="text-2xl font-serif italic">
                AURA<span className="text-[#D4AF37] font-bold"> Fragrance</span>
              </span>
            </Link>
          </div>

          <div>
            <h4 className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.2em] mb-6">Navigation</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><Link href="/perfume/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/perfume/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/perfume/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Sahi icons ka use yahan karein */}
          <div>
            <h4 className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.2em] mb-6">Connect</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer"><FaInstagram size={16}/> Instagram</li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer"><FaGithub size={16}/> GitHub</li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer"><FaLinkedin size={16}/> LinkedIn</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.2em] mb-6">Newsletter</h4>
            <div className="flex border-b border-white/20 pb-2">
              <input type="email" placeholder="Email address" className="bg-transparent w-full outline-none text-sm placeholder:text-white/20" />
              <button><ArrowUpRight size={18} className="text-[#D4AF37]" /></button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/40">
          <p>© {currentYear} AURA Fragrance. Designed by Ayesha Sagheer.</p>
        </div>
      </div>
    </footer>
  );
}