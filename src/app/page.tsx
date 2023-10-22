import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { BaseButton } from '@/components/ui/base-button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1>API Engine</h1>
      <BaseButton asChild>
        <Link href="/login">Login</Link>
      </BaseButton>
      <ThemeModeToggle variant="ghost" />
    </main>
  )
}
