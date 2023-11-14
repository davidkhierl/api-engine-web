import { CreateKeychainDialog } from '@/app/(authorized)/keychains/_components/create-keychain-dialog'
import * as React from 'react'

export default function KeychainsLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 pb-6">
        <h1 className="text-2xl font-medium leading-[40px]">Manage Keychains</h1>

        <CreateKeychainDialog />
      </div>
      {children}
    </>
  )
}
