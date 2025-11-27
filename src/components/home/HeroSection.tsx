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
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800",
    bgColor: "#8B0000", // Dark Red
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800",
    bgColor: "#A52A2A", // Brownish Red
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    bgColor: "#C71585", // Medium Violet Red
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
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

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search functionality
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearch.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        console.log("🔍 Searching for:", debouncedSearch);
        const response = await productService.getAll({
          search: debouncedSearch,
          limit: 5,
        });
        
        console.log("✅ Search results:", response);
        
        if (response?.data?.products) {
          setSearchResults(response.data.products);
        } else if (Array.isArray(response?.data)) {
          setSearchResults(response.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("❌ Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  return (
    <motion.div
      className="min-h-screen transition-colors duration-700 ease-in-out"
      animate={{ backgroundColor: selectedItem.bgColor }}
    >
      <section className="pt-8 pb-16 text-white">
        <Container>
          {/* Header with Logo and Search */}
          <header className="mb-16 flex items-center justify-between gap-8">
            <Link
              href="/"
              className="text-3xl font-bold tracking-wider hover:text-gray-200 transition-colors whitespace-nowrap"
            >
              RESTAURANT
            </Link>

            <div ref={searchRef} className="relative flex-1 max-w-2xl">
              <div className="relative w-full">
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
                {searchOpen &&
                  (searchQuery.trim().length > 0 ||
                    searchResults.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden z-50 max-h-96 overflow-y-auto"
                    >
                      {loading ? (
                        <div className="p-4 text-center text-gray-500">
                          Searching...
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((product) => (
                            <Link
                              key={product._id}
                              href={`/products/${product.slug}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                            >
                              {product.images && product.images[0] ? (
                                <div className="relative w-12 h-12 shrink-0">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="rounded object-cover"
                                    sizes="48px"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center shrink-0">
                                  <span className="text-gray-400 text-xs">No img</span>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium truncate">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  ${product.discountPrice || product.price}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : searchQuery.trim().length >= 2 ? (
                        <div className="p-4 text-center text-gray-500">
                          No results found for &quot;{searchQuery}&quot;
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-400 text-sm">
                          Type at least 2 characters to search
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
                Breakfast, often referred to as the most important meal of the
                day, provides essential nutrients to kick start our day. It
                includes a variety of foods, like fruits, cereals, dairy
                products, and proteins, that contribute to a balanced diet.
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
                      sizes="(max-width: 768px) 80px, 96px"
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
                    sizes="(max-width: 768px) 400px, 550px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Decorative blur effects */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white/10 rounded-full -z-10 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-white/10 rounded-full -z-10 blur-3xl"></div>
            </div>
          </div>
        </Container>
      </section>
    </motion.div>
  );
};

export default HeroSection;