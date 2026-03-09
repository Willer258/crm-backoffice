import { apiClient } from '@/lib/api/client'
import { WORKSPACE_ENDPOINTS } from '@/lib/api/endpoints'
import type {
  Workspace,
  WorkspaceMember,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  InviteMemberRequest,
  WorkspaceListResponse,
  WorkspaceResponse,
  WorkspaceMembersResponse,
} from '@/types/auth'

// ============ Workspace CRUD ============

export async function createWorkspace(
  data: CreateWorkspaceRequest
): Promise<WorkspaceResponse> {
  const response = await apiClient.post(WORKSPACE_ENDPOINTS.CREATE, data)
  return response.data
}

export async function listWorkspaces(): Promise<WorkspaceListResponse> {
  const response = await apiClient.get(WORKSPACE_ENDPOINTS.LIST)
  return response.data
}

export async function getWorkspace(id: string): Promise<WorkspaceResponse> {
  const response = await apiClient.get(WORKSPACE_ENDPOINTS.GET(id))
  return response.data
}

export async function updateWorkspace(
  id: string,
  data: UpdateWorkspaceRequest
): Promise<WorkspaceResponse> {
  const response = await apiClient.patch(WORKSPACE_ENDPOINTS.UPDATE(id), data)
  return response.data
}

export async function deleteWorkspace(
  id: string
): Promise<{ status: string; message?: string }> {
  const response = await apiClient.delete(WORKSPACE_ENDPOINTS.DELETE(id))
  return response.data
}

// ============ Workspace Actions ============

export async function switchWorkspace(id: string): Promise<{
  status: string
  message?: string
  data?: {
    token?: string
    refreshToken?: string
    workspace?: Workspace
  }
}> {
  const response = await apiClient.post(WORKSPACE_ENDPOINTS.SWITCH(id), {
    workspaceId: id,
  })
  return response.data
}

// ============ Members Management ============

export async function inviteMember(
  workspaceId: string,
  data: InviteMemberRequest
): Promise<{ status: string; message?: string }> {
  const response = await apiClient.post(
    WORKSPACE_ENDPOINTS.INVITE(workspaceId),
    data
  )
  return response.data
}

export async function removeMember(
  workspaceId: string,
  userId: string
): Promise<{ status: string; message?: string }> {
  const response = await apiClient.delete(
    WORKSPACE_ENDPOINTS.REMOVE_MEMBER(workspaceId, userId)
  )
  return response.data
}

// ============ Helper Functions ============

export function normalizeWorkspace(apiWorkspace: Record<string, unknown>): Workspace | null {
  if (!apiWorkspace) return null

  return {
    id: (apiWorkspace.id || apiWorkspace._id || '') as string,
    name: (apiWorkspace.name || '') as string,
    slug: apiWorkspace.slug as string | undefined,
    logo: apiWorkspace.logo as string | undefined,
    role: (apiWorkspace.role || 'member') as Workspace['role'],
    createdAt: (apiWorkspace.createdAt || apiWorkspace.created_at) as string | undefined,
    updatedAt: (apiWorkspace.updatedAt || apiWorkspace.updated_at) as string | undefined,
    membersCount: apiWorkspace.membersCount as number | undefined,
  }
}

export function normalizeWorkspaceMember(
  apiMember: Record<string, unknown>
): WorkspaceMember | null {
  if (!apiMember) return null

  const firstName =
    (apiMember.firstName || apiMember.firstname || apiMember.first_name || '') as string
  const lastName =
    (apiMember.lastName || apiMember.lastname || apiMember.last_name || '') as string

  return {
    id: (apiMember.id || apiMember._id || '') as string,
    userId: (apiMember.userId || apiMember.user_id || apiMember.id || '') as string,
    email: (apiMember.email || '') as string,
    firstName,
    lastName,
    name: (apiMember.name || `${firstName} ${lastName}`.trim()) as string,
    avatar: apiMember.avatar as string | undefined,
    role: (apiMember.role || 'member') as WorkspaceMember['role'],
    joinedAt: (apiMember.joinedAt || apiMember.joined_at || apiMember.createdAt || '') as string,
    invitedBy: apiMember.invitedBy as string | undefined,
  }
}
