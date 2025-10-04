import { API_ROUTES } from '@/core/global/endpoints';
import { CreateTaskData, Task, UpdateTaskData } from '../types/task.types';
import { httpClient } from '@/core';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    try {
      const response = await httpClient.get<Task[]>(API_ROUTES.TASKS.BASE);
      return response;
    } catch (error: unknown) {
      throw new Error('Erro ao carregar tarefas');
    }
  },

  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await httpClient.get<Task>(API_ROUTES.TASKS.BY_ID(id));
      return response;
    } catch (error: unknown) {
      throw new Error('Erro ao carregar tarefa');
    }
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const response = await httpClient.post<Task>(API_ROUTES.TASKS.BASE, data);
      return response;
    } catch (error: unknown) {
      throw new Error('Erro ao criar tarefa');
    }
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    try {
      const response = await httpClient.patch<Task>(API_ROUTES.TASKS.BY_ID(id), data);
      return response;
    } catch (error: unknown) {
      throw new Error('Erro ao atualizar tarefa');
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await httpClient.delete(API_ROUTES.TASKS.BY_ID(id));
    } catch (error: unknown) {
      throw new Error('Erro ao excluir tarefa');
    }
  },
};
