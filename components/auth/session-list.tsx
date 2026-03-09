'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Monitor,
  Smartphone,
  Tablet,
  LogOut,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { useSessions } from '@/hooks/use-sessions'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

export function SessionList() {
  const {
    sessions,
    isLoading,
    isRevoking,
    fetchSessions,
    revokeSession,
    revokeAllSessions,
  } = useSessions()

  const getDeviceIcon = (deviceName?: string) => {
    const name = (deviceName || '').toLowerCase()
    if (
      name.includes('mobile') ||
      name.includes('iphone') ||
      name.includes('android')
    ) {
      return Smartphone
    }
    if (name.includes('tablet') || name.includes('ipad')) {
      return Tablet
    }
    return Monitor
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Sessions actives</CardTitle>
          <CardDescription>
            Gérez vos sessions connectées sur tous les appareils
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchSessions}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          {sessions.length > 1 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Déconnecter tout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Déconnecter tous les appareils ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action révoquera toutes les sessions actives, y compris
                    votre session actuelle. Vous serez déconnecté immédiatement.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={revokeAllSessions}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isRevoking === 'all' ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Déconnecter tout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => {
            const Icon = getDeviceIcon(session.deviceName)
            return (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{session.deviceName || 'Appareil inconnu'}</span>
                      {session.isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Session actuelle
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {session.ipAddress || 'IP inconnue'} &bull; Dernière activité{' '}
                      {session.lastUsedAt
                        ? formatDistanceToNow(new Date(session.lastUsedAt), {
                            addSuffix: true,
                            locale: fr,
                          })
                        : 'récemment'}
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => revokeSession(session.id)}
                    disabled={isRevoking === session.id}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    {isRevoking === session.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            )
          })}

          {sessions.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Aucune session active trouvée
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
