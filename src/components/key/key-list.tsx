import { KeyCard } from '@/components/key/key-card'
import { Key } from '@/lib/api-engine/api.types'

export interface KeyListProps {
  keys: Key[]
}

function KeyList({ keys }: KeyListProps) {
  return (
    <div className="space-y-2">
      {keys.map((key) => (
        <KeyCard key={key.id} {...key} />
      ))}
    </div>
  )
}

export { KeyList }
