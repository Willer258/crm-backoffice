'use client'

import { useEffect, useState, useRef } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/lib/auth/service'
import { Loader2 } from 'lucide-react'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { DynamicBreadcrumb } from '@/components/layout/dynamic-breadcrumb'
import { ThemeToggle } from '@/components/theme-toggle'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { HeaderSearch } from '@/components/layout/header-search'
import { HeaderNotifications } from '@/components/layout/header-notifications'
import { UserNav } from '@/components/layout/user-nav'
import { WorkspaceGuard } from '@/components/workspace/workspace-guard'
import type { User } from '@/types/auth'

// Normalize user data from API (handles snake_case and camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeUser(apiUser: any): User | null {
  if (!apiUser) return null

  const firstName = apiUser.firstName || apiUser.firstname || apiUser.first_name || apiUser.name?.split(' ')[0] || ''
  const lastName = apiUser.lastName || apiUser.lastname || apiUser.last_name || apiUser.name?.split(' ').slice(1).join(' ') || ''

  return {
    id: apiUser.id || apiUser._id || '',
    email: apiUser.email || '',
    emailVerified: apiUser.emailVerified ?? apiUser.email_verified ?? false,
    firstName,
    lastName,
    name: apiUser.name || `${firstName} ${lastName}`.trim(),
    avatar: apiUser.avatar || apiUser.image || apiUser.picture || undefined,
    phone: apiUser.phone || apiUser.phoneNumber || apiUser.phone_number || undefined,
    role: apiUser.role || 'user',
    provider: apiUser.provider || 'email',
    providerId: apiUser.providerId || apiUser.provider_id || undefined,
    twoFactorEnabled: apiUser.twoFactorEnabled ?? apiUser.two_factor_enabled ?? apiUser['2fa_enabled'] ?? false,
    currentWorkspace: apiUser.currentWorkspace || apiUser.current_workspace || undefined,
    preferences: apiUser.preferences || undefined,
    createdAt: apiUser.createdAt || apiUser.created_at || new Date().toISOString(),
    updatedAt: apiUser.updatedAt || apiUser.updated_at || new Date().toISOString(),
    lastLoginAt: apiUser.lastLoginAt || apiUser.last_login_at || undefined,
    loginCount: apiUser.loginCount || apiUser.login_count || undefined,
  }
}

interface DashboardShellProps {
  children: React.ReactNode
  defaultSidebarOpen: boolean
}

export function DashboardShell({ children, defaultSidebarOpen }: DashboardShellProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const hasFetchedUser = useRef(false)
  const { accessToken, user, _hasHydrated, setUser, setLoading, logout } = useAuthStore()

  useEffect(() => {
    // Wait for store hydration first
    if (!_hasHydrated) {
      console.log('[DashboardShell] Waiting for store hydration...')
      return
    }

    // Prevent double fetch
    if (hasFetchedUser.current) {
      setIsInitialized(true)
      return
    }

    const initAuth = async () => {
      console.log('[DashboardShell] Init auth - Token:', !!accessToken, 'User:', !!user, 'Hydrated:', _hasHydrated)

      // No token - user is not authenticated
      if (!accessToken) {
        console.log('[DashboardShell] No token, cannot initialize')
        setLoading(false)
        setIsInitialized(true) // Mark as initialized so WorkspaceGuard can handle redirect
        return
      }

      // If we have a token but no user, fetch user data
      if (!user) {
        hasFetchedUser.current = true
        try {
          setLoading(true)
          console.log('[DashboardShell] Fetching user data...')
          const userData = await authService.getCurrentUser()
          console.log('[DashboardShell] User data received:', userData)
          const normalizedUser = normalizeUser(userData)
          if (normalizedUser) {
            setUser(normalizedUser)
            console.log('[DashboardShell] Normalized user:', normalizedUser.firstName, normalizedUser.lastName)
          }
        } catch (error) {
          console.error('[DashboardShell] Failed to fetch user:', error)
          // Token is invalid, logout - this will trigger redirect
          logout()
        }
      } else {
        console.log('[DashboardShell] User already in store:', user.firstName, user.lastName)
        hasFetchedUser.current = true
      }
      setLoading(false)
      setIsInitialized(true)
    }

    initAuth()
  }, [_hasHydrated, accessToken, user, setUser, setLoading, logout])

  // Show loading spinner while waiting for hydration or initializing
  if (!_hasHydrated || !isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <WorkspaceGuard>
      <SidebarProvider defaultOpen={defaultSidebarOpen}>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 rounded-lg" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumb />
            </div>
            <div className="flex items-center gap-2">
              <HeaderSearch />
              <HeaderNotifications />
              <ThemeToggle />
              <UserNav />
            </div>
          </header>
          <main className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceGuard>
  )
}
