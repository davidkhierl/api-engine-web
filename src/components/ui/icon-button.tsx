import { Slot, Slottable } from '@/components/primitives/slot'
import { Icon } from '@/components/ui/icon'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { buttonVariants } from './button'

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  label: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, variant, size, asChild = false, label, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        type={!asChild ? 'button' : undefined}
        className={className(buttonVariants({ variant, size, className }))}
        {...props}>
        <Slottable child={children}>{(child) => <Icon label={label}>{child}</Icon>}</Slottable>
      </Comp>
    )
  }
)
IconButton.displayName = 'IconButton'

export { IconButton }
