'use client';

import { useState, useEffect, useCallback } from 'react';
import { CreateTaskData, Task, TaskStatus, UpdateTaskData } from '@/shared/types/task.types';
import { tasksApi } from '@/core';

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTaskStats: () => TaskStats;
  clearError: () => void;
}

interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Loading tasks...');
      const tasksData = await tasksApi.getTasks();
      console.log('Tasks loaded:', tasksData);
      // Garante que sempre seja um array
      setTasks(Array.isArray(tasksData?.data) ? tasksData?.data : []);
    } catch (error: any) {
      console.error('Error loading tasks:', error);
      const errorMessage = error?.message || 'Failed to load tasks';
      setError(errorMessage);
      setTasks([]); // Reset para array vazio em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: CreateTaskData): Promise<Task> => {
    try {
      setIsLoading(true);
      setError(null);
      const newTask = await tasksApi.createTask(data);
      
      setTasks(prev => {
        // Garante que prev seja um array
        const currentTasks = Array.isArray(prev) ? prev : [];
        return [...currentTasks, newTask];
      });
      
      return newTask;
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to create task';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskData): Promise<Task> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedTask = await tasksApi.updateTask(id, data);
      
      setTasks(prev => {
        const currentTasks = Array.isArray(prev) ? prev : [];
        return currentTasks.map(task => task.id === id ? updatedTask : task);
      });
      
      return updatedTask;
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update task';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await tasksApi.deleteTask(id);
      
      setTasks(prev => {
        const currentTasks = Array.isArray(prev) ? prev : [];
        return currentTasks.filter(task => task.id !== id);
      });
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to delete task';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTasksByStatus = useCallback((status: TaskStatus): Task[] => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const getTaskStats = useCallback((): TaskStats => {
    const total = tasks.length;
    const pending = tasks.filter(task => task.status === TaskStatus.PENDENTE).length;
    const inProgress = tasks.filter(task => task.status === TaskStatus.EM_ANDAMENTO).length;
    const completed = tasks.filter(task => task.status === TaskStatus.CONCLUIDA).length;

    return {
      total,
      pending,
      inProgress,
      completed,
    };
  }, [tasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    getTaskStats,
    clearError,
  };
}