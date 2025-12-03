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
import { Mail, Lock, User, Github, Chrome, Sparkles, ArrowRight, Shield } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    // Simulation d'inscription
    setTimeout(() => {
      toast({
        title: "Compte créé!",
        description: "Redirection vers le dashboard...",
      })

      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOAuthRegister = (provider: string) => {
    toast({
      title: `Inscription avec ${provider}`,
      description: "Redirection en cours...",
    })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-background" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/4 -right-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 -left-1/4 h-[300px] w-[300px] rounded-full bg-chart-2/20 blur-3xl"
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
                  Créer un compte
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                Inscrivez-vous pour accéder à tous nos services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* OAuth Buttons */}
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthRegister('Google')}
                  className="w-full border-2 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Chrome className="mr-2 h-4 w-4 text-primary" />
                  S'inscrire avec Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOAuthRegister('GitHub')}
                  className="w-full border-2 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Github className="mr-2 h-4 w-4" />
                  S'inscrire avec GitHub
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

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jean Dupont"
                      className="pl-10 border-2 focus:border-primary transition-colors"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nom@exemple.com"
                      className="pl-10 border-2 focus:border-primary transition-colors"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-2 focus:border-primary transition-colors"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-2 focus:border-primary transition-colors"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal cursor-pointer leading-tight"
                  >
                    J'accepte les{' '}
                    <Link href="/terms" className="text-primary hover:underline font-medium">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link href="/privacy" className="text-primary hover:underline font-medium">
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02]"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Création...' : (
                    <>
                      Créer mon compte <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6 border-t">
              <div className="text-sm text-center text-muted-foreground">
                Déjà un compte?{' '}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
