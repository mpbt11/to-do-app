'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Task, TaskStatus } from '@/shared/types/task.types';
import { Edit, MoreVertical, Trash2, Clock, Circle, PlayCircle, CheckCircle2, GripVertical } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        return 'Agora';
      } else if (diffInHours < 24) {
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

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const columns = [
    {
      status: TaskStatus.PENDENTE,
      title: 'Pendente',
      icon: Circle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      status: TaskStatus.EM_ANDAMENTO,
      title: 'Em Andamento',
      icon: PlayCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      status: TaskStatus.CONCLUIDA,
      title: 'Concluída',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    
    const task = tasks.find(t => t.id === taskId);
    
    if (task && task.status !== newStatus) {
      onStatusChange(task, newStatus);
    }
    
    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  const TaskCard = ({ task, isDragging = false }: { task: Task; isDragging?: boolean }) => {
    const isCompleted = task.status === TaskStatus.CONCLUIDA;
    
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      isDragging: isDraggingHook,
    } = useDraggable({
      id: task.id,
    });

    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
      <Card 
        ref={setNodeRef}
        style={style}
        className={`mb-3 transition-all cursor-grab active:cursor-grabbing ${
          isDragging || isDraggingHook ? 'opacity-50 rotate-2' : 'hover:shadow-md'
        }`}
        {...attributes}
        {...listeners}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className={`font-medium text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                      <MoreVertical className="h-3 w-3" />
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
              
              {task.description && (
                <p className={`text-xs text-muted-foreground line-clamp-2 mb-3 ${
                  isCompleted ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDate(task.createdAt)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!tasks || tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Clock className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nenhuma tarefa ainda</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Comece criando sua primeira tarefa usando o botão &quot;Nova Tarefa&quot; acima
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          const Icon = column.icon;

          return (
            <DroppableColumn
              key={column.status}
              id={column.status}
              column={column}
              tasks={columnTasks}
              Icon={Icon}
              TaskCard={TaskCard}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 scale-105">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function DroppableColumn({ 
  id, 
  column, 
  tasks, 
  Icon, 
  TaskCard 
}: { 
  id: TaskStatus;
  column: {
    status: TaskStatus;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
  };
  tasks: Task[];
  Icon: React.ComponentType<{ className?: string }>;
  TaskCard: React.ComponentType<{ task: Task; isDragging?: boolean }>;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className="h-full"
    >
      <Card 
        className={`${column.borderColor} border-2 transition-all ${
          isOver ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
      >
        <CardHeader className={`${column.bgColor} pb-3`}>
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${column.color}`} />
              <span>{column.title}</span>
            </div>
            <Badge variant="secondary" className="ml-2">
              {tasks.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 min-h-[400px]">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Icon className={`h-8 w-8 ${column.color} opacity-20 mb-2`} />
              <p className="text-sm text-muted-foreground">
                Nenhuma tarefa
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Arraste tarefas aqui
              </p>
            </div>
          ) : (
            <div>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}