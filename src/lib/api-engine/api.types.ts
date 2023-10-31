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

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string
  displayName?: string
  email: string
  role: Role
  created_at: Date
  updated_at: Date
}

export interface RegisterUserInputs {
  email: string
  password: string
}
