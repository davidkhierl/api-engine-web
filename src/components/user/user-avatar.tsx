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
import { getNameInitials } from '@/lib/utils/get-name-initials'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export interface UserAvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {}

function UserAvatar({ className }: { className?: string }) {
  const user = useAuth((state) => state.user)
  const logout = useAuth((state) => state.logout)

  if (!user) return null

  const name = user.displayName ?? user.email

  const initials = getNameInitials(name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md">
        <Avatar>
          <Image src="/images/avatar-default-1.png" alt={name} width={40} height={40} priority />
          {/*<AvatarImage src="/images/avatar-default-1.png" alt={name} />*/}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar>
              {/*<AvatarImage src="/images/avatar-default-1.png" alt={name} />*/}
              <Image
                src="/images/avatar-default-1.png"
                alt={name}
                width={40}
                height={40}
                priority
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
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
