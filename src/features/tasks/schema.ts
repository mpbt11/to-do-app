import { TaskStatus } from '@/shared/types/task.types';
import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  status: z.nativeEnum(TaskStatus, {
    message: 'Status inválido',
  }),
});

export const updateTaskSchema = taskSchema.partial();

export type TaskFormData = z.infer<typeof taskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;