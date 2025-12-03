"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Github, Chrome, Sparkles, ArrowRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'authentification
    setTimeout(() => {
      toast({
        title: "Connexion réussie!",
        description: "Redirection vers le dashboard...",
      })

      // Redirection vers le dashboard après 1 seconde
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }, 1500)
  }

  const handleOAuthLogin = (provider: string) => {
    toast({
      title: `Connexion avec ${provider}`,
      description: "Redirection en cours...",
    })
    // Ici vous intégreriez la vraie logique OAuth avec next-auth
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-background" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 -right-1/4 h-[300px] w-[300px] rounded-full bg-chart-2/20 blur-3xl"
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="border-2 shadow-xl shadow-primary/5">
            <CardHeader className="space-y-1 text-center pb-8">
              <div className="mx-auto mb-4 inline-flex rounded-2xl bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                  Connexion
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                Connectez-vous pour accéder à votre dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* OAuth Buttons */}
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin('Google')}
                  className="w-full border-2 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Chrome className="mr-2 h-4 w-4 text-primary" />
                  Continuer avec Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin('GitHub')}
                  className="w-full border-2 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Continuer avec GitHub
                </Button>
              </div>

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

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@exemple.com"
                      className="pl-10 border-2 focus:border-primary transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-2 focus:border-primary transition-colors"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Se souvenir de moi
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02]"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : (
                    <>
                      Se connecter <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6 border-t">
              <div className="text-sm text-center text-muted-foreground">
                Pas encore de compte?{' '}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Créer un compte
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
