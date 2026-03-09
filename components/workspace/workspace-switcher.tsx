'use client'

import * as React from 'react'
import { ChevronsUpDown, Plus, Building2, Check, Loader2 } from 'lucide-react'
import { useWorkspace } from '@/hooks/use-workspace'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar()
  const {
    workspaces,
    currentWorkspace,
    switchWorkspace,
    actionLoading,
  } = useWorkspace()

  const handleWorkspaceChange = async (workspaceId: string) => {
    if (currentWorkspace?.id === workspaceId) return
    await switchWorkspace(workspaceId)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              disabled={actionLoading}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {actionLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Building2 className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentWorkspace?.name || 'Workspace'}
                </span>
                <span className="truncate text-xs text-muted-foreground capitalize">
                  {currentWorkspace?.role || 'member'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => handleWorkspaceChange(workspace.id)}
                className="gap-2 p-2"
                disabled={actionLoading}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                  <Building2 className="size-4 shrink-0" />
                </div>
                <span className="flex-1 truncate">{workspace.name}</span>
                {currentWorkspace?.id === workspace.id && (
                  <Check className="size-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" disabled={actionLoading}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <span className="font-medium text-muted-foreground">
                Créer un workspace
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
