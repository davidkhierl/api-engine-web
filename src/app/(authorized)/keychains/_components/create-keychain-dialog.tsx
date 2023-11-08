import { KeychainForm } from '@/components/forms/keychain-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils/class-name'
import { Plus } from 'lucide-react'

export function CreateKeychainDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" icon={<Plus className={cn('h-4 w-4', className)} />}>
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new keychain</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <KeychainForm buttonClassName="ml-auto" />
      </DialogContent>
    </Dialog>
  )
}
