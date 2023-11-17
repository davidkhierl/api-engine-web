'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button, ButtonProps } from '@/components/ui/button'
import { Form, FormServerErrorMessage } from '@/components/ui/form'
import { createEncryption } from '@/lib/api/create-encryption'
import { assertIsNode } from '@/lib/utils/assert-is-node'
import { createTextFile } from '@/lib/utils/create-text-file'
import { setFormErrors } from '@/lib/utils/set-form-errors'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'

const CreateEncryptionTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [encryptionPreviewOpen, setEncryptionPreviewOpen] = React.useState(false)
  const [encryptionKey, setEncryptionKey] = React.useState<string>()
  const [copiedToClipboard, setCopiedToClipboard] = React.useState(false)

  const router = useRouter()

  const form = useForm()

  async function onSubmit() {
    try {
      const encryption = await createEncryption()
      if (encryption.long) setEncryptionKey(encryption.long)
      setEncryptionPreviewOpen(true)
    } catch (error) {
      setFormErrors(form.setError, error)
    }
  }

  /**
   * Highlight the key and copy to clipboard
   */
  const handleCodeOnClick: React.MouseEventHandler<HTMLElement> = (event) => {
    assertIsNode(event.target)
    const range = document.createRange()
    range.selectNodeContents(event.target)
    const sel = window.getSelection()!
    sel.removeAllRanges()
    sel.addRange(range)
    if (encryptionKey)
      void navigator?.clipboard
        ?.writeText(encryptionKey)
        .then(() => setCopiedToClipboard(true))
        .catch((error) => {
          if (error instanceof Error) console.log(error)
          setCopiedToClipboard(false)
        })
  }

  /**
   * Alert on browser refresh/exit if the modal is still open
   */
  React.useEffect(() => {
    if (!encryptionPreviewOpen) return
    function alertUser(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [encryptionPreviewOpen])

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormServerErrorMessage />
          <Button ref={ref} type="submit" isLoading={form.formState.isSubmitting} {...props} />
        </form>
      </Form>
      <AlertDialog
        open={encryptionPreviewOpen}
        onOpenChange={(open) => {
          setEncryptionPreviewOpen(open)
          setCopiedToClipboard(false)
        }}>
        <AlertDialogContent className="gap-8" onEscapeKeyDown={(event) => event.preventDefault()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Encryption Created</AlertDialogTitle>
            <AlertDialogDescription>
              You can only view this once! Please make sure to store this key safely.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-0.5 rounded-md border border-slate-200 p-4 dark:border-slate-800">
            <code
              className="relative rounded bg-slate-200 px-[0.3rem] py-[0.2rem] font-mono font-semibold dark:bg-slate-800"
              onClick={handleCodeOnClick}>
              {encryptionKey}
            </code>
            {copiedToClipboard && (
              <p className="text-xs text-green-500 duration-300 animate-in fade-in">
                <Check className="mr-1 inline-block h-3 w-3" />
                Copied to clipboard!
              </p>
            )}
          </div>
          <AlertDialogFooter className="sm:justify-between">
            <Button variant="secondary" asChild>
              <a
                download="api_engine_encryption_key.txt"
                target="_blank"
                rel="noreferrer"
                href={
                  encryptionKey ? URL.createObjectURL(createTextFile(encryptionKey)) : undefined
                }>
                Download
              </a>
            </Button>
            <AlertDialogAction onClick={() => router.refresh()}>
              Confirm Key Stored Safely
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})

CreateEncryptionTrigger.displayName = 'CreateEncryptionTrigger'

export { CreateEncryptionTrigger }
