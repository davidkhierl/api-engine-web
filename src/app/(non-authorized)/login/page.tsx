import { LoginForm } from '@/components/forms/login-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center space-y-4 p-8">
      <Card className="w-full max-w-[350px]">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>Login to manage your api keys</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <Button asChild variant="link">
        <Link href="/register">Don&apos;t have an account? Register</Link>
      </Button>
    </main>
  )
}
