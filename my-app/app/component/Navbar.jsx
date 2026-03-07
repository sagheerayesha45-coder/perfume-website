'use client'; // Client-side interactivity ke liye zaroori hai

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Logo Section */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
              MY<span className="text-gray-900">BRAND</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation (Badi screens ke liye) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
            <Link href="/contact" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
              Contact Us
            </Link>
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown (Choti screens ke liye) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
        <div className="px-4 pt-2 pb-6 space-y-2 shadow-inner">
          <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">Home</Link>
          <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">About</Link>
          <Link href="/services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">Services</Link>
          <Link href="/contact" className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md text-center">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;