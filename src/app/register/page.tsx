import { RegisterForm } from "@/features/register";
import { AuthGuard } from "@/core/components/AuthGuard";

export default function Page() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </AuthGuard>
  )
}