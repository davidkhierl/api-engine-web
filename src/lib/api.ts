export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiFetchConfig<T extends {}> {
  path: string
  data?: T
  init?: Omit<RequestInit, 'body'>
}

async function apiFetch<T extends {}, D = unknown>({
  path,
  init = {},
  data,
}: ApiFetchConfig<T>): Promise<Response> {
  const { method, headers, ...rest } = init

  return await fetch(`http://localhost:4000${path}`, {
    method: method ?? 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    credentials: 'include',
    body: new URLSearchParams(data),
    ...rest,
  })
}
type ApiFetchOperation = <T extends {}, D = unknown>(
  path: string,
  data?: T,
  config?: Omit<RequestInit, 'method' | 'body'>
) => Promise<Response>

interface ApiOperations {
  get: ApiFetchOperation
  post: ApiFetchOperation
  put: ApiFetchOperation
  patch: ApiFetchOperation
  delete: ApiFetchOperation
}

export const api: ApiOperations = {
  get: (path, data, config) => apiFetch({ path, data, init: { method: 'GET', ...config } }),
  post: (path, data, config) => apiFetch({ path, data, init: { method: 'POST', ...config } }),
  put: (path, data, config) => apiFetch({ path, data, init: { method: 'PUT', ...config } }),
  patch: (path, data, config) => apiFetch({ path, data, init: { method: 'PATCH', ...config } }),
  delete: (path, data, config) => apiFetch({ path, data, init: { method: 'DELETE', ...config } }),
}
