'use client';

import { useState, useEffect } from 'react';
import { IProduct } from '../types';
import { productService } from '../services/productService';

interface UseProductsParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const useProducts = (params?: UseProductsParams) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll({
          ...params,
          isActive: true,
        });
        setProducts(response.data.products);
        setPagination(response.data.pagination);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return { products, pagination, loading, error };
};