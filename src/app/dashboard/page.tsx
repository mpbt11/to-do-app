import { AuthGuard } from "@/core/components/AuthGuard"
import DashboardView from "@/features/dashboard"


export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
     <DashboardView/>
    </AuthGuard>
  )
}
