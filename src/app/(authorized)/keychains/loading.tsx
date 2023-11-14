import { Skeleton } from '@/components/ui/skeleton'

export default function KeychainsLoading() {
  return (
    <section>
      <div className="auto-rows-keychain-grid grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
    </section>
  )
}
