// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
// import { Badge } from '@/shared/components/ui/badge';
// import { TaskStatus } from '@/shared/types/task.types';
// import { getTaskStatusLabel } from '@/shared/models/task.status';

// interface TaskStatsProps {
//   total: number;
//   pending: number;
//   inProgress: number;
//   completed: number;
// }

// export function TaskStats({ total, pending, inProgress, completed }: TaskStatsProps) {
//   const stats = [
//     {
//       label: 'Total',
//       value: total,
//       variant: 'secondary' as const,
//     },
//     {
//       label: getTaskStatusLabel(TaskStatus.PENDENTE),
//       value: pending,
//       variant: 'secondary' as const,
//     },
//     {
//       label: getTaskStatusLabel(TaskStatus.EM_ANDAMENTO),
//       value: inProgress,
//       variant: 'default' as const,
//     },
//     {
//       label: getTaskStatusLabel(TaskStatus.CONCLUIDA),
//       value: completed,
//       variant: 'destructive' as const,
//     },
//   ];

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       {stats.map((stat) => (
//         <Card key={stat.label}>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               {stat.label}
//             </CardTitle>
//             <Badge variant={stat.variant}>
//               {stat.value}
//             </Badge>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stat.value}</div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
