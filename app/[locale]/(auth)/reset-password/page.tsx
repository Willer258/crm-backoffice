'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, KeyRound, Eye, EyeOff } from 'lucide-react'

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
import { PasswordStrength } from '@/components/auth/password-strength'
import { useAuth } from '@/hooks/use-auth'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule')
      .regex(/[a-z]/, 'Le mot de passe doit contenir une minuscule')
      .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Le mot de passe doit contenir un caractère spécial'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const { resetPassword, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const watchPassword = form.watch('password')

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        token,
        password: data.password,
      })
    } catch {
      // Error handled by hook
    }
  }

  if (!token) {
    return (
      <AuthCard
        title="Lien invalide"
        description="Ce lien de réinitialisation est invalide ou a expiré."
        icon={<KeyRound className="h-6 w-6 text-destructive" />}
        footer={
          <Link href="/forgot-password">
            <Button className="w-full">Demander un nouveau lien</Button>
          </Link>
        }
      >
        <p className="text-center text-muted-foreground">
          Veuillez demander un nouveau lien de réinitialisation.
        </p>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Nouveau mot de passe"
      description="Créez un nouveau mot de passe sécurisé"
      icon={<KeyRound className="h-6 w-6 text-primary" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Créez un mot de passe fort"
                      autoComplete="new-password"
                      className="pl-10 pr-10 border-2 focus:border-primary"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
                <PasswordStrength password={watchPassword} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirmez votre mot de passe"
                      autoComplete="new-password"
                      className="pl-10 pr-10 border-2 focus:border-primary"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
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
            {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
