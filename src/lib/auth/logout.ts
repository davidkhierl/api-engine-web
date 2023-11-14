import { getBaseUrl } from '@/lib/utils/get-base-url'

export async function logout() {
  void (await fetch(`${getBaseUrl()}/api/auth/logout`, {
    method: 'post',
    credentials: 'include',
    cache: 'no-cache',
  }))
}
