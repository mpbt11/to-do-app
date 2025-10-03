'use client';

import { Button } from '@/shared/components/ui/button';
import { useTasks } from './hooks/useTasks';
import { TaskList } from './TaskList';
import { useState } from 'react';
import { TaskForm } from './TaskForm';
import { Task } from '@/shared/types/task.types';
import { Loader2, AlertCircle, RefreshCw, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { toast } from 'sonner';

export default function TasksView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { tasks, isLoading, error, deleteTask, clearError, loadTasks } = useTasks();

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(id);
        toast.success('Tarefa excluída com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir tarefa');
        console.error('Erro ao excluir tarefa:', error);
      }
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
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Cabeçalho com título e botões */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Tarefas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize e acompanhe suas atividades diárias
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

      {/* Erro */}
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

      {/* Conteúdo da página */}
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
        />
      )}

      {/* Modal de criação/edição */}
      <TaskForm
        isOpen={openModal}
        task={selectedTask}
        onClose={handleCloseModal}
      />
    </div>
  );
}