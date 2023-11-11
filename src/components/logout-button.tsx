'use client'

import { apiEngine } from '@/services/api-engine'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

const LogoutButton = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { push } = useRouter()
    const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
      if (onClick) onClick(event)

      void (await apiEngine.logout())
      push('/login')
    }

    return <button ref={ref} onClick={handleOnClick} {...props} />
  }
)
LogoutButton.displayName = 'LogoutButton'

export { LogoutButton }
