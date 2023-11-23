'use client'

import { CreateKeyForm } from '@/components/forms/create-key-form'
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
import * as React from 'react'

export interface CreateKeyDialogProps {
  className?: string
  keychainId: string
}

function CreateKeyDialog({ className, keychainId }: CreateKeyDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" icon={<Plus className={cn('h-4 w-4', className)} />}>
          Create New Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Key</DialogTitle>
        </DialogHeader>
        <CreateKeyForm keychainId={keychainId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export { CreateKeyDialog }
