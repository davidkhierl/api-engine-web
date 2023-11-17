import { cn } from '@/lib/utils/class-name'
import { forwardRef, HTMLAttributes } from 'react'

export interface MainContentProps {
  /**
   * To remove wrapping container set this to false
   * @default true
   */
  container?: boolean
}

export const MainContent = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & MainContentProps>(
  ({ children, className, container = true, ...props }, ref) => {
    return (
      <main ref={ref} className={cn('py-12', className)} {...props}>
        {container ? <div className="container max-w-screen-2xl">{children}</div> : children}
      </main>
    )
  }
)
MainContent.displayName = 'MainContent'
