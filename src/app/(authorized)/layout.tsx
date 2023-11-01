import { Layout } from '@/components/layouts/layout'
import * as React from 'react'

export default function AuthorizedLayout({ children }: { children?: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
