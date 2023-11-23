import { KeyUsageBar } from '@/components/key/key-usage-bar'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Key } from '@/lib/api-engine/api.types'

export type KeyCardProps = Key

function KeyCard(props: KeyCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex items-center justify-between gap-10 p-6">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>{props.name}</CardTitle>
          {props.description && <CardDescription>{props.description}</CardDescription>}
        </div>
        <KeyUsageBar className="h-1.5 min-w-[250px]" {...props} />
      </div>
    </div>
  )
}

export { KeyCard }
