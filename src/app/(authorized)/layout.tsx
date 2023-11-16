import { TopBar } from '@/app/(authorized)/_components/layouts/top-bar'
import * as React from 'react'

export default async function AuthorizedGroupLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <TopBar />
      {children}
    </>
  )
}
