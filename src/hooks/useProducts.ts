"use client";

import { useState, useEffect } from "react";
import { IProduct } from "../types";
import { productService } from "../services/productService";

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
        setError(null);

        console.log("🔄 useProducts fetching with params:", params);

        const response = await productService.getAll({
          ...params,
          isActive: true,
        });

        console.log("✅ useProducts received:", response);

        if (response.data && response.data.products) {
          setProducts(response.data.products);
          setPagination(response.data.pagination);
        } else {
          console.error("❌ Invalid response structure:", response);
          setProducts([]);
          setError("Invalid data structure received");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("❌ useProducts error:", err);
        setError(err?.response?.data?.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return { products, pagination, loading, error };
};
