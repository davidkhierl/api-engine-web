import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import * as React from 'react'

export default function SettingsLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Settings" />
      <MainContent>{children}</MainContent>
    </>
  )
}
