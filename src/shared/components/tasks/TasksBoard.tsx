// 'use client';

// import { useState } from 'react';
// import { Button } from '@/shared/components/ui/button';
// import { Plus } from 'lucide-react';
// import { useTasks } from '@/hooks/useTasks';
// import { Task } from '@/types';
// import { TaskForm } from './TaskForm';
// import { TaskList } from './TaskList';
// import { TaskStats } from './TaskStats';

// export function TasksBoard() {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | undefined>();
  
//   const {
//     tasks,
//     isLoading,
//     error,
//     createTask,
//     updateTask,
//     deleteTask,
//     getTaskStats,
//   } = useTasks();

//   console.log('TasksBoard: tasks:', tasks);
//   console.log('TasksBoard: isLoading:', isLoading);
//   console.log('TasksBoard: error:', error);

//   const stats = getTaskStats();

//   const handleCreateTask = () => {
//     setEditingTask(undefined);
//     setIsFormOpen(true);
//   };

//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//     setIsFormOpen(true);
//   };

//   const handleDeleteTask = async (id: string) => {
//     if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
//       try {
//         await deleteTask(id);
//       } catch (error) {
//         // Error is handled by the useTasks hook
//       }
//     }
//   };

//   const handleCloseForm = () => {
//     setIsFormOpen(false);
//     setEditingTask(undefined);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Carregando tarefas...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-red-600">Erro ao carregar tarefas: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
//           <p className="text-muted-foreground">
//             Gerencie suas tarefas e mantenha-se organizado
//           </p>
//         </div>
//         <Button onClick={handleCreateTask}>
//           <Plus className="mr-2 h-4 w-4" />
//           Nova Tarefa
//         </Button>
//       </div>

//       <TaskStats {...stats} />

//       <TaskList
//         tasks={tasks}
//         onEdit={handleEditTask}
//         onDelete={handleDeleteTask}
//       />

//       <TaskForm
//         task={editingTask}
//         isOpen={isFormOpen}
//         onClose={handleCloseForm}
//       />
//     </div>
//   );
// }
