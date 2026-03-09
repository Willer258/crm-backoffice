import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Workspace, WorkspaceMember } from '@/types/auth'

interface WorkspaceState {
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  members: WorkspaceMember[]
  isLoading: boolean
  isLoadingMembers: boolean
  _hasHydrated: boolean
}

interface WorkspaceActions {
  setWorkspaces: (workspaces: Workspace[]) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void
  setMembers: (members: WorkspaceMember[]) => void
  addWorkspace: (workspace: Workspace) => void
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void
  removeWorkspace: (id: string) => void
  addMember: (member: WorkspaceMember) => void
  removeMember: (userId: string) => void
  setLoading: (loading: boolean) => void
  setLoadingMembers: (loading: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
  reset: () => void
}

type WorkspaceStore = WorkspaceState & WorkspaceActions

const initialState: WorkspaceState = {
  workspaces: [],
  currentWorkspace: null,
  members: [],
  isLoading: false,
  isLoadingMembers: false,
  _hasHydrated: false,
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      ...initialState,

      setWorkspaces: (workspaces) => set({ workspaces }),

      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),

      setMembers: (members) => set({ members }),

      addWorkspace: (workspace) =>
        set((state) => ({
          workspaces: [...state.workspaces, workspace],
        })),

      updateWorkspace: (id, updates) =>
        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id === id ? { ...w, ...updates } : w
          ),
          currentWorkspace:
            state.currentWorkspace?.id === id
              ? { ...state.currentWorkspace, ...updates }
              : state.currentWorkspace,
        })),

      removeWorkspace: (id) =>
        set((state) => ({
          workspaces: state.workspaces.filter((w) => w.id !== id),
          currentWorkspace:
            state.currentWorkspace?.id === id ? null : state.currentWorkspace,
        })),

      addMember: (member) =>
        set((state) => ({
          members: [...state.members, member],
        })),

      removeMember: (userId) =>
        set((state) => ({
          members: state.members.filter((m) => m.userId !== userId),
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setLoadingMembers: (loading) => set({ isLoadingMembers: loading }),

      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),

      reset: () => set(initialState),
    }),
    {
      name: 'crm-workspace-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        workspaces: state.workspaces,
        currentWorkspace: state.currentWorkspace,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('[WorkspaceStore] Hydration error:', error)
          return
        }
        if (state) {
          state._hasHydrated = true
          console.log(
            '[WorkspaceStore] Hydrated - Workspaces:',
            state.workspaces.length,
            'Current:',
            state.currentWorkspace?.name
          )
        }
      },
    }
  )
)

// Selector hooks
export const useWorkspaces = () => useWorkspaceStore((state) => state.workspaces)
export const useCurrentWorkspace = () => useWorkspaceStore((state) => state.currentWorkspace)
export const useWorkspaceMembers = () => useWorkspaceStore((state) => state.members)
export const useWorkspaceLoading = () => useWorkspaceStore((state) => state.isLoading)
export const useWorkspaceHasHydrated = () => useWorkspaceStore((state) => state._hasHydrated)
