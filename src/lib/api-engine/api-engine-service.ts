import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import {
  AuthLogin,
  AuthRefreshResponse,
  AuthResponse,
  CreateKeychainInputs,
  Keychain,
  RegisterUserInputs,
  User,
} from '@/lib/api-engine/api.types'
import { getBaseUrl } from '@/lib/utils/get-base-url'

import { isAccessTokenExpired } from '@/lib/utils/is-access-token-expired'
import { redirect } from 'next/navigation'
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

export class ApiEngineService {
  /**
   * Login user using next route handler
   */
  async login(credentials: AuthLogin): Promise<AuthResponse> {
    const res = await fetch(`${getBaseUrl()}/api/auth/login`, {
      method: 'post',
      body: new URLSearchParams({ ...credentials }),
      credentials: 'include',
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
    void (await fetch(`${getBaseUrl()}/api/auth/logout`, {
      method: 'post',
      credentials: 'include',
      cache: 'no-cache',
    }))
  }

  /**
   * Register new user using next route handler
   */
  async registerUser(registerUserInputs: RegisterUserInputs): Promise<AuthResponse> {
    const res = await fetch(`${getBaseUrl()}/api/auth/register`, {
      method: 'post',
      body: new URLSearchParams({ ...registerUserInputs }),
      credentials: 'include',
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
    return this._fetchHandler(async (headers) => {
      const res = await fetch(ApiEngineEndpoints.CURRENT_USER, {
        method: 'get',
        headers,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return
      return data as User
    })
  }

  /**
   * Create a keychain
   * @param createKeychainInputs
   */
  async createKeychain(createKeychainInputs: CreateKeychainInputs) {
    return await this._fetchHandler(async (headers) => {
      const res = await fetch(ApiEngineEndpoints.KEYCHAINS, {
        method: 'post',
        headers,
        credentials: 'include',
        body: new URLSearchParams(createKeychainInputs),
      })

      const data = await res.json()
      if (!res.ok) throw new ApiEngineError(data)

      return data as Keychain
    })
  }

  /**
   * Get all keychains
   */
  async getAllKeychains() {
    return await this._fetchHandler(async (headers) => {
      const res = await fetch(ApiEngineEndpoints.KEYCHAINS, {
        method: 'get',
        headers,
        credentials: 'include',
        next: {
          tags: ['keychains'],
        },
      })

      if (!res.ok) return

      const data = await res.json()
      return data as Keychain[]
    })
  }

  /**
   * Get keychain
   */
  async getKeychain(id: string) {
    return await this._fetchHandler(async (headers) => {
      const res = await fetch(`${ApiEngineEndpoints.KEYCHAINS}/${id}`, {
        method: 'get',
        headers,
        credentials: 'include',
      })

      if (!res.ok) return

      const data = await res.json()
      return data as Keychain
    })
  }

  /**
   * Internal fetch handler, provides a header with authorization and access token, it also
   * performs refresh token if the access token is expired and returns a new refreshed access token.
   * @private
   */
  private async _fetchHandler<T>(
    fetcher: (
      headers: Headers,
      auth: { access_token: string; at_expiry?: string | null }
    ) => Promise<T>
  ) {
    // create new header
    const headers = new Headers()
    let access_token: string | null | undefined
    let at_expiry: string | null | undefined

    /**
     * apply the cookie from request cookie in server to the new header and set the access token
     * from the request cookie or from localstorage in client side
     */
    if (this.isServer()) {
      const { headers: nextHeaders } = await import('next/headers')
      const cookie = nextHeaders().get('cookie')
      if (cookie) headers.append('cookie', cookie)

      const { cookies } = await import('next/headers')
      access_token = cookies().get('access_token')?.value
      at_expiry = cookies().get('at_expiry')?.value
    } else {
      access_token = localStorage.getItem('access_token')
      at_expiry = localStorage.getItem('at_expiry')
    }

    /**
     * safeguard redirect to login page if there is no access token found
     * although this is already being handled in middleware.ts
     */
    if (!access_token) redirect('/login')

    // set the authorization header
    headers.append('Authorization', `Bearer ${access_token}`)

    if (at_expiry && isAccessTokenExpired(at_expiry)) {
      const res = await fetch(`${getBaseUrl()}/api/auth/refresh`, {
        credentials: 'include',
        cache: 'no-cache',
      })

      if (!res.ok) redirect('/login')

      if (res.ok) {
        const auth = (await res.json()) as AuthRefreshResponse
        // set the authorization header with the new access token
        headers.set('Authorization', `Bearer ${auth.access_token}`)

        // update the values in localstorage
        if (!this.isServer()) {
          localStorage.setItem('access_token', auth.access_token)
          localStorage.setItem('at_expiry', auth.at_expiry.toString())
        }

        return fetcher(headers, {
          access_token: auth.access_token,
          at_expiry: auth.at_expiry.toString(),
        })
      }
    }

    return fetcher(headers, { access_token, at_expiry })
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
  }

  private isServer() {
    return typeof window === 'undefined'
  }
}
