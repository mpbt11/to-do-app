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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao fazer login'
        : 'Erro ao fazer login';
      throw new Error(errorMessage);
    }
  },

  async register(data: RegisterApiData): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>(
        API_ROUTES.AUTH.REGISTER,
        data
      );
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao criar conta'
        : 'Erro ao criar conta';
      throw new Error(errorMessage);
    }
  },
};
