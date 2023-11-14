import { Skeleton } from '@/components/ui/skeleton'

export default function KeychainLoading() {
  return (
    <section className="space-y-2">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-6 w-56" />
    </section>
  )
}
