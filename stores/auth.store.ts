import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, AuthState, AuthActions } from '@/types/auth'

type AuthStore = AuthState & AuthActions & {
  _hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

// Cookie helpers for server-side middleware detection
const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      currentWorkspaceId: null,
      isAuthenticated: false,
      isLoading: true,
      requires2FA: false,
      pendingEmail: null,
      _hasHydrated: false,

      // Hydration tracking
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),

      // Actions
      setUser: (user: User | null) => {
        const accessToken = get().accessToken
        set({
          user,
          isAuthenticated: !!user && !!accessToken,
          isLoading: false,
          currentWorkspaceId: user?.currentWorkspace?.id || get().currentWorkspaceId,
        })
      },

      setTokens: (accessToken: string, refreshToken: string) => {
        // Set cookie for middleware detection
        setCookie('crm-access-token', accessToken)
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          requires2FA: false,
          pendingEmail: null,
        })
      },

      setCurrentWorkspace: (workspaceId: string) =>
        set({
          currentWorkspaceId: workspaceId,
        }),

      setRequires2FA: (requires: boolean, email?: string) =>
        set({
          requires2FA: requires,
          pendingEmail: email || null,
        }),

      setLoading: (loading: boolean) =>
        set({
          isLoading: loading,
        }),

      logout: () => {
        // Remove cookie for middleware detection
        deleteCookie('crm-access-token')
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          currentWorkspaceId: null,
          isAuthenticated: false,
          isLoading: false,
          requires2FA: false,
          pendingEmail: null,
        })
      },

      // Permission check based on user role
      hasPermission: (permission: string) => {
        const user = get().user
        if (!user) return false

        // Admin has all permissions
        if (user.role === 'admin') return true

        // Define role-based permissions
        const rolePermissions: Record<string, string[]> = {
          admin: ['*'],
          moderator: [
            'read',
            'write',
            'users.read',
            'users.write',
            'content.read',
            'content.write',
          ],
          user: ['read', 'content.read'],
        }

        const permissions = rolePermissions[user.role] || []

        // Check for wildcard permission
        if (permissions.includes('*')) return true

        // Check specific permission
        return permissions.includes(permission)
      },
    }),
    {
      name: 'crm-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        currentWorkspaceId: state.currentWorkspaceId,
        user: state.user,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('[AuthStore] Hydration error:', error)
          return
        }
        if (state) {
          // Sync cookie with stored token on hydration
          if (state.accessToken) {
            setCookie('crm-access-token', state.accessToken)
          }
          // Mark as authenticated if we have a token (user will be fetched separately if needed)
          state.isAuthenticated = !!state.accessToken
          state.isLoading = false
          state._hasHydrated = true
          console.log('[AuthStore] Hydrated - Token:', !!state.accessToken, 'User:', !!state.user)
        }
      },
    }
  )
)

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useIsLoading = () => useAuthStore((state) => state.isLoading)
export const useRequires2FA = () => useAuthStore((state) => state.requires2FA)
export const usePendingEmail = () => useAuthStore((state) => state.pendingEmail)
export const useCurrentWorkspaceId = () => useAuthStore((state) => state.currentWorkspaceId)
export const useHasHydrated = () => useAuthStore((state) => state._hasHydrated)
