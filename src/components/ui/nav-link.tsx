'use client'

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

    return (
      <Link
        ref={ref}
        className={cn(
          'inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-slate-900 ring-offset-white transition-colors hover:bg-slate-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:text-slate-50 dark:ring-offset-slate-950 dark:hover:bg-slate-900/50 dark:focus-visible:ring-slate-300',
          pathname === href &&
            'bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-950/80',
          className
        )}
        href={href}
        {...props}>
        {icon}
        {children}
      </Link>
    )
  }
)
NavLink.displayName = 'NavLink'

export { NavLink }
