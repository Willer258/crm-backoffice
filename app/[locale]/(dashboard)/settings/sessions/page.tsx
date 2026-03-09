'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SessionList } from '@/components/auth/session-list'
import { useRequireAuth } from '@/hooks/use-require-auth'

export default function SessionsSettingsPage() {
  useRequireAuth()

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sessions actives</h1>
        <p className="text-muted-foreground">
          Gérez vos sessions de connexion sur tous vos appareils
        </p>
      </div>

      {/* Session List Component */}
      <SessionList />

      {/* Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conseils de sécurité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            • Si vous voyez une session que vous ne reconnaissez pas, déconnectez-la
            immédiatement et changez votre mot de passe.
          </p>
          <p>
            • Activez l&apos;authentification à deux facteurs (2FA) pour une
            sécurité renforcée.
          </p>
          <p>
            • Évitez de vous connecter sur des appareils publics ou partagés.
          </p>
          <p>
            • Déconnectez-vous toujours après avoir utilisé un appareil partagé.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
