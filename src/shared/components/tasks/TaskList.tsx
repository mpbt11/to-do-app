// 'use client';

// import { Button } from '@/shared/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/shared/components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/shared/components/ui/dropdown-menu';
// import { Badge } from '@/shared/components/ui/badge';
// import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
// import { Task, TaskStatus } from '@/shared/types/task.types';
// import { getTaskStatusLabel } from '@/shared/models/task.status';

// interface TaskListProps {
//   tasks: Task[];
//   onEdit: (task: Task) => void;
//   onDelete: (id: string) => void;
// }

// export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
//   const getStatusVariant = (status: TaskStatus) => {
//     switch (status) {
//       case TaskStatus.PENDENTE:
//         return 'secondary';
//       case TaskStatus.EM_ANDAMENTO:
//         return 'default';
//       case TaskStatus.CONCLUIDA:
//         return 'destructive';
//       default:
//         return 'secondary';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('pt-BR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   if (tasks.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-muted-foreground">Nenhuma tarefa encontrada.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Título</TableHead>
//             <TableHead>Descrição</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Criado em</TableHead>
//             <TableHead className="w-[50px]"></TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {tasks.map((task) => (
//             <TableRow key={task.id}>
//               <TableCell className="font-medium">{task.title}</TableCell>
//               <TableCell className="max-w-[200px] truncate">
//                 {task.description}
//               </TableCell>
//               <TableCell>
//                 <Badge variant={getStatusVariant(task.status)}>
//                   {getTaskStatusLabel(task.status)}
//                 </Badge>
//               </TableCell>
//               <TableCell>{formatDate(task.createdAt)}</TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="h-8 w-8 p-0">
//                       <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem onClick={() => onEdit(task)}>
//                       <Edit className="mr-2 h-4 w-4" />
//                       Editar
//                     </DropdownMenuItem>
//                     <DropdownMenuItem 
//                       onClick={() => onDelete(task.id)}
//                       className="text-red-600"
//                     >
//                       <Trash2 className="mr-2 h-4 w-4" />
//                       Excluir
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
