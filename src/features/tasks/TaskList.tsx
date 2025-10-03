'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { getTaskStatusLabel } from '@/shared/models/task.status';
import { Task, TaskStatus } from '@/shared/types/task.types';
import { Edit, MoreVertical, Trash2, Clock, CheckCircle2, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.CONCLUIDA:
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case TaskStatus.EM_ANDAMENTO:
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDENTE:
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case TaskStatus.EM_ANDAMENTO:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case TaskStatus.CONCLUIDA:
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 24) {
        return `Há ${diffInHours}h`;
      } else if (diffInHours < 48) {
        return 'Ontem';
      } else {
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
        });
      }
    } catch {
      return 'Data inválida';
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-muted p-6 mb-4">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nenhuma tarefa ainda</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Comece criando sua primeira tarefa usando o botão "Nova Tarefa" acima
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card 
          key={task.id} 
          className="transition-all hover:shadow-md"
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Ícone de Status */}
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(task.status)}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`font-semibold text-base mb-1 ${
                      task.status === TaskStatus.CONCLUIDA ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(task.status)} border`}
                      >
                        {getTaskStatusLabel(task.status)}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(task.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Menu de Ações */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                      >
                        <span className="sr-only">Abrir menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(task)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}