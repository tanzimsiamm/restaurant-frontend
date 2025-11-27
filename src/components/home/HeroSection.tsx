"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useSliders } from "@/src/hooks/useSliders";
import { productService } from "@/src/services/productService";
import { IProduct } from "@/src/types";
import { fadeInUp } from "@/src/animations/variants";
import Image from "next/image";
import Loading from "../ui/Loading";

const HeroSection: React.FC = () => {
  // Fetch sliders from backend
  const { sliders, loading: slidersLoading, error: slidersError } = useSliders(true);
  
  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Selected slider state
  const [selectedItem, setSelectedItem] = useState(sliders[0] || null);

  // Update selected item when sliders are loaded
  useEffect(() => {
    if (sliders.length > 0 && !selectedItem) {
      setSelectedItem(sliders[0]);
    }
  }, [sliders, selectedItem]);

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

  // Search products
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearch.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);
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
        setSearchLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  // Loading state
  if (slidersLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  // Error state
  if (slidersError || !sliders || sliders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Unable to load content</h2>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen transition-colors duration-700 ease-in-out"
      animate={{ backgroundColor: selectedItem?.bgColor || '#8B0000' }}
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
                      {searchLoading ? (
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
                              {product.images?.[0] && (
                                <div className="relative w-12 h-12 shrink-0">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="rounded object-cover"
                                    sizes="48px"
                                  />
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

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT TEXT */}
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight text-center lg:text-left">
                {selectedItem?.title || 'BREAKFAST'}
              </h1>

              {selectedItem?.subtitle && (
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-white/90 text-center lg:text-left">
                  {selectedItem.subtitle}
                </h2>
              )}

              <p className="text-base sm:text-lg md:text-xl text-white/90 font-semibold mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                {selectedItem?.description ||
                  'Breakfast provides essential nutrients to kick-start the day with fruits, cereals, dairy, and proteins that contribute to a balanced diet.'}
              </p>

              {/* THUMBNAILS */}
              <div className="flex gap-4 sm:gap-6 justify-center lg:justify-start flex-wrap">
                {sliders.map((slider) => (
                  <motion.div
                    key={slider._id}
                    className="relative cursor-pointer"
                    onClick={() => setSelectedItem(slider)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-300 ${
                        selectedItem?._id === slider._id
                          ? "opacity-100 scale-110"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={slider.thumbnailImage || slider.image}
                        alt={slider.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {selectedItem?._id === slider._id && (
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
                {selectedItem && (
                  <motion.div
                    key={selectedItem._id}
                    initial={{ opacity: 0, x: 100, rotate: 360 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: -100, rotate: -360 }}
                    transition={{ duration: 0.6 }}
                    className="absolute w-[220px] sm:w-[320px] md:w-[450px] h-[220px] sm:h-80 md:h-[450px] rounded-full overflow-hidden shadow-2xl border-8 border-white/20"
                  >
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 220px, (max-width: 1024px) 320px, 450px"
                    />
                  </motion.div>
                )}
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