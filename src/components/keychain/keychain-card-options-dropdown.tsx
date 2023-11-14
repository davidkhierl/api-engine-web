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
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconButton } from '@/components/ui/icon-button'
import { Keychain } from '@/lib/api-engine/api.types'
import { deleteKeychain } from '@/lib/api/delete-keychain'
import { MoreHorizontalIcon, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface KeychainCardOptionsDropdownProps extends Keychain {
  className?: string
}

export function KeychainCardOptionsDropdown({
  className,
  ...props
}: KeychainCardOptionsDropdownProps) {
  const [deleteAlertDialogOpen, setDeleteAlertDialog] = useState(false)
  const router = useRouter()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton className={className} variant="ghost" label="Keychain options">
            <MoreHorizontalIcon className="h-4 w-4" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-red-500 focus:bg-red-100 focus:text-red-600 dark:text-red-400 dark:focus:text-red-500"
            onSelect={() => {
              setDeleteAlertDialog(true)
            }}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
        <AlertDialog open={deleteAlertDialogOpen} onOpenChange={setDeleteAlertDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete <span>{props.name}</span>?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will also removes all the keys that belongs to
                this keychain.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={async () => {
                  await deleteKeychain(props.id)
                  router.refresh()
                }}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
    </>
  )
}
