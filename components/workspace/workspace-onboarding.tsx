'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building2, Loader2, Rocket } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import * as workspaceService from '@/lib/workspace/service'
import { useUser } from '@/stores/auth.store'
import type { Workspace } from '@/types/auth'

const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
})

type CreateWorkspaceForm = z.infer<typeof createWorkspaceSchema>

interface WorkspaceOnboardingProps {
  onWorkspaceCreated: (workspace: Workspace) => void
}

export function WorkspaceOnboarding({ onWorkspaceCreated }: WorkspaceOnboardingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const user = useUser()

  const form = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: CreateWorkspaceForm) => {
    try {
      setIsLoading(true)
      const response = await workspaceService.createWorkspace(data)

      if (response.data) {
        const normalized = workspaceService.normalizeWorkspace(
          response.data as unknown as Record<string, unknown>
        )
        if (normalized) {
          toast.success('Workspace créé avec succès !')
          onWorkspaceCreated(normalized)
        }
      } else {
        throw new Error(response.message || 'Erreur lors de la création')
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(
        err.response?.data?.message || 'Erreur lors de la création du workspace'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bienvenue{user?.firstName ? `, ${user.firstName}` : ''} !
          </h1>
          <p className="mt-2 text-muted-foreground">
            Créez votre premier espace de travail pour commencer
          </p>
        </div>

        {/* Card */}
        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Créer un workspace</CardTitle>
            <CardDescription>
              Un workspace est un espace partagé où vous et votre équipe pouvez collaborer sur vos projets CRM.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du workspace</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Mon Entreprise, Équipe Commerciale..."
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Choisissez un nom représentatif de votre équipe ou entreprise
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Building2 className="mr-2 h-5 w-5" />
                      Créer mon workspace
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="space-y-1">
            <div className="font-medium">Collaboration</div>
            <div className="text-muted-foreground text-xs">Invitez votre équipe</div>
          </div>
          <div className="space-y-1">
            <div className="font-medium">Organisation</div>
            <div className="text-muted-foreground text-xs">Données centralisées</div>
          </div>
          <div className="space-y-1">
            <div className="font-medium">Sécurité</div>
            <div className="text-muted-foreground text-xs">Accès contrôlés</div>
          </div>
        </div>
      </div>
    </div>
  )
}
