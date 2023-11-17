import { SidebarNavigation } from '@/app/(authorized)/settings/_components/navigation'
import { cn } from '@/lib/utils/class-name'

export function SettingsSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('min-w-[264px]', className)}>
      <SidebarNavigation />
    </aside>
  )
}
