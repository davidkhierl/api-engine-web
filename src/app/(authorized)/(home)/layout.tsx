import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import * as React from 'react'

export default function HomeLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Home" />
      <MainContent>{children}</MainContent>
    </>
  )
}
