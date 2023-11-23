'use client' // RootError components must be Client Components

import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { ErrorDisplay } from '@/components/ui/error-display'

export default function KeychainsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <PageHeader title="Keychains" />
      <MainContent>
        <ErrorDisplay error={error} errorRoot="Keychains" reset={reset} />
      </MainContent>
    </>
  )
}
