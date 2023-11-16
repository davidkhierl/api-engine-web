import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { CreateKeychainDialog } from '@/app/(authorized)/keychains/_components/create-keychain-dialog'
import { KeychainCard } from '@/components/keychain/keychain-card'
import { findAllKeychain } from '@/lib/api/find-all-keychain'

export default async function KeychainsPage() {
  const keychains = await findAllKeychain()
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
