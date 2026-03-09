'use client'

import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { use2FAStore } from '@/stores/2fa.store'
import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/lib/auth/service'

export function use2FA() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    secret,
    qrCodeUrl,
    recoveryCodes,
    isEnabled,
    setSetupData,
    setRecoveryCodes,
    setEnabled,
    clearSetup,
  } = use2FAStore()
  const { user, setUser } = useAuthStore()

  const initSetup = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await authService.setup2FA()

      if (response.status === 'success' && response.data) {
        setSetupData(response.data.secret, response.data.qrCodeUrl)
        return {
          success: true,
          data: response.data,
        }
      }

      throw new Error(response.message || 'Impossible d\'initialiser le 2FA')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(
        err.response?.data?.message || 'Impossible d\'initialiser le 2FA'
      )
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [setSetupData])

  const enable = useCallback(
    async (code: string) => {
      try {
        setIsLoading(true)
        const response = await authService.enable2FA({ code })

        if (response.status === 'success' && response.data?.recoveryCodes) {
          setRecoveryCodes(response.data.recoveryCodes)
          setEnabled(true)

          // Update user state
          if (user) {
            setUser({ ...user, twoFactorEnabled: true })
          }

          toast.success('2FA activ\u00e9 avec succ\u00e8s')
          return {
            success: true,
            recoveryCodes: response.data.recoveryCodes,
          }
        }

        throw new Error(response.message || 'Code invalide')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'Code invalide')
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [setRecoveryCodes, setEnabled, user, setUser]
  )

  const disable = useCallback(
    async (password: string) => {
      try {
        setIsLoading(true)
        const response = await authService.disable2FA({ password })

        if (response.status === 'success') {
          setEnabled(false)
          clearSetup()

          // Update user state
          if (user) {
            setUser({ ...user, twoFactorEnabled: false })
          }

          toast.success('2FA d\u00e9sactiv\u00e9 avec succ\u00e8s')
          return { success: true }
        }

        throw new Error(response.message || 'Mot de passe invalide')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(err.response?.data?.message || 'Mot de passe invalide')
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [setEnabled, clearSetup, user, setUser]
  )

  const checkStatus = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await authService.get2FAStatus()

      if (response.status === 'success' && response.data) {
        setEnabled(response.data.enabled)
        return response.data
      }

      return { enabled: false }
    } catch {
      return { enabled: false }
    } finally {
      setIsLoading(false)
    }
  }, [setEnabled])

  const regenerateCodes = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await authService.regenerateRecoveryCodes()

      if (response.status === 'success' && response.data?.recoveryCodes) {
        setRecoveryCodes(response.data.recoveryCodes)
        toast.success('Codes de r\u00e9cup\u00e9ration r\u00e9g\u00e9n\u00e9r\u00e9s')
        return {
          success: true,
          recoveryCodes: response.data.recoveryCodes,
        }
      }

      throw new Error('Impossible de r\u00e9g\u00e9n\u00e9rer les codes')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(
        err.response?.data?.message ||
          'Impossible de r\u00e9g\u00e9n\u00e9rer les codes'
      )
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [setRecoveryCodes])

  return {
    secret,
    qrCodeUrl,
    recoveryCodes,
    isEnabled,
    isLoading,
    initSetup,
    enable,
    disable,
    checkStatus,
    regenerateCodes,
    clearSetup,
  }
}
