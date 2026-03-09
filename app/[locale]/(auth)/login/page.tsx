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
  ArrowRight,
  Wand2,
  Eye,
  EyeOff,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  TrendingUp,
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
import { useAuth } from '@/hooks/use-auth'

const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
  remember: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

// Floating icons for the illustration
const floatingIcons = [
  { Icon: Users, delay: 0, x: 20, y: 30 },
  { Icon: BarChart3, delay: 0.2, x: 70, y: 15 },
  { Icon: Calendar, delay: 0.4, x: 15, y: 70 },
  { Icon: MessageSquare, delay: 0.6, x: 75, y: 60 },
  { Icon: TrendingUp, delay: 0.8, x: 50, y: 85 },
]


export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ email: data.email, password: data.password })
    } catch {
      // Error is handled by the hook
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 relative overflow-hidden">
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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/20 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Main Illustration Area */}
          <div className="relative w-full h-80 mb-12">
            {/* Central Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-md bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border p-6">
                {/* Mini Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-24 bg-primary/30 rounded" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center"
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{i * 24}%</div>
                          <div className="text-xs text-muted-foreground">Stats</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="h-24 bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 rounded-lg" />
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
                <Icon className="h-5 w-5 text-primary" />
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
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Gérez votre business
              </span>
              <br />
              en toute simplicité
            </h1>
            <p className="text-muted-foreground text-lg">
              Une plateforme CRM complète pour suivre vos clients,
              opportunités et performances.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Bon retour</h2>
            <p className="text-muted-foreground mt-2">
              Connectez-vous à votre compte pour continuer
            </p>
          </div>

          {/* OAuth Buttons */}
          <OAuthButtons mode="login" disabled={isLoading} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Mot de passe</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Oublié ?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Votre mot de passe"
                          autoComplete="current-password"
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      Se souvenir de moi
                    </FormLabel>
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
                  'Connexion...'
                ) : (
                  <>
                    Se connecter <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Magic Link */}
          <div className="text-center">
            <Link href="/magic-link">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Wand2 className="mr-2 h-4 w-4" />
                Connexion par lien magique
              </Button>
            </Link>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
