export interface AuthResponse {
  access_token: string
  at_expiry: number
}

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
  name: string
  email: string
  role: Role
  created_at: Date
  updated_at: Date
}

export interface RegisterUserInputs {
  email: string
  password: string
}
