'use client'

import { KeychainForm } from '@/components/forms/keychain-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils/class-name'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function CreateKeychainDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" icon={<Plus className={cn('h-4 w-4', className)} />}>
          Create New Keychain
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new keychain</DialogTitle>
        </DialogHeader>
        <KeychainForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
