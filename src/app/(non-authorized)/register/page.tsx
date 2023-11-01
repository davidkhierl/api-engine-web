import { RegisterUserForm } from '@/components/forms/register-user-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center space-y-4 p-8">
      <Card className="w-full max-w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register now to manage your api keys</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterUserForm />
        </CardContent>
      </Card>
      <Button asChild variant="link">
        <Link href="/login">Already have an account?</Link>
      </Button>
    </main>
  )
}
