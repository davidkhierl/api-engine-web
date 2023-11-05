import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import * as React from 'react'

export default function KeychainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Keychains</h1>
        <Button size="sm" icon={<Plus className="h-4 w-4" />}>
          New
        </Button>
      </div>
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
