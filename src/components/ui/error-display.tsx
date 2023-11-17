'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Frown, RotateCcw } from 'lucide-react'
import * as React from 'react'

export interface ErrorDisplayProps {
  error: Error & { digest?: string }
  errorRoot: string
  reset: () => void
}

function ErrorDisplay({ error, reset, errorRoot }: ErrorDisplayProps) {
  React.useEffect(() => {
    console.log(`${errorRoot}:`, error)
  }, [error, errorRoot])

  return (
    <Alert className="[&>svg~*]:pl-10" variant="destructive">
      <Frown />
      <AlertTitle>Something Went Wrong</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <div className="mt-4">
        <Button
          variant="secondary"
          icon={<RotateCcw className="h-4 w-4" />}
          onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </Alert>
  )
}

export { ErrorDisplay }
