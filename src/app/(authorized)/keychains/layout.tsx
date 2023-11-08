import * as React from 'react'

export default function KeychainsLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Keychains</h1>
      </div>
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
