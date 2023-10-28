import { AuthorizedRoute } from '@/components/auth/authorized-route'
import * as React from 'react'

export default function AuthorizedLayout({ children }: { children?: React.ReactNode }) {
  return <AuthorizedRoute>{children}</AuthorizedRoute>
}
