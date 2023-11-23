import { MainContent } from '@/app/(authorized)/_components/layouts/main-content'
import { PageHeader } from '@/app/(authorized)/_components/layouts/page-header'
import { NotFoundDisplay } from '@/components/ui/not-found-display'

export default function KeychainNotFound() {
  return (
    <>
      <PageHeader title="Keychain Not Found" />
      <MainContent>
        <NotFoundDisplay />
      </MainContent>
    </>
  )
}
