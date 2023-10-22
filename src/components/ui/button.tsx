import { BaseButton, BaseButtonProps } from '@/components/ui/base-button'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

export interface ButtonProps extends BaseButtonProps {
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, ...props }, ref) => {
    return (
      <BaseButton ref={ref} disabled={isLoading} type="button" {...props}>
        {isLoading && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="sr-only">loading</span>
          </>
        )}
        {children}
      </BaseButton>
    )
  }
)

Button.displayName = 'Button'
