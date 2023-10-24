'use server'

import { api } from '@/lib/api'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
  const auth = cookies().get('authorization')?.value
  console.log(auth)
  return await api.post('/auth/login', formData)
}
