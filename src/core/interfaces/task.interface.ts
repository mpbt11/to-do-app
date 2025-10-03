import { Task, CreateTaskData, UpdateTaskData } from '@/shared/types/task.types';

export interface ITaskRepository {
  getTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(data: CreateTaskData): Promise<Task>;
  updateTask(id: string, data: UpdateTaskData): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}

export interface ITaskService {
  getTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(data: CreateTaskData): Promise<Task>;
  updateTask(id: string, data: UpdateTaskData): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
