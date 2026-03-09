export const AUTH_ENDPOINTS = {
  // Core Auth
  REGISTER: '/auth/register',
  VERIFY_EMAIL_OTP: '/auth/verify-email-otp',
  RESEND_OTP: '/auth/resend-otp',
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',

  // Password Management
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',

  // 2FA/TOTP
  TWO_FA_SETUP: '/auth/2fa/setup',
  TWO_FA_ENABLE: '/auth/2fa/enable',
  TWO_FA_DISABLE: '/auth/2fa/disable',
  TWO_FA_VERIFY: '/auth/2fa/verify',
  TWO_FA_RECOVERY: '/auth/2fa/recovery',
  TWO_FA_STATUS: '/auth/2fa/status',
  TWO_FA_RECOVERY_CODES: '/auth/2fa/recovery-codes',

  // Magic Links
  MAGIC_LINK_REQUEST: '/auth/magic-link/request',
  MAGIC_LINK_VERIFY: '/auth/magic-link/verify',

  // OAuth2/OIDC
  OAUTH_PROVIDERS: '/auth/oauth/providers',
  OAUTH_GOOGLE_CONNECT: '/auth/oauth/google/connect',
  OAUTH_GOOGLE_CALLBACK: '/auth/oauth/google/callback',
  OAUTH_GITHUB_CONNECT: '/auth/oauth/github/connect',
  OAUTH_GITHUB_CALLBACK: '/auth/oauth/github/callback',
  OAUTH_KEYCLOAK_CONNECT: '/auth/oauth/keycloak/connect',
  OAUTH_KEYCLOAK_CALLBACK: '/auth/oauth/keycloak/callback',
  OAUTH_CONNECTIONS: '/auth/oauth/connections',
  OAUTH_DISCONNECT: (provider: string) => `/auth/oauth/${provider}/disconnect`,

  // Session Management
  SESSIONS_LIST: '/auth/sessions',
  SESSION_REVOKE: (id: string) => `/auth/sessions/${id}`,
  SESSIONS_REVOKE_ALL: '/auth/sessions',
} as const

export type OAuthProvider = 'google' | 'github' | 'keycloak'

export const WORKSPACE_ENDPOINTS = {
  // Workspace CRUD
  CREATE: '/workspace/create',
  LIST: '/workspace/list',
  GET: (id: string) => `/workspace/${id}`,
  UPDATE: (id: string) => `/workspace/${id}`,
  DELETE: (id: string) => `/workspace/${id}`,

  // Workspace Actions
  SWITCH: (id: string) => `/workspace/switch/${id}`,

  // Members Management
  INVITE: (id: string) => `/workspace/${id}/invite`,
  REMOVE_MEMBER: (workspaceId: string, userId: string) =>
    `/workspace/${workspaceId}/member/${userId}`,
} as const
