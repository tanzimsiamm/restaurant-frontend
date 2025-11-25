'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
// import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "Dive into Delights Of Delectable Food",
    desc: "Where each plate weaves a story of culinary mastery and passionate craftsmanship",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    bg: "bg-[#F3F4F6]"
  },
  {
    id: 2,
    title: "Fresh Ingredients, Authentic Flavors",
    desc: "Experience the true taste of tradition with our locally sourced ingredients.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
    bg: "bg-[#FFF0E5]"
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 -z-10 ${slides[current].bg}`}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
        {/* Left Content */}
        <div className="space-y-8">
          <motion.h1 
            key={`h1-${current}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight text-secondary"
          >
            {slides[current].title.split("Food")[0]} 
            <span className="text-primary">Food</span>
          </motion.h1>
          
          <motion.p 
             key={`p-${current}`}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-xl text-gray-600 max-w-lg"
          >
            {slides[current].desc}
          </motion.p>

          <motion.div 
            key={`btn-${current}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6"
          >
            <button className="bg-primary text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-orange-200 hover:scale-105 transition-transform">
              Order Now
            </button>
            <button className="flex items-center gap-2 font-semibold text-gray-600 hover:text-primary transition">
              <span className="bg-white p-3 rounded-full shadow-lg">
                <PlayCircle className="text-gray-700" />
              </span>
              Watch Video
            </button>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="relative h-[400px] md:h-[600px]">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-75 animate-pulse" />
          <AnimatePresence mode='wait'>
            <motion.div
               key={`img-${current}`}
               initial={{ x: 100, opacity: 0, rotate: 10 }}
               animate={{ x: 0, opacity: 1, rotate: 0 }}
               exit={{ x: -100, opacity: 0, rotate: -10 }}
               transition={{ duration: 0.6, type: "spring" }}
               className="relative w-full h-full"
            >
               {/* <Image 
                 src={slides[current].image} 
                 alt="Hero Dish"
                 fill
                 className="object-contain drop-shadow-2xl"
               /> */}
               
               {/* Floating Badge */}
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 0.5 }}
                 className="absolute bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-xl flex gap-3 items-center"
               >
                 <span className="text-primary font-bold text-xl">Hot</span>
                 <div className="text-sm">
                   <p className="font-bold">Spicy Noodles</p>
                   <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
                 </div>
               </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 rounded-full transition-all duration-300 ${current === idx ? 'w-8 bg-primary' : 'w-3 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}