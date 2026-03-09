// Authentication Types and Interfaces for CRM API

// ============ User Types ============

export interface User {
  id: string
  email: string
  emailVerified: boolean
  name?: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  role: 'user' | 'admin' | 'moderator'
  provider?: 'email' | 'google' | 'github' | 'keycloak'
  providerId?: string
  twoFactorEnabled: boolean
  currentWorkspace?: Workspace
  preferences?: UserPreferences
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  loginCount?: number
}

export interface Workspace {
  id: string
  name: string
  slug?: string
  logo?: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  createdAt?: string
  updatedAt?: string
  membersCount?: number
}

export interface WorkspaceMember {
  id: string
  userId: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  avatar?: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  joinedAt: string
  invitedBy?: string
}

export interface WorkspaceInvitation {
  id: string
  email: string
  role: 'admin' | 'member' | 'viewer'
  status: 'pending' | 'accepted' | 'expired'
  invitedBy: string
  createdAt: string
  expiresAt: string
}

// ============ Workspace Request Types ============

export interface CreateWorkspaceRequest {
  name: string
  logo?: string | null
}

export interface UpdateWorkspaceRequest {
  name?: string
  logo?: string | null
}

export interface InviteMemberRequest {
  email: string
  role?: 'admin' | 'member' | 'viewer'
}

export interface SwitchWorkspaceRequest {
  workspaceId: string
}

// ============ Workspace Response Types ============

export interface WorkspaceListResponse {
  status: 'success' | 'error'
  message?: string
  data?: Workspace[]
}

export interface WorkspaceResponse {
  status: 'success' | 'error'
  message?: string
  data?: Workspace
}

export interface WorkspaceMembersResponse {
  status: 'success' | 'error'
  message?: string
  data?: WorkspaceMember[]
}

export interface UserPreferences {
  language: string
  currency: string
  timezone?: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  marketing: boolean
}

// ============ Session Types ============

export interface Session {
  id: string
  deviceName?: string
  deviceType?: 'mobile' | 'tablet' | 'desktop' | string
  browser?: string
  os?: string
  ipAddress?: string
  location?: string
  createdAt: string
  lastUsedAt?: string
  lastActivity?: string
  isCurrent?: boolean
}

// ============ API Request Types ============

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface VerifyEmailOTPRequest {
  email: string
  code: string
}

export interface ResendOTPRequest {
  email: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  logoutOtherDevices?: boolean
}

export interface Enable2FARequest {
  code: string
}

export interface Disable2FARequest {
  password: string
}

export interface Verify2FARequest {
  email: string
  code: string
}

export interface Recovery2FARequest {
  email: string
  recoveryCode: string
}

export interface MagicLinkRequest {
  email: string
}

export interface MagicLinkVerifyRequest {
  token: string
}

export interface OAuthCallbackRequest {
  code: string
  state?: string
}

export interface UpdateProfileRequest {
  name?: string
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  preferences?: Partial<UserPreferences>
}

// ============ API Response Types ============

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error'
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export interface AuthResponse {
  status: 'success' | 'error'
  message?: string
  token?: string
  refreshToken?: string
  user?: User
  requires2fa?: boolean
  data?: {
    userId?: string
    email?: string
    otpCode?: string // Dev only
    token?: string
    refreshToken?: string
    user?: User
  }
}

export interface RegisterResponse {
  status: 'success' | 'error'
  message?: string
  data?: {
    userId: string
    email: string
    otpCode?: string // Dev only
  }
}

export interface TwoFASetupResponse {
  status: 'success' | 'error'
  message?: string
  data?: {
    secret: string
    qrCodeUrl: string
    manualEntryKey: string
  }
}

export interface TwoFAEnableResponse {
  status: 'success' | 'error'
  message?: string
  data?: {
    recoveryCodes: string[]
  }
}

export interface TwoFAStatusResponse {
  status: 'success' | 'error'
  data?: {
    enabled: boolean
    recoveryCodesCount?: number
  }
}

export interface OAuthProviderResponse {
  status: 'success' | 'error'
  data?: {
    providers: Array<{
      name: string
      enabled: boolean
    }>
  }
}

export interface OAuthConnectResponse {
  status: 'success' | 'error'
  data?: {
    authorizationUrl: string
    state: string
  }
}

export interface OAuthConnection {
  id: string
  provider: 'google' | 'github' | 'keycloak'
  email?: string
  name?: string
  connectedAt: string
}

export interface SessionsResponse {
  status: 'success' | 'error'
  data?: Session[]
}

// ============ JWT Types ============

export interface JWTPayload {
  userId: string
  email: string
  role: User['role']
  sessionId: string
  workspaceId?: string
  iat: number
  exp: number
}

export interface RefreshTokenPayload {
  userId: string
  sessionId: string
  iat: number
  exp: number
}

// ============ Password Validation ============

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4
  feedback: string[]
  meetsRequirements: boolean
}

export interface ValidationError {
  field: string
  message: string
}

// ============ Auth Store Types ============

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  currentWorkspaceId: string | null
  isAuthenticated: boolean
  isLoading: boolean
  requires2FA: boolean
  pendingEmail: string | null
}

export interface AuthActions {
  setUser: (user: User | null) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  setCurrentWorkspace: (workspaceId: string) => void
  setRequires2FA: (requires: boolean, email?: string) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  hasPermission: (permission: string) => boolean
}

// ============ 2FA Store Types ============

export interface TwoFAState {
  secret: string | null
  qrCodeUrl: string | null
  recoveryCodes: string[]
  isEnabled: boolean
}

export interface TwoFAActions {
  setSetupData: (secret: string, qrCodeUrl: string) => void
  setRecoveryCodes: (codes: string[]) => void
  setEnabled: (enabled: boolean) => void
  clearSetup: () => void
}

// ============ Audit Types ============

export interface AuditLog {
  id: string
  userId: string
  action: AuditAction
  details?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

export type AuditAction =
  | 'user.registered'
  | 'user.login'
  | 'user.logout'
  | 'user.password_changed'
  | 'user.password_reset_requested'
  | 'user.password_reset'
  | 'user.email_verified'
  | 'user.profile_updated'
  | 'user.2fa_enabled'
  | 'user.2fa_disabled'
  | 'user.account_linked'
  | 'user.account_unlinked'
  | 'user.deleted'
  | 'session.created'
  | 'session.revoked'

// ============ Rate Limiting ============

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
}
