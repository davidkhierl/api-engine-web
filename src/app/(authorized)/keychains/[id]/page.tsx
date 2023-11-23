import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { EncryptionAlert } from '@/components/encryption/encryption-alert'
import { CreateKeyDialog } from '@/components/key/create-key-dialog'
import { KeyList } from '@/components/key/key-list'
import { Button } from '@/components/ui/button'
import { findAllKeys } from '@/lib/api/find-all-keys'
import { findKeychain } from '@/lib/api/find-keychain'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function KeychainPage({ params }: { params: { id: string } }) {
  const keychain = await findKeychain(params.id)
  if (!keychain) notFound()

  const keys = await findAllKeys()
  return (
    <>
      <PageHeader title={keychain.name}>
        <CreateKeyDialog keychainId={keychain.id} />
      </PageHeader>
      <MainContent>
        <section>
          <EncryptionAlert>
            <div className="mt-4">
              <Button size="sm" variant="warning" asChild>
                <Link href="/settings/encryption">Setup Encryption</Link>
              </Button>
            </div>
          </EncryptionAlert>
          <KeyList keys={keys} />
        </section>
      </MainContent>
    </>
  )
}
