import { ApiInitConfig, api } from '@/lib/api-engine/api'
import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { AuthLogin, AuthResponse, RegisterUserInputs, User } from '@/lib/api-engine/api.types'
import { getBaseUrl } from '@/lib/utils/get-base-url'

import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

export class ApiEngineService {
  async login(credentials: AuthLogin, config?: ApiInitConfig): Promise<AuthResponse> {
    const res = await api.post<AuthLogin, AuthResponse>(
      ApiEngineEndpoints.LOGIN,
      credentials,
      config
    )
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)

    return data as AuthResponse
  }

  async nextLogin(credentials: AuthLogin, config?: ApiInitConfig): Promise<AuthResponse> {
    const res = await api.post<AuthLogin, AuthResponse>(
      `${getBaseUrl()}/api/auth`,
      credentials,
      config
    )
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)

    return data as AuthResponse
  }

  async logout(config?: ApiInitConfig) {
    const res = await api.post(ApiEngineEndpoints.LOGOUT, config)
    const data = await res.json()
    if (!res.ok) throw new ApiEngineError(data)
  }

  async registerUser(
    registerUserInputs: RegisterUserInputs,
    config?: ApiInitConfig
  ): Promise<User> {
    const res = await api.post(ApiEngineEndpoints.USERS, registerUserInputs, config)
    const data = await res.json()
    if (!res.ok) {
      throw new ApiEngineError(data)
    }

    return data as User
  }

  async getAuthenticatedUser(config?: ApiInitConfig) {
    const res = await api.get(ApiEngineEndpoints.CURRENT_USER, config)
    const data = await res.json()
    if (!res.ok) return

    return data as User
  }

  async nextGetAuthenticatedUser(config?: ApiInitConfig): Promise<User | undefined> {
    const { cookies, headers } = await import('next/headers')
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
    // else if (error instanceof Error) {
    //   console.error(error.message)
    //   setError('root.serverError', {
    //     type: 'manual',
    //     message: 'Something went wrong',
    //   })
    // }
  }
}
