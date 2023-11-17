import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { AuthResponse } from '@/lib/api-engine/api.types'
import { setAuthCookies } from '@/lib/auth/set-auth-cookies'
import { camelCase } from 'lodash-es'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import * as z from 'zod'

const loginFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'You must enter your password' }),
})

const registerFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

export async function POST(request: NextRequest, { params }: { params: { action: string } }) {
  switch (params.action[0]) {
    case 'login': {
      const formData = await request.formData()
      const email = formData.get('email')
      const password = formData.get('password')
      const credentials = await loginFormDataSchema.safeParseAsync({ email, password })

      if (!credentials.success) {
        const errors = credentials.error.errors.map((issue) => ({
          property: issue.path[0],
          constraints: {
            [`${camelCase(issue.code)}`]: issue.message,
          },
        }))

        return Response.json(
          { statusCode: 400, message: 'Bad User Input', errors },
          {
            status: 400,
          }
        )
      }

      try {
        const res = await fetch(ApiEngineEndpoints.LOGIN, {
          method: 'post',
          credentials: 'include',
          body: new URLSearchParams(credentials.data),
        })

        if (res.ok) {
          const auth = (await res.json()) as AuthResponse

          setAuthCookies(auth.access_token, auth.at_expiry)

          return Response.json(auth, {
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
          })
        }

        return res
      } catch (error) {
        return Response.json(
          { message: 'Failed to connect from server', statusCode: 500, error: 'Server Error' },
          { status: 500 }
        )
      }
    }
    case 'logout': {
      try {
        await fetch(ApiEngineEndpoints.LOGOUT, {
          method: 'post',
          headers: request.headers,
          credentials: 'include',
        })
      } finally {
        cookies().delete('sid')
        cookies().delete('access_token')
        cookies().delete('at_expiry')
      }
      return new Response(null, { status: 204 })
    }
    case 'register': {
      const formData = await request.formData()
      const email = formData.get('email')
      const password = formData.get('password')
      const credentials = await registerFormDataSchema.safeParseAsync({ email, password })

      if (!credentials.success) {
        const errors = credentials.error.errors.map((issue) => ({
          property: issue.path[0],
          constraints: {
            [`${camelCase(issue.code)}`]: issue.message,
          },
        }))

        return Response.json(
          { statusCode: 400, message: 'Bad User Input', errors },
          {
            status: 400,
          }
        )
      }

      try {
        const res = await fetch(ApiEngineEndpoints.USERS, {
          method: 'post',
          credentials: 'include',
          body: new URLSearchParams(credentials.data),
        })

        if (res.ok) {
          const auth = (await res.json()) as AuthResponse
          setAuthCookies(auth.access_token, auth.at_expiry)

          return Response.json(auth, {
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
          })
        }

        return res
      } catch (error) {
        return Response.json(
          { message: 'Failed to connect from server', statusCode: 500, error: 'Server Error' },
          { status: 500 }
        )
      }
    }
    default: {
      return Response.json(
        { message: `Cannot POST to /${params.action}`, error: 'Not Found', statusCode: 404 },
        {
          status: 404,
        }
      )
    }
  }
}

export async function GET(request: NextRequest, { params }: { params: { action: string } }) {
  switch (params.action[0]) {
    case 'user': {
      return await fetch(ApiEngineEndpoints.CURRENT_USER, {
        method: 'get',
        headers: request.headers,
        credentials: 'include',
        next: {
          tags: ['user'],
        },
      })
    }
    case 'refresh': {
      const access_token = request.cookies.get('access_token')?.value
      const at_expiry = request.cookies.get('at_expiry')?.value

      return Response.json({ access_token, at_expiry })
    }
    default: {
      return Response.json(
        { message: `Cannot GET to /${params.action}`, error: 'Not Found', statusCode: 404 },
        {
          status: 404,
        }
      )
    }
  }
}
