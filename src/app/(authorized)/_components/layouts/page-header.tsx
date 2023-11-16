import { cn } from '@/lib/utils/class-name'
import { forwardRef, HTMLAttributes } from 'react'

export interface PageHeaderProps {
  title: string
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps & HTMLAttributes<HTMLElement>>(
  ({ children, className, title, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('border-b border-slate-300 dark:border-slate-800', className)}
        {...props}>
        <div className="container flex max-w-screen-2xl flex-col items-stretch">
          <div className="my-10 flex justify-between gap-10">
            <div className="flex-1">
              <h1 className="text-3xl">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </header>
    )
  }
)
PageHeader.displayName = 'PageHeader'
