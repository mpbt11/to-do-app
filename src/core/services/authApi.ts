import { httpClient } from '@/core/interceptors/httpClient';
import { AuthResponse, LoginCredentials, RegisterApiData } from '@/shared/types/task.types';
import { API_ROUTES } from '../global/endpoints';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>(
        API_ROUTES.AUTH.LOGIN,
        credentials
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  async register(data: RegisterApiData): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>(
        API_ROUTES.AUTH.REGISTER,
        data
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar conta');
    }
  },
};
