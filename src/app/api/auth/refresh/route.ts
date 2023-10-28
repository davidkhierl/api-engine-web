import { cookies } from 'next/headers'

export async function GET(request: Request) {
  cookies().set('token', 'wow')
  return Response.json({ message: 'Hello world' })
}
