import { NavLink } from '@/components/ui/nav-link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils/class-name'
import { cva } from 'class-variance-authority'

export function SidebarNavigation() {
  const navigationMenuTriggerStyle = cva(
    'group inline-flex h-10 w-full items-center rounded-md px-4 py-2 text-sm font-normal text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:font-medium data-[state=open]:font-medium data-[active]:text-slate-950 data-[state=open]:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[active]:text-slate-50 dark:data-[state=open]:text-slate-50'
  )
  return (
    <NavigationMenu
      className="max-w-full flex-col items-stretch"
      orientation="vertical"
      aria-label="Settings">
      <NavigationMenuList className="w-full flex-col items-stretch space-x-0">
        <NavigationMenuItem className="w-full">
          <NavLink className={cn(navigationMenuTriggerStyle())} href="/settings/account" baseStyle>
            Account
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <NavLink
            className={cn(navigationMenuTriggerStyle())}
            href="/settings/encryption"
            baseStyle>
            Encryption
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
