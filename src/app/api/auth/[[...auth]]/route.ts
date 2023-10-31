import { ApiEngineEndpoints } from '@/lib/api-engine/api-engine-endpoints'
import { AuthResponse } from '@/lib/api-engine/api.types'
import { camelCase } from 'lodash-es'
import { cookies } from 'next/headers'
import * as z from 'zod'

const formDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'You must enter your password' }),
})

export async function POST(request: Request) {
  const formData = await request.formData()
  console.log(request.headers.get('x-wit'))
  const email = formData.get('email')
  const password = formData.get('password')

  const credentials = await formDataSchema.safeParseAsync({ email, password })

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

  const res = await fetch(ApiEngineEndpoints.LOGIN, {
    method: 'post',
    credentials: 'include',
    body: new URLSearchParams(credentials.data),
  })

  if (res.ok) {
    const tokens = (await res.json()) as AuthResponse

    cookies().set('access_token', tokens.access_token, { httpOnly: true })
    cookies().set('at_expiry', tokens.at_expiry.toString(), { httpOnly: true })

    return Response.json(tokens, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    })
  }

  return res
}

export async function GET(request: Request) {
  return await fetch(ApiEngineEndpoints.CURRENT_USER, {
    credentials: 'include',
  })
}
