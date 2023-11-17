import { KeychainCardOptionsDropdown } from '@/components/keychain/keychain-card-options-dropdown'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Keychain } from '@/lib/api-engine/api.types'
import { cn } from '@/lib/utils/class-name'
import Link from 'next/link'

export type KeychainCardProps = Keychain

function KeychainCard({ className, ...props }: KeychainCardProps & { className?: string }) {
  return (
    <Card className={cn('grid grid-cols-1 grid-rows-1', className)}>
      <Link
        className="pointer-events-auto col-start-1 row-start-1"
        href={`/keychains/${props.id}`}
        aria-label={`Open keychain ${props.name}`}></Link>
      <CardHeader className="pointer-events-none col-start-1 row-start-1 flex flex-row justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{props.name}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
        <div>
          <KeychainCardOptionsDropdown className="pointer-events-auto" {...props} />
        </div>
      </CardHeader>
    </Card>
  )
}

export { KeychainCard }
