'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useWorkspaceStore } from '@/stores/workspace.store'
import { useAuthStore } from '@/stores/auth.store'
import * as workspaceService from '@/lib/workspace/service'
import type {
  Workspace,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  InviteMemberRequest,
} from '@/types/auth'

export function useWorkspace() {
  const {
    workspaces,
    currentWorkspace,
    members,
    isLoading,
    isLoadingMembers,
    setWorkspaces,
    setCurrentWorkspace,
    setMembers,
    addWorkspace,
    updateWorkspace: updateWorkspaceInStore,
    removeWorkspace,
    addMember: addMemberToStore,
    removeMember: removeMemberFromStore,
    setLoading,
    setLoadingMembers,
  } = useWorkspaceStore()

  const { setCurrentWorkspace: setCurrentWorkspaceId, setTokens, user } =
    useAuthStore()

  const [actionLoading, setActionLoading] = useState(false)

  // Fetch all workspaces
  const fetchWorkspaces = useCallback(async () => {
    try {
      setLoading(true)
      const response = await workspaceService.listWorkspaces()

      if (response.data) {
        const normalized = response.data
          .map((w) => workspaceService.normalizeWorkspace(w as unknown as Record<string, unknown>))
          .filter((w): w is Workspace => w !== null)
        setWorkspaces(normalized)

        // Set current workspace if not set
        if (!currentWorkspace && normalized.length > 0) {
          const current =
            normalized.find((w) => w.id === user?.currentWorkspace?.id) ||
            normalized[0]
          setCurrentWorkspace(current)
        }
      }
    } catch (error) {
      console.error('Failed to fetch workspaces:', error)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setWorkspaces, currentWorkspace, setCurrentWorkspace, user])

  // Create workspace
  const createWorkspace = useCallback(
    async (data: CreateWorkspaceRequest) => {
      try {
        setActionLoading(true)
        const response = await workspaceService.createWorkspace(data)

        if (response.data) {
          const normalized = workspaceService.normalizeWorkspace(
            response.data as unknown as Record<string, unknown>
          )
          if (normalized) {
            addWorkspace(normalized)
            toast.success('Workspace créé avec succès')
            return normalized
          }
        }

        throw new Error(response.message || 'Erreur lors de la création')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'Erreur lors de la création du workspace'
        )
        throw error
      } finally {
        setActionLoading(false)
      }
    },
    [addWorkspace]
  )

  // Update workspace
  const updateWorkspace = useCallback(
    async (id: string, data: UpdateWorkspaceRequest) => {
      try {
        setActionLoading(true)
        const response = await workspaceService.updateWorkspace(id, data)

        if (response.data) {
          const normalized = workspaceService.normalizeWorkspace(
            response.data as unknown as Record<string, unknown>
          )
          if (normalized) {
            updateWorkspaceInStore(id, normalized)
            toast.success('Workspace mis à jour')
            return normalized
          }
        }

        throw new Error(response.message || 'Erreur lors de la mise à jour')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'Erreur lors de la mise à jour'
        )
        throw error
      } finally {
        setActionLoading(false)
      }
    },
    [updateWorkspaceInStore]
  )

  // Delete workspace
  const deleteWorkspace = useCallback(
    async (id: string) => {
      try {
        setActionLoading(true)
        await workspaceService.deleteWorkspace(id)
        removeWorkspace(id)
        toast.success('Workspace supprimé')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'Erreur lors de la suppression'
        )
        throw error
      } finally {
        setActionLoading(false)
      }
    },
    [removeWorkspace]
  )

  // Switch workspace
  const switchWorkspace = useCallback(
    async (id: string) => {
      try {
        setActionLoading(true)
        const response = await workspaceService.switchWorkspace(id)

        // Update tokens if returned
        if (response.data?.token && response.data?.refreshToken) {
          setTokens(response.data.token, response.data.refreshToken)
        }

        // Update current workspace ID in auth store
        setCurrentWorkspaceId(id)

        // Update current workspace in workspace store
        const workspace = workspaces.find((w) => w.id === id)
        if (workspace) {
          setCurrentWorkspace(workspace)
        }

        toast.success('Workspace changé')
        return response.data?.workspace
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'Erreur lors du changement de workspace'
        )
        throw error
      } finally {
        setActionLoading(false)
      }
    },
    [workspaces, setCurrentWorkspace, setCurrentWorkspaceId, setTokens]
  )

  // Invite member
  const inviteMember = useCallback(
    async (workspaceId: string, data: InviteMemberRequest) => {
      try {
        setActionLoading(true)
        await workspaceService.inviteMember(workspaceId, data)
        toast.success(`Invitation envoyée à ${data.email}`)
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || "Erreur lors de l'envoi de l'invitation"
        )
        throw error
      } finally {
        setActionLoading(false)
      }
    },
    []
  )

  // Remove member
  const removeMember = useCallback(
    async (workspaceId: string, userId: string) => {
      try {
        setActionLoading(true)
        await workspaceService.removeMember(workspaceId, userId)
        removeMemberFromStore(userId)
        toast.success('Membre retiré du workspace')
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        toast.error(
          err.response?.data?.message || 'Erreur lors de la suppression du membre'
        )
        throw error
      } finally {
        setActionLoading(false)
      }
    },
    [removeMemberFromStore]
  )

  // Auto-fetch workspaces on mount
  useEffect(() => {
    if (workspaces.length === 0) {
      fetchWorkspaces()
    }
  }, [])

  return {
    // State
    workspaces,
    currentWorkspace,
    members,
    isLoading,
    isLoadingMembers,
    actionLoading,

    // Actions
    fetchWorkspaces,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    switchWorkspace,
    inviteMember,
    removeMember,
  }
}
