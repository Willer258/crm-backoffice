'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth.store'
import { useWorkspaceStore } from '@/stores/workspace.store'
import * as authService from '@/lib/auth/service'
import type {
  LoginRequest,
  RegisterRequest,
  VerifyEmailOTPRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  User,
} from '@/types/auth'

// Normalize user data from API (handles snake_case and camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeUser(apiUser: any): User | null {
  if (!apiUser) return null

  console.log('[useAuth] Normalizing user data:', apiUser)

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

export function useAuth() {
  const router = useRouter()
  const {
    user,
    isAuthenticated,
    isLoading,
    requires2FA,
    pendingEmail,
    setUser,
    setTokens,
    setRequires2FA,
    setLoading,
    logout: storeLogout,
  } = useAuthStore()

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = useAuthStore.getState().accessToken
      const storedUser = useAuthStore.getState().user

      if (token && !storedUser) {
        try {
          const userData = await authService.getCurrentUser()
          const normalizedUser = normalizeUser(userData)
          if (normalizedUser) {
            setUser(normalizedUser)
          }
        } catch {
          storeLogout()
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [setUser, setLoading, storeLogout])

  const login = useCallback(
    async (data: LoginRequest) => {
      try {
        setLoading(true)
        const response = await authService.login(data)
        console.log('[useAuth] Login response:', response)

        // Check if 2FA is required
        if (response.requires2fa) {
          setRequires2FA(true, data.email)
          router.push('/2fa/verify')
          return { requires2FA: true }
        }

        // Extract tokens from response
        const token = response.data?.token || response.token
        const refreshToken = response.data?.refreshToken || response.refreshToken
        const userData = response.data?.user || response.user

        console.log('[useAuth] Extracted - Token:', !!token, 'RefreshToken:', !!refreshToken, 'User:', userData)

        if (token && refreshToken) {
          setTokens(token, refreshToken)
          const normalizedUser = normalizeUser(userData)
          if (normalizedUser) {
            setUser(normalizedUser)
            console.log('[useAuth] User saved to store:', normalizedUser.firstName, normalizedUser.lastName)
          } else {
            console.log('[useAuth] No user data in response, will fetch from /auth/me')
          }
          toast.success('Connexion réussie')

          // Check for redirect URL stored before auth redirect
          const redirectUrl = typeof window !== 'undefined'
            ? sessionStorage.getItem('redirectAfterLogin')
            : null
          if (redirectUrl) {
            sessionStorage.removeItem('redirectAfterLogin')
            router.push(redirectUrl)
          } else {
            router.push('/dashboard')
          }
          return { success: true }
        }

        throw new Error(response.message || 'Connexion \u00e9chou\u00e9e')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'Connexion \u00e9chou\u00e9e')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router, setTokens, setUser, setRequires2FA, setLoading]
  )

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        setLoading(true)
        const response = await authService.register(data)

        if (response.status === 'success') {
          toast.success(
            'Compte cr\u00e9\u00e9 ! V\u00e9rifiez votre email pour le code de v\u00e9rification.'
          )
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
          return { success: true, data: response.data }
        }

        throw new Error(response.message || 'Inscription \u00e9chou\u00e9e')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'Inscription \u00e9chou\u00e9e')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router, setLoading]
  )

  const verifyEmail = useCallback(
    async (data: VerifyEmailOTPRequest) => {
      try {
        setLoading(true)
        const response = await authService.verifyEmailOTP(data)

        if (response.status === 'success') {
          toast.success('Email v\u00e9rifi\u00e9 ! Vous pouvez maintenant vous connecter.')
          router.push('/login')
          return { success: true }
        }

        throw new Error(response.message || 'V\u00e9rification \u00e9chou\u00e9e')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'V\u00e9rification \u00e9chou\u00e9e')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router, setLoading]
  )

  const resendOTP = useCallback(
    async (email: string) => {
      try {
        setLoading(true)
        const response = await authService.resendOTP({ email })

        if (response.status === 'success') {
          toast.success('Code de v\u00e9rification renvoy\u00e9')
          return { success: true }
        }

        throw new Error(response.message || 'Envoi \u00e9chou\u00e9')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'Envoi \u00e9chou\u00e9')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading]
  )

  const forgotPassword = useCallback(
    async (data: ForgotPasswordRequest) => {
      try {
        setLoading(true)
        const response = await authService.forgotPassword(data)

        if (response.status === 'success') {
          toast.success(
            'Si cet email existe, vous recevrez un lien de r\u00e9initialisation.'
          )
          return { success: true }
        }

        // Always show success to prevent email enumeration
        toast.success(
          'Si cet email existe, vous recevrez un lien de r\u00e9initialisation.'
        )
        return { success: true }
      } catch {
        // Always show success to prevent email enumeration
        toast.success(
          'Si cet email existe, vous recevrez un lien de r\u00e9initialisation.'
        )
        return { success: true }
      } finally {
        setLoading(false)
      }
    },
    [setLoading]
  )

  const resetPassword = useCallback(
    async (data: ResetPasswordRequest) => {
      try {
        setLoading(true)
        const response = await authService.resetPassword(data)

        if (response.status === 'success') {
          toast.success('Mot de passe r\u00e9initialis\u00e9 avec succ\u00e8s')
          router.push('/login')
          return { success: true }
        }

        throw new Error(response.message || 'R\u00e9initialisation \u00e9chou\u00e9e')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'R\u00e9initialisation \u00e9chou\u00e9e'
        )
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router, setLoading]
  )

  const changePassword = useCallback(
    async (data: ChangePasswordRequest) => {
      try {
        setLoading(true)
        const response = await authService.changePassword(data)

        if (response.status === 'success') {
          toast.success('Mot de passe modifi\u00e9 avec succ\u00e8s')
          return { success: true }
        }

        throw new Error(response.message || 'Modification \u00e9chou\u00e9e')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'Modification \u00e9chou\u00e9e')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading]
  )

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // Continue with logout even if API call fails
    } finally {
      // Reset auth store
      storeLogout()
      // Reset workspace store (clear cached workspaces)
      useWorkspaceStore.getState().reset()
      router.push('/login')
      toast.success('Déconnecté avec succès')
    }
  }, [router, storeLogout])

  const verify2FA = useCallback(
    async (code: string) => {
      if (!pendingEmail) {
        throw new Error('Aucune v\u00e9rification 2FA en attente')
      }

      try {
        setLoading(true)
        const response = await authService.verify2FA({
          email: pendingEmail,
          code,
        })

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

          // Check for redirect URL stored before auth redirect
          const redirectUrl = typeof window !== 'undefined'
            ? sessionStorage.getItem('redirectAfterLogin')
            : null
          if (redirectUrl) {
            sessionStorage.removeItem('redirectAfterLogin')
            router.push(redirectUrl)
          } else {
            router.push('/dashboard')
          }
          return { success: true }
        }

        throw new Error(response.message || 'Vérification 2FA échouée')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'V\u00e9rification 2FA \u00e9chou\u00e9e')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [pendingEmail, router, setTokens, setUser, setLoading]
  )

  const useRecoveryCode = useCallback(
    async (recoveryCode: string) => {
      if (!pendingEmail) {
        throw new Error('Aucune v\u00e9rification 2FA en attente')
      }

      try {
        setLoading(true)
        const response = await authService.recovery2FA({
          email: pendingEmail,
          recoveryCode,
        })

        const token = response.data?.token || response.token
        const refreshToken = response.data?.refreshToken || response.refreshToken
        const userData = response.data?.user || response.user

        if (token && refreshToken) {
          setTokens(token, refreshToken)
          const normalizedUser = normalizeUser(userData)
          if (normalizedUser) {
            setUser(normalizedUser)
          }
          toast.success('Connexion réussie avec le code de récupération')

          // Check for redirect URL stored before auth redirect
          const redirectUrl = typeof window !== 'undefined'
            ? sessionStorage.getItem('redirectAfterLogin')
            : null
          if (redirectUrl) {
            sessionStorage.removeItem('redirectAfterLogin')
            router.push(redirectUrl)
          } else {
            router.push('/dashboard')
          }
          return { success: true }
        }

        throw new Error(response.message || 'Code de récupération invalide')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'Code de r\u00e9cup\u00e9ration invalide'
        )
        throw error
      } finally {
        setLoading(false)
      }
    },
    [pendingEmail, router, setTokens, setUser, setLoading]
  )

  return {
    user,
    isAuthenticated,
    isLoading,
    requires2FA,
    pendingEmail,
    login,
    register,
    verifyEmail,
    resendOTP,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
    verify2FA,
    useRecoveryCode,
  }
}
