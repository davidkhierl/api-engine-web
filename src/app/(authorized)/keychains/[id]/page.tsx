import { findKeychain } from '@/lib/api/find-keychain'
import { notFound } from 'next/navigation'

export default async function KeychainPage({ params }: { params: { id: string } }) {
  const keychain = await findKeychain(params.id)
  if (!keychain) notFound()
  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">{keychain.name}</h1>
      <p className="text-slate-500 dark:text-slate-400">{keychain.description}</p>
    </section>
  )
}
