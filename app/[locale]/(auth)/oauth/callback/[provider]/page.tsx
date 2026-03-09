'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AuthCard } from '@/components/auth/auth-card'
import { useOAuth } from '@/hooks/use-oauth'
import type { OAuthProvider } from '@/lib/api/endpoints'

export default function OAuthCallbackPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { handleCallback } = useOAuth()

  const provider = params.provider as OAuthProvider
  const code = searchParams.get('code') || ''
  const state = searchParams.get('state') || undefined
  const error = searchParams.get('error')

  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (error) {
      setStatus('error')
      setErrorMessage('L\'authentification a été annulée ou a échoué')
      return
    }

    if (!code || !provider) {
      setStatus('error')
      setErrorMessage('Paramètres de callback invalides')
      return
    }

    const processCallback = async () => {
      try {
        await handleCallback(provider, code, state)
        // Success - handleCallback redirects to dashboard
      } catch {
        setStatus('error')
        setErrorMessage('Erreur lors de la connexion')
      }
    }

    processCallback()
  }, [code, state, provider, error, handleCallback])

  const providerName =
    provider === 'google'
      ? 'Google'
      : provider === 'github'
        ? 'GitHub'
        : provider === 'keycloak'
          ? 'SSO'
          : 'OAuth'

  if (status === 'loading') {
    return (
      <AuthCard
        title={`Connexion avec ${providerName}...`}
        description="Veuillez patienter pendant la vérification"
      >
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Erreur de connexion"
      description={errorMessage}
      icon={<XCircle className="h-6 w-6 text-destructive" />}
      footer={
        <div className="space-y-2 w-full">
          <Link href="/login" className="block">
            <Button className="w-full">Retour à la connexion</Button>
          </Link>
        </div>
      }
    >
      <p className="text-center text-muted-foreground">
        Une erreur s&apos;est produite lors de la connexion avec {providerName}.
        Veuillez réessayer.
      </p>
    </AuthCard>
  )
}
