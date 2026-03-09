'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Mail, Wand2, ArrowLeft, CheckCircle2, Loader2, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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

const magicLinkSchema = z.object({
  email: z.string().email('Adresse email invalide'),
})

type MagicLinkFormData = z.infer<typeof magicLinkSchema>

export default function MagicLinkPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { setTokens, setUser } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [verifyError, setVerifyError] = useState('')

  const form = useForm<MagicLinkFormData>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: '',
    },
  })

  // Handle token verification when token is present in URL
  useEffect(() => {
    if (!token) return

    setVerifyStatus('loading')

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
        setVerifyStatus('error')
        setVerifyError(
          err.response?.data?.message || 'Le lien est invalide ou a expiré'
        )
      }
    }

    verifyToken()
  }, [token, router, setTokens, setUser])

  const onSubmit = async (data: MagicLinkFormData) => {
    try {
      setIsLoading(true)
      await authService.requestMagicLink(data)
      setEmail(data.email)
      setSubmitted(true)
      toast.success('Lien magique envoyé !')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Erreur lors de l\'envoi')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state when verifying token from URL
  if (verifyStatus === 'loading') {
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

  // Show error state when token verification failed
  if (verifyStatus === 'error') {
    return (
      <AuthCard
        title="Lien invalide"
        description={verifyError}
        icon={<XCircle className="h-6 w-6 text-destructive" />}
        footer={
          <div className="space-y-2 w-full">
            <Button
              className="w-full"
              onClick={() => {
                setVerifyStatus('idle')
                setVerifyError('')
                router.replace('/magic-link')
              }}
            >
              Demander un nouveau lien
            </Button>
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

  if (submitted) {
    return (
      <AuthCard
        title="Vérifiez votre email"
        description={`Un lien de connexion a été envoyé à ${email}`}
        icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
        footer={
          <Link href="/login">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Button>
          </Link>
        }
      >
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Cliquez sur le lien dans l&apos;email pour vous connecter.
            Le lien expire dans 15 minutes.
          </p>
          <p className="text-sm text-muted-foreground">
            Vous n&apos;avez pas reçu l&apos;email ?{' '}
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary hover:underline font-medium"
            >
              Réessayer
            </button>
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Lien magique"
      description="Connectez-vous sans mot de passe avec un lien envoyé par email"
      icon={<Wand2 className="h-6 w-6 text-primary" />}
      footer={
        <Link href="/login">
          <Button variant="ghost" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la connexion
          </Button>
        </Link>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="nom@exemple.com"
                      type="email"
                      autoComplete="email"
                      className="pl-10 border-2 focus:border-primary"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Envoi...' : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Envoyer le lien magique
              </>
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
