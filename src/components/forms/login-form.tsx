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
import { useAuth } from '@/hooks/use-auth'
import { apiEngine } from '@/services/api-engine'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'You must enter your password' }),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const login = useAuth((state) => state.login)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: FormValues) {
    try {
      await login(values)
    } catch (error) {
      apiEngine.setFormErrors(form.setError, error)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <FormInput type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <FormInput type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormServerErrorMessage />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  )
}
