import api from "../lib/api";
import { ApiResponse, ICategory } from "../types";

export const categoryService = {
  getAll: async (isActive?: boolean) => {
    console.log('📡 Fetching categories, isActive:', isActive);
    
    const params = isActive !== undefined ? { isActive } : {};
    const response = await api.get<ApiResponse<ICategory[]>>('/categories', { params });
    
    console.log('✅ Categories response:', response.data);
    
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<ICategory>>(`/categories/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<ICategory>>(`/categories/slug/${slug}`);
    return response.data;
  },
};