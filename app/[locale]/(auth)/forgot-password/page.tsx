'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react'

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

const forgotPasswordSchema = z.object({
  email: z.string().email('Adresse email invalide'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth()
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data)
      setSubmitted(true)
    } catch {
      // Error handled by hook
    }
  }

  if (submitted) {
    return (
      <AuthCard
        title="Email envoyé"
        description="Si cette adresse existe, vous recevrez un lien de réinitialisation."
        icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
        footer={
          <Link href="/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Button>
          </Link>
        }
      >
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Vérifiez votre boîte de réception et suivez les instructions
            pour réinitialiser votre mot de passe.
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
      title="Mot de passe oublié"
      description="Entrez votre email pour recevoir un lien de réinitialisation"
      icon={<KeyRound className="h-6 w-6 text-primary" />}
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
            {isLoading ? 'Envoi...' : 'Envoyer le lien'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
