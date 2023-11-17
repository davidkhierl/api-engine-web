'use client'

import { ErrorDisplay } from '@/components/ui/error-display'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorDisplay error={error} errorRoot="Root" reset={reset} />
}
