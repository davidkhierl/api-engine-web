import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Keychain } from '@/lib/api-engine/api.types'
import Link from 'next/link'

export type KeychainCardProps = Keychain

function KeychainCard({ className, ...props }: KeychainCardProps & { className?: string }) {
  return (
    <Link href={`/keychains/${props.id}`}>
      <Card className={className}>
        <CardHeader className="space-y-0">
          <CardTitle className="text-base">{props.name}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export { KeychainCard }
