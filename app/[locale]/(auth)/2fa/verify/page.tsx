'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, ArrowRight, KeyRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AuthCard } from '@/components/auth/auth-card'
import { OTPInput } from '@/components/auth/otp-input'
import { useAuth } from '@/hooks/use-auth'

export default function TwoFAVerifyPage() {
  const { verify2FA, pendingEmail, isLoading } = useAuth()
  const [code, setCode] = useState('')

  const handleVerify = async () => {
    if (code.length !== 6) return
    try {
      await verify2FA(code)
    } catch {
      setCode('')
    }
  }

  if (!pendingEmail) {
    return (
      <AuthCard
        title="Session expirée"
        description="Veuillez vous reconnecter"
        icon={<Shield className="h-6 w-6 text-destructive" />}
        footer={
          <Link href="/login">
            <Button className="w-full">Retour à la connexion</Button>
          </Link>
        }
      >
        <p className="text-center text-muted-foreground">
          Votre session de vérification 2FA a expiré.
        </p>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Vérification 2FA"
      description="Entrez le code de votre application d'authentification"
      icon={<Shield className="h-6 w-6 text-primary" />}
      footer={
        <div className="space-y-2 w-full">
          <Link href="/2fa/recovery" className="block">
            <Button variant="link" className="w-full text-sm">
              <KeyRound className="mr-2 h-4 w-4" />
              Utiliser un code de récupération
            </Button>
          </Link>
          <Link href="/login" className="block">
            <Button variant="ghost" className="w-full text-sm">
              Retour à la connexion
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        <OTPInput
          value={code}
          onChange={setCode}
          disabled={isLoading}
          autoFocus
        />

        <Button
          onClick={handleVerify}
          className="w-full"
          size="lg"
          disabled={isLoading || code.length !== 6}
        >
          {isLoading ? (
            'Vérification...'
          ) : (
            <>
              Vérifier <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </AuthCard>
  )
}
