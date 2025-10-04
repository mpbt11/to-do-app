'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authApi } from '@/core/services/authApi';
import { LoginCredentials, RegisterData, User } from '@/shared/types/task.types';
import Cookies from 'js-cookie';
import { STORAGE_KEYS } from '@/shared/config/constants';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = Cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
        const userString = Cookies.get(STORAGE_KEYS.USER);
        
        if (token && userString) {
          const userData = JSON.parse(userString) as User;
          setUser(userData);
        } else {
          Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
          Cookies.remove(STORAGE_KEYS.USER);
          setUser(null);
        }
      } catch {
        Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
        Cookies.remove(STORAGE_KEYS.USER);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data } = await authApi.login(credentials);
      
      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, data.access_token, {
        expires: 7, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      
      Cookies.set(STORAGE_KEYS.USER, JSON.stringify(data.user), {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      setUser(data.user);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const apiData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await authApi.register(apiData);
      
      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.access_token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      
      Cookies.set(STORAGE_KEYS.USER, JSON.stringify(response.data.user), {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      setUser(response.data.user);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
    Cookies.remove(STORAGE_KEYS.USER);
    setUser(null);
    setError(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
