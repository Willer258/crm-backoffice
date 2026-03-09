import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { AUTH_ENDPOINTS } from './endpoints'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://crm-api.test'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

// Redirect to login page (client-side only)
const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    // Store current URL for redirect after login
    const currentPath = window.location.pathname + window.location.search
    if (currentPath !== '/login' && currentPath !== '/register') {
      sessionStorage.setItem('redirectAfterLogin', currentPath)
    }
    window.location.href = '/login'
  }
}

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Import dynamically to avoid circular dependencies
    const { useAuthStore } = require('@/stores/auth.store')
    const state = useAuthStore.getState()
    const { accessToken, currentWorkspaceId, _hasHydrated } = state

    console.log('[API Client] Request to:', config.url)
    console.log('[API Client] Store state - Hydrated:', _hasHydrated, 'Token:', accessToken ? accessToken.substring(0, 20) + '...' : 'null')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      console.warn('[API Client] No access token available for request:', config.url)
    }

    if (currentWorkspaceId) {
      config.headers['X-Workspace-Id'] = currentWorkspaceId
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - Handle token refresh and auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Don't retry auth endpoints
    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/refresh')

    // Handle 403 - Forbidden (access denied, account disabled, etc.)
    if (error.response?.status === 403) {
      console.error('[API Client] 403 Forbidden - Logging out and redirecting')
      const { useAuthStore } = require('@/stores/auth.store')
      useAuthStore.getState().logout()
      redirectToLogin()
      return Promise.reject(error)
    }

    // Handle 401 - Token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { useAuthStore } = require('@/stores/auth.store')
        const { refreshToken, setTokens, logout } = useAuthStore.getState()

        if (!refreshToken) {
          console.error('[API Client] No refresh token - Logging out and redirecting')
          logout()
          processQueue(new Error('No refresh token'), null)
          redirectToLogin()
          return Promise.reject(error)
        }

        // Attempt token refresh
        const response = await axios.post(
          `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )

        const newAccessToken = response.data?.data?.token || response.data?.token
        const newRefreshToken =
          response.data?.data?.refreshToken || response.data?.refreshToken

        if (newAccessToken) {
          setTokens(newAccessToken, newRefreshToken || refreshToken)
          processQueue(null, newAccessToken)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return apiClient(originalRequest)
        } else {
          throw new Error('No token in refresh response')
        }
      } catch (refreshError) {
        console.error('[API Client] Token refresh failed - Logging out and redirecting')
        const { useAuthStore } = require('@/stores/auth.store')
        useAuthStore.getState().logout()
        processQueue(refreshError as Error, null)
        redirectToLogin()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Handle 401 on auth endpoints (invalid credentials, etc.) - don't redirect
    if (error.response?.status === 401 && isAuthEndpoint) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

// Server-side client factory (for SSR/API routes)
export const createServerClient = (
  accessToken?: string,
  workspaceId?: string
) => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(workspaceId && { 'X-Workspace-Id': workspaceId }),
    },
  })

  return client
}

export { API_BASE_URL }
