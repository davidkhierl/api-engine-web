import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { CreateKeychainDialog } from '@/components/keychain/create-keychain-dialog'
import { KeychainCard } from '@/components/keychain/keychain-card'
import { findAllKeychains } from '@/lib/api/find-all-keychains'

export default async function KeychainsPage() {
  const keychains = await findAllKeychains()
  return (
    <>
      <PageHeader title="Keychains">
        <CreateKeychainDialog />
      </PageHeader>
      <MainContent>
        <section>
          {keychains.length ? (
            <div className="grid auto-rows-keychain-grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {keychains?.map((keychain) => (
                <KeychainCard key={keychain.id} className="h-full" {...keychain} />
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-2 rounded-md p-6">
              <p>You don&apos;t have any keychains.</p>
            </div>
          )}
        </section>
      </MainContent>
    </>
  )
}
