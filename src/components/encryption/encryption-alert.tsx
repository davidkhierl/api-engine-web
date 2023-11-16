import { Alert, AlertDescription, AlertTitle, AlertVariant } from '@/components/ui/alert'
import { getEncryption } from '@/lib/api/get-encryption'
import { Info } from 'lucide-react'
import * as React from 'react'

export interface EncryptionAlertProps {
  children?: React.ReactNode
  className?: string
  title?: string
  description?: string
  variant?: AlertVariant['variant']
  icon?: React.ReactNode
}

async function EncryptionAlert({
  children,
  className,
  icon,
  title = 'Setup encryption key',
  description = 'Before you can create a key you must first create an encryption key',
  variant = 'warning',
}: EncryptionAlertProps) {
  try {
    await getEncryption()
    return null
  } catch {
    return (
      <Alert className={className} variant={variant}>
        {icon ?? <Info className="h-4 w-4" />}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {children}
      </Alert>
    )
  }
}

export { EncryptionAlert }
