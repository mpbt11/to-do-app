"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Task, TaskStatus } from "@/shared/types/task.types"
import { getTaskStatusLabel } from "@/shared/models/task.status"

// Dados mockados para demonstração
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implementar autenticação",
    description: "Criar sistema de login e registro de usuários",
    status: TaskStatus.EM_ANDAMENTO,
    userId: "user-1",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Criar dashboard",
    description: "Desenvolver interface principal do sistema",
    status: TaskStatus.PENDENTE,
    userId: "user-1",
    createdAt: "2024-01-14T09:30:00Z",
    updatedAt: "2024-01-14T09:30:00Z",
  },
  {
    id: "3",
    title: "Configurar banco de dados",
    description: "Setup inicial do PostgreSQL",
    status: TaskStatus.CONCLUIDA,
    userId: "user-1",
    createdAt: "2024-01-13T14:20:00Z",
    updatedAt: "2024-01-13T14:20:00Z",
  },
  {
    id: "4",
    title: "Testes unitários",
    description: "Implementar testes para os serviços principais",
    status: TaskStatus.EM_ANDAMENTO,
    userId: "user-1",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Documentação da API",
    description: "Criar documentação completa dos endpoints",
    status: TaskStatus.PENDENTE,
    userId: "user-1",
    createdAt: "2024-01-11T11:15:00Z",
    updatedAt: "2024-01-11T11:15:00Z",
  },
]

interface DataTableProps {
  data: Task[]
}

export function DataTable({ data = mockTasks }: DataTableProps) {
  const [tasks] = useState<Task[]>(data)

  const getStatusVariant = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDENTE:
        return 'secondary'
      case TaskStatus.EM_ANDAMENTO:
        return 'default'
      case TaskStatus.CONCLUIDA:
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {task.description}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(task.status)}>
                  {getTaskStatusLabel(task.status)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(task.createdAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}