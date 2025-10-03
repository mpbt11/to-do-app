// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button } from '@/shared/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/shared/components/ui/dialog';
// import { Input } from '@/shared/components/ui/input';
// import { Label } from '@/shared/components/ui/label';
// import { Textarea } from '@/shared/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/shared/components/ui/select';
// import { TaskFormData, taskSchema } from '@/shared/validators/task.validators';
// import { CreateTaskData, Task, TaskStatus, UpdateTaskData } from '@/shared/types/task.types';
// import { useTasks } from '@/features/tasks';
// import { TASK_STATUS_OPTIONS } from '@/shared/models/task.status';

// interface TaskFormProps {
//   task?: Task;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function TaskForm({ task, isOpen, onClose }: TaskFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const { createTask, updateTask } = useTasks();
  
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<TaskFormData>({
//     resolver: zodResolver(taskSchema),
//     defaultValues: {
//       title: task?.title || '',
//       description: task?.description || '',
//       status: task?.status || TaskStatus.PENDENTE,
//     },
//   });

//   const statusValue = watch('status');

//   const onSubmit = async (data: TaskFormData) => {
//     try {
//       setIsLoading(true);
      
//       if (task) {
//         await updateTask(task.id, data as UpdateTaskData);
//       } else {
//         await createTask(data as CreateTaskData);
//       }
      
//       reset();
//       onClose();
//     } catch (error) {
//       // Error is handled by the useTasks hook
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>
//             {task ? 'Editar Tarefa' : 'Nova Tarefa'}
//           </DialogTitle>
//           <DialogDescription>
//             {task 
//               ? 'Faça as alterações necessárias na tarefa.' 
//               : 'Preencha os dados para criar uma nova tarefa.'
//             }
//           </DialogDescription>
//         </DialogHeader>
        
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="title">Título</Label>
//               <Input
//                 id="title"
//                 {...register('title')}
//                 className={errors.title ? 'border-red-500' : ''}
//                 placeholder="Digite o título da tarefa"
//               />
//               {errors.title && (
//                 <p className="text-sm text-red-600">{errors.title.message}</p>
//               )}
//             </div>
            
//             <div className="grid gap-2">
//               <Label htmlFor="description">Descrição</Label>
//               <Textarea
//                 id="description"
//                 {...register('description')}
//                 className={errors.description ? 'border-red-500' : ''}
//                 placeholder="Digite a descrição da tarefa"
//                 rows={3}
//               />
//               {errors.description && (
//                 <p className="text-sm text-red-600">{errors.description.message}</p>
//               )}
//             </div>
            
//             <div className="grid gap-2">
//               <Label htmlFor="status">Status</Label>
//               <Select
//                 value={statusValue}
//                 onValueChange={(value) => setValue('status', value as TaskStatus)}
//               >
//                 <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
//                   <SelectValue placeholder="Selecione o status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {TASK_STATUS_OPTIONS.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.status && (
//                 <p className="text-sm text-red-600">{errors.status.message}</p>
//               )}
//             </div>
//           </div>
          
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={handleClose}>
//               Cancelar
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading 
//                 ? (task ? 'Salvando...' : 'Criando...') 
//                 : (task ? 'Salvar' : 'Criar')
//               }
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
