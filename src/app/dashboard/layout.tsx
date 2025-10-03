import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      {/* Recuo = largura do sidebar; quando colapsado, troca pra largura “icon” */}
      <div
        className="
          min-h-screen w-full
          md:pl-[var(--sidebar-width)]
          transition-[padding] duration-200
          data-[collapsible=icon]:md:pl-[var(--sidebar-width-icon)]
        "
      >
        

        <main className="p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
