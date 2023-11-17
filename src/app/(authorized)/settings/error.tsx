'use client'

import { ErrorDisplay } from '@/components/ui/error-display'

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorDisplay error={error} errorRoot="Settings" reset={reset} />
}
