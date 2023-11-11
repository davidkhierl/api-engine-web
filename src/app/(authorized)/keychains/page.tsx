import { apiEngine } from '@/services/api-engine'

export default async function KeychainPage() {
  const keychains = await apiEngine.getAllKeychains()
  return (
    <div className="flex-1">
      {keychains?.map((keychain) => <div key={keychain.id}>{keychain.name}</div>)}
    </div>
  )
}
