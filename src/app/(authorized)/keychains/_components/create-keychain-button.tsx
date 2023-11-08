'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function CreateKeychainButton({ className }: { className?: string }) {
  const pathname = usePathname()
  const isNotInCreateKeychainPage = pathname !== '/keychains/new'
  const href = isNotInCreateKeychainPage ? '/keychains/new' : '/keychains'

  return (
    <Button asChild icon={<Plus className="h-4 w-4" />}>
      <Link href={href}>{isNotInCreateKeychainPage ? 'New' : 'Cancel'}</Link>
    </Button>
  )
}
