export interface AuthResponse {
  user: User
  access_token: string
  at_expiry: number
}

export type AuthRefreshResponse = Omit<AuthResponse, 'user'>

export interface AuthLogin {
  email: string
  password: string
}

export interface RegisterUserInputs {
  email: string
  password: string
}

export interface EntityId {
  id: string
}

export interface TimeStamps {
  created_at: Date
  updated_at: Date
}

export type BaseEntity = EntityId & TimeStamps

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User extends BaseEntity {
  email: string
  displayName?: string
  avatarUrl: string
  role: Role
}

export interface Keychain extends BaseEntity {
  name: string
  description?: string
  user_id: string
}

export type CreateKeychainInputs = Pick<Keychain, 'name' | 'description'>

export interface Encryption extends BaseEntity {
  long?: string
}

export interface Key extends BaseEntity {
  name: string
  description?: string
  api_key: string
  request_count: number
  request_limit: number
  enabled: boolean
  keychain_id: string
}

export type CreateKeyInputs = Pick<Key, 'name' | 'description' | 'api_key' | 'keychain_id'> & {
  long: string
}
