import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils/class-name'
import { forwardRef, HTMLAttributes } from 'react'

export const PageHeaderSkeleton = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('border-b border-slate-300 dark:border-slate-800', className)}
        {...props}>
        <div className="container flex max-w-screen-2xl flex-col items-stretch">
          <div className="my-10 flex justify-between gap-10">
            <div className="flex-1">
              <Skeleton className="h-9 w-full max-w-xs" />
            </div>
            {children}
          </div>
        </div>
      </header>
    )
  }
)
PageHeaderSkeleton.displayName = 'PageHeaderSkeleton'
