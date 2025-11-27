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
    bgColor: "#8B0000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800",
    bgColor: "#A52A2A",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    bgColor: "#C71585",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
    bgColor: "#B22222",
  },
];

const HeroSection: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [selectedItem, setSelectedItem] = useState(breakfastItems[0]);

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

        if (response?.data?.products) setSearchResults(response.data.products);
        else if (Array.isArray(response?.data)) setSearchResults(response.data);
        else setSearchResults([]);
      } catch {
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
      <section className="pt-6 pb-16 text-white">
        <Container className="px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <header className="mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            <Link
              href="/"
              className="text-3xl font-bold tracking-wider hover:text-gray-200 transition-colors text-center sm:text-left"
            >
              RESTAURANT
            </Link>

            {/* SEARCH */}
            <div
              ref={searchRef}
              className="relative w-full sm:w-auto flex-1 max-w-2xl"
            >
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />

                <input
                  type="text"
                  placeholder="Search...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  className="w-full pl-12 pr-10 py-3 bg-white text-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
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

              {/* DROPDOWN */}
              <AnimatePresence>
                {searchOpen &&
                  (searchQuery.trim().length > 0 ||
                    searchResults.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden z-50 max-h-80 overflow-y-auto"
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
                              <div className="relative w-12 h-12 shrink-0">
                                <Image
                                  src={product.images?.[0]}
                                  alt={product.name}
                                  fill
                                  className="rounded object-cover"
                                  sizes="48px"
                                />
                              </div>

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

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT TEXT */}
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight text-center lg:text-left">
                BREAKFAST
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 font-semibold mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                Breakfast provides essential nutrients to kick-start the day
                with fruits, cereals, dairy, and proteins that contribute to a
                balanced diet.
              </p>

              {/* THUMBNAILS */}
              <div className="flex gap-4 sm:gap-6 justify-center lg:justify-start flex-wrap">
                {breakfastItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-300 ${
                        selectedItem.id === item.id
                          ? "opacity-100 scale-110"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {selectedItem.id === item.id && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 h-1 bg-white rounded-2xl"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT BIG IMAGE */}
            <div className="relative flex justify-center items-center h-80 sm:h-[400px] md:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, x: 100, rotate: 360 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -100, rotate: -360 }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-[220px] sm:w-[320px] md:w-[450px] h-[220px] sm:h-80 md:h-[450px] rounded-full overflow-hidden shadow-2xl border-8 border-white/20"
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

              <div className="absolute -bottom-6 -right-6 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-white/10 rounded-full -z-10 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-white/10 rounded-full -z-10 blur-3xl"></div>
            </div>
          </div>
        </Container>
      </section>
    </motion.div>
  );
};

export default HeroSection;
