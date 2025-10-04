export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  data: {
    access_token: string;
    user: User;
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface RegisterApiData {
  email: string;
  password: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  PENDENTE = 'pendente',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDA = 'concluida',
}

export interface CreateTaskData {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface ApiResponse<T> {
  data: T;
}

export interface TasksResponse {
  data: Task[];
}

export interface TaskResponse {
  data: Task;
}