'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormServerErrorMessage,
} from '@/components/ui/form'
import { createKeychain } from '@/lib/api/create-keychain'
import { cn } from '@/lib/utils/class-name'
import { setFormErrors } from '@/lib/utils/set-form-errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export interface KeychainFormProps {
  className?: string
  defaultValues?: FormValues
  buttonClassName?: string
  onSuccess?: (formValues: FormValues) => void
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'You must provide a keychain name' }),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function KeychainForm({
  className,
  defaultValues,
  buttonClassName,
  onSuccess,
}: KeychainFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      await createKeychain(values)
      router.refresh()
      if (onSuccess) onSuccess(values)
    } catch (error) {
      setFormErrors(form.setError, error)
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn('space-y-4', className)}
        // action={async (formData) => {
        //   const valid = await form.trigger()
        //   if (!valid) return
        //   return createKeychain(formData)
        // }}
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput placeholder="keychain name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <FormInput placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormServerErrorMessage />
        <Button type="submit" className={buttonClassName} isLoading={form.formState.isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  )
}
