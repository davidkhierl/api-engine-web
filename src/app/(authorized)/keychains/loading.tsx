import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { CreateKeychainDialog } from '@/components/keychain/create-keychain-dialog'
import { Skeleton } from '@/components/ui/skeleton'

export default function KeychainsLoading() {
  return (
    <>
      <PageHeader title="Keychains">
        <CreateKeychainDialog />
      </PageHeader>
      <MainContent>
        <section>
          <div className="grid auto-rows-keychain-grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
          </div>
        </section>
      </MainContent>
    </>
  )
}
