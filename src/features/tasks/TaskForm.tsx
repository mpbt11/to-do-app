'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/shared/components/ui/select';
import { taskSchema, TaskFormData } from './schema';
import { CreateTaskData, Task, TaskStatus, UpdateTaskData } from '@/shared/types/task.types';
import { TASK_STATUS_OPTIONS } from '@/shared/models/task.status';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface TaskFormProps {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  createTask: (data: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<Task>;
  reload: () => Promise<void>;
}

export function TaskForm({
  task, isOpen, onClose, createTask, updateTask, reload,
}: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: TaskStatus.PENDENTE,
    },
  });

  const statusValue = watch('status');

  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          title: task.title || '',
          description: task.description || '',
          status: task.status || TaskStatus.PENDENTE,
        });
      } else {
        reset({
          title: '',
          description: '',
          status: TaskStatus.PENDENTE,
        });
      }
    }
  }, [task, isOpen, reset]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      setIsLoading(true);

      if (task?.id) {
        await updateTask(task.id, data as UpdateTaskData);
        await reload();
        toast.success('Tarefa atualizada com sucesso!');
      } else {
        await createTask(data as CreateTaskData);
        await reload();
        toast.success('Tarefa criada com sucesso!');
      }

      handleClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar tarefa';
      toast.error(message);
      console.error('Erro ao salvar tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      reset({
        title: '',
        description: '',
        status: TaskStatus.PENDENTE,
      });
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
          <DialogDescription>
            {task ? 'Faça as alterações necessárias na tarefa.' : 'Preencha os dados para criar uma nova tarefa.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                {...register('title')}
                className={errors.title ? 'border-red-500' : ''}
                placeholder="Digite o título da tarefa"
                disabled={isLoading}
                autoComplete="off"
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                {...register('description')}
                className={errors.description ? 'border-red-500' : ''}
                placeholder="Digite a descrição da tarefa (opcional)"
                rows={4}
                disabled={isLoading}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
              <Select
                value={statusValue}
                onValueChange={(value) => setValue('status', value as TaskStatus)}
                disabled={isLoading}
              >
                <SelectTrigger id="status" className={errors.status ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {task ? 'Salvando...' : 'Criando...'}
                </>
              ) : (
                task ? 'Salvar Alterações' : 'Criar Tarefa'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
