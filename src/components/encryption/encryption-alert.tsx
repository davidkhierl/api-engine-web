import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { getEncryption } from '@/lib/api/get-encryption'
import { Info } from 'lucide-react'
import Link from 'next/link'

async function EncryptionAlert({ className }: { className?: string }) {
  try {
    await getEncryption()
    return null
  } catch {
    return (
      <Alert className={className} variant="warning">
        <Info className="h-4 w-4" />
        <AlertTitle>Setup encryption key</AlertTitle>
        <AlertDescription>
          Before you can create a key you must first create an encryption key
        </AlertDescription>
        <div className="mt-2">
          <Button size="sm" variant="warning" asChild>
            <Link href="/settings/encryption">Setup Encryption</Link>
          </Button>
        </div>
      </Alert>
    )
  }
}

export { EncryptionAlert }
