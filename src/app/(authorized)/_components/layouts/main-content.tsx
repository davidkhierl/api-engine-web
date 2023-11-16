import { cn } from '@/lib/utils/class-name'
import { forwardRef, HTMLAttributes } from 'react'

export const MainContent = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <main ref={ref} className={cn('container max-w-screen-2xl pt-12', className)} {...props} />
    )
  }
)
MainContent.displayName = 'MainContent'
