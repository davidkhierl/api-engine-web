import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { EncryptionAlert } from '@/components/encryption/encryption-alert'
import { findKeychain } from '@/lib/api/find-keychain'
import { notFound } from 'next/navigation'

export default async function KeychainPage({ params }: { params: { id: string } }) {
  const keychain = await findKeychain(params.id)
  if (!keychain) notFound()
  return (
    <>
      <PageHeader title={keychain.name} />
      <MainContent>
        <section>
          <EncryptionAlert />
        </section>
      </MainContent>
    </>
  )
}
