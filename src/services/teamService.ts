import api from "../lib/api";
import { ApiResponse, ITeam } from "../types";

export const teamService = {
  getAll: async (isActive?: boolean) => {
    console.log('📡 Fetching team members, isActive:', isActive);
    
    const params = isActive !== undefined ? { isActive } : {};
    const response = await api.get<ApiResponse<ITeam[]>>('/team', { params });
    
    console.log('✅ Team members response:', response.data);
    
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<ITeam>>(`/team/${id}`);
    return response.data;
  },
};