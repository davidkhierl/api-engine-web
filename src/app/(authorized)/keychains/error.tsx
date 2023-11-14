'use client' // RootError components must be Client Components

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function KeychainsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error)
  }, [error])

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Keychains</h1>
        <Button asChild className="capitalize" icon={<PlusIcon className="h-4 w-4" />}>
          <Link href="/keychains/new">Create new keychain</Link>
        </Button>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md border border-red-500 bg-red-50 p-6 dark:bg-red-950/50">
        <h2>Something went wrong!</h2>
        <p className="font-bold text-red-500">{error.message}</p>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }>
          Try again
        </Button>
      </div>
    </section>
  )
}
