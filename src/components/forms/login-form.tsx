'use client'
import { loginAction } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   const data = await api.post<
  //     z.infer<typeof formSchema>,
  //     { access_token: string; at_expiry: number }
  //   >('/auth/login', values)
  //
  //   if (data) {
  //     localStorage.setItem('access_token', data.access_token)
  //     localStorage.setItem('at_expiry', dayjs(data.at_expiry * 1000).toISOString())
  //   }
  // }

  const callAction = async (formData: FormData) => {
    const isValid = await form.trigger()
    if (!isValid) return
    const data = await loginAction(formData)
    console.log(data)
  }

  return (
    <Form {...form}>
      <form action={callAction} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
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
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<Button type="submit" disabled={form.formState.isSubmitting}>*/}
        {/*  Login*/}
        {/*</Button>*/}
        <LoginButton />
      </form>
    </Form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" isLoading={pending}>
      Login
    </Button>
  )
}
