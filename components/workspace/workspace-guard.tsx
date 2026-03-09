'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useWorkspaceStore, useWorkspaceHasHydrated } from '@/stores/workspace.store'
import { useAuthStore } from '@/stores/auth.store'
import * as workspaceService from '@/lib/workspace/service'
import { Loader2 } from 'lucide-react'
import { WorkspaceOnboarding } from './workspace-onboarding'
import type { Workspace } from '@/types/auth'

interface WorkspaceGuardProps {
  children: React.ReactNode
}

export function WorkspaceGuard({ children }: WorkspaceGuardProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [hasWorkspace, setHasWorkspace] = useState(false)
  const hasFetched = useRef(false)
  const router = useRouter()
  const pathname = usePathname()

  const {
    workspaces: cachedWorkspaces,
    currentWorkspace: cachedCurrentWorkspace,
    setWorkspaces,
    setCurrentWorkspace,
  } = useWorkspaceStore()
  const workspaceHasHydrated = useWorkspaceHasHydrated()

  const {
    user,
    accessToken,
    currentWorkspaceId,
    _hasHydrated: authHasHydrated,
    setCurrentWorkspace: setCurrentWorkspaceId,
  } = useAuthStore()

  // Redirect to login if no token after hydration
  useEffect(() => {
    if (authHasHydrated && !accessToken) {
      console.log('[WorkspaceGuard] No token after hydration, redirecting to login...')
      const callbackUrl = encodeURIComponent(pathname)
      router.push(`/login?callbackUrl=${callbackUrl}`)
    }
  }, [authHasHydrated, accessToken, pathname, router])

  // Check for cached workspaces or fetch from API
  useEffect(() => {
    // Wait for both stores to hydrate
    if (!authHasHydrated || !workspaceHasHydrated) {
      console.log('[WorkspaceGuard] Waiting for store hydration...', {
        auth: authHasHydrated,
        workspace: workspaceHasHydrated,
      })
      return
    }

    // Prevent double fetch
    if (hasFetched.current) {
      return
    }

    // Wait for authentication to be ready
    if (!accessToken) {
      console.log('[WorkspaceGuard] No access token, stopping check')
      setIsChecking(false)
      return
    }

    // Check if we have cached workspaces
    if (cachedWorkspaces.length > 0 && cachedCurrentWorkspace) {
      console.log('[WorkspaceGuard] Using cached workspaces:', cachedWorkspaces.length)
      setHasWorkspace(true)
      setIsChecking(false)
      hasFetched.current = true
      return
    }

    hasFetched.current = true
    console.log('[WorkspaceGuard] Fetching workspaces from API...')

    const checkWorkspaces = async () => {
      try {
        // Fetch workspaces from API
        const response = await workspaceService.listWorkspaces()

        if (response.data && response.data.length > 0) {
          const normalized = response.data
            .map((w) => workspaceService.normalizeWorkspace(w as unknown as Record<string, unknown>))
            .filter((w): w is Workspace => w !== null)

          setWorkspaces(normalized)

          // Set current workspace
          const current =
            normalized.find((w) => w.id === currentWorkspaceId) ||
            normalized.find((w) => w.id === user?.currentWorkspace?.id) ||
            normalized[0]

          if (current) {
            setCurrentWorkspace(current)
            if (!currentWorkspaceId) {
              setCurrentWorkspaceId(current.id)
            }
          }

          setHasWorkspace(true)
          console.log('[WorkspaceGuard] Workspaces fetched and cached:', normalized.length)
        } else {
          setHasWorkspace(false)
        }
      } catch (error) {
        console.error('[WorkspaceGuard] Failed to fetch workspaces:', error)
        setHasWorkspace(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkWorkspaces()
  }, [
    authHasHydrated,
    workspaceHasHydrated,
    accessToken,
    user,
    currentWorkspaceId,
    cachedWorkspaces,
    cachedCurrentWorkspace,
    setWorkspaces,
    setCurrentWorkspace,
    setCurrentWorkspaceId,
  ])

  const handleWorkspaceCreated = (workspace: Workspace) => {
    setWorkspaces([workspace])
    setCurrentWorkspace(workspace)
    setCurrentWorkspaceId(workspace.id)
    setHasWorkspace(true)
  }

  // Loading state - show if waiting for hydration or checking workspaces
  if (!authHasHydrated || !workspaceHasHydrated || (isChecking && accessToken)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Chargement de vos espaces de travail...</p>
        </div>
      </div>
    )
  }

  // No access token - user is not authenticated, show loading while redirecting
  if (!accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirection...</p>
        </div>
      </div>
    )
  }

  // No workspace - show onboarding (only if we have a valid token)
  if (!hasWorkspace && !isChecking) {
    return <WorkspaceOnboarding onWorkspaceCreated={handleWorkspaceCreated} />
  }

  // Has workspace - render children
  return <>{children}</>
}
