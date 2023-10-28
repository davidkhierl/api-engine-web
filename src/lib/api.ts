export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type ApiFetchOperation = (
  path: string,
  config?: Omit<RequestInit, 'method' | 'body'>
) => Promise<Response>

type ApiFetchOperationWithData = <T extends {}, D = any>(
  path: string,
  data?: T,
  config?: Omit<RequestInit, 'method' | 'body'>
) => Promise<Response>

interface ApiOperations {
  get: ApiFetchOperation
  post: ApiFetchOperationWithData
  put: ApiFetchOperationWithData
  patch: ApiFetchOperationWithData
  delete: ApiFetchOperationWithData
}

export type ApiInitConfig = Omit<RequestInit, 'body'>

export interface ApiFetchConfig<T extends {}> {
  path: string
  data?: T
  init?: ApiInitConfig & { method: ApiMethod }
}

async function apiFetch<T extends {}, D = any>({
  path,
  init = { method: 'GET' },
  data,
}: ApiFetchConfig<T>): Promise<Response> {
  const reqHeaders = new Headers(init.headers)
  reqHeaders.set('Content-Type', 'application/x-www-form-urlencoded')

  if (typeof localStorage !== 'undefined' && !reqHeaders.has('Authorization')) {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      reqHeaders.set('Authorization', `Bearer ${accessToken}`)
    }
  }

  init.headers = reqHeaders

  return await fetch(path, {
    credentials: 'include',
    body: init?.method !== 'GET' ? new URLSearchParams(data) : undefined,
    ...init,
  })
}

const api: ApiOperations = {
  get: (path, config) => apiFetch({ path, init: { method: 'GET', ...config } }),
  post: (path, data, config) => apiFetch({ path, data, init: { method: 'POST', ...config } }),
  put: (path, data, config) => apiFetch({ path, data, init: { method: 'PUT', ...config } }),
  patch: (path, data, config) => apiFetch({ path, data, init: { method: 'PATCH', ...config } }),
  delete: (path, data, config) => apiFetch({ path, data, init: { method: 'DELETE', ...config } }),
}

export { api }
