import api from "../lib/api";
import { ApiResponse, ISlider } from "../types";

export const sliderService = {
  getAll: async (isActive?: boolean) => {
    console.log('📡 Fetching sliders, isActive:', isActive);
    
    const params = isActive !== undefined ? { isActive } : {};
    const response = await api.get<ApiResponse<ISlider[]>>('/sliders', { params });
    
    console.log('✅ Sliders response:', response.data);
    
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<ISlider>>(`/sliders/${id}`);
    return response.data;
  },
};