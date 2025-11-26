'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ICategory, IProduct } from '@/src/types';
import { categoryService } from '@/src/services/categoryService';
import { productService } from '@/src/services/productService';
import ProductCard from '../products/ProductCard';

const BestSellerSection: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('🔄 Fetching categories...');
        const response = await categoryService.getAll(true);
        console.log('✅ Categories received:', response);
        setCategories(response.data || []);
      } catch (error) {
        console.error('❌ Failed to fetch categories:', error);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('🔄 Fetching products for category:', selectedCategory);
        
        const response = await productService.getAll({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          limit: 12,
          isActive: true,
        });
        
        console.log('✅ Products received:', response);
        
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          console.error('❌ Invalid products response:', response);
          setProducts([]);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('❌ Failed to fetch products:', error);
        setError(error?.response?.data?.message || 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="min-h-screen bg-linear-to-b from-pink-50 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Our best Seller Dishes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our fresh garden salad is a light and refreshing option. It features a
            mix of crisp lettuce, juicy tomatoe all tossed in your choice of
            dressing.
          </p>
        </div>

        {/* Category Filters and Action Buttons */}
        <div className="flex flex-wrap items-center justify-between mb-12 gap-4">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 ${
                  selectedCategory === category._id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              Add Food
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellerSection;