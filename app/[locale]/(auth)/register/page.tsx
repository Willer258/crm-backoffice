'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  TrendingUp,
  Rocket,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { PasswordStrength } from '@/components/auth/password-strength'
import { useAuth } from '@/hooks/use-auth'

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'Le prénom doit avoir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit avoir au moins 2 caractères'),
    email: z.string().email('Adresse email invalide'),
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
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Vous devez accepter les conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

// Floating icons for the illustration
const floatingIcons = [
  { Icon: Users, delay: 0, x: 20, y: 25 },
  { Icon: BarChart3, delay: 0.2, x: 75, y: 15 },
  { Icon: Calendar, delay: 0.4, x: 10, y: 65 },
  { Icon: MessageSquare, delay: 0.6, x: 80, y: 55 },
  { Icon: TrendingUp, delay: 0.8, x: 45, y: 80 },
  { Icon: Rocket, delay: 1, x: 60, y: 35 },
]

export default function RegisterPage() {
  const { register: registerUser, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const watchPassword = form.watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
    } catch {
      // Error is handled by the hook
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-chart-2/10 via-primary/5 to-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }} />
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-chart-2/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Main Illustration Area */}
          <div className="relative w-full h-80 mb-12">
            {/* Central Card Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-md bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border p-6">
                {/* Mini Profile Card */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center"
                    >
                      <User className="h-8 w-8 text-white" />
                    </motion.div>
                    <div>
                      <div className="h-4 w-32 bg-foreground/20 rounded mb-2" />
                      <div className="h-3 w-24 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="h-20 bg-gradient-to-br from-chart-2/20 to-primary/10 rounded-lg p-3"
                      >
                        <div className="h-2 w-12 bg-muted rounded mb-2" />
                        <div className="text-2xl font-bold text-primary">{i * 156}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-2 bg-gradient-to-r from-primary to-chart-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Icons */}
            {floatingIcons.map(({ Icon, delay, x, y }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  delay,
                  duration: 0.5,
                  y: { duration: 3, repeat: Infinity, delay },
                }}
                className="absolute p-3 bg-background rounded-xl shadow-lg border"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <Icon className="h-5 w-5 text-chart-2" />
              </motion.div>
            ))}
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl xl:text-4xl font-bold mb-4">
              <span className="text-primary">
                Rejoignez-nous
              </span>
              <br />
              et développez votre activité
            </h1>
            <p className="text-muted-foreground text-lg">
              Créez votre compte en quelques secondes et commencez
              à gérer vos clients efficacement.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Créer un compte</h2>
            <p className="text-muted-foreground mt-2">
              Inscrivez-vous pour accéder à tous nos services
            </p>
          </div>

          {/* OAuth Buttons */}
          <OAuthButtons mode="register" disabled={isLoading} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou avec email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Jean"
                            autoComplete="given-name"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dupont"
                          autoComplete="family-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Créez un mot de passe fort"
                          autoComplete="new-password"
                          className="pl-10 pr-10"
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
                          className="pl-10 pr-10"
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

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                      />
                    </FormControl>
                    <div className="leading-tight">
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        J&apos;accepte les{' '}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          conditions
                        </Link>{' '}
                        et la{' '}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          politique de confidentialité
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Création...'
                ) : (
                  <>
                    Créer mon compte <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
