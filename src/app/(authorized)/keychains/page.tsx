import { KeychainCard } from '@/components/keychain/keychain-card'
import { findAllKeychain } from '@/lib/api/find-all-keychain'

export default async function KeychainsPage() {
  const keychains = await findAllKeychain()
  return (
    <section>
      <div className="grid auto-rows-keychain-grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {keychains?.map((keychain) => (
          <KeychainCard key={keychain.id} className="h-full" {...keychain} />
        ))}
      </div>
    </section>
  )
}
