import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { LogoutButton } from "@/components/logout-button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-1 flex-col gap-4">
        <header className="bg-background sticky top-0 flex h-12 shrink-0 justify-between items-center border-b px-4">
            <div>
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-2">
              <Link prefetch={false}  href="/auth/update-password" className="text-sm hover:underline">Ændre kodeord</Link>
              <LogoutButton />
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </main>
    </SidebarProvider>
  )
}