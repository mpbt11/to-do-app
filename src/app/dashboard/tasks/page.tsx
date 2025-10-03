import { DataTable } from "@/shared/components/data-table";
import { AuthGuard } from "@/core/components/AuthGuard";
import TasksView from "@/features/tasks";

export default function TasksPage() {
  return (
    <AuthGuard requireAuth={true}>
     <TasksView/>
    </AuthGuard>
  );
}
