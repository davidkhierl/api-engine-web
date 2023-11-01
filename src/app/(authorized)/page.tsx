import { UserCard } from '@/components/user-card/user-card'

export default function AuthorizeHomePage() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl">Welcome to API Engine</h1>
      <UserCard />
    </main>
  )
}
