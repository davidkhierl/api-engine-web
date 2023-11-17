import { CreateEncryptionTrigger } from '@/components/encryption/create-encryption-trigger'
import { EncryptionAlert } from '@/components/encryption/encryption-alert'
import { EncryptionCard } from '@/components/encryption/encryption-card'
import { Encryption } from '@/lib/api-engine/api.types'
import { getEncryption } from '@/lib/api/get-encryption'
import { FileKey2 } from 'lucide-react'

export default async function EncryptionSettingsPage() {
  let encryption: Encryption | null

  try {
    encryption = await getEncryption()
  } catch {
    encryption = null
  }

  return (
    <section>
      <h2 className="mb-4 text-lg">Encryption</h2>
      <EncryptionAlert
        className="[&>svg~*]:pl-10"
        title="Create Your Encryption"
        variant="default"
        description="This key will be used to securely encrypt all your keys"
        icon={<FileKey2 />}>
        <div className="mt-4">
          <CreateEncryptionTrigger size="sm" variant="default">
            Create Encryption
          </CreateEncryptionTrigger>
        </div>
      </EncryptionAlert>
      {encryption && <EncryptionCard encryption={encryption} />}
    </section>
  )
}
