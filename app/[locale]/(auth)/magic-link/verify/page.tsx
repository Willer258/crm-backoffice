'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Wand2, Loader2, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AuthCard } from '@/components/auth/auth-card'
import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/lib/auth/service'
import { toast } from 'sonner'
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

export default function MagicLinkVerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const { setTokens, setUser } = useAuthStore()
  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMessage('Lien invalide ou expiré')
      return
    }

    const verifyToken = async () => {
      try {
        const response = await authService.verifyMagicLink({ token })

        const accessToken = response.data?.token || response.token
        const refreshToken = response.data?.refreshToken || response.refreshToken
        const userData = response.data?.user || response.user

        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken)
          const normalizedUser = normalizeUser(userData)
          if (normalizedUser) {
            setUser(normalizedUser)
          }
          toast.success('Connexion réussie !')
          router.push('/dashboard')
        } else {
          throw new Error('Erreur de connexion')
        }
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        setStatus('error')
        setErrorMessage(
          err.response?.data?.message || 'Le lien est invalide ou a expiré'
        )
      }
    }

    verifyToken()
  }, [token, router, setTokens, setUser])

  if (status === 'loading') {
    return (
      <AuthCard
        title="Vérification en cours..."
        description="Veuillez patienter pendant la vérification de votre lien"
        icon={<Wand2 className="h-6 w-6 text-primary" />}
      >
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Lien invalide"
      description={errorMessage}
      icon={<XCircle className="h-6 w-6 text-destructive" />}
      footer={
        <div className="space-y-2 w-full">
          <Link href="/magic-link" className="block">
            <Button className="w-full">Demander un nouveau lien</Button>
          </Link>
          <Link href="/login" className="block">
            <Button variant="ghost" className="w-full">
              Retour à la connexion
            </Button>
          </Link>
        </div>
      }
    >
      <p className="text-center text-muted-foreground">
        Ce lien magique est invalide ou a expiré.
        Veuillez demander un nouveau lien.
      </p>
    </AuthCard>
  )
}
