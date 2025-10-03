import { Task, CreateTaskData, UpdateTaskData, TasksResponse, TaskResponse, ApiResponse } from '@/shared/types/task.types';
import { httpClient } from '../interceptors/httpClient';
import { API_ROUTES } from '../global/endpoints';

export const tasksApi = {
  async getTasks(): Promise<TasksResponse> {
    try {
      console.log('API: Getting tasks from:', API_ROUTES.TASKS.BASE);
      const response = await httpClient.get<TasksResponse>(API_ROUTES.TASKS.BASE);
      console.log('API: Tasks response:', response);
      return response;
    } catch (error: any) {
      console.error('API: Error getting tasks:', error);
      throw new Error(error.response?.data?.message || 'Erro ao carregar tarefas');
    }
  },

  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await httpClient.get<TaskResponse>(API_ROUTES.TASKS.BY_ID(id));
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar tarefa');
    }
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const response = await httpClient.post<TaskResponse>(API_ROUTES.TASKS.BASE, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar tarefa');
    }
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    try {
      const response = await httpClient.patch<TaskResponse>(API_ROUTES.TASKS.BY_ID(id), data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar tarefa');
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await httpClient.delete(API_ROUTES.TASKS.BY_ID(id));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao excluir tarefa');
    }
  },
};