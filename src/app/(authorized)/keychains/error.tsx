'use client' // RootError components must be Client Components

import { Button } from '@/components/ui/button'
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
