'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils/class-name'
import { getNameInitials } from '@/lib/utils/get-name-initials'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { Frown, LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export interface UserAvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {}

function UserAvatar({ className }: { className?: string }) {
  const user = useAuth((state) => state.user)
  const logout = useAuth((state) => state.logout)
  const [hasErrorLoadingImage, setHasErrorLoadingImage] = React.useState(false)

  if (!user)
    return (
      <div
        title="No user found"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-red-100 text-red-700">
        <Frown />
        <span className="sr-only">Error loading user</span>
      </div>
    )

  const name = user.displayName ?? user.email

  const initials = getNameInitials(name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'rounded-md ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
          className
        )}>
        <Avatar>
          {!hasErrorLoadingImage && (
            <Image
              src={user.avatarUrl}
              onError={() => setHasErrorLoadingImage(true)}
              className="absolute left-0 top-0"
              alt={name}
              width={40}
              height={40}
              priority
            />
          )}
          {/*<AvatarImage src="/images/avatar-default-1.png" alt={name} />*/}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center gap-2">
            {!hasErrorLoadingImage && (
              <Avatar>
                {/*<AvatarImage src="/images/avatar-default-1.png" alt={name} />*/}
                <Image src={user.avatarUrl} alt={name} width={40} height={40} priority />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            )}
            <span>{name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/account" className="inline-flex w-full gap-2">
                <User className="h-4 w-4" />
                Account
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button type="button" className="inline-flex w-full gap-2" onClick={() => logout()}>
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export { UserAvatar }
