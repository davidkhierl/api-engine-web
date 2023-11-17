import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils/class-name'

const alertVariants = cva(
  'relative w-full rounded-lg border border-slate-200 p-4 dark:border-slate-800 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950 dark:[&>svg]:text-slate-50 [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50',
        warning:
          'border-amber-700 text-amber-700 dark:border-amber-400 dark:text-amber-400 [&>svg]:text-amber-700 dark:[&>svg]:text-amber-400',
        destructive:
          'border-red-500 text-red-600 dark:border-red-700 dark:text-red-500 [&>svg]:text-red-600 dark:[&>svg]:text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type AlertVariant = VariantProps<typeof alertVariants>

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & AlertVariant>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
