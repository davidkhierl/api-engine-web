import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1>API Engine</h1>
      <Button asChild icon={<LogIn className="h-4 w-4" />} iconPlacement="right" isLoading>
        <Link href="/login">Login</Link>
      </Button>
      <ThemeModeToggle variant="ghost" />
    </main>
  )
}
