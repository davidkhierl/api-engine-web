import { Header } from '@/app/(authorized)/_components/layouts/header'
import * as React from 'react'

export default async function AuthorizedGroupLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-screen-2xl flex-1 p-6">{children}</main>
    </>
  )
}
