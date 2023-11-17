'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/class-name'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function CreateKeychainButton({ className }: { className?: string }) {
  const pathname = usePathname()
  return (
    <Button
      asChild
      className={cn('capitalize', pathname === '/keychains/new' && 'hidden', className)}
      icon={<PlusIcon className="h-4 w-4" />}>
      <Link href="/keychains/new">Create new keychain</Link>
    </Button>
  )
}
