'use client' // RootError components must be Client Components

import { ErrorDisplay } from '@/components/ui/error-display'

export default function KeychainError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorDisplay error={error} errorRoot="Key" reset={reset} />
}
