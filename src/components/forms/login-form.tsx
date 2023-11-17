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
import { login } from '@/lib/auth/login'
import { setFormErrors } from '@/lib/utils/set-form-errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'You must enter your password' }),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const { push, prefetch } = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: FormValues) {
    try {
      const auth = await login(values)
      localStorage.setItem('access_token', auth.access_token)
      localStorage.setItem('at_expiry', auth.at_expiry.toString())

      /**
       * On production build has some issue pushing to new route on initial load,
       * it basically won't work because the middleware will redirect it back to login
       * since tokens are not yet set.
       * To fix this we need to trigger a prefetch before pushing to a new route.
       * This sets the token and middleware will allow us to navigate to the protected route.
       *
       * TODO: add redirect from redirect query param
       */
      prefetch('/')
      push('/')
    } catch (error) {
      setFormErrors(form.setError, error)
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
        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  )
}
