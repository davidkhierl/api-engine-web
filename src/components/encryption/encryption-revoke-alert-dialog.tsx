'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, ButtonProps } from '@/components/ui/button'
import { deleteEncryption } from '@/lib/api/delete-encryption'
import { useRouter } from 'next/navigation'
import * as React from 'react'

const EncryptionRevokeAlertDialog = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const [isRevoking, setIsRevoking] = React.useState(false)
    const router = useRouter()

    const handleOnConfirm: React.MouseEventHandler<HTMLButtonElement> = async () => {
      try {
        setIsRevoking(true)
        await deleteEncryption()
        router.refresh()
      } catch (error) {
        if (error instanceof Error) console.log(error)
      } finally {
        setIsRevoking(false)
      }
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={ref} variant="destructive" {...props}>
            Revoke
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Encryption</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Revoking will make all your keys that were encrypted by
              this encryption invalid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" asChild>
              <Button onClick={handleOnConfirm} isLoading={isRevoking}>
                Confirm
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)
EncryptionRevokeAlertDialog.displayName = 'EncryptionRevokeAlertDialog'

export { EncryptionRevokeAlertDialog }
