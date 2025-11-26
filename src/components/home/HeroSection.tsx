"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import { useDebounce } from "@/src/hooks/useDebounce";
import { productService } from "@/src/services/productService";
import { IProduct } from "@/src/types";
import { fadeInUp } from "@/src/animations/variants";
import Image from "next/image";

// Data for breakfast items with respective background colors
const breakfastItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800", // Waffles
    bgColor: "#8B0000", // Dark Red
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800", // Pancakes/Berries
    bgColor: "#A52A2A", // Brownish Red
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", // French Toast
    bgColor: "#C71585", // Medium Violet Red
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800", // Crepes
    bgColor: "#B22222", // Firebrick
  },
];

const HeroSection: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // State to keep track of the currently selected item (image + color)
  const [selectedItem, setSelectedItem] = useState(breakfastItems[0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearch.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await productService.getAll({
          search: debouncedSearch,
          limit: 5,
        });
        setSearchResults(response.data.products);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  return (
    // Animate the background color of the entire section
    <motion.div
      className="min-h-screen transition-colors duration-700 ease-in-out"
      animate={{ backgroundColor: selectedItem.bgColor }}
    >
      <section className="pt-8 pb-16 text-white">
        <Container>
          {/* Header with Logo and Search */}
          <header className="mb-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-3xl font-bold tracking-wider hover:text-gray-200 transition-colors"
            >
              RESTAURANT
            </Link>

            <div ref={searchRef} className="relative">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                <input
                  type="text"
                  placeholder="Search...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  className="w-full pl-12 pr-10 py-3 bg-white text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchOpen && (searchQuery.trim().length > 0 || searchResults.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden z-50"
                  >
                    {loading ? (
                      <div className="p-4 text-center text-gray-500">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <Link
                          key={product._id}
                          href={`/products/${product.slug}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="rounded object-cover"
                          />
                          <div>
                            <h4 className="text-sm font-medium">{product.name}</h4>
                            <p className="text-xs text-gray-500">
                              ${product.discountPrice || product.price}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-sm">
                        No results found
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Text and Thumbnails */}
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
                BREAKFAST
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-xl">
                Breakfast, often referred to as the ‘most important meal of the day’, provides essential nutrients to kick start our day. It includes a variety of foods, like fruits, cereals, dairy products, and proteins, that contribute to a balanced diet.
              </p>

              {/* Thumbnails */}
              <div className="flex gap-6">
                {breakfastItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden cursor-pointer border-4 transition-all duration-300 ${
                      selectedItem.id === item.id
                        ? "border-white shadow-2xl scale-110 z-10"
                        : "border-white/30 opacity-70 hover:opacity-100 hover:border-white/70"
                    }`}
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={item.image}
                      alt={`Breakfast item ${item.id}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Big Spinning Image */}
            <div className="relative flex justify-center items-center h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                  className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full overflow-hidden shadow-2xl border-8 border-white/20"
                >
                  <Image
                    src={selectedItem.image}
                    alt="Selected breakfast"
                    fill
                    className="object-cover"
                    priority 
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>
    </motion.div>
  );
};

export default HeroSection;