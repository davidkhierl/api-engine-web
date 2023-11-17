import { EncryptionRevokeAlertDialog } from '@/components/encryption/encryption-revoke-alert-dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Encryption } from '@/lib/api-engine/api.types'
import dayjs from 'dayjs'

function EncryptionCard({ className, encryption }: { className?: string; encryption: Encryption }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{dayjs(encryption.created_at).format('dddd, MMMM D, YYYY h:mm A')}</CardTitle>
        <CardDescription>Date created</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="mb-1 capitalize">Creating new encryption key</h4>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          If in case you lose or forget your encryption key you will need to create a new encryption
          key. This means that you will have to revoke the old encryption and make a new one.
          However,{' '}
          <strong>
            Revoking will make all your keys that were encrypted by this encryption invalid
          </strong>
          , so you will have to recreate all your previous keys as well.
        </p>
      </CardContent>
      <CardFooter>
        <EncryptionRevokeAlertDialog />
      </CardFooter>
    </Card>
  )
}

export { EncryptionCard }
