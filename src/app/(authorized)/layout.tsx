import { Layout } from '@/app/(authorized)/_components/layouts/layout'
import * as React from 'react'

export default async function AuthorizedLayout({ children }: { children?: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
