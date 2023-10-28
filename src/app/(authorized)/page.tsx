import { ThemeModeToggle } from '@/components/theme-mode-toggle'

export default function AuthorizeHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl">Welcome API Engine</h1>
      <ThemeModeToggle variant="ghost" />
    </main>
  )
}
