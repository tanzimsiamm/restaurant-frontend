import api from "../lib/api";
import { ApiResponse, IProduct, PaginatedResponse } from "../types";

interface ProductQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const productService = {
  getAll: async (params?: ProductQueryParams) => {
    console.log('📡 Fetching products with params:', params);
    
    const response = await api.get<ApiResponse<{ 
      success: boolean;
      data: PaginatedResponse<IProduct> 
    }>>(
      '/products',
      { params }
    );
    
    console.log('✅ Products response:', response.data);
    
    // Handle nested data structure from backend
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data.data // Access nested data.data
    };
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<IProduct>>(`/products/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<IProduct>>(`/products/slug/${slug}`);
    return response.data;
  },

  getFeatured: async (limit: number = 8) => {
    console.log('📡 Fetching featured products, limit:', limit);
    
    const response = await api.get<ApiResponse<{
      success: boolean;
      data: PaginatedResponse<IProduct>
    }>>(
      '/products',
      {
        params: { isFeatured: true, limit, isActive: true },
      }
    );
    
    console.log('✅ Featured products response:', response.data);
    
    // Handle nested data structure
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data.data // Access nested data.data
    };
  },
};