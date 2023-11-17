'use client'

import { NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils/class-name'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { HTMLAttributes } from 'react'

export interface NavLinkProps extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  /**
   * Icon
   */
  icon?: React.ReactNode
  /**
   * Will not apply the `navigationMenuTriggerStyle()`
   * useful when applying custom active style
   */
  baseStyle?: boolean
  /**
   * Catch all path segments to apply active style.
   * For example, href is `/settings` and the current path is `/settings/account`
   * it will stay to have the active style
   */
  catchAllSegments?: boolean
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ baseStyle, catchAllSegments, children, className, href, icon, ...props }, ref) => {
    const pathname = usePathname()

    const isActive = catchAllSegments ? pathname.startsWith(href.toString()) : pathname === href
    return (
      <Link ref={ref} href={href} passHref legacyBehavior {...props}>
        <NavigationMenuLink
          className={cn(
            'inline-flex items-center gap-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
            !baseStyle && navigationMenuTriggerStyle(),
            className
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
