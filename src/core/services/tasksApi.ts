import { Task, CreateTaskData, UpdateTaskData, TasksResponse, TaskResponse } from '@/shared/types/task.types';
import { httpClient } from '../interceptors/httpClient';
import { API_ROUTES } from '../global/endpoints';

export const tasksApi = {
  async getTasks(): Promise<TasksResponse> {
    try {
    
      const response = await httpClient.get<TasksResponse>(API_ROUTES.TASKS.BASE);
  
      return response;
    } catch (error: unknown) {
      console.error('API: Error getting tasks:', error);
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao carregar tarefas'
        : 'Erro ao carregar tarefas';
      throw new Error(errorMessage);
    }
  },

  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await httpClient.get<TaskResponse>(API_ROUTES.TASKS.BY_ID(id));
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao carregar tarefa'
        : 'Erro ao carregar tarefa';
      throw new Error(errorMessage);
    }
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const response = await httpClient.post<TaskResponse>(API_ROUTES.TASKS.BASE, data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao criar tarefa'
        : 'Erro ao criar tarefa';
      throw new Error(errorMessage);
    }
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    try {
      const response = await httpClient.patch<TaskResponse>(API_ROUTES.TASKS.BY_ID(id), data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao atualizar tarefa'
        : 'Erro ao atualizar tarefa';
      throw new Error(errorMessage);
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await httpClient.delete(API_ROUTES.TASKS.BY_ID(id));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao excluir tarefa'
        : 'Erro ao excluir tarefa';
      throw new Error(errorMessage);
    }
  },
};