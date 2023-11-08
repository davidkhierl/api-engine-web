'use client'

import { NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils/class-name'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { HTMLAttributes } from 'react'

export interface NavLinkProps extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, className, href, icon, ...props }, ref) => {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
      <Link ref={ref} href={href} passHref legacyBehavior {...props}>
        <NavigationMenuLink
          className={cn(
            'inline-flex items-center gap-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
            navigationMenuTriggerStyle()
          )}
          active={isActive}>
          {icon}
          {children}
        </NavigationMenuLink>
      </Link>
    )
  }
)
NavLink.displayName = 'NavLink'

export { NavLink }
