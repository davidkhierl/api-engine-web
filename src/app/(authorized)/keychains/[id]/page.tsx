import { apiEngine } from '@/services/api-engine'
import { notFound } from 'next/navigation'

export default async function KeychainPage({ params }: { params: { id: string } }) {
  const keychain = await apiEngine.getKeychain(params.id)
  if (!keychain) notFound()

  return (
    <div>
      <p>{keychain.name}</p>
      <p>{keychain.description}</p>
    </div>
  )
}
