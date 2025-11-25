'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import { ICategory, IProduct } from '@/src/types';
import { categoryService } from '@/src/services/categoryService';
import { productService } from '@/src/services/productService';
import { fadeInUp, staggerContainer } from '@/src/animations/variants';
import ProductCard from '../products/ProductCard';

const BestSellerSection: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          categoryService.getAll(true),
          productService.getAll({ limit: 12 }),
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data.products);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getAll({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          limit: 12,
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Best Seller Dishes
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our fresh garden salad is a light and refreshing option. It features 
              a mix of crisp lettuce, juicy tomatoes all tossed in your choice of 
              dressing.
            </p>
          </motion.div>

          {/* Category Tabs and Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              {categories.slice(0, 3).map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category._id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Food
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loading size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

export default BestSellerSection;