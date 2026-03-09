import { apiClient } from '@/lib/api/client'
import { AUTH_ENDPOINTS, OAuthProvider } from '@/lib/api/endpoints'
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  AuthResponse,
  VerifyEmailOTPRequest,
  ResendOTPRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  TwoFASetupResponse,
  Enable2FARequest,
  TwoFAEnableResponse,
  Disable2FARequest,
  Verify2FARequest,
  Recovery2FARequest,
  TwoFAStatusResponse,
  MagicLinkRequest,
  MagicLinkVerifyRequest,
  OAuthProviderResponse,
  OAuthConnectResponse,
  OAuthCallbackRequest,
  OAuthConnection,
  SessionsResponse,
  User,
  ApiResponse,
} from '@/types/auth'

// ============ Core Auth ============

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data)
  return response.data
}

export async function verifyEmailOTP(
  data: VerifyEmailOTPRequest
): Promise<AuthResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL_OTP, data)
  return response.data
}

export async function resendOTP(
  data: ResendOTPRequest
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post(AUTH_ENDPOINTS.RESEND_OTP, data)
  return response.data
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, data)
  return response.data
}

export async function refreshToken(token: string): Promise<AuthResponse> {
  const response = await apiClient.post(
    AUTH_ENDPOINTS.REFRESH,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export async function logout(): Promise<void> {
  await apiClient.post(AUTH_ENDPOINTS.LOGOUT)
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get(AUTH_ENDPOINTS.ME)
  console.log('[AuthService] /auth/me raw response:', response.data)
  const user = response.data?.data?.user || response.data?.user || response.data?.data || response.data
  console.log('[AuthService] Extracted user:', user)
  return user
}

// ============ Password Management ============

export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data)
  return response.data
}

export async function resetPassword(
  data: ResetPasswordRequest
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, data)
  return response.data
}

export async function changePassword(
  data: ChangePasswordRequest
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data)
  return response.data
}

// ============ 2FA/TOTP ============

export async function setup2FA(): Promise<TwoFASetupResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.TWO_FA_SETUP)
  return response.data
}

export async function enable2FA(
  data: Enable2FARequest
): Promise<TwoFAEnableResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.TWO_FA_ENABLE, data)
  return response.data
}

export async function disable2FA(
  data: Disable2FARequest
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post(AUTH_ENDPOINTS.TWO_FA_DISABLE, data)
  return response.data
}

export async function verify2FA(data: Verify2FARequest): Promise<AuthResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.TWO_FA_VERIFY, data)
  return response.data
}

export async function recovery2FA(
  data: Recovery2FARequest
): Promise<AuthResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.TWO_FA_RECOVERY, data)
  return response.data
}

export async function get2FAStatus(): Promise<TwoFAStatusResponse> {
  const response = await apiClient.get(AUTH_ENDPOINTS.TWO_FA_STATUS)
  return response.data
}

export async function regenerateRecoveryCodes(): Promise<TwoFAEnableResponse> {
  const response = await apiClient.get(AUTH_ENDPOINTS.TWO_FA_RECOVERY_CODES)
  return response.data
}

// ============ Magic Links ============

export async function requestMagicLink(
  data: MagicLinkRequest
): Promise<ApiResponse<{ message: string; expiresIn?: string }>> {
  const response = await apiClient.post(AUTH_ENDPOINTS.MAGIC_LINK_REQUEST, data)
  return response.data
}

export async function verifyMagicLink(
  data: MagicLinkVerifyRequest
): Promise<AuthResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.MAGIC_LINK_VERIFY, data)
  return response.data
}

// ============ OAuth2/OIDC ============

export async function getOAuthProviders(): Promise<OAuthProviderResponse> {
  const response = await apiClient.get(AUTH_ENDPOINTS.OAUTH_PROVIDERS)
  return response.data
}

export async function getOAuthConnectUrl(
  provider: OAuthProvider
): Promise<OAuthConnectResponse> {
  const endpoints: Record<OAuthProvider, string> = {
    google: AUTH_ENDPOINTS.OAUTH_GOOGLE_CONNECT,
    github: AUTH_ENDPOINTS.OAUTH_GITHUB_CONNECT,
    keycloak: AUTH_ENDPOINTS.OAUTH_KEYCLOAK_CONNECT,
  }
  const response = await apiClient.get(endpoints[provider])
  return response.data
}

export async function handleOAuthCallback(
  provider: OAuthProvider,
  data: OAuthCallbackRequest
): Promise<AuthResponse> {
  const endpoints: Record<OAuthProvider, string> = {
    google: AUTH_ENDPOINTS.OAUTH_GOOGLE_CALLBACK,
    github: AUTH_ENDPOINTS.OAUTH_GITHUB_CALLBACK,
    keycloak: AUTH_ENDPOINTS.OAUTH_KEYCLOAK_CALLBACK,
  }
  const response = await apiClient.post(endpoints[provider], data)
  return response.data
}

export async function getOAuthConnections(): Promise<
  ApiResponse<OAuthConnection[]>
> {
  const response = await apiClient.get(AUTH_ENDPOINTS.OAUTH_CONNECTIONS)
  return response.data
}

export async function disconnectOAuth(
  provider: string
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.delete(
    AUTH_ENDPOINTS.OAUTH_DISCONNECT(provider)
  )
  return response.data
}

// ============ Session Management ============

export async function getSessions(): Promise<SessionsResponse> {
  const response = await apiClient.get(AUTH_ENDPOINTS.SESSIONS_LIST)
  return response.data
}

export async function revokeSession(
  sessionId: string
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.delete(
    AUTH_ENDPOINTS.SESSION_REVOKE(sessionId)
  )
  return response.data
}

export async function revokeAllSessions(): Promise<
  ApiResponse<{ message: string }>
> {
  const response = await apiClient.delete(AUTH_ENDPOINTS.SESSIONS_REVOKE_ALL)
  return response.data
}
