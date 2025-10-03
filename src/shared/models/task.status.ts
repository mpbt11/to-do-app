import { TaskStatus } from "../types/task.types";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.PENDENTE]: 'Pendente',
  [TaskStatus.EM_ANDAMENTO]: 'Em Andamento',
  [TaskStatus.CONCLUIDA]: 'Concluída',
};

export const TASK_STATUS_OPTIONS = [
  { value: TaskStatus.PENDENTE, label: TASK_STATUS_LABELS[TaskStatus.PENDENTE] },
  { value: TaskStatus.EM_ANDAMENTO, label: TASK_STATUS_LABELS[TaskStatus.EM_ANDAMENTO] },
  { value: TaskStatus.CONCLUIDA, label: TASK_STATUS_LABELS[TaskStatus.CONCLUIDA] },
];

export const getTaskStatusLabel = (status: TaskStatus): string => {
  return TASK_STATUS_LABELS[status] || status;
};

export const isTaskCompleted = (status: TaskStatus): boolean => {
  return status === TaskStatus.CONCLUIDA;
};

export const isTaskInProgress = (status: TaskStatus): boolean => {
  return status === TaskStatus.EM_ANDAMENTO;
};

export const isTaskPending = (status: TaskStatus): boolean => {
  return status === TaskStatus.PENDENTE;
};
