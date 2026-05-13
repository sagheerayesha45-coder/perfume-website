

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

interface CartItem {
  id: number;
  quantity: number;
}

interface NavbarProps {
  onCartClick?: () => void;
  cartItemCount?: number; // FIXED
}

export default function Navbar({
  onCartClick,
  cartItemCount = 0,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    const updateCartCount = () => {
      try {
        const cart: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        setCartCount(cart.length);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "/perfume",
    },
    {
      name: "Shop",
      href: "/perfume/shop",
    },
    {
      name: "About",
      href: "/perfume/about",
    },
    {
      name: "Contact",
      href: "/perfume/contact",
    },
  ];

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl py-3 border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/perfume"
          className="relative group"
        >
          <span className="text-2xl md:text-3xl font-serif font-light tracking-tight text-white">
            AURA
            <span className="text-[#D4AF37] font-bold">
              {" "}
              fragrance
            </span>
          </span>

          <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-[#D4AF37] transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={handleCartClick}
              className="relative group outline-none"
            >
              <ShoppingBag className="w-5 h-5 text-white/70 group-hover:text-[#D4AF37] transition-colors" />

              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartItemCount || cartCount}
              </span>
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-white outline-none"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-white/70 hover:text-[#D4AF37] py-2 text-sm uppercase tracking-[0.2em]"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                handleCartClick();
              }}
              className="text-white/70 hover:text-[#D4AF37] py-2 text-sm uppercase tracking-[0.2em] flex items-center gap-2 outline-none"
            >
              Cart

              <span className="bg-[#D4AF37] text-black px-2 py-0.5 rounded-full text-[10px]">
                {cartItemCount || cartCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}