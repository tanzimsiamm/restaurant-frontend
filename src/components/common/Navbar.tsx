'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, User } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold font-sans">
          <span className="text-primary">Food</span>i
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-secondary">
          <Link href="/" className="text-primary">Home</Link>
          <Link href="/menu" className="hover:text-primary transition">Menu</Link>
          <Link href="/services" className="hover:text-primary transition">Services</Link>
          <Link href="/offers" className="hover:text-primary transition">Offers</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button className="relative hover:text-primary transition">
            <Search size={24} />
          </button>
          <button className="relative hover:text-primary transition">
            <ShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-orange-600 transition shadow-lg shadow-orange-200">
            <User size={18} />
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}