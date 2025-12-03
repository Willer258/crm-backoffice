import { cookies } from 'next/headers'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { DynamicBreadcrumb } from '@/components/layout/dynamic-breadcrumb'
import { ThemeToggle } from '@/components/theme-toggle'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { HeaderSearch } from '@/components/layout/header-search'
import { HeaderNotifications } from '@/components/layout/header-notifications'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
          <div className="flex items-center gap-2">
            <HeaderSearch />
            <HeaderNotifications />
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
