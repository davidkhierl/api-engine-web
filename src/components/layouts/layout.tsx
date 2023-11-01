import { Header } from '@/components/layouts/header'
import { Sidebar } from '@/components/layouts/sidebar'
import * as React from 'react'

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="grid h-full grid-cols-12 gap-x-4 p-4">
      <Sidebar className="col-span-2" />
      <div className="col-span-12 col-start-3 flex flex-col gap-4">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
