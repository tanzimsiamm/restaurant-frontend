import api from "../lib/api";
import { ApiResponse, ISlider } from "../types";


export const sliderService = {
  getAll: async (isActive?: boolean) => {
    const params = isActive !== undefined ? { isActive } : {};
    const response = await api.get<ApiResponse<ISlider[]>>('/sliders', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<ISlider>>(`/sliders/${id}`);
    return response.data;
  },
};