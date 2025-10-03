'use client';

import { Button } from '@/shared/components/ui/button';
import { useTasks } from './hooks/useTasks';
import { TaskList } from './TaskList';
import { useState } from 'react';
import { TaskForm } from './TaskForm';
import { Task, TaskStatus } from '@/shared/types/task.types';
import { Loader2, AlertCircle, RefreshCw, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { toast } from 'sonner';

export default function TasksView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { tasks, isLoading, error, deleteTask, clearError, loadTasks, updateTask } = useTasks();

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(id);
        await loadTasks();
        toast.success('Tarefa excluída com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir tarefa');
        console.error('Erro ao excluir tarefa:', error);
      }
    }
  };

  const handleStatusChange = async (task: Task, newStatus: TaskStatus) => {
    try {
      await updateTask(task.id, { status: newStatus });
      
      const statusMessages = {
        [TaskStatus.PENDENTE]: 'Tarefa movida para Pendente',
        [TaskStatus.EM_ANDAMENTO]: 'Tarefa movida para Em Andamento',
        [TaskStatus.CONCLUIDA]: 'Tarefa concluída!',
      };
      
      toast.success(statusMessages[newStatus]);
      await loadTasks();
    } catch (error) {
      toast.error('Erro ao atualizar status');
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  const handleCreateNew = () => {
    setSelectedTask(null);
    setOpenModal(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadTasks();
      toast.success('Lista atualizada!');
    } catch (error) {
      toast.error('Erro ao atualizar lista');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Tarefas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize e acompanhe suas atividades no quadro Kanban
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="h-auto p-0 hover:bg-transparent"
            >
              Dispensar
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Carregando tarefas...</p>
          </div>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      <TaskForm
        isOpen={openModal}
        task={selectedTask}
        onClose={handleCloseModal}
      />
    </div>
  );
}