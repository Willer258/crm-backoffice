'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/auth.store'

interface UseRequireAuthOptions {
  redirectTo?: string
  requiredRole?: 'user' | 'admin' | 'moderator'
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { redirectTo = '/login', requiredRole } = options
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Save the current path for redirect after login
        const callbackUrl = encodeURIComponent(pathname)
        router.push(`${redirectTo}?callbackUrl=${callbackUrl}`)
      } else if (
        requiredRole &&
        user?.role !== requiredRole &&
        user?.role !== 'admin'
      ) {
        router.push('/unauthorized')
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    user,
    requiredRole,
    redirectTo,
    router,
    pathname,
  ])

  return {
    user,
    isAuthenticated,
    isLoading,
    isAuthorized:
      isAuthenticated &&
      (!requiredRole ||
        user?.role === requiredRole ||
        user?.role === 'admin'),
  }
}

// Hook for checking specific permissions
export function usePermission(permission: string) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated || !user) {
    return { hasPermission: false, isLoading: false }
  }

  const { hasPermission } = useAuthStore.getState()
  return {
    hasPermission: hasPermission(permission),
    isLoading: false,
  }
}

// Higher-order component for protected pages
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: UseRequireAuthOptions
) {
  return function ProtectedComponent(props: P) {
    const { isAuthorized, isLoading } = useRequireAuth(options)

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )
    }

    if (!isAuthorized) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
