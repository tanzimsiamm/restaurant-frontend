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
    const response = await api.get<ApiResponse<PaginatedResponse<IProduct>>>(
      '/products',
      { params }
    );
    return response.data;
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
    const response = await api.get<ApiResponse<PaginatedResponse<IProduct>>>(
      '/products',
      {
        params: { isFeatured: true, limit },
      }
    );
    return response.data;
  },
};