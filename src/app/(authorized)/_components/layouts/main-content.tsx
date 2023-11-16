import { cn } from '@/lib/utils/class-name'
import { forwardRef, HTMLAttributes } from 'react'

export const MainContent = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <main ref={ref} className={cn('bg-slate-50 py-12 dark:bg-slate-950', className)} {...props}>
        <div className="container max-w-screen-2xl ">{children}</div>
      </main>
    )
  }
)
MainContent.displayName = 'MainContent'
