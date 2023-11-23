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
import { createKey } from '@/lib/api/create-key'
import { cn } from '@/lib/utils/class-name'
import { setFormErrors } from '@/lib/utils/set-form-errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export interface KeyFormProps {
  className?: string
  defaultValues?: FormValues
  buttonClassName?: string
  onSuccess?: (formValues: FormValues) => void
  keychainId: string
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'You must provide a keychain name' }),
  description: z.string().optional(),
  api_key: z.string().min(1, { message: 'Please provide your api key' }),
  long: z.string().min(34, { message: 'Invalid encryption key' }),
})

type FormValues = z.infer<typeof formSchema>

function CreateKeyForm({
  className,
  defaultValues,
  buttonClassName,
  onSuccess,
  keychainId,
}: KeyFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      api_key: defaultValues?.api_key ?? '',
      long: defaultValues?.long ?? '',
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      await createKey({ keychain_id: keychainId, ...values })
      router.refresh()
      if (onSuccess) onSuccess(values)
    } catch (error) {
      setFormErrors(form.setError, error)
    }
  }

  return (
    <Form {...form}>
      <form className={cn('space-y-4', className)} onSubmit={form.handleSubmit(onSubmit)}>
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
        <FormField
          name="api_key"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <FormInput placeholder="your api key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="long"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Encryption Key</FormLabel>
              <FormControl>
                <FormInput placeholder="encryption" {...field} />
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

export { CreateKeyForm }
