'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { KeyRound, ArrowLeft, ArrowRight } from 'lucide-react'

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
import { useAuth } from '@/hooks/use-auth'

const recoverySchema = z.object({
  recoveryCode: z
    .string()
    .min(8, 'Code de récupération invalide')
    .max(20, 'Code de récupération invalide'),
})

type RecoveryFormData = z.infer<typeof recoverySchema>

export default function TwoFARecoveryPage() {
  const { useRecoveryCode, pendingEmail, isLoading } = useAuth()

  const form = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      recoveryCode: '',
    },
  })

  const onSubmit = async (data: RecoveryFormData) => {
    try {
      await useRecoveryCode(data.recoveryCode)
    } catch {
      form.reset()
    }
  }

  if (!pendingEmail) {
    return (
      <AuthCard
        title="Session expirée"
        description="Veuillez vous reconnecter"
        icon={<KeyRound className="h-6 w-6 text-destructive" />}
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
      title="Code de récupération"
      description="Entrez l'un de vos codes de récupération"
      icon={<KeyRound className="h-6 w-6 text-primary" />}
      footer={
        <div className="space-y-2 w-full">
          <Link href="/2fa/verify" className="block">
            <Button variant="ghost" className="w-full text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Utiliser le code d'authentification
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="recoveryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code de récupération</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XXXX-XXXX"
                    className="border-2 focus:border-primary font-mono text-center text-lg tracking-wider"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-sm text-muted-foreground text-center">
            Chaque code de récupération ne peut être utilisé qu&apos;une seule fois.
          </p>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              'Vérification...'
            ) : (
              <>
                Vérifier <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
