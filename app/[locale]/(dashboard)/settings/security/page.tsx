'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, Key, Smartphone, Eye, EyeOff, Loader2 } from 'lucide-react'

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { OTPInput } from '@/components/auth/otp-input'
import { PasswordStrength } from '@/components/auth/password-strength'
import { RecoveryCodesDisplay } from '@/components/auth/recovery-codes-display'
import { useAuth } from '@/hooks/use-auth'
import { use2FA } from '@/hooks/use-2fa'
import { useRequireAuth } from '@/hooks/use-require-auth'

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
    newPassword: z
      .string()
      .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
      .regex(/[A-Z]/, 'Une majuscule requise')
      .regex(/[a-z]/, 'Une minuscule requise')
      .regex(/[0-9]/, 'Un chiffre requis')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Un caractère spécial requis'),
    confirmPassword: z.string(),
    logoutOtherDevices: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export default function SecuritySettingsPage() {
  useRequireAuth()
  const { user, changePassword, isLoading: authLoading } = useAuth()
  const {
    isEnabled: is2FAEnabled,
    qrCodeUrl,
    recoveryCodes,
    isLoading: twoFALoading,
    initSetup,
    enable,
    disable,
    checkStatus,
    clearSetup,
  } = use2FA()

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [setup2FAOpen, setSetup2FAOpen] = useState(false)
  const [disable2FAOpen, setDisable2FAOpen] = useState(false)
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [disablePassword, setDisablePassword] = useState('')

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      logoutOtherDevices: false,
    },
  })

  const watchNewPassword = form.watch('newPassword')

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  const onChangePassword = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        logoutOtherDevices: data.logoutOtherDevices,
      })
      form.reset()
    } catch {
      // Error handled by hook
    }
  }

  const handleSetup2FA = async () => {
    try {
      await initSetup()
    } catch {
      // Error handled by hook
    }
  }

  const handleEnable2FA = async () => {
    if (otpCode.length !== 6) return
    try {
      await enable(otpCode)
      setShowRecoveryCodes(true)
      setOtpCode('')
    } catch {
      setOtpCode('')
    }
  }

  const handleDisable2FA = async () => {
    try {
      await disable(disablePassword)
      setDisable2FAOpen(false)
      setDisablePassword('')
    } catch {
      setDisablePassword('')
    }
  }

  const handleCloseSetup = () => {
    setSetup2FAOpen(false)
    setShowRecoveryCodes(false)
    clearSetup()
    setOtpCode('')
  }

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sécurité</h1>
        <p className="text-muted-foreground">
          Gérez la sécurité de votre compte
        </p>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <CardTitle>Changer le mot de passe</CardTitle>
          </div>
          <CardDescription>
            Mettez à jour votre mot de passe régulièrement pour protéger votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onChangePassword)}
              className="space-y-4 max-w-md"
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe actuel</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? 'text' : 'password'}
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showCurrentPassword ? (
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? 'text' : 'password'}
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <PasswordStrength password={watchNewPassword} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
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

              <Button type="submit" disabled={authLoading}>
                {authLoading ? 'Modification...' : 'Modifier le mot de passe'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Authentification à deux facteurs (2FA)</CardTitle>
            </div>
            {is2FAEnabled || user?.twoFactorEnabled ? (
              <Badge variant="default" className="bg-green-600">
                Activé
              </Badge>
            ) : (
              <Badge variant="secondary">Désactivé</Badge>
            )}
          </div>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {is2FAEnabled || user?.twoFactorEnabled ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                L&apos;authentification à deux facteurs est activée sur votre compte.
              </p>
              <Dialog open={disable2FAOpen} onOpenChange={setDisable2FAOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Désactiver le 2FA</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Désactiver le 2FA</DialogTitle>
                    <DialogDescription>
                      Entrez votre mot de passe pour confirmer la désactivation.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={disablePassword}
                    onChange={(e) => setDisablePassword(e.target.value)}
                  />
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDisable2FAOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDisable2FA}
                      disabled={twoFALoading || !disablePassword}
                    >
                      {twoFALoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Désactiver
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Dialog open={setup2FAOpen} onOpenChange={(open) => {
              if (!open) handleCloseSetup()
              else setSetup2FAOpen(true)
            }}>
              <DialogTrigger asChild>
                <Button onClick={handleSetup2FA}>
                  <Smartphone className="mr-2 h-4 w-4" />
                  Activer le 2FA
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                {showRecoveryCodes && recoveryCodes.length > 0 ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>2FA activé !</DialogTitle>
                      <DialogDescription>
                        Sauvegardez vos codes de récupération en lieu sûr.
                      </DialogDescription>
                    </DialogHeader>
                    <RecoveryCodesDisplay
                      codes={recoveryCodes}
                      onContinue={handleCloseSetup}
                    />
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle>Configurer le 2FA</DialogTitle>
                      <DialogDescription>
                        Scannez le QR code avec votre application d&apos;authentification
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {qrCodeUrl ? (
                        <div className="flex justify-center">
                          <img
                            src={qrCodeUrl}
                            alt="QR Code 2FA"
                            className="w-48 h-48"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <p className="text-sm text-center text-muted-foreground">
                          Entrez le code à 6 chiffres de votre application
                        </p>
                        <OTPInput
                          value={otpCode}
                          onChange={setOtpCode}
                          disabled={twoFALoading}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleEnable2FA}
                        disabled={twoFALoading || otpCode.length !== 6}
                      >
                        {twoFALoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Activer
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
