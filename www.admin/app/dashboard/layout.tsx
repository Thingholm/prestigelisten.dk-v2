import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-1 flex-col gap-4">
        <header className="bg-background sticky top-0 flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </main>
    </SidebarProvider>
  )
}