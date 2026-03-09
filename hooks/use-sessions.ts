'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import * as authService from '@/lib/auth/service'
import type { Session } from '@/types/auth'

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRevoking, setIsRevoking] = useState<string | null>(null)

  const fetchSessions = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await authService.getSessions()

      if (response.status === 'success' && response.data) {
        setSessions(response.data)
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(
        err.response?.data?.message ||
          'Impossible de charger les sessions'
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  const revokeSession = useCallback(
    async (sessionId: string) => {
      try {
        setIsRevoking(sessionId)
        const response = await authService.revokeSession(sessionId)

        if (response.status === 'success') {
          setSessions((prev) => prev.filter((s) => s.id !== sessionId))
          toast.success('Session r\u00e9voqu\u00e9e')
          return { success: true }
        }

        throw new Error(response.message || 'Impossible de r\u00e9voquer la session')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message ||
            'Impossible de r\u00e9voquer la session'
        )
        throw error
      } finally {
        setIsRevoking(null)
      }
    },
    []
  )

  const revokeAllSessions = useCallback(async () => {
    try {
      setIsRevoking('all')
      const response = await authService.revokeAllSessions()

      if (response.status === 'success') {
        toast.success(
          'Toutes les sessions ont \u00e9t\u00e9 r\u00e9voqu\u00e9es. Vous allez \u00eatre d\u00e9connect\u00e9.'
        )
        // Redirect to login after a short delay
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
        return { success: true }
      }

      throw new Error(response.message || 'Impossible de r\u00e9voquer les sessions')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(
        err.response?.data?.message ||
          'Impossible de r\u00e9voquer les sessions'
      )
      throw error
    } finally {
      setIsRevoking(null)
    }
  }, [])

  return {
    sessions,
    isLoading,
    isRevoking,
    fetchSessions,
    revokeSession,
    revokeAllSessions,
  }
}
