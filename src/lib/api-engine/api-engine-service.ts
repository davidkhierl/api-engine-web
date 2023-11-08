import { ApiInitConfig, api } from '@/lib/api-engine/api'
import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import {
  AuthLogin,
  AuthRefreshResponse,
  AuthResponse,
  Keychain,
  RegisterUserInputs,
  User,
} from '@/lib/api-engine/api.types'
import { getBaseUrl } from '@/lib/utils/get-base-url'

import { isAccessTokenExpired } from '@/lib/utils/is-access-token-expired'
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

export class ApiEngineService {
  /**
   * Login user using next route handler
   */
  async login(credentials: AuthLogin, config?: ApiInitConfig): Promise<AuthResponse> {
    const res = await api.post<AuthLogin>(`${getBaseUrl()}/api/auth/login`, credentials, {
      ...config,
      cache: 'no-cache',
    })
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)
    return data as AuthResponse
  }

  /**
   * Logout user using next route handler
   */
  async logout() {
    const res = await api.post(`${getBaseUrl()}/api/auth/logout`, undefined, { cache: 'no-cache' })

    if (!res.ok) {
      const data = await res.json()
      console.error(data)
    }
  }

  /**
   * Register new user
   */
  async registerUser(
    registerUserInputs: RegisterUserInputs,
    config?: ApiInitConfig
  ): Promise<AuthResponse> {
    const res = await api.post(`${getBaseUrl()}/api/auth/register`, registerUserInputs, {
      ...config,
      cache: 'no-cache',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new ApiEngineError(data)
    }

    return data as AuthResponse
  }

  /**
   * Get authenticated user
   */
  async getAuthenticatedUser() {
    // const res = await api.get(ApiEngineEndpoints.CURRENT_USER, config)
    // if (!res.ok) return
    // const data = await res.json()
    // return data as User
    return await this._fetchHandler(async ({ access_token }) => {
      const res = await api.get(ApiEngineEndpoints.CURRENT_USER)
      const data = await res.json()
      if (!res.ok) throw new ApiEngineError(data)
      return data as User
    })
  }

  /**
   * Get authenticated user server side
   */
  async getAuthenticatedUserServerSide(): Promise<User | undefined> {
    const { cookies } = await import('next/headers')
    const accessToken = cookies().get('access_token')

    if (!accessToken?.value) return

    const res = await api.get(ApiEngineEndpoints.CURRENT_USER, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        Cookie: cookies().toString(),
      },
    })

    if (!res.ok) return

    const data = await res.json()
    return data as User
  }

  async getAllKeychains() {
    return await this._fetchHandler(async ({ access_token }) => {
      const res = await api.get(ApiEngineEndpoints.KEYCHAINS, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const data = await res.json()
      if (!res.ok) {
        throw new ApiEngineError(data)
      }

      return data as Keychain[]
    })
  }

  /**
   * Internal fetch handler, provides the access token to be used in the authorization header, it also
   * performs refresh token if the access token is expired and returns a new refreshed access token.
   * @private
   */
  private async _fetchHandler<T>(
    fetcher: (auth: { access_token: string; at_expiry?: string | null }) => Promise<T>
  ) {
    const isServer = typeof window === 'undefined'

    let access_token: string | null | undefined = null
    let at_expiry: string | null | undefined = null

    if (isServer) {
      const { cookies } = await import('next/headers')
      access_token = cookies().get('access_token')?.value
      at_expiry = cookies().get('at_expiry')?.value
    } else {
      access_token = localStorage.getItem('access_token')
      at_expiry = localStorage.getItem('at_expiry')
    }

    if (!access_token) throw new ApiEngineError({ message: 'Unauthorized', statusCode: 401 })

    if (at_expiry) {
      if (isAccessTokenExpired(at_expiry)) {
        const res = await api.get(`${getBaseUrl()}/api/auth/refresh`, { cache: 'no-cache' })
        if (res.ok) {
          const auth = (await res.json()) as AuthRefreshResponse
          if (!isServer) {
            localStorage.setItem('access_token', auth.access_token)
            localStorage.setItem('at_expiry', auth.at_expiry.toString())
          }
          access_token = auth.access_token
          at_expiry = auth.at_expiry.toString()
          return fetcher({ access_token: auth.access_token, at_expiry: auth.at_expiry.toString() })
        }
      }
    }

    return fetcher({ access_token, at_expiry })
  }

  /**
   * Helper method to set React-Hook-Form errors
   * mapped from Api Engine response error
   * @param setError
   * @param error
   */
  setFormErrors<TFieldValues extends FieldValues = FieldValues>(
    setError: UseFormSetError<TFieldValues>,
    error: unknown
  ) {
    if (error instanceof ApiEngineError) {
      if (error.errors) {
        error.getConstraints()?.forEach((constraint) => {
          setError(constraint.property as FieldPath<TFieldValues> | `root.${string}` | 'root', {
            type: 'manual',
            message: constraint.message,
          })
        })
      } else {
        setError('root.serverError', {
          type: error.statusCode.toString(),
          message: error.message,
        })
      }
    }
    // if (error instanceof RootError) {
    //   console.error(error.message)
    //   setError('root.serverError', {
    //     type: 'manual',
    //     message: 'Something went wrong',
    //   })
    // }
  }
}
