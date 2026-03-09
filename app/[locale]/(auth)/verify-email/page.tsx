'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AuthCard } from '@/components/auth/auth-card'
import { OTPInput } from '@/components/auth/otp-input'
import { useAuth } from '@/hooks/use-auth'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const { verifyEmail, resendOTP, isLoading } = useAuth()
  const [code, setCode] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleVerify = async () => {
    if (code.length !== 6) return
    try {
      await verifyEmail({ email, code })
    } catch {
      // Error handled by hook
    }
  }

  const handleResend = async () => {
    try {
      await resendOTP(email)
      setResendCountdown(60)
    } catch {
      // Error handled by hook
    }
  }

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.length === 6) {
      handleVerify()
    }
  }, [code])

  return (
    <AuthCard
      title="Vérifiez votre email"
      description={`Entrez le code à 6 chiffres envoyé à ${email || 'votre adresse email'}`}
      icon={<Mail className="h-6 w-6 text-primary" />}
      footer={
        <div className="text-sm text-center text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline font-medium">
            Retour à la connexion
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

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Vous n&apos;avez pas reçu le code ?
          </p>
          <Button
            variant="link"
            onClick={handleResend}
            disabled={isLoading || resendCountdown > 0}
            className="text-sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {resendCountdown > 0
              ? `Renvoyer dans ${resendCountdown}s`
              : 'Renvoyer le code'}
          </Button>
        </div>
      </div>
    </AuthCard>
  )
}
