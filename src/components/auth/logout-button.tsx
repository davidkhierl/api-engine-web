'use client'

import { logout } from '@/lib/auth/logout'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

const LogoutButton = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const router = useRouter()
    const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
      if (onClick) onClick(event)
      void (await logout())
      localStorage.removeItem('access_token')
      localStorage.removeItem('at_expiry')
      router.refresh()
    }

    return <button ref={ref} onClick={handleOnClick} {...props} />
  }
)
LogoutButton.displayName = 'LogoutButton'

export { LogoutButton }
