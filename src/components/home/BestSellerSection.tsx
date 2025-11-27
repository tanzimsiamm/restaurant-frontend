"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { ICategory, IProduct } from "@/src/types";
import { categoryService } from "@/src/services/categoryService";
import { productService } from "@/src/services/productService";
import ProductCard from "../products/ProductCard";

const BestSellerSection: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll(true);
        setCategories(response.data || []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productService.getAll({
          category: selectedCategory === "all" ? undefined : selectedCategory,
          limit: 12,
          isActive: true,
        });

        if (response.data?.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error?.response?.data?.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-linear-to-b from-pink-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Best Seller Dishes
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base lg:text-lg">
            Our fresh garden salad is a light and refreshing option with crisp
            lettuce and juicy tomatoes tossed in your choice of dressing.
          </p>
        </div>

        {/* Filters + Actions */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2 md:px-7 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:shadow"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-5 py-2 md:px-7 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  selectedCategory === category._id
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:shadow"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
            <button className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 bg-gray-900 text-white rounded-full font-medium text-sm md:text-base shadow hover:bg-gray-800">
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              Add Food
            </button>
            <button className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 bg-gray-900 text-white rounded-full font-medium text-sm md:text-base shadow hover:bg-gray-800">
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              Add Category
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-gray-900 rounded-full"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellerSection;
