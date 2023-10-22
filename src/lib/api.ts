export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface Api {}

async function apiFetch<T extends {}, D = unknown>(
  path: string,
  method: ApiMethod = 'GET',
  data?: T
): Promise<D> {
  const res = await fetch(`http://localhost:4000${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: new URLSearchParams(data),
  })

  return await res.json()
}

export const api = {
  get: <T extends {}, D = unknown>(path: string, data?: T) => apiFetch<T, D>(path, 'GET', data),
  post: <T extends {}, D = unknown>(path: string, data?: T) => apiFetch<T, D>(path, 'POST', data),
  put: <T extends {}, D = unknown>(path: string, data?: T) => apiFetch<T, D>(path, 'PUT', data),
  patch: <T extends {}, D = unknown>(path: string, data?: T) => apiFetch<T, D>(path, 'PATCH', data),
  delete: <T extends {}, D = unknown>(path: string, data?: T) =>
    apiFetch<T, D>(path, 'DELETE', data),
}
