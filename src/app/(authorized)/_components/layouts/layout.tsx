import { Header } from '@/app/(authorized)/_components/layouts/header'
import * as React from 'react'

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-screen-xl flex-1 p-4">{children}</main>
    </>
  )
}
