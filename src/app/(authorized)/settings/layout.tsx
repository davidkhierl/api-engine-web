import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { SettingsSidebar } from '@/app/(authorized)/settings/_components/sidebar'
import * as React from 'react'

export default function SettingsLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Settings" />
      <div className="container flex max-w-screen-2xl gap-6 py-12">
        <SettingsSidebar />
        <MainContent className="flex-1 py-0" container={false}>
          {children}
        </MainContent>
      </div>
    </>
  )
}
