'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/lib/auth/service'
import type { OAuthConnection, User } from '@/types/auth'
import type { OAuthProvider } from '@/lib/api/endpoints'

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

export function useOAuth() {
  const router = useRouter()
  const { setTokens, setUser } = useAuthStore()
  const [connections, setConnections] = useState<OAuthConnection[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null)

  const fetchConnections = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await authService.getOAuthConnections()

      if (response.status === 'success' && response.data) {
        setConnections(response.data)
      }
    } catch {
      // Silently fail - connections may not be available for unauthenticated users
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      fetchConnections()
    }
  }, [fetchConnections])

  const connectProvider = useCallback(
    async (provider: OAuthProvider) => {
      try {
        setLoadingProvider(provider)
        const response = await authService.getOAuthConnectUrl(provider)

        if (response.status === 'success' && response.data?.authorizationUrl) {
          // Store state in sessionStorage for callback verification
          if (response.data.state) {
            sessionStorage.setItem('oauth_state', response.data.state)
            sessionStorage.setItem('oauth_provider', provider)
          }

          // Redirect to OAuth provider
          window.location.href = response.data.authorizationUrl
          return { success: true }
        }

        throw new Error('Impossible d\'obtenir l\'URL d\'autorisation')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message ||
            `Impossible de se connecter avec ${provider}`
        )
        setLoadingProvider(null)
        throw error
      }
    },
    []
  )

  const handleCallback = useCallback(
    async (provider: OAuthProvider, code: string, state?: string) => {
      try {
        setIsLoading(true)

        // Verify state if provided
        const storedState = sessionStorage.getItem('oauth_state')
        if (state && storedState && state !== storedState) {
          throw new Error('\u00c9tat OAuth invalide')
        }

        const response = await authService.handleOAuthCallback(provider, {
          code,
          state,
        })

        // Clean up session storage
        sessionStorage.removeItem('oauth_state')
        sessionStorage.removeItem('oauth_provider')

        const token = response.data?.token || response.token
        const refreshToken = response.data?.refreshToken || response.refreshToken
        const userData = response.data?.user || response.user

        if (token && refreshToken) {
          setTokens(token, refreshToken)
          const normalizedUser = normalizeUser(userData)
          if (normalizedUser) {
            setUser(normalizedUser)
          }
          toast.success('Connexion réussie')
          router.push('/dashboard')
          return { success: true }
        }

        throw new Error(response.message || 'Connexion OAuth \u00e9chou\u00e9e')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'Connexion OAuth \u00e9chou\u00e9e'
        )
        router.push('/login')
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [router, setTokens, setUser]
  )

  const disconnectProvider = useCallback(
    async (provider: string) => {
      try {
        setLoadingProvider(provider as OAuthProvider)
        const response = await authService.disconnectOAuth(provider)

        if (response.status === 'success') {
          setConnections((prev) =>
            prev.filter((c) => c.provider !== provider)
          )
          toast.success(`${provider} d\u00e9connect\u00e9`)
          return { success: true }
        }

        throw new Error(
          response.message || 'Impossible de d\u00e9connecter le fournisseur'
        )
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message ||
            'Impossible de d\u00e9connecter le fournisseur'
        )
        throw error
      } finally {
        setLoadingProvider(null)
      }
    },
    []
  )

  return {
    connections,
    isLoading,
    loadingProvider,
    connectProvider,
    handleCallback,
    disconnectProvider,
    fetchConnections,
  }
}
