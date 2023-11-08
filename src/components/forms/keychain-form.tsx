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
import { cn } from '@/lib/utils/class-name'
import { apiEngine } from '@/services/api-engine'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export interface KeychainFormProps {
  className?: string
  defaultValues?: FormValues
  buttonClassName?: string
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'You must provide a keychain name' }),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function KeychainForm({ className, defaultValues, buttonClassName }: KeychainFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
    },
  })

  async function onSubmit(values: FormValues) {
    try {
    } catch (error) {
      apiEngine.setFormErrors(form.setError, error)
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
        <FormServerErrorMessage />
        <Button type="submit" className={buttonClassName} isLoading={form.formState.isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  )
}
